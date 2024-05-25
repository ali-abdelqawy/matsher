import { Body, JsonController, Post, Res } from "routing-controllers";
import { UsersService } from "./users.service";
import { InsertUserBody } from "./dto";
import { LoginUserBody } from "./dto/login-user.dto";
import { Response } from "express";

@JsonController("/users")
export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  @Post()
  insertOne(@Body() body: InsertUserBody) {
    return this.usersService.insertOne(body);
  }

  @Post("/login")
  login(@Body() body: LoginUserBody, @Res() res: Response) {
    return this.usersService.login(body, res);
  }
}
