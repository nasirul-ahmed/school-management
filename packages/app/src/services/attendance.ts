import { PipelineStage } from "mongoose";
import { Inject, Service } from "typedi";
import { Logger } from "winston";
import {
  IPaginatedResponse,
  ITeacherAttendanceDTO,
  TeacherAttendanceModal,
} from "@school-management/common/";
@Service()
export default class ApiService {
  constructor(@Inject("logger") private logger: Logger) {}

  public async getAll(input: any) {
    try {
      const { pageNo, pageSize, sortDirection, timeZone, startTime, endTime } =
        input;
      let { sortBy } = input;
      const paginationQuery = [];
      const matchFilters: Record<string, unknown> = {};

      const strStartTime = startTime.toISOString();
      const strEndTime = endTime.toISOString();

      const sortDir = Number(sortDirection) === 1 ? 1 : -1;
      sortBy = sortBy ?? "updatedAt";

      const pagination: { skip: number; limit: number } = {
        skip: pageSize * (pageNo - 1),
        limit: pageSize,
      };

      if (input.status) {
        matchFilters.status = input.status;
      }

      if (input.gameAlias) {
        matchFilters.gameAlias = input.gameAlias;
      }

      paginationQuery.push(
        { $skip: pagination.skip },
        { $limit: pagination.limit }
      );
      // const project = this.getDetailedReportsProjectionPipeline();

      const pipelines: PipelineStage[] = [
        { $match: matchFilters },
        { $sort: { [sortBy]: sortDir } },
        ...paginationQuery,
        // project,
      ];

      const _data = await TeacherAttendanceModal.aggregate(pipelines);

      const finalData: IPaginatedResponse<ITeacherAttendanceDTO> = {
        data: [],
        limit: pagination.limit,
        page: pagination.skip / pagination.limit + 1,
      };

      if (_data && _data.length > 0) {
        finalData.data = _data;
      }

      return finalData;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
