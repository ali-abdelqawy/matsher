import { isJWT } from "class-validator";
import { Request, Response } from "express";
import { HttpException, JWT, Obj } from "../../utils";
import { UsersService } from "../../../app/users/users.service";
import { WHITELISTED, whitelist } from "../whitelist";
import { Middleware } from "routing-controllers";

@Middleware({ type: "before" })
export class Authenticate {
  async use(req: Request, res: Response, next: (err?: any) => any) {
    if (whitelist(Obj.pick(req, ["method", "path"]), WHITELISTED.AUTH)) {
      return next();
    }

    const { token } = req.cookies;
    if (!token || !isJWT(token)) {
      throw new HttpException(401, "authentication failed");
    }

    try {
      JWT.verify({ encrypted: token, ignoreExpiration: false });
    } catch (error) {
      throw new HttpException(401, "authentication failed");
    }

    const { userId } = JWT.decrypt(token);
    const user = await new UsersService().findOne({ _id: userId }, { name: 1, phone: 1, role: 1 });
    if (!user) {
      throw new HttpException(401, "authentication failed");
    }

    res.locals.user = user.toJSON();

    next();
  }
}
