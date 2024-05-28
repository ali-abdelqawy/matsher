import { NODE_ENVS } from "./constants";

export type NodeEnv = (typeof NODE_ENVS)[number];

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export type FormattedFilter = {
  limit: number;
  skip: number;
  project: any;
};
