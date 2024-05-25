import { Schema, model } from "mongoose";
import { USER_ROLES, USER_STATUSES } from "./users.consts";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: USER_ROLES, required: true },
    status: { type: String, enum: USER_STATUSES, default: "ACTIVE" },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", UserSchema);
