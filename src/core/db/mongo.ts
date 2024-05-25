import mongoose, { Mongoose } from "mongoose";

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
}
