import { Bcrypt, HttpCookie, JWT } from "../../core/utils";
import { Response } from "express";
import { LoginBody, SignupUserBody } from "./dto";
import { UsersService } from "../users";

export class AuthService {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
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
    const { id } = await this.usersService.insertOne(body);
    this.assignToken(id, res);
  }

  async login(body: LoginBody, res: Response) {
    const { phone, password } = body;

    const user = await this.usersService.findOne({ phone }, { password: 1 });
    if (!user) {
      res.sendStatus(STATUS_CODES.UNAUTHORIZED);
      return;
    }

    const arePasswordsMatched = await Bcrypt.compare(password, user!.password);
    if (!arePasswordsMatched) {
      res.sendStatus(STATUS_CODES.UNAUTHORIZED);
      return;
    }

    this.assignToken(user!.id, res);
  }

  logout(res: Response) {
    HttpCookie.clear("token", res);
  }
}
