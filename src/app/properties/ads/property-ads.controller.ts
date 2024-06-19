import { Body, Get, JsonController, OnUndefined, Params, Post, QueryParams, UseBefore } from "routing-controllers";
import { PropertyAdsService } from "./property-ads.service";
import { InsertPropertyRequestBody } from "../requests/dto";
import { User } from "../../../core/decorators";
import { LoggedUser } from "../../users";
import { Authorize } from "../../../core/middlewares";
import { IdDto } from "../../../core/dto";
import { FindRelevantRequestsQuery } from "./dto";

@JsonController("/property-ads", { transformResponse: false })
export class PropertyAdsController {
  private service: PropertyAdsService;

  constructor() {
    this.service = new PropertyAdsService();
  }

  @Post()
  @UseBefore(Authorize(new Set(["AGENT"])))
  @OnUndefined(STATUS_CODES.CREATED)
  async insertOne(@Body() body: InsertPropertyRequestBody, @User() user: LoggedUser) {
    await this.service.insertOne(body, user);
  }

  @Get("/:id/relevant-requests")
  @UseBefore(Authorize(new Set(["CLIENT"])))
  findRelevantRequests(@Params() params: IdDto, @QueryParams() query: FindRelevantRequestsQuery) {
    return this.service.findRelevantRequests(params.id, query);
  }
}
