import { HttpMethod } from "../types";

type Endpoint = {
  path: string;
  method: HttpMethod;
};

export const WHITELISTED: { [index: string]: Endpoint[] } = {
  AUTH: [
    {
      method: "post",
      path: "/auth/signup",
    },
    {
      method: "post",
      path: "/auth/login",
    },
  ],
};

export const whitelist = (endpoint: Endpoint, whitelisted: Endpoint[]) => {
  return whitelisted.some(
    (allowed) =>
      endpoint.method.toLowerCase() === allowed.method.toLowerCase() &&
      endpoint.path.toLowerCase() === allowed.path.toLowerCase()
  );
};
