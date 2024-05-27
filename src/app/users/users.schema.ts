import { FilterQuery, InferRawDocType, Schema, Types, model } from "mongoose";
import { USER_ROLES, USER_STATUSES } from "./users.consts";
import { ProjectionType } from "mongoose";

const UserSchemaDefinition = {
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: USER_ROLES, required: true },
  status: { type: String, enum: USER_STATUSES, default: "ACTIVE" },
  password: { type: String, required: true },
} as const;

const UserSchema = new Schema(UserSchemaDefinition, {
  timestamps: true,
});

export const User = model("User", UserSchema);
export type UserDoc = InferRawDocType<typeof UserSchemaDefinition> & { _id: Types.ObjectId };
export type UserFilter = FilterQuery<InferRawDocType<typeof UserSchemaDefinition>>;
export type UserProjection = ProjectionType<UserFilter>;
