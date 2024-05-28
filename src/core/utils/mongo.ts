import mongoose, { Model, Mongoose } from "mongoose";
import { FilterDto } from "../dto";
import { AggregateOptions } from "mongoose";
import { Paginator } from "./paginator";

export class Mongo {
  private static instance: Mongo;
  private db: Mongoose;

  private constructor() {
    this.db = mongoose;
  }

  public static get(): Mongo {
    if (!Mongo.instance) {
      Mongo.instance = new Mongo();
    }

    return Mongo.instance;
  }

  public async connect() {
    await this.db.connect(process.env.DB_HOST);
    console.log("mongo db is up and running!");
  }

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
