import { Request, Response } from "express";
import { prepareMetadataStorage } from "../../../src/handlers";

describe("[middleware-handlers] prepareMetadataStorage", () => {
  const req = { query: {} } as unknown as Request;
  const res = { locals: {} } as unknown as Response;
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    res.locals = {};
  });

  it("creates metadata field", () => {
    prepareMetadataStorage(req, res, next);

    expect(res.locals.alokai).toEqual({
      metadata: {
        context: "middleware",
      },
    });
  });

  it("calls next middleware", () => {
    prepareMetadataStorage(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith();
  });
});
