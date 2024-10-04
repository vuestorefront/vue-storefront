import type { Response, Request, NextFunction } from "express";

export async function prepareMetadataStorage(
  req: Request,
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
