import { Schema, model } from "mongoose";
import { IFee } from "../interfaces";

const Fee = new Schema<IFee>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    tuitionFee: Number,
    labFee: Number,
    libraryFee: Number,
    examFee: Number,
    totalFees: Number,
    extraFees: Number,
    paymentMethod: String,
  },
  { timestamps: true }
);

Fee.index({ createdAt: 1 });
Fee.index({ updatedAt: 1 });
Fee.index({ name: 1, class: 1, roll: 1 });

Fee.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

Fee.set("toObject", {
  virtuals: true,
  versionKey: false,
});

export default model<IFee>("students", Fee);
