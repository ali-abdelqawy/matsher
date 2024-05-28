import { Response } from "express";
import { Body, JsonController, OnUndefined, Params, Patch, Post, Res, UseBefore } from "routing-controllers";
import { PropertyRequestsService } from "./property-requests.service";
import { InsertPropertyRequestBody, UpdatePropertyRequestBody } from "./dto";
import { IdDto } from "../../../core/dto";
import { User } from "../../../core/decorators";
import { LoggedUser } from "../../users";
import { Authorize } from "../../../core/middlewares";

@JsonController("/property-requests", { transformResponse: false })
@UseBefore(Authorize(new Set(["CLIENT"])))
export class PropertyRequestsController {
  private service: PropertyRequestsService;

  constructor() {
    this.service = new PropertyRequestsService();
  }

  @Post()
  @OnUndefined(STATUS_CODES.CREATED)
  insertOne(@Body() body: InsertPropertyRequestBody, @User() user: LoggedUser) {
    return this.service.insertOne(body, user);
  }

  @Patch("/:id")
  @OnUndefined(STATUS_CODES.OK)
  updateOne(
    @Params() params: IdDto,
    @Body() body: UpdatePropertyRequestBody,
    @User() user: LoggedUser,
    @Res() res: Response
  ) {
    return this.service.updateOne(params.id, body, user._id, res);
  }
}
