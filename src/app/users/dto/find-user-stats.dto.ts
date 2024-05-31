import { IsArray, IsIn, IsNotEmpty } from "class-validator";
import { FilterDto } from "../../../core/dto";
import { UserFields } from "../users.schema";

export class FindUserStatsQuery extends FilterDto {
  @IsNotEmpty()
  @IsArray()
  @IsIn([...UserFields, "adsCount", "totalAdsAmount", "requestsCount", "totalRequestsAmount"], { each: true })
  fields: string[];
}
