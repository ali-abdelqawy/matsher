import { HttpMethod } from "../types";

type Endpoint = {
  path: string;
  method: HttpMethod;
};

export abstract class MiddlewareWhitelister {
  static whitelist(req: Endpoint, whitelisted: Endpoint[]) {
    return whitelisted.find(
      (endpoint) =>
        endpoint.method.toLowerCase() === req.method.toLowerCase() && endpoint.path.toLowerCase() === req.path.toLowerCase()
    );
  }
}
