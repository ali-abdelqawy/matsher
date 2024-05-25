import { Body, JsonController, Params, Patch, Post } from "routing-controllers";
import { PropertyRequestsService } from "./property-requests.service";
import { InsertPropertyRequestBody, UpdatePropertyRequestBody } from "./dto";
import { IdDto } from "../../../shared/dto";

@JsonController("/property-requests")
export class PropertyRequestsController {
  private propertyRequestsService: PropertyRequestsService;

  constructor() {
    this.propertyRequestsService = new PropertyRequestsService();
  }

  @Post()
  insertOne(@Body() body: InsertPropertyRequestBody) {
    return this.propertyRequestsService.insertOne(body);
  }

  @Patch("/:id")
  updateOne(@Params() params: IdDto, @Body() body: UpdatePropertyRequestBody) {
    return this.propertyRequestsService.updateOne(params.id, body);
  }
}
