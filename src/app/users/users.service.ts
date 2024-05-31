import { Bcrypt, HttpCookie, JWT, Mongo } from "../../core/utils";
import { LoginUserBody, SignupBaseUserDto } from "./dto";
import { FindUserStatsQuery } from "./dto/find-user-stats.dto";
import { FindUserStatsPipe } from "./pipes";
import { UserFilter, User, UserProjection } from "./users.schema";
import { Response } from "express";

export class UsersService {
  async exists(filter: UserFilter) {
    return User.exists(filter);
  }

  private assignToken(userId: string, res: Response) {
    const token = JWT.encrypt({
      payload: {
        userId,
      },
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });

    HttpCookie.set("token", token, res, process.env.TOKEN_EXPIRES_IN);
  }

  async insertOne(body: SignupBaseUserDto) {
    return User.create({ ...body, password: await Bcrypt.hash(body.password) });
  }

  async signup(body: SignupBaseUserDto, res: Response) {
    const { id } = await this.insertOne(body);
    this.assignToken(id, res);
  }

  async findOne(filter: UserFilter, project: UserProjection) {
    return User.findOne({ ...filter, status: "ACTIVE" }, project);
  }

  async login(body: LoginUserBody, res: Response) {
    const { phone, password } = body;

    const user = await this.findOne({ phone }, { password: 1 });
    if (!user) {
      res.sendStatus(STATUS_CODES.UNAUTHORIZED);
      return;
    }

    const arePasswordsMatched = await Bcrypt.compare(password, user!.password);
    if (!arePasswordsMatched) {
      res.sendStatus(STATUS_CODES.UNAUTHORIZED);
      return;
    }

    this.assignToken(user!.id, res);
  }

  logout(res: Response) {
    HttpCookie.clear("token", res);
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
