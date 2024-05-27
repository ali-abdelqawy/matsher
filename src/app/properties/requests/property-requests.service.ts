import { InsertPropertyRequestBody } from "./dto";
import { UpdatePropertyRequestBody } from "./dto/update-property-request.dto";
import { PropertyRequest } from "./property-requests.schema";

export class PropertyRequestsService {
  async insertOne(body: InsertPropertyRequestBody) {
    await PropertyRequest.create(body);
  }

  async updateOne(id: string, body: UpdatePropertyRequestBody) {
    await PropertyRequest.updateOne({ _id: id }, { $set: body });
  }
}
