import { Get, JsonController, QueryParams, UseBefore } from "routing-controllers";
import { UsersService } from "./users.service";
import { FindUserStatsQuery } from "./dto";
import { Authorize } from "../../core/middlewares";
import { OpenAPI } from "routing-controllers-openapi";

@JsonController("/users", { transformResponse: false })
export class UsersController {
  private service: UsersService;

  constructor() {
    this.service = new UsersService();
  }

  @Get("/stats")
  @OpenAPI({
    summary: "User Statistics",
    description:
      "This endpoint allows admins to know about how many ads/requests exist for a client/agent and the total amount/count of them",
    responses: {
      "400": {
        description: "Invalid input",
      },
      "401": {
        description: "User is not authenticated",
      },
      "403": {
        description: "The authenticated user is not an admin",
      },
      "200": {
        description: "Successful response",
      },
    },
  })
  @UseBefore(Authorize(["ADMIN"]))
  async findStats(@QueryParams() query: FindUserStatsQuery) {
    return this.service.findStats(query);
  }
}
