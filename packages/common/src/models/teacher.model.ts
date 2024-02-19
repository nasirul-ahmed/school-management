import { Schema, model } from "mongoose";
import { IStudent, ITeacher } from "../interfaces";

const Teacher = new Schema<ITeacher>(
  {
    name: String,
    medium: String,
    class: String,
    section: String,
    subjects: String,
    address: String,
    fatherName: String,
    motherName: String,
    experience: String,
    qualification: String,
    phoneNumber: Number,
    emergencyContactNumber: String,
    photo: String,
    email: String,
    DOB: Date,
    status: String,
    gender: String,
    isActive: Boolean,
    reference: String,
  },
  { timestamps: true }
);

Teacher.index({ createdAt: 1 });
Teacher.index({ updatedAt: 1 });
Teacher.index({ name: 1, class: 1});

Teacher.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

Teacher.set("toObject", {
  virtuals: true,
  versionKey: false,
});

export default model<ITeacher>("teachers", Teacher);
