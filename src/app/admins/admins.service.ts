import { SignupUserBody } from "../users/dto";
import { UsersService } from "../users/users.service";

export class AdminsService {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async insertOne(body: SignupUserBody) {
    await this.usersService.insertOne(body);
  }
}
