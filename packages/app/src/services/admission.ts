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
export default class AdmissionService {
  constructor(@Inject("logger") private logger: Logger) {}

  public async admission(input: ITeacherAttendanceQuery) {
    try {
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
