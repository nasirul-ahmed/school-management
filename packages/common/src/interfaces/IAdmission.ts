import { ObjectId } from "mongoose";
import { IBase } from "./IBase";

export interface IAdmission extends IBase {
  student: String | ObjectId;
  fee: String | ObjectId;
  admissionDate: Date;
}
