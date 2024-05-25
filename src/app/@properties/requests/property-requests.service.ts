import { InsertPropertyRequestBody } from "./dto";
import { PropertyRequest } from "./property-request.schema";

export class PropertyRequestsService {
  async insertOne(body: InsertPropertyRequestBody) {
    await PropertyRequest.create(body);
    return { ok: true };
  }
}
