import { Schema, model } from "mongoose";
import { ITeacherAttendance } from "../interfaces";
import studentModel from "./student.model";

const TeacherAttendance = new Schema<ITeacherAttendance>(
  {},
  { timestamps: true }
);

TeacherAttendance.index({ createdAt: 1 });
TeacherAttendance.index({ updatedAt: 1 });

TeacherAttendance.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

TeacherAttendance.set("toObject", {
  virtuals: true,
  versionKey: false,
});

export default model<ITeacherAttendance>(
  "teacherAttendances",
  TeacherAttendance
);
