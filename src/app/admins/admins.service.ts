import { UsersService } from "../users/users.service";
import { SignupAdminBody } from "./dto";

export class AdminsService {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async insertOne(body: SignupAdminBody) {
    await this.usersService.insertOne(body);
  }
}
