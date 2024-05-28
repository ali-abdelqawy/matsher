import { Algorithm } from "jsonwebtoken";
import { FormattedFilter, NodeEnv } from "../types";
import { LoggedUser } from "../../app/users";

declare global {
  namespace Express {
    interface Locals {
      user: LoggedUser;
      filter: FormattedFilter;
    }
  }
}
