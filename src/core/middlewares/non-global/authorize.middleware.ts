import { Request, Response } from "express";
import { UserRole } from "../../../app/users";

export const Authorize = (roles: Set<UserRole>) => async (_req: Request, res: Response, next: () => void) => {
  if (!roles.has(res.locals.user.role)) {
    res.sendStatus(403);
    return;
  }
  next();
};
