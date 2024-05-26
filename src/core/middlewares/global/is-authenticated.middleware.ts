import { isJWT } from "class-validator";
import { Request, Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { HttpException, JWT, MiddlewareWhitelister } from "../../utils";
import { UsersService } from "../../../app/users/users.service";
import { HttpMethod } from "../../types";

@Middleware({ type: "before" })
export class IsAuthenticated implements ExpressMiddlewareInterface {
  whitelist(method: HttpMethod, path: string) {
    return MiddlewareWhitelister.whitelist({ method, path }, [
      {
        method: "post",
        path: "/users/signup",
      },
      {
        method: "post",
        path: "/users/login",
      },
    ]);
  }

  async use(req: Request, res: Response, next: (err?: any) => any) {
    const isWhitelisted = this.whitelist(req.method as HttpMethod, req.path);
    if (isWhitelisted) {
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
