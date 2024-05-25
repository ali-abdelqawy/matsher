import { Bcrypt } from "../../core/utils";
import { OK_RESPONSE } from "../../core/constants";
import { InsertUserBody } from "./dto";
import { User } from "./users.schema";

export class UsersService {
  async insertOne(body: InsertUserBody) {
    await User.create({ ...body, password: await Bcrypt.hash(body.password) });
    return OK_RESPONSE;
  }
}
