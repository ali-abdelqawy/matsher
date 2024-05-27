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

const PropertyRequestSchemaDefinition = {
  propertyType: { type: String, enum: PROPERTY_TYPES, required: true },
  area: AreaSchema,
  price: PriceSchema,
  city: { type: String, required: true },
  district: { type: String, required: true },
  description: { type: String, required: true },
  refreshedAt: { type: Date, required: false },
  createdBy: { type: Types.ObjectId, ref: "User", required: true },
};

export const PropertyRequestSchema = new Schema(PropertyRequestSchemaDefinition, {
  timestamps: true,
});

export const PropertyRequest = model("PropertyRequest", PropertyRequestSchema);
export type PropertyRequestFilter = FilterQuery<InferRawDocType<typeof PropertyRequestSchemaDefinition>>;
