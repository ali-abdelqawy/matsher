import { Bcrypt, HttpCookie, JWT } from "../../core/utils";
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

    HttpCookie.set("token", token, res, process.env.TOKEN_EXPIRES_IN);
  }

  async signup(body: SignupUserBody, res: Response) {
    const { id } = await User.create({ ...body, password: await Bcrypt.hash(body.password) });

    this.assignToken(id, res);
  }

  async findOne(filter: UserFilter, project: UserProjection) {
    return User.findOne({ ...filter, status: "ACTIVE" }, project);
  }

  async login(body: LoginUserBody, res: Response) {
    const { phone, password } = body;

    const user = await this.findOne({ phone }, { password: 1 });
    if (!user) {
      res.sendStatus(401);
    }

    const arePasswordsMatched = await Bcrypt.compare(password, user!.password);
    if (!arePasswordsMatched) {
      res.sendStatus(401);
    }

    this.assignToken(user!.id, res);
  }

  logout(res: Response) {
    HttpCookie.clear("token", res);
  }
}
