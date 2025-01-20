import type { Request, NextFunction } from "express";
import type { AlokaiResponse } from "../../types";

export function prepareArguments(
  req: Request,
  res: AlokaiResponse,
  next: NextFunction
) {
  const { method, query, body } = req;
  let args: unknown;

  if (method === "GET") {
    /**
     * Falling back to empty object to mimic
     * the behavior of express.json() middleware
     * when no POST body is provided.
     */
    const { body: queryBody = "{}" } = query;
    args = JSON.parse(queryBody as string);
  } else {
    args = body;
  }

  const argsArray = Symbol.iterator in Object(args) ? args : [args];

  res.locals.args = argsArray;

  next();
}
