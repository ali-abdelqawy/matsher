import { ObjectId } from "mongoose";
import { Gate } from "../../../core/utils";
import { LoggedUser } from "../../users";
import { InsertPropertyRequestBody } from "./dto";
import { UpdatePropertyRequestBody } from "./dto/update-property-request.dto";
import { PropertyRequest } from "./property-requests.schema";
import { Response } from "express";

export class PropertyRequestsService {
  async insertOne(body: InsertPropertyRequestBody, user: LoggedUser) {
    await PropertyRequest.create({ ...body, createdBy: user._id });
  }

  async updateOne(id: string, body: UpdatePropertyRequestBody, userId: ObjectId, res: Response) {
    const isCreator = await Gate.isCreator(id, PropertyRequest, userId);
    if (!isCreator) {
      res.sendStatus(403);
      return;
    }

    await PropertyRequest.updateOne({ _id: id }, { $set: body });
  }
}
