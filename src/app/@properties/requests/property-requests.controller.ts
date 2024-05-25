import { Body, JsonController, Post } from "routing-controllers";
import { PropertyRequestsService } from "./property-requests.service";
import { InsertPropertyRequestBody } from "./dto";

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
}
