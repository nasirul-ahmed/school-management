import { Schema, model } from "mongoose";
import { IStudent } from "../interfaces";

const Student = new Schema<IStudent>(
  {
    name: String,
    medium: String,
    class: String,
    section: String,
    roll: Number,
    address: String,
    fatherName: String,
    motherName: String,
    fatherOccupation: String,
    motherOccupation: String,
    phoneNumber: Number,
    emergencyContactNumber: String,
    photo: String,
    email: String,
    DOB: Date,
    gender: String,
    isActive: Boolean,
    reference: String,
    sportsActivity: [{ type: Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

Student.index({ createdAt: 1 });
Student.index({ updatedAt: 1 });
Student.index({ name: 1, class: 1, roll: 1 });

Student.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

Student.set("toObject", {
  virtuals: true,
  versionKey: false,
});

export default model<IStudent>("students", Student);
