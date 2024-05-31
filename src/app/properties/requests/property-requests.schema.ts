import { Schema, model, Types } from "mongoose";
import { PROPERTY_TYPES } from "./property-requests.consts";

export const PropertyRequestSchemaDefinition = {
  propertyType: { type: String, enum: PROPERTY_TYPES, required: true },
  areaMeters: { type: Types.Decimal128, required: true },
  priceSar: { type: Types.Decimal128, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  description: { type: String, required: true },
  refreshedAt: { type: Date, required: false, default: new Date() },
  createdById: { type: Types.ObjectId, ref: "User", required: true },
};

const PropertyRequestSchema = new Schema(PropertyRequestSchemaDefinition, {
  timestamps: true,
});

PropertyRequestSchema.index({ area: 1, price: 1, district: 1 });

export const PropertyRequest = model("PropertyRequest", PropertyRequestSchema);
