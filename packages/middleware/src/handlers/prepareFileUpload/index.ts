import type { RequestHandler } from "express";
import { createMulterMiddleware } from "../../services/fileUpload";
import type { CreateServerOptions } from "../../types";

/**
 * Prepare file upload middleware
 * Resolves file upload options from the request or server options
 * and creates multer middleware.
 *
 * @param options - Server options
 * @returns Request handler
 */
export const prepareFileUpload = (
  options: CreateServerOptions
): RequestHandler => {
  return (req, res, next) => {
    const fileUploadOptions =
      typeof options.fileUpload === "function"
        ? options.fileUpload(req)
        : options.fileUpload;

    if (!fileUploadOptions?.enabled) {
      return next();
    }

    const multerMiddleware = createMulterMiddleware(fileUploadOptions);

    return multerMiddleware(req, res, next);
  };
};
