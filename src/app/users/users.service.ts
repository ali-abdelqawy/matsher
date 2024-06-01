import { Bcrypt, Mongo } from "../../core/utils";
import { InsertUserDto } from "./dto";
import { FindUserStatsQuery } from "./dto/find-user-stats.dto";
import { FindUserStatsPipe } from "./pipes";
import { UserFilter, User, UserProjection } from "./users.schema";

export class UsersService {
  async exists(filter: UserFilter) {
    return User.exists(filter);
  }

  async insertOne(body: InsertUserDto) {
    return User.create({ ...body, password: await Bcrypt.hash(body.password) });
  }

  async findOne(filter: UserFilter, project: UserProjection) {
    return User.findOne({ ...filter, status: "ACTIVE" }, project);
  }

  async findStats(query: FindUserStatsQuery) {
    const { skip, limit, project } = Mongo.formatFilter(query);
    return Mongo.aggregate({
      model: User,
      pipelineStages: FindUserStatsPipe(skip, limit, project),
      page: query.page,
      limit,
    });
  }
}
