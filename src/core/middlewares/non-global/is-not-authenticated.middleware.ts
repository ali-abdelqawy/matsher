import { Request, Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { HttpException } from "../../utils";

@Middleware({ type: "before" })
export class IsNotAuthenticated implements ExpressMiddlewareInterface {
  async use(req: Request, _res: Response, next: (err?: any) => any) {
    if (req.cookies?.token) {
      throw new HttpException(401, "you must logout first");
    }
    next();
  }
}
