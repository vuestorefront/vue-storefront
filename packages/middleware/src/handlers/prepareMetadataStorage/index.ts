import type { Response, Request, NextFunction } from "express";

/**
 * Middleware responsible for adding metadata storage to the res.locals.alokai,
 * it's used by logger to provide valuable insights about source of the log.
 *
 * @remarks How to access the metadata?
 * Metadata is available inside res.locals.alokai.metadata. It's adjusted with
 * new data in different moments of request's flow. If you are not using
 * it's value instantly but want to pass a reference then create
 * a getter function to always access the fresh value.
 *
 * ```ts
 * // Example of getter
 * (res) => res.locals.alokai.metadata
 * ```
 *
 * @remarks How to extend the metadata?
 * Append new fields to the metadata object. Remember to not overwrite
 * whole object as it's adjusted with new valuable data in different
 * moments of request's flow.
 *
 * ```ts
 * res.locals.alokai.metadata = {
 *  ...res.locals.alokai.metadata,
 *  myNewField: 'hello'
 * };
 *
 * // or
 * res.locals.alokai.metadata.myNewField = 'hello';
 * ```
 */
export async function prepareMetadataStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!res.locals) {
    res.locals = {};
  }
  if (!res.locals.alokai) {
    res.locals.alokai = {};
  }
  res.locals.alokai.metadata = {
    context: "middleware",
  };

  next();
}
