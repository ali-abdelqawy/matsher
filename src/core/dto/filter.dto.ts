import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class FilterDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  limit: number;
}
