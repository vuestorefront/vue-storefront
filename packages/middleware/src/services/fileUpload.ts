import multer from "multer";
import type { Express } from "express";
import type { FileUploadOptions } from "../types";

const DEFAULT_OPTIONS: FileUploadOptions = {
  enabled: false,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxFiles: 5,
  allowedMimeTypes: ["image/*", "application/pdf"],
};

export function configureFileUpload(app: Express, options?: FileUploadOptions) {
  const config = { ...DEFAULT_OPTIONS, ...options };

  if (!config.enabled) {
    return;
  }

  const storage = multer.memoryStorage();

  const upload = multer({
    storage,
    limits: {
      fileSize: config.maxFileSize,
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

  // If specific field names are provided, use fields()
  if (config.fieldNames?.length) {
    const fields = config.fieldNames.map((name) => ({ name, maxCount: 1 }));
    app.use(upload.fields(fields));
  } else {
    app.use(upload.any());
  }
}
