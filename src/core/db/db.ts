import mongoose, { Mongoose } from "mongoose";

export class Db {
  private static instance: Db;
  private client: Mongoose;

  private constructor() {
    this.client = mongoose;
  }

  public static get(): Db {
    if (!Db.instance) {
      Db.instance = new Db();
    }

    return Db.instance;
  }

  public async connect() {
    await this.client.connect(process.env.DB_HOST);
    console.log("db is up and running!");
  }
}
