import type { Request, Response } from "express";

export async function callApiFunction(req: Request, res: Response) {
  const { apiFunction, args, errorHandler } = res.locals;

  try {
    const platformResponse = await apiFunction(...args);
    res.send(platformResponse);
  } catch (error) {
    errorHandler(error, req, res);
  }
}
