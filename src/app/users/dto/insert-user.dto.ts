import { IsPhoneNumber, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator";
import { IsRequired } from "../../../core/decorators";
import { IsUniquePhone } from "./decorators";

export class InsertUserDto {
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
