import { Request, Response } from "express";
import { prepareLogger } from "../../../src/handlers";
import { LoggerManager } from "../../../src/logger/loggerManager";
import { logger } from "../../../__mocks__/logger";

describe("[middleware-handlers] prepareLogger", () => {
  const req = {
    query: {},
    params: {
      integrationName: "sapcc",
      functionName: "getProduct",
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
    res.locals.alokai.logger.info("test", { d: 15 });

    expect(logger.info).toBeCalledWith("test", {
      d: 15,
      alokai: {
        context: "middleware",
        scope: {
          integrationName: "sapcc",
          functionName: "getProduct",
        },
      },
    });
  });

  it("calls next middleware", () => {
    prepareLogger(loggerManager)(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith();
  });
});
