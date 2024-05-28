import { IsArray, IsIn, IsNotEmpty } from "class-validator";
import { PropertyAdSelectableFields } from "../property-ads.schema";
import { FilterDto } from "../../../../core/dto";

export class FindRelevantRequestsQuery extends FilterDto {
  @IsNotEmpty()
  @IsArray()
  @IsIn(PropertyAdSelectableFields, { each: true })
  fields: string[];
}
