import { HttpMethod } from "../types";

type Endpoint = {
  path: string;
  method: HttpMethod;
};

export const WHITELISTED: { [index: string]: Endpoint[] } = {
  AUTH: [
    {
      method: "post",
      path: "/users/signup",
    },
    {
      method: "post",
      path: "/users/login",
    },
  ],
};

export const whitelist = (req: Endpoint, whitelisted: Endpoint[]) => {
  return whitelisted.some(
    (endpoint) =>
      endpoint.method.toLowerCase() === req.method.toLowerCase() && endpoint.path.toLowerCase() === req.path.toLowerCase()
  );
};
