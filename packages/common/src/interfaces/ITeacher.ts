import { Gender, MaritalStatus } from "../helper/types";
import { IBase } from "./IBase";
import { IPaginatedQuery } from "./IPaginatedQuery";

export interface ITeacher extends IBase {
  name: string;
  medium: string;
  class: string;
  section: string;
  subjects: string[];
  address: string;
  fatherName: string;
  motherName: string;
  experience: string;
  qualification: string;
  phoneNumber: number;
  emergencyContactNumber: string;
  photo: string;
  email: string;
  DOB: Date;
  status: MaritalStatus;
  gender: Gender;
  isActive: Boolean;
  reference: string;
}

export type ITeacherDTO = Partial<Omit<ITeacher, "_id">>;
export type ITeacherQuery = IPaginatedQuery & ITeacherDTO;
