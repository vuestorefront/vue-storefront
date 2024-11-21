import express from "express";
import multer from "multer";
import { createMulterMiddleware } from "../../../src/services/fileUpload";

// Mock multer
jest.mock("fileUpload", () => {
  const mockMulter = jest.fn(() => ({
    fields: jest.fn(),
    any: jest.fn(),
  })) as jest.Mock & { memoryStorage: jest.Mock };
  mockMulter.memoryStorage = jest.fn();
  return mockMulter;
});

describe("configureFileUpload", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use = jest.fn();
    jest.clearAllMocks();
  });

  it("should not configure upload when enabled is false", () => {
    createMulterMiddleware(app, { enabled: false });
    expect(app.use).not.toHaveBeenCalled();
    expect(multer).not.toHaveBeenCalled();
  });

  it("should configure upload with default options when enabled", () => {
    createMulterMiddleware(app, { enabled: true });

    expect(multer).toHaveBeenCalledWith(
      expect.objectContaining({
        limits: {
          fileSize: 5 * 1024 * 1024,
          files: 5,
        },
      })
    );
    expect(app.use).toHaveBeenCalled();
  });

  it("should configure upload with custom options", () => {
    const customOptions = {
      enabled: true,
      maxFileSize: 10 * 1024 * 1024,
      maxFiles: 3,
      allowedMimeTypes: ["image/jpeg"],
    };

    createMulterMiddleware(app, customOptions);

    expect(multer).toHaveBeenCalledWith(
      expect.objectContaining({
        limits: {
          fileSize: 10 * 1024 * 1024,
          files: 3,
        },
      })
    );
  });

  it("should use fields() when fieldNames are provided", () => {
    createMulterMiddleware(app, {
      enabled: true,
      fieldNames: ["avatar", "document"],
    });

    const expectedFields = [
      { name: "avatar", maxCount: 1 },
      { name: "document", maxCount: 1 },
    ];

    const multerInstance = (multer as unknown as jest.Mock).mock.results[0]
      .value;
    expect(multerInstance.fields).toHaveBeenCalledWith(expectedFields);
  });

  it("should use any() when no fieldNames are provided", () => {
    createMulterMiddleware(app, { enabled: true });

    const multerInstance = (multer as unknown as jest.Mock).mock.results[0]
      .value;
    expect(multerInstance.any).toHaveBeenCalled();
  });

  describe("fileFilter", () => {
    let fileFilter: (req: any, file: any, cb: any) => void;

    beforeEach(() => {
      createMulterMiddleware(app, {
        enabled: true,
        allowedMimeTypes: ["image/*", "application/pdf"],
      });
      fileFilter = (multer as unknown as jest.Mock).mock.calls[0][0].fileFilter;
    });

    it("should accept files when no mime types are specified", () => {
      const cb = jest.fn();
      createMulterMiddleware(app, { enabled: true, allowedMimeTypes: [] });
      fileFilter = (multer as unknown as jest.Mock).mock.calls[1][0].fileFilter;

      fileFilter(null, { mimetype: "anything" }, cb);
      expect(cb).toHaveBeenCalledWith(null, true);
    });

    it("should accept files matching exact mime type", () => {
      const cb = jest.fn();
      fileFilter(null, { mimetype: "application/pdf" }, cb);
      expect(cb).toHaveBeenCalledWith(null, true);
    });

    it("should accept files matching wildcard mime type", () => {
      const cb = jest.fn();
      fileFilter(null, { mimetype: "image/jpeg" }, cb);
      expect(cb).toHaveBeenCalledWith(null, true);
    });

    it("should reject files with unallowed mime types", () => {
      const cb = jest.fn();
      fileFilter(null, { mimetype: "text/plain" }, cb);
      expect(cb).toHaveBeenCalledWith(null, false);
    });
  });
});
