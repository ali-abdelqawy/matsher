import { IsArray, IsIn, IsNotEmpty } from "class-validator";
import { PropertyAdFields } from "../property-ads.schema";
import { FilterDto } from "../../../../core/dto";

export class FindRelevantRequestsQuery extends FilterDto {
  @IsNotEmpty()
  @IsArray()
  @IsIn(PropertyAdFields, { each: true })
  fields: string[];
}
