import { Body, JsonController, Post } from "routing-controllers";
import { UsersService } from "./users.service";
import { InsertUserBody } from "./dto";

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
}
