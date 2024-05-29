import { Body, JsonController, OnUndefined, Post, Res, UseBefore } from "routing-controllers";
import { AdminsService } from "./admins.service";
import { Response } from "express";
import { Authorize } from "../../core/middlewares";
import { SignupAdminBody } from "./dto";

@JsonController("/admins", { transformResponse: false })
export class AdminsController {
  private service: AdminsService;

  constructor() {
    this.service = new AdminsService();
  }

  @Post("/signup")
  @UseBefore(Authorize(new Set(["ADMIN"])))
  @OnUndefined(STATUS_CODES.CREATED)
  async signup(@Body() body: SignupAdminBody, @Res() res: Response) {
    await this.service.signup(body, res);
  }
}
