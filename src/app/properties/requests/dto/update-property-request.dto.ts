import { IsDecimal, IsIn, IsOptional, IsString, MaxLength } from "class-validator";
import { PropertyPriceUnit, PropertyAreaUnit } from "../property-requests.types";
import { PROPERTY_AREA_UNITS, PROPERTY_PRICE_UNITS } from "../property-requests.consts";
import { DECIMAL_VALIDATION_OPTIONS } from "../../../../core/constants";

export class UpdatePropertyRequestBody {
  @IsOptional()
  @IsDecimal(DECIMAL_VALIDATION_OPTIONS)
  "area.value": string;

  @IsOptional()
  @IsIn(PROPERTY_AREA_UNITS)
  "area.unit": PropertyAreaUnit;

  @IsOptional()
  @IsDecimal(DECIMAL_VALIDATION_OPTIONS)
  "price.value": string;

  @IsOptional()
  @IsIn(PROPERTY_PRICE_UNITS)
  "price.unit": PropertyPriceUnit;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description: string;
}
