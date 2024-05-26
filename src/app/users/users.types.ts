import { USER_ROLES, USER_STATUSES } from "./users.consts";
import { UserFilter } from "./users.schema";

export type UserRole = (typeof USER_ROLES)[number];
export type UserStatus = (typeof USER_STATUSES)[number];
export type LoggedUser = Required<Pick<UserFilter, "_id" | "name" | "phone" | "role">>;
