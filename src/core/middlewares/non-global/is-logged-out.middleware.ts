import { Request, Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";

@Middleware({ type: "before", priority: 3 })
export class IsLoggedOut implements ExpressMiddlewareInterface {
  async use(req: Request, res: Response, next: (err?: any) => any) {
    if (req.cookies?.token) {
      res.sendStatus(STATUS_CODES.UNAUTHORIZED);
      return;
    }
    next();
  }
}
