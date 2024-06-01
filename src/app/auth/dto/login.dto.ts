import { IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { IsStrongPassword } from "../../users/dto/decorators";
import { IsRequired } from "../../../core/decorators";

export class LoginBody {
  @IsRequired(true)
  @IsPhoneNumber()
  phone: string;

  @IsRequired(true)
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  @IsStrongPassword()
  password: string;
}
