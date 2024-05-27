import { Body, JsonController, OnUndefined, Params, Patch, Post } from "routing-controllers";
import { PropertyRequestsService } from "./property-requests.service";
import { InsertPropertyRequestBody, UpdatePropertyRequestBody } from "./dto";
import { IdDto } from "../../../core/dto";

@JsonController("/property-requests")
export class PropertyRequestsController {
  private service: PropertyRequestsService;

  constructor() {
    this.service = new PropertyRequestsService();
  }

  @Post()
  @OnUndefined(STATUS_CODES.CREATED)
  insertOne(@Body() body: InsertPropertyRequestBody) {
    return this.service.insertOne(body);
  }

  @Patch("/:id")
  @OnUndefined(STATUS_CODES.OK)
  updateOne(@Params() params: IdDto, @Body() body: UpdatePropertyRequestBody) {
    return this.service.updateOne(params.id, body);
  }
}
