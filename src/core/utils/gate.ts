import { Model, ObjectId } from "mongoose";

export abstract class Gate {
  static isCreator(entityId: string, model: typeof Model, userId: ObjectId) {
    return model.exists({ _id: entityId, createdBy: userId });
  }
}
