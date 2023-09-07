import { Request, Response } from "express";
import { prepareErrorHandler } from "../../../src/handlers";
import { IntegrationsLoaded } from "../../../src/types";

describe("[middleware-handlers] prepareErrorHandler", () => {
  const integrationName = "ct";
  const errorHandler = jest.fn();

  const integrations = {
    [integrationName]: { errorHandler },
  } as unknown as IntegrationsLoaded;
  const req = { params: { integrationName } } as unknown as Request;
  const res = { locals: {} } as unknown as Response;
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    res.locals = {};
  });

  it("adds error handler to res.locals", () => {
    prepareErrorHandler(integrations)(req, res, next);

    expect(res.locals).toEqual(expect.objectContaining({ errorHandler }));
  });

  it("calls next middleware", () => {
    prepareErrorHandler(integrations)(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith();
  });
});
