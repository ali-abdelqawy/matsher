import { IsDecimal, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdatePropertyRequestBody {
  @IsOptional()
  @IsDecimal()
  areaMeters: string;

  @IsOptional()
  @IsDecimal()
  priceSar: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description: string;
}
