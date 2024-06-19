import mongoose, { Mongoose } from "mongoose";

export class Db {
  private static instance: Db;
  private client: Mongoose;

  private constructor() {
    this.client = mongoose;
  }

  public static get(): Db {
    if (!this.instance) {
      this.instance = new Db();
    }
    return this.instance;
  }

  public async connect() {
    await this.client.connect(process.env.DB_HOST);
    console.log("db is up and running!");
  }
}
