import { Request, Response } from "express";
import { UserRole } from "../../../app/users";

export const Authorize = (roles: UserRole[]) => async (_req: Request, res: Response, next: () => void) => {
  if (!roles.includes(res.locals.user.role)) {
    res.sendStatus(STATUS_CODES.FORBIDDEN);
    return;
  }
  next();
};
