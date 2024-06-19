import { Body, JsonController, OnUndefined, Post, UseBefore } from "routing-controllers";
import { AdminsService } from "./admins.service";
import { Authorize } from "../../core/middlewares";
import { SignupAdminBody } from "./dto";

@JsonController("/admins", { transformResponse: false })
export class AdminsController {
  private service: AdminsService;

  constructor() {
    this.service = new AdminsService();
  }

  @Post()
  @UseBefore(Authorize(["ADMIN"]))
  @OnUndefined(STATUS_CODES.CREATED)
  async insertOne(@Body() body: SignupAdminBody) {
    await this.service.insertOne(body);
  }
}
