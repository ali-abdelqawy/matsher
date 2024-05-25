import { Body, JsonController, Post } from "routing-controllers";
import { UsersService } from "./users.service";
import { InsertUserBody } from "./dto";
import { LoginUserBody } from "./dto/login-user.dto";

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
  login(@Body() body: LoginUserBody) {
    return this.usersService.login(body);
  }
}
