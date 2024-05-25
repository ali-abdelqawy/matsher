import { IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { IsStrongPassword } from "./rules";

export class LoginUserBody {
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  @IsStrongPassword({
    message: "password must be strong",
  })
  password: string;
}
