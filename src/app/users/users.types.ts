import { USER_ROLES, USER_STATUSES } from "./users.consts";

export type UserRole = (typeof USER_ROLES)[number];
export type UserStatus = (typeof USER_STATUSES)[number];
