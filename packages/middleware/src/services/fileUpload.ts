import multer from "multer";
import { RequestHandler } from "express";
import type { FileUploadOptions } from "../types";

const DEFAULT_OPTIONS: FileUploadOptions = {
  enabled: true,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxFiles: 5,
  allowedMimeTypes: ["image/*", "application/pdf"],
};

export function createMulterMiddleware(
  options?: FileUploadOptions
): RequestHandler | undefined {
  const config = { ...DEFAULT_OPTIONS, ...options };

  if (!config.enabled) {
    return undefined;
  }

  const storage = multer.memoryStorage();

  const maxFileSizeLimit = Math.min(
    config.maxFileSize,
    10 * 1024 * 1024 // 10MB absolute maximum
  );

  const upload = multer({
    storage,
    limits: {
      fileSize: maxFileSizeLimit,
      files: config.maxFiles,
    },
    fileFilter: (_req, file, cb) => {
      if (!config.allowedMimeTypes?.length) {
        return cb(null, true);
      }

      const isAllowed = config.allowedMimeTypes.some((type) => {
        if (type.endsWith("/*")) {
          const mainType = type.split("/")[0];
          return file.mimetype.startsWith(`${mainType}/`);
        }
        return type === file.mimetype;
      });

      cb(null, isAllowed);
    },
  });

  if (config.fieldNames?.length) {
    const fields = config.fieldNames.map((name) => ({ name, maxCount: 1 }));
    return upload.fields(fields);
  }
  return upload.any();
}
