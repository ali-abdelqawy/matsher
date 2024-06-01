import { IsIn } from "class-validator";
import { IsRequired } from "../../../core/decorators";
import { InsertUserDto } from "../../users/dto";
import { USER_ROLES } from "../../users/users.consts";
import { UserRole } from "../../users";

export class SignupUserBody extends InsertUserDto {
  @IsRequired(true)
  @IsIn(USER_ROLES.filter((role) => role !== "ADMIN"))
  role: Omit<UserRole, "ADMIN">;
}
