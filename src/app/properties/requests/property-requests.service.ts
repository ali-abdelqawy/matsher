import { LoggedUser } from "../../users";
import { InsertPropertyRequestBody, UpdatePropertyRequestBody } from "./dto";
import { PropertyRequest } from "./property-requests.schema";

export class PropertyRequestsService {
  async insertOne(body: InsertPropertyRequestBody, user: LoggedUser) {
    await PropertyRequest.create({ ...body, createdById: user._id });
  }

  async updateOne(id: string, body: UpdatePropertyRequestBody) {
    await PropertyRequest.updateOne({ _id: id }, { $set: body });
  }

  async refreshMany() {
    await PropertyRequest.updateMany({}, { $set: { refreshedAt: new Date() } });
  }
}
