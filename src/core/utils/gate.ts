import { Model, ObjectId } from "mongoose";

export abstract class Gate {
  static async isCreator(entityId: string, model: Model<any>, userId: ObjectId) {
    return model.exists({ _id: entityId, createdById: userId });
  }
}
