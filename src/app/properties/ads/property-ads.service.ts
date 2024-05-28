import { LoggedUser } from "../../users";
import { InsertPropertyRequestBody } from "../requests/dto";
import { PropertyAd } from "./property-ads.schema";
import { FindRelevantRequestsQuery } from "./dto";
import { Mongo } from "../../../core/utils";
import { FindRelevantRequestsPipe } from "./pipelines";

export class PropertyAdsService {
  async insertOne(body: InsertPropertyRequestBody, user: LoggedUser) {
    await PropertyAd.create({ ...body, createdById: user._id });
  }

  async findRelevantRequests(id: string, query: FindRelevantRequestsQuery) {
    const { skip, limit, project } = Mongo.formatFilter(query);

    return Mongo.aggregate({
      model: PropertyAd,
      pipelineStages: FindRelevantRequestsPipe(id, skip, limit, project),
      aggOptions: { allowDiskUse: true },
      page: query.page,
      limit,
    });
  }
}
