import { PipelineStage } from "mongoose";
import { Inject, Service } from "typedi";
import { Logger } from "winston";
import {
  IPaginatedResponse,
  IStudentDTO,
  IStudentQuery,
  ITeacherAttendanceDTO,
  ITeacherAttendanceQuery,
  ITeacherQuery,
  StudentModel,
  TeacherAttendanceModal,
  TeacherModal,
} from "@school-management/common/";
@Service()
export default class AttendanceService {
  constructor(@Inject("logger") private logger: Logger) {}

  public async getStudents(input: IStudentQuery) {
    try {
      const { pageNo, pageSize, sortDirection } = input;
      let { sortBy } = input;
      const paginationQuery = [];
      const aggregationPipe = [];

      const sortDir = 1;
      sortBy = sortBy ?? "updatedAt";

      const pagination: { skip: number; limit: number } = {
        skip: pageSize * (pageNo - 1),
        limit: pageSize,
      };

      paginationQuery.push(
        { $skip: pagination.skip },
        { $limit: pagination.limit }
      );

      if (input.class) {
        aggregationPipe.push({ $match: { class: input.class } });
      }

      const pipelines: PipelineStage[] = [
        { $match: aggregationPipe },
        { $sort: { [sortBy]: sortDir } },
        ...paginationQuery,
      ];

      const _data = await StudentModel.aggregate(pipelines);

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

  public async getTeachers(input: ITeacherQuery) {
    try {
      const { pageNo, pageSize, sortDirection } = input;
      let { sortBy } = input;
      const paginationQuery = [];
      const aggregationPipe = [];

      const sortDir = 1;
      sortBy = sortBy ?? "updatedAt";

      const pagination: { skip: number; limit: number } = {
        skip: pageSize * (pageNo - 1),
        limit: pageSize,
      };

      paginationQuery.push(
        { $skip: pagination.skip },
        { $limit: pagination.limit }
      );

      if (input.medium) {
        aggregationPipe.push({ $match: { medium: input.medium } });
      }

      const pipelines: PipelineStage[] = [
        { $match: aggregationPipe },
        { $sort: { [sortBy]: sortDir } },
        ...paginationQuery,
      ];

      const _data = await TeacherModal.aggregate(pipelines);

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

  public async getAllTeacherAttendance(input: ITeacherAttendanceQuery) {
    try {
      const { pageNo, pageSize, sortDirection, timeZone, startTime, endTime } =
        input;
      let { sortBy } = input;
      const paginationQuery = [];
      const matchFilters: Record<string, unknown> = {};

      const sortDir = 1;
      sortBy = sortBy ?? "updatedAt";

      const pagination: { skip: number; limit: number } = {
        skip: pageSize * (pageNo - 1),
        limit: pageSize,
      };

      if (startTime) {
        matchFilters.createdAt = { $gte: new Date(startTime) };
      }

      if (endTime) {
        matchFilters.createdAt = { $lte: new Date(endTime) };
      }

      if (input.status) {
        matchFilters.status = input.status;
      }

      paginationQuery.push(
        { $skip: pagination.skip },
        { $limit: pagination.limit }
      );

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

  public async getAllStudentAttendance(input: ITeacherAttendanceQuery) {
    try {
      const { pageNo, pageSize, sortDirection, startTime, endTime } = input;
      let { sortBy } = input;
      const paginationQuery = [];
      const matchFilters: Record<string, unknown> = {};

      const sortDir = 1;
      sortBy = sortBy ?? "updatedAt";

      const pagination: { skip: number; limit: number } = {
        skip: pageSize * (pageNo - 1),
        limit: pageSize,
      };

      if (startTime) {
        matchFilters.createdAt = { $gte: new Date(startTime) };
      }

      if (endTime) {
        matchFilters.createdAt = { $lte: new Date(endTime) };
      }

      if (input.status) {
        matchFilters.status = input.status;
      }

      paginationQuery.push(
        { $skip: pagination.skip },
        { $limit: pagination.limit }
      );

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
