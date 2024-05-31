import { Equals } from "class-validator";
import { SignupBaseUserDto } from "../../users/dto";
import { IsRequired } from "../../../core/decorators";

export class SignupAdminBody extends SignupBaseUserDto {
  @IsRequired(true)
  @Equals("ADMIN")
  role: "ADMIN";
}
