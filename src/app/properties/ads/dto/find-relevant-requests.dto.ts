import { IsArray, IsIn } from "class-validator";
import { PropertyAdFields } from "../property-ads.schema";
import { FilterDto } from "../../../../core/dto";
import { IsRequired } from "../../../../core/decorators";

export class FindRelevantRequestsQuery extends FilterDto {
  @IsRequired(true)
  @IsArray()
  @IsIn(PropertyAdFields, { each: true })
  fields: string[];
}
