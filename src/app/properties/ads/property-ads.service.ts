import { Types } from "mongoose";
import { LoggedUser } from "../../users";
import { InsertPropertyRequestBody } from "../requests/dto";
import { PropertyAd } from "./property-ads.schema";
import { FindRelevantRequestsQuery } from "./dto";
import { Mongo, Paginator } from "../../../core/utils";

export class PropertyAdsService {
  async insertOne(body: InsertPropertyRequestBody, user: LoggedUser) {
    await PropertyAd.create({ ...body, createdBy: user._id });
  }
}
