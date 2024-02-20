import { ObjectId } from "mongoose";
import { Gender } from "../helper/types";
import { IBase } from "./IBase";
import { IPaginatedQuery } from "./IPaginatedQuery";

export interface IStudent extends IBase {
  name: string;
  medium: string;
  class: string;
  section: string;
  roll: number;
  address: string;
  fatherName: string;
  motherName: string;
  fatherOccupation: string;
  motherOccupation: string;
  phoneNumber: number;
  emergencyContactNumber: string;
  photo: string;
  email: string;
  DOB: Date;
  gender: Gender;
  isActive: Boolean;
  reference: string;
  sportsActivity: [ObjectId | string];
  admissionDate: Date;
}

export type IStudentDTO = Partial<Omit<IStudent, "_id">>;
export type IStudentQuery = IPaginatedQuery & IStudentDTO;
