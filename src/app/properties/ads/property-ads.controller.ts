import { Body, JsonController, OnUndefined, Post, UseBefore } from "routing-controllers";
import { PropertyAdsService } from "./property-requests.service";
import { InsertPropertyRequestBody } from "../requests/dto";
import { User } from "../../../core/decorators";
import { LoggedUser } from "../../users";
import { Authorize } from "../../../core/middlewares";

@JsonController("/property-ads")
@UseBefore(Authorize(new Set(["AGENT"])))
export class PropertyAdsController {
  private service: PropertyAdsService;

  constructor() {
    this.service = new PropertyAdsService();
  }

  @Post()
  @OnUndefined(STATUS_CODES.CREATED)
  insertOne(@Body() body: InsertPropertyRequestBody, @User() user: LoggedUser) {
    return this.service.insertOne(body, user);
  }
}
