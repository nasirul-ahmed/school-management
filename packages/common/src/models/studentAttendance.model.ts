import { Schema, model } from "mongoose";
import { IStudentAttendance } from "../interfaces";
import studentModel from "./student.model";

const StudentAttendance = new Schema<IStudentAttendance>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: studentModel.modelName },
    attendDate: Date,
    subject: Array<String>,
    status: String,
  },
  { timestamps: true }
);

StudentAttendance.index({ createdAt: 1 });
StudentAttendance.index({ updatedAt: 1 });

StudentAttendance.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

StudentAttendance.set("toObject", {
  virtuals: true,
  versionKey: false,
});

export default model<IStudentAttendance>("studentAttendances", StudentAttendance);
