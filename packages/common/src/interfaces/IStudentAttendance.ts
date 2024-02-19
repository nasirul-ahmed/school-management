import { ObjectId } from "mongoose";
import { IBase } from "./IBase";
import { AttendanceType } from "../helper/types";

export interface IStudentAttendance extends IBase {
  _id: string | ObjectId;
  studentId: string | ObjectId;
  attendDate: Date;
  subject?: string[];
  status: AttendanceType;
}

export type IStudentAttendanceDTO = Partial<Omit<IStudentAttendance, '_id'>>;