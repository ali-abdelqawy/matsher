import mongoose, { Mongoose } from "mongoose";
import { FilterDto } from "../dto";

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
}
