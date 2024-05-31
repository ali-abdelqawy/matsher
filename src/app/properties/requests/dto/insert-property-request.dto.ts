import { IsDecimal, IsIn, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { PropertyRequestType } from "../property-requests.types";
import { PROPERTY_TYPES } from "../property-requests.consts";

export class InsertPropertyRequestBody {
  @IsNotEmpty()
  @IsIn(PROPERTY_TYPES)
  propertyType: PropertyRequestType;

  @IsNotEmpty()
  @IsDecimal()
  areaMeters: string;

  @IsNotEmpty()
  @IsDecimal()
  priceSar: string;

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
