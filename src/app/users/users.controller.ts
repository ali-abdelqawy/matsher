import { Body, JsonController, Post, Res, UseBefore } from "routing-controllers";
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

  @UseBefore(IsNotAuthenticated)
  @Post("/signup")
  signup(@Body() body: SignupUserBody, @Res() res: Response) {
    return this.usersService.signup(body, res);
  }

  @UseBefore(IsNotAuthenticated)
  @Post("/login")
  login(@Body() body: LoginUserBody, @Res() res: Response) {
    return this.usersService.login(body, res);
  }

  @Post("/logout")
  logout(@Res() res: Response) {
    return this.usersService.logout(res);
  }
}
