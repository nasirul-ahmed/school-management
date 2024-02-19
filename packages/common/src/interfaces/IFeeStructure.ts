import { ObjectId } from "mongoose";
import { IBase } from "./IBase";

export interface IFeeStructure extends IBase {
  studentId: String | ObjectId;
  tuitionFee: Number;
  labFee?: Number;
  libraryFee: Number;
  examFee: Number;
  totalFees: Number;
//   paymentMethod: String;
//   amountPaid: Number;
//   paymentDate: Date;

}
