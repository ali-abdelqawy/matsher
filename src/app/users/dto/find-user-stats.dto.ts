import { IsArray, IsIn } from "class-validator";
import { FilterDto } from "../../../core/dto";
import { UserFields } from "../users.schema";
import { IsRequired } from "../../../core/decorators";

export class FindUserStatsQuery extends FilterDto {
  @IsRequired(true)
  @IsArray()
  @IsIn([...UserFields, "adsCount", "totalAdsAmount", "requestsCount", "totalRequestsAmount"], { each: true })
  fields: string[];
}
