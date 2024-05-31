import { Model } from "mongoose";
import { FilterDto } from "../dto";
import { AggregateOptions } from "mongoose";
import { Paginator } from "./paginator";

export class Mongo {
  public static formatFilter(options: FilterDto & { fields: string[] }) {
    const { fields, limit, page } = options;
    return {
      skip: (page - 1) * limit,
      limit,
      project: fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}),
    };
  }

  public static async aggregate(params: {
    model: Model<any>;
    pipelineStages: any[];
    aggOptions: AggregateOptions;
    limit: number;
    page: number;
  }) {
    const { model, pipelineStages, aggOptions, limit, page } = params;
    const [{ data, meta } = { data: [], meta: {} }] = await model.aggregate(pipelineStages, aggOptions);
    return { data, ...Paginator.getMetadata(meta.total, limit, page) };
  }
}
