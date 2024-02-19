import { ObjectId } from "mongoose";
import { Gender } from "../helper/types";
import { IBase } from "./IBase";

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
}


export type IStudentDTO = Partial<Omit<IStudent, '_id'>>;