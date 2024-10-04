import type { Response, NextFunction } from "express";
import { RequestWithAlokai } from "../../types";

export async function prepareMetadataManager(
  req: RequestWithAlokai,
  res: Response,
  next: NextFunction
) {
  if (!res.locals.alokai) {
    res.locals.alokai = {};
  }
  res.locals.alokai.metadata = {
    context: "middleware",
  };

  next();
}
