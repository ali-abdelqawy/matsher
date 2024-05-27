import { Algorithm } from "jsonwebtoken";
import { NodeEnv } from "../types";
import { LoggedUser } from "../../app/users";

declare global {
  namespace Express {
    interface Locals {
      user: LoggedUser;
    }
  }
}
