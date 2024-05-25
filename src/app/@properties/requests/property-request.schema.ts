import { Schema, model, Types } from "mongoose";
import { PROPERTY_AREA_UNITS, PROPERTY_PRICE_UNITS, PROPERTY_TYPES } from "./property-request.consts";

export const AreaSchema = new Schema(
  {
    value: { type: Types.Decimal128, required: true },
    unit: { type: String, enum: PROPERTY_AREA_UNITS, required: true },
  },
  {
    _id: false,
  }
);

export const PriceSchema = new Schema(
  {
    value: { type: Types.Decimal128, required: true },
    unit: { type: String, enum: PROPERTY_PRICE_UNITS, required: true },
  },
  {
    _id: false,
  }
);

const PropertyRequestSchema = new Schema(
  {
    propertyType: { type: String, enum: PROPERTY_TYPES, required: true },
    area: AreaSchema,
    price: PriceSchema,
    city: { type: String, required: true },
    district: { type: String, required: true },
    description: { type: String, required: true },
    refreshedAt: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

export const PropertyRequest = model("PropertyRequest", PropertyRequestSchema);
