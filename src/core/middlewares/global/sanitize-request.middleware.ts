import { isString } from "class-validator";
import { Request, Response } from "express";
import { Middleware } from "routing-controllers";
import { HttpException } from "../../utils";
import { MAX_PAYLOAD_KEYS_LIMIT } from "../../constants";

@Middleware({ type: "before", priority: 1 })
export class SanitizeRequest {
  private satisfiesKeysLimit(obj: any) {
    return Object.keys(obj).length < MAX_PAYLOAD_KEYS_LIMIT;
  }

  private sanitize(obj: any) {
    return Object.keys(obj)
      .filter((key) => obj[key] != null && obj[key] != "")
      .reduce(
        (whitelisted, key) => ({
          ...whitelisted,
          [key]: isString(obj[key]) ? (obj[key] as string).trim() : obj[key],
        }),
        {}
      );
  }

  private scan(name: "body" | "query", req: Request) {
    if (!req[name]) {
      return;
    }
    if (!this.satisfiesKeysLimit(req[name])) {
      throw new HttpException(400, `${name} should not have more than ${MAX_PAYLOAD_KEYS_LIMIT} key`);
    }
    req[name] = this.sanitize(req[name]);
  }

  async use(req: Request, _res: Response, next: (err?: any) => any) {
    this.scan("query", req);
    this.scan("body", req);
    next();
  }
}
