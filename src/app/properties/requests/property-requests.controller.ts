import { Body, JsonController, OnUndefined, Params, Patch, Post, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { PropertyRequestsService } from "./property-requests.service";
import { InsertPropertyRequestBody, UpdatePropertyRequestBody } from "./dto";
import { IdDto } from "../../../core/dto";
import { User } from "../../../core/decorators";
import { LoggedUser } from "../../users";
import { Authorize, IsCreator } from "../../../core/middlewares";
import { PropertyRequest } from "./property-requests.schema";

@JsonController("/property-requests", { transformResponse: false })
@UseBefore(Authorize(["CLIENT"]))
export class PropertyRequestsController {
  private service: PropertyRequestsService;

  constructor() {
    this.service = new PropertyRequestsService();
  }

  @Post()
  @OpenAPI({
    summary: "Create a new property request",
    description: "This endpoint allows clients to add a new property request to express what he/she is looking for",
    responses: {
      "400": {
        description: "Invalid input",
      },
      "401": {
        description: "User is not authenticated",
      },
      "403": {
        description: "The authenticated user is not a client",
      },
      "201": {
        description: "Created successfully",
      },
    },
  })
  @OnUndefined(STATUS_CODES.CREATED)
  async insertOne(@Body() body: InsertPropertyRequestBody, @User() user: LoggedUser) {
    await this.service.insertOne(body, user);
  }

  @Patch("/:id")
  @UseBefore(IsCreator(PropertyRequest))
  @OnUndefined(STATUS_CODES.OK)
  async updateOne(@Params() params: IdDto, @Body() body: UpdatePropertyRequestBody) {
    await this.service.updateOne(params.id, body);
  }
}
