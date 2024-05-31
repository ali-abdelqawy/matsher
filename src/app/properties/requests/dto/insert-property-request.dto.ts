import { IsDecimal, IsIn, IsString, MaxLength } from "class-validator";
import { PropertyRequestType } from "../property-requests.types";
import { PROPERTY_TYPES } from "../property-requests.consts";
import { IsRequired } from "../../../../core/decorators";

export class InsertPropertyRequestBody {
  @IsRequired(true)
  @IsIn(PROPERTY_TYPES)
  propertyType: PropertyRequestType;

  @IsRequired(true)
  @IsDecimal()
  areaMeters: string;

  @IsRequired(true)
  @IsDecimal()
  priceSar: string;

  @IsRequired(true)
  @IsString()
  @MaxLength(100)
  city: string;

  @IsRequired(true)
  @IsString()
  @MaxLength(100)
  district: string;

  @IsRequired(true)
  @IsString()
  @MaxLength(2000)
  description: string;
}
