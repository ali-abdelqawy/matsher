import { Schema, model } from "mongoose";
import { PropertyRequestSchemaDefinition } from "../requests";
import { Mongo } from "../../../core/utils";

const PropertyRequestAdSchema = new Schema(PropertyRequestSchemaDefinition, {
  timestamps: true,
});

export const PropertyAd = model("PropertyAd", PropertyRequestAdSchema);
export const PropertyAdFields = Mongo.getModelFields(PropertyAd);
