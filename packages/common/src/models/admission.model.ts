import { Schema, model } from "mongoose";
import { IAdmission } from "../interfaces";

const Admission = new Schema<IAdmission>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    fee: {
      type: Schema.Types.ObjectId,
      ref: "fee",
      required: true,
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

Admission.index({ createdAt: 1 });
Admission.index({ updatedAt: 1 });
Admission.index({ name: 1, class: 1, roll: 1 });

Admission.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

Admission.set("toObject", {
  virtuals: true,
  versionKey: false,
});

export default model<IAdmission>("students", Admission);
