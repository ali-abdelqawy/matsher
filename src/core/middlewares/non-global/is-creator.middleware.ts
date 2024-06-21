import { Request, Response } from "express";
import { Model } from "mongoose";
import { Gate } from "../../utils";

export const IsCreator = (model: Model<any>) => async (req: Request, res: Response, next: () => void) => {
  const isCreator = await Gate.isCreator(req.params.id, model, res.locals.user._id);
  if (!isCreator) {
    res.sendStatus(STATUS_CODES.UNAUTHORIZED);
    return;
  }
  next();
};
