import { Body, JsonController, OnUndefined, Post, Res, UseBefore } from "routing-controllers";
import { UsersService } from "./users.service";
import { LoginUserBody, SignupUserBody } from "./dto";
import { Response } from "express";
import { IsNotAuthenticated } from "../../core/middlewares";

@JsonController("/users", { transformResponse: false })
export class UsersController {
  private service: UsersService;

  constructor() {
    this.service = new UsersService();
  }

  @Post("/signup")
  @UseBefore(IsNotAuthenticated)
  @OnUndefined(STATUS_CODES.CREATED)
  async signup(@Body() body: SignupUserBody, @Res() res: Response) {
    await this.service.signup(body, res, true);
  }

  @Post("/login")
  @UseBefore(IsNotAuthenticated)
  @OnUndefined(STATUS_CODES.OK)
  async login(@Body() body: LoginUserBody, @Res() res: Response) {
    await this.service.login(body, res);
  }

  @Post("/logout")
  @OnUndefined(STATUS_CODES.OK)
  logout(@Res() res: Response) {
    this.service.logout(res);
  }
}
