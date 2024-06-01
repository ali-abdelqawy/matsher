import { Equals } from "class-validator";
import { InsertUserDto } from "../../users/dto";
import { IsRequired } from "../../../core/decorators";

export class SignupAdminBody extends InsertUserDto {
  @IsRequired(true)
  @Equals("ADMIN")
  role: "ADMIN";
}
