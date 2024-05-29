import { IsIn, IsNotEmpty, MaxLength, Matches, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { USER_ROLES } from "../users.consts";
import { UserRole } from "../users.types";
import { IsUniquePhone, IsStrongPassword } from "./rules";

export class SignupUserBody {
  @IsNotEmpty()
  @Matches(/^[A-Za-z ]+$/)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @IsUniquePhone({ message: "phone must be unique" })
  phone: string;

  @IsNotEmpty()
  @IsIn(USER_ROLES.filter((role) => role !== "ADMIN"))
  role: Omit<UserRole, "ADMIN">;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  @IsStrongPassword({
    message: "password must be strong, you generate a strong one using this website: https://passwordsgenerator.net/",
  })
  password: string;
}
