import { IsDecimal, IsString, MaxLength } from "class-validator";
import { IsRequired } from "../../../../core/decorators";

export class UpdatePropertyRequestBody {
  @IsRequired(false)
  @IsDecimal()
  areaMeters: string;

  @IsRequired(false)
  @IsDecimal()
  priceSar: string;

  @IsRequired(false)
  @IsString()
  @MaxLength(2000)
  description: string;
}
