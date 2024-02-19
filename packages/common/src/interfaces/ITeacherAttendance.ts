import { ObjectId } from "mongoose";
import { IBase } from "./IBase";
import { AttendanceType } from "../helper/types";

export interface ITeacherAttendance extends IBase {
  _id: string | ObjectId;
  teacherId: string | ObjectId;
  attendDate: Date;
  status: AttendanceType;
  classesTaken?: [{ studentId: string[] | ObjectId; class: string }];
}

export type ITeacherAttendanceDTO = Partial<Omit<ITeacherAttendance, '_id'>>;