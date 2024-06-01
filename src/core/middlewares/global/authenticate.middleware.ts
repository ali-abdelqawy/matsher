import { isJWT } from "class-validator";
import { Request, Response } from "express";
import { JWT, Obj } from "../../utils";
import { UsersService } from "../../../app/users";
import { WHITELISTED, whitelist } from "../whitelist";
import { Middleware } from "routing-controllers";

@Middleware({ type: "before", priority: 2 })
export class Authenticate {
  async use(req: Request, res: Response, next: (err?: any) => any) {
    if (whitelist(Obj.pick(req, ["method", "path"]), WHITELISTED.AUTH)) {
      return next();
    }

    const { token } = req.cookies;
    if (!token || !isJWT(token)) {
      res.sendStatus(STATUS_CODES.UNAUTHORIZED);
      return;
    }

    try {
      JWT.verify({ encrypted: token, ignoreExpiration: false });
    } catch (error) {
      res.sendStatus(STATUS_CODES.UNAUTHORIZED);
      return;
    }

    const { userId } = JWT.decrypt(token);
    const user = await new UsersService().findOne({ _id: userId }, { name: 1, phone: 1, role: 1 });
    if (!user) {
      res.sendStatus(STATUS_CODES.UNAUTHORIZED);
      return;
    }

    res.locals.user = user!.toJSON();

    next();
  }
}
