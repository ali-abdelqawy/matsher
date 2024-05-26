import { Bcrypt, HttpCookie, HttpException, JWT } from "../../core/utils";
import { OK_RESPONSE } from "../../core/constants";
import { SignupUserBody, LoginUserBody } from "./dto";
import { UserFilter, User, UserProjection } from "./users.schema";
import { Response } from "express";

export class UsersService {
  async exists(filter: UserFilter) {
    return User.exists(filter);
  }

  private assignToken(userId: string, res: Response) {
    const token = JWT.encrypt({
      payload: {
        userId,
      },
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });

    HttpCookie.set("token", token, res);
  }

  async signup(body: SignupUserBody, res: Response) {
    const { id } = await User.create({ ...body, password: await Bcrypt.hash(body.password) });

    this.assignToken(id, res);

    return OK_RESPONSE;
  }

  async findOne(filter: UserFilter, project: UserProjection) {
    return User.findOne({ ...filter, status: "ACTIVE" }, project);
  }

  async login(body: LoginUserBody, res: Response) {
    const { phone, password } = body;

    const user = await this.findOne({ phone }, { password: 1 });
    if (!user) {
      throw new HttpException(401, "incorrect user name or password");
    }

    const arePasswordsMatched = await Bcrypt.compare(password, user.password);
    if (!arePasswordsMatched) {
      throw new HttpException(401, "incorrect user name or password");
    }

    this.assignToken(user.id, res);

    return OK_RESPONSE;
  }

  logout(res: Response) {
    HttpCookie.clear("token", res);
    return OK_RESPONSE;
  }
}
