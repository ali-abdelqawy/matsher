import { Equals } from "class-validator";
import { SignupDto } from "../../users/dto";
import { IsRequired } from "../../../core/decorators";

export class SignupAdminBody extends SignupDto {
  @IsRequired(true)
  @Equals("ADMIN")
  role: "ADMIN";
}
