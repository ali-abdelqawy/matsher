import { Schema, model } from "mongoose";
import { PropertyRequestSchemaDefinition } from "../requests";

const PropertyRequestAdSchema = new Schema(PropertyRequestSchemaDefinition, {
  timestamps: true,
});

export const PropertyAdSelectableFields = Object.keys(PropertyRequestSchemaDefinition);

export const PropertyAd = model("PropertyAd", PropertyRequestAdSchema);
