import { IsDecimal, IsIn, IsNotEmpty, IsString, MaxLength, ValidateNested } from "class-validator";
import { PropertyPriceUnit, PropertyAreaUnit, PropertyRequestType } from "../property-requests.types";
import { PROPERTY_AREA_UNITS, PROPERTY_PRICE_UNITS, PROPERTY_TYPES } from "../property-requests.consts";
import { Type } from "class-transformer";
import { DECIMAL_VALIDATION_OPTIONS } from "../../../../core/constants";

class AreaDto {
  @IsNotEmpty()
  @IsDecimal(DECIMAL_VALIDATION_OPTIONS)
  value: string;

  @IsNotEmpty()
  @IsIn(PROPERTY_AREA_UNITS)
  unit: PropertyAreaUnit;
}

class PriceDto {
  @IsNotEmpty()
  @IsDecimal(DECIMAL_VALIDATION_OPTIONS)
  value: string;

  @IsNotEmpty()
  @IsIn(PROPERTY_PRICE_UNITS)
  unit: PropertyPriceUnit;
}

export class InsertPropertyRequestBody {
  @IsNotEmpty()
  @IsIn(PROPERTY_TYPES)
  propertyType: PropertyRequestType;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AreaDto)
  area: AreaDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  district: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  description: string;
}
