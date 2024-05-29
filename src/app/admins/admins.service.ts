import { Response } from "express";
import { SignupUserBody } from "../users/dto";
import { UsersService } from "../users/users.service";

export class AdminsService {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async signup(body: SignupUserBody, res: Response) {
    await this.usersService.signup(body, res, false);
  }
}
