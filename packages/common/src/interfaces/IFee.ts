import { ObjectId } from "mongoose";
import { IBase } from "./IBase";

export interface IFee extends IBase {
  student: String | ObjectId;
  tuitionFee: Number;
  labFee?: Number;
  libraryFee: Number;
  examFee?: Number;
  totalFees: Number;
  extraFees?: { name: string; fees: Number };
  paymentMethod: String;
}
