import { Body, Get, JsonController, OnUndefined, Post, QueryParams, Res, UseBefore } from "routing-controllers";
import { UsersService } from "./users.service";
import { FindUserStatsQuery, LoginUserBody, SignupUserBody } from "./dto";
import { Response } from "express";
import { IsLoggedOut } from "../../core/middlewares";

@JsonController("/users", { transformResponse: false })
export class UsersController {
  private service: UsersService;

  constructor() {
    this.service = new UsersService();
  }

  @Post("/signup")
  @UseBefore(IsLoggedOut)
  @OnUndefined(STATUS_CODES.CREATED)
  async signup(@Body() body: SignupUserBody, @Res() res: Response) {
    await this.service.signup(body, res);
  }

  @Post("/login")
  @UseBefore(IsLoggedOut)
  @OnUndefined(STATUS_CODES.OK)
  async login(@Body() body: LoginUserBody, @Res() res: Response) {
    await this.service.login(body, res);
  }

  @Post("/logout")
  @OnUndefined(STATUS_CODES.OK)
  logout(@Res() res: Response) {
    this.service.logout(res);
  }

  @Get("/stats")
  async findStats(@QueryParams() query: FindUserStatsQuery) {
    return this.service.findStats(query);
  }
}
