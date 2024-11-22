import express from "express";
import multer from "multer";
import { createMulterMiddleware } from "../../../src/services/fileUpload";

jest.mock("multer", () => {
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
    const middleware = createMulterMiddleware({ enabled: false });
    expect(middleware).toBeUndefined();
    expect(multer).not.toHaveBeenCalled();
  });

  it("should configure upload with default options when enabled", () => {
    const mockStorage = {};
    (multer.memoryStorage as jest.Mock).mockReturnValue(mockStorage);

    createMulterMiddleware({ enabled: true });

    expect(multer.memoryStorage).toHaveBeenCalled();
    expect(multer).toHaveBeenCalledWith(
      expect.objectContaining({
        storage: mockStorage,
        limits: {
          fileSize: 5 * 1024 * 1024,
          files: 5,
        },
      })
    );
  });

  it("should configure upload with custom options", () => {
    const customOptions = {
      enabled: true,
      maxFileSize: 10 * 1024 * 1024,
      maxFiles: 3,
      allowedMimeTypes: ["image/jpeg"],
    };

    createMulterMiddleware(customOptions);

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
    createMulterMiddleware({
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
    createMulterMiddleware({ enabled: true });

    const multerInstance = (multer as unknown as jest.Mock).mock.results[0]
      .value;
    expect(multerInstance.any).toHaveBeenCalled();
  });

  describe("fileFilter", () => {
    let fileFilter: (req: any, file: any, cb: any) => void;

    beforeEach(() => {
      createMulterMiddleware({
        enabled: true,
        allowedMimeTypes: ["image/*", "application/pdf"],
      });
      fileFilter = (multer as unknown as jest.Mock).mock.calls[0][0].fileFilter;
    });

    it("should accept files when no mime types are specified", () => {
      const cb = jest.fn();
      createMulterMiddleware({ enabled: true, allowedMimeTypes: [] });
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
