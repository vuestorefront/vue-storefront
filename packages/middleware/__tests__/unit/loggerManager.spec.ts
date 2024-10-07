import { LoggerOptions } from "@vue-storefront/logger";
import type { Response } from "express";
import { getLogger, LoggerManager, wrapLogger } from "../../src/loggerManager";
import { logger } from "../../__mocks__/logger";

describe("loggerManager", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates global logger instance", () => {
    const logger = {} as any;
    const buildLogger = jest.fn(() => logger);

    const loggerManager = new LoggerManager(
      {
        integrations: {},
      },
      buildLogger
    );

    const globalLogger = loggerManager.getGlobal();

    expect(buildLogger).toBeCalled();
    expect(globalLogger).toBe(logger);
  });

  it("passes config when creating global configuration", () => {
    const logger = {} as any;
    const buildLogger = jest.fn(() => logger);

    const loggerManager = new LoggerManager(
      {
        integrations: {},
      },
      buildLogger
    );

    const globalLogger = loggerManager.getGlobal();

    expect(buildLogger).toBeCalled();
    expect(globalLogger).toBe(logger);
  });

  it("creates integration's logger if config available", () => {
    const buildLogger = jest.fn(() => ({} as any));
    const sapccLoggerConfig: LoggerOptions = {
      includeStackTrace: true,
    };

    const loggerManager = new LoggerManager(
      {
        integrations: {
          sapcc: {
            location: "",
            configuration: {},
            logger: sapccLoggerConfig,
          },
        },
      },
      buildLogger
    );

    const globalLogger = loggerManager.getGlobal();
    const sapccLogger = loggerManager.get("sapcc");

    expect(globalLogger).not.toBe(sapccLogger);
  });

  it("passes config to the integration's logger", () => {
    const buildLogger = jest.fn(() => ({} as any));
    const sapccLoggerConfig: LoggerOptions = {
      includeStackTrace: true,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loggerManager = new LoggerManager(
      {
        integrations: {
          sapcc: {
            location: "",
            configuration: {},
            logger: sapccLoggerConfig,
          },
        },
      },
      buildLogger
    );

    expect(buildLogger).toBeCalledWith(sapccLoggerConfig);
  });

  it("returns global logger if integration doesn't have own one", () => {
    const buildLogger = jest.fn(() => ({} as any));

    const loggerManager = new LoggerManager(
      {
        integrations: {},
      },
      buildLogger
    );

    const globalLogger = loggerManager.getGlobal();
    const sapccLogger = loggerManager.get("adyen");

    expect(globalLogger).toBe(sapccLogger);
  });

  it("returns integration's logger if integration has own one", () => {
    const buildLogger = jest.fn(() => ({} as any));
    const sapccLoggerConfig: LoggerOptions = {
      includeStackTrace: true,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loggerManager = new LoggerManager(
      {
        integrations: {
          sapcc: {
            location: "",
            configuration: {},
            logger: sapccLoggerConfig,
          },
        },
      },
      buildLogger
    );

    const globalLogger = loggerManager.getGlobal();

    expect(loggerManager.get("sapcc")).not.toBe(globalLogger);
  });

  it("returns logger from alokai container", () => {
    const alokaiContainer = {
      logger: {} as any,
    };

    const logger = getLogger(alokaiContainer);

    expect(logger).toBe(alokaiContainer.logger);
  });

  it("returns logger from response", () => {
    const res = {
      locals: {
        alokai: {
          logger: {} as any,
        },
      },
    } as unknown as Response;

    const logger = getLogger(res);

    expect(logger).toBe(res.locals.alokai.logger);
  });

  it("returns logger from context", () => {
    const res = {
      locals: {
        alokai: {
          logger: {} as any,
        },
      },
    } as unknown as Response;
    const context = { res };

    const logger = getLogger(context);

    expect(logger).toBe(res.locals.alokai.logger);
  });

  it("adds metadata to wrapped logger", () => {
    const metadataGetter = () => ({
      a: 1,
      b: 2,
    });
    const wrappedLogger = wrapLogger(logger, metadataGetter);

    wrappedLogger.info("test");

    expect(logger.info).toBeCalledWith("test", {
      a: 1,
      b: 2,
    });
  });

  it("merges metadata and prioritizes one from getter", () => {
    const metadataGetter = () => ({
      a: 1,
      b: 2,
    });
    const wrappedLogger = wrapLogger(logger, metadataGetter);

    wrappedLogger.info("test", { a: 50, c: 3 });

    expect(logger.info).toBeCalledWith("test", {
      a: 1,
      b: 2,
      c: 3,
    });
  });

  it("wraps multiple times if requested", () => {
    const metadataGetter = () => ({
      a: 1,
      b: 2,
    });
    const metadataGetter2 = () => ({
      a: 60,
      c: 123,
    });
    const wrappedLogger = wrapLogger(
      wrapLogger(logger, metadataGetter),
      metadataGetter2
    );

    wrappedLogger.info("test");

    expect(logger.info).toBeCalledWith("test", {
      a: 1,
      b: 2,
      c: 123,
    });
  });

  it("is possible to prioritize top wrapping layer", () => {
    const metadataGetter = (metadata) => ({
      a: 1,
      b: 2,
      ...metadata,
    });
    const metadataGetter2 = () => ({
      a: 60,
      c: 123,
    });
    const wrappedLogger = wrapLogger(
      wrapLogger(logger, metadataGetter),
      metadataGetter2
    );

    wrappedLogger.info("test");

    expect(logger.info).toBeCalledWith("test", {
      a: 60,
      b: 2,
      c: 123,
    });
  });
});
