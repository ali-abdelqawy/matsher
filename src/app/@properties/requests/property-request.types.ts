import { PROPERTY_AREA_UNITS, PROPERTY_PRICE_UNITS, PROPERTY_TYPES } from "./property-request.consts";

export type PropertyRequestType = (typeof PROPERTY_TYPES)[number];
export type PropertyAreaUnit = (typeof PROPERTY_AREA_UNITS)[number];
export type PropertyPriceUnit = (typeof PROPERTY_PRICE_UNITS)[number];
