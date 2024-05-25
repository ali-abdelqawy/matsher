import { Bcrypt, HttpException } from "../../core/utils";
import { OK_RESPONSE } from "../../core/constants";
import { InsertUserBody } from "./dto";
import { UserFilter, User } from "./users.schema";
import { LoginUserBody } from "./dto/login-user.dto";

export class UsersService {
  async insertOne(body: InsertUserBody) {
    await User.create({ ...body, password: await Bcrypt.hash(body.password) });
    return OK_RESPONSE;
  }

  async exists(filter: UserFilter) {
    return User.exists(filter);
  }

  async login(body: LoginUserBody) {
    const { phone, password } = body;

    const user = await User.findOne({ status: "ACTIVE", phone }, { password: 1 });
    if (!user) {
      throw new HttpException(401, "incorrect user name or password");
    }

    const arePasswordsMatched = await Bcrypt.compare(password, user.password);
    if (!arePasswordsMatched) {
      throw new HttpException(401, "incorrect user name or password");
    }

    return OK_RESPONSE;
  }
}
