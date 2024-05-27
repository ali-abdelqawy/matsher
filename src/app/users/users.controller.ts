import { Body, JsonController, OnUndefined, Post, Res, UseBefore } from "routing-controllers";
import { UsersService } from "./users.service";
import { SignupUserBody, LoginUserBody } from "./dto";
import { Response } from "express";
import { IsNotAuthenticated } from "../../core/middlewares";

@JsonController("/users")
export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  @Post("/signup")
  @UseBefore(IsNotAuthenticated)
  @OnUndefined(STATUS_CODES.CREATED)
  async signup(@Body() body: SignupUserBody, @Res() res: Response) {
    await this.usersService.signup(body, res);
  }

  @Post("/login")
  @UseBefore(IsNotAuthenticated)
  @OnUndefined(STATUS_CODES.OK)
  async login(@Body() body: LoginUserBody, @Res() res: Response) {
    await this.usersService.login(body, res);
  }

  @Post("/logout")
  @OnUndefined(STATUS_CODES.OK)
  logout(@Res() res: Response) {
    this.usersService.logout(res);
  }
}
