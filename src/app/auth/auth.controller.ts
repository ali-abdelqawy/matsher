import { Body, JsonController, OnUndefined, Post, Res, UseBefore } from "routing-controllers";
import { AuthService } from "./auth.service";
import { LoginBody, SignupUserBody } from "./dto";
import { Response } from "express";
import { IsLoggedOut } from "../../core/middlewares";

@JsonController("/auth", { transformResponse: false })
export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  @Post("/signup")
  @UseBefore(IsLoggedOut)
  @OnUndefined(STATUS_CODES.CREATED)
  async signup(@Body() body: SignupUserBody, @Res() res: Response) {
    await this.service.signup(body, res);
  }

  @Post("/login")
  @UseBefore(IsLoggedOut)
  @OnUndefined(STATUS_CODES.OK)
  async login(@Body() body: LoginBody, @Res() res: Response) {
    await this.service.login(body, res);
  }

  @Post("/logout")
  @OnUndefined(STATUS_CODES.OK)
  logout(@Res() res: Response) {
    this.service.logout(res);
  }
}
