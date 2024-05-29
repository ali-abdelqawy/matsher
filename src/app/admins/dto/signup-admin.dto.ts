import { Equals, IsNotEmpty } from "class-validator";
import { SignupBaseUserDto } from "../../users/dto";

export class SignupAdminBody extends SignupBaseUserDto {
  @IsNotEmpty()
  @Equals("ADMIN")
  role: "ADMIN";
}
