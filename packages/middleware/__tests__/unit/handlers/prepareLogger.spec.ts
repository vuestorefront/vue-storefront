import { Request, Response } from "express";
import { prepareLogger } from "../../../src/handlers";
import { LoggerManager } from "../../../src/loggerManager";
import { logger } from "../../../__mocks__/logger";

describe("[middleware-handlers] prepareLogger", () => {
  const req = {
    query: {},
    params: {
      integrationName: "sapcc",
    },
  } as unknown as Request;
  const res = { locals: {} } as unknown as Response;
  const next = jest.fn();
  const middlewareConfig = {
    integrations: {
      sapcc: {
        location: "",
        configration: {},
        logger: {},
      },
    },
  };
  const loggerManager = new LoggerManager(
    middlewareConfig as any,
    () => logger
  );

  beforeEach(() => {
    jest.clearAllMocks();
    res.locals = {};
  });

  it("appends metadata when logging", () => {
    prepareLogger(loggerManager)(req, res, next);
    res.locals.alokai.metadata = {
      context: "middleware",
      scope: {
        integrationName: "sapcc",
        functionName: "getProduct",
      },
    };
    res.locals.alokai.logger.info("test", { d: 15 });

    expect(logger.info).toBeCalledWith("test", {
      d: 15,
      context: "middleware",
      scope: {
        integrationName: "sapcc",
        functionName: "getProduct",
      },
    });
  });

  it("calls next middleware", () => {
    prepareLogger(loggerManager)(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith();
  });
});
