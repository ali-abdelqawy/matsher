import { IsIn, MaxLength, Matches, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { USER_ROLES } from "../users.consts";
import { UserRole } from "../users.types";
import { IsUniquePhone, IsStrongPassword } from "./decorators";
import { IsRequired } from "../../../core/decorators";

export class SignupDto {
  @IsRequired(true)
  @Matches(/^[A-Za-z ]+$/)
  @MaxLength(100)
  name: string;

  @IsRequired(true)
  @IsPhoneNumber()
  @IsUniquePhone()
  phone: string;

  @IsRequired(true)
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  @IsStrongPassword()
  password: string;
}

export class SignupUserBody extends SignupDto {
  @IsRequired(true)
  @IsIn(USER_ROLES.filter((role) => role !== "ADMIN"))
  role: Omit<UserRole, "ADMIN">;
}
