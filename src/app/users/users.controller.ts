import { Body, JsonController, Post, Res } from "routing-controllers";
import { UsersService } from "./users.service";
import { SignupUserBody, LoginUserBody } from "./dto";
import { Response } from "express";

@JsonController("/users")
export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  @Post()
  signup(@Body() body: SignupUserBody) {
    return this.usersService.signup(body);
  }

  @Post("/login")
  login(@Body() body: LoginUserBody, @Res() res: Response) {
    return this.usersService.login(body, res);
  }
}
