import { Get, JsonController, QueryParams, UseBefore } from "routing-controllers";
import { UsersService } from "./users.service";
import { FindUserStatsQuery } from "./dto";
import { Authorize } from "../../core/middlewares";

@JsonController("/users", { transformResponse: false })
export class UsersController {
  private service: UsersService;

  constructor() {
    this.service = new UsersService();
  }

  @Get("/stats")
  @UseBefore(Authorize(["ADMIN"]))
  async findStats(@QueryParams() query: FindUserStatsQuery) {
    return this.service.findStats(query);
  }
}
