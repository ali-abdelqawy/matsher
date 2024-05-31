import { IsNumber, Min } from "class-validator";
import { IsRequired } from "../decorators";

export class FilterDto {
  @IsRequired(true)
  @IsNumber()
  @Min(0)
  page: number;

  @IsRequired(true)
  @IsNumber()
  @Min(0)
  limit: number;
}
