import { Hash } from "../../core/hash";
import { OK_RESPONSE } from "../../shared/constants";
import { InsertUserBody } from "./dto";
import { User } from "./users.schema";

export class UsersService {
  async insertOne(body: InsertUserBody) {
    await User.create({ ...body, password: await Hash.hash(body.password) });
    return OK_RESPONSE;
  }
}
