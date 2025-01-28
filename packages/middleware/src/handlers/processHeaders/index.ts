import type { Request, Response, NextFunction } from "express";

export function processHeaders(req: Request, res: Response, next: NextFunction) {
  const locale = req.headers['x-alokai-locale'];
  console.log(req.cookies)
  req.cookies['vsf-locale'] = locale;

  next();
};

