import { USER_ROLES, USER_STATUSES } from "./users.consts";
import { UserDoc } from "./users.schema";

export type UserRole = (typeof USER_ROLES)[number];
export type UserStatus = (typeof USER_STATUSES)[number];
export type LoggedUser = Pick<UserDoc, "_id" | "name" | "phone" | "role">;
