import { Request, Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { HttpException } from "../../utils";

@Middleware({ type: "before", priority: 3 })
export class IsLoggedOut implements ExpressMiddlewareInterface {
  async use(req: Request, _res: Response, next: (err?: any) => any) {
    if (req.cookies?.token) {
      throw new HttpException(STATUS_CODES.UNAUTHORIZED, "you must logout first");
    }
    next();
  }
}
