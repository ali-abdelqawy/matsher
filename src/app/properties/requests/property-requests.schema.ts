import { Schema, model, Types, InferRawDocType, FilterQuery } from "mongoose";
import { PROPERTY_AREA_UNITS, PROPERTY_PRICE_UNITS, PROPERTY_TYPES } from "./property-requests.consts";

const AreaSchema = new Schema(
  {
    value: { type: Types.Decimal128, required: true },
    unit: { type: String, enum: PROPERTY_AREA_UNITS, required: true },
  },
  {
    _id: false,
  }
);

const PriceSchema = new Schema(
  {
    value: { type: Types.Decimal128, required: true },
    unit: { type: String, enum: PROPERTY_PRICE_UNITS, required: true },
  },
  {
    _id: false,
  }
);

export const PropertyRequestSchemaDefinition = {
  propertyType: { type: String, enum: PROPERTY_TYPES, required: true },
  area: AreaSchema,
  price: PriceSchema,
  city: { type: String, required: true },
  district: { type: String, required: true },
  description: { type: String, required: true },
  refreshedAt: { type: Date, required: false, default: new Date() },
  createdBy: { type: Types.ObjectId, ref: "User", required: true },
};

const PropertyRequestSchema = new Schema(PropertyRequestSchemaDefinition, {
  timestamps: true,
});

PropertyRequestSchema.index({ area: 1, price: 1, district: 1 });

export const PropertyRequest = model("PropertyRequest", PropertyRequestSchema);
export type PropertyRequestFilter = FilterQuery<InferRawDocType<typeof PropertyRequestSchemaDefinition>>;
