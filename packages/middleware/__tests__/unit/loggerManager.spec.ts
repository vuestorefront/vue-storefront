import type { Response } from "express";
import { LoggerInterface } from "@vue-storefront/logger";
import { getLogger, LoggerManager, injectMetadata } from "../../src/logger";
import { logger } from "../../__mocks__/logger";
import { LoggerOptions } from "../../src/types";

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

    const globalLogger = loggerManager.get();

    expect(buildLogger).toBeCalled();
    expect(globalLogger).toBe(logger);
  });

  it("passes config when creating global configuration", () => {
    const logger = {} as any;
    const loggerConfig: LoggerOptions = {
      level: "debug",
    };
    const buildLogger = jest.fn(() => logger);

    const loggerManager = new LoggerManager(
      {
        integrations: {},
        logger: loggerConfig,
      },
      buildLogger
    );

    const globalLogger = loggerManager.get();

    expect(buildLogger).toBeCalledWith(loggerConfig);
    expect(globalLogger).toBe(logger);
  });

  it("uses passed handler as global logger if provided", () => {
    const logger = {} as any;
    const loggerConfig: LoggerOptions = {
      handler: {
        info: jest.fn(),
      } as unknown as LoggerInterface,
    };
    const buildLogger = jest.fn(() => logger);

    const loggerManager = new LoggerManager(
      {
        integrations: {},
        logger: loggerConfig,
      },
      buildLogger
    );

    const globalLogger = loggerManager.get();
    globalLogger.info("test");

    expect(buildLogger).not.toBeCalled();
    expect(loggerConfig.handler?.info).toBeCalledWith("test");
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

    const globalLogger = loggerManager.get();
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

  it("merges integration's and global's config", () => {
    const buildLogger = jest.fn(() => ({} as any));
    const globalConfig: LoggerOptions = {
      includeStackTrace: false,
      level: "critical",
    };
    const sapccLoggerConfig: LoggerOptions = {
      includeStackTrace: true,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loggerManager = new LoggerManager(
      {
        logger: globalConfig,
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

    expect(buildLogger).toBeCalledWith({
      ...globalConfig,
      ...sapccLoggerConfig,
    });
  });

  it("uses passed handler as integration's logger if provided", () => {
    const buildLogger = jest.fn(() => ({} as any));
    const sapccLoggerConfig: LoggerOptions = {
      handler: {
        info: jest.fn(),
      } as unknown as LoggerInterface,
    };
    const sapccConfig = {
      location: "",
      configuration: {},
      logger: sapccLoggerConfig,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loggerManager = new LoggerManager(
      {
        integrations: {
          sapcc: sapccConfig,
        },
      },
      buildLogger
    );

    const logger = loggerManager.get("sapcc");
    logger.info("test");

    expect(buildLogger).not.toBeCalledWith(sapccConfig);
    expect(sapccLoggerConfig.handler?.info).toBeCalledWith("test");
  });

  it("uses default logger globally even if integration has own logger", () => {
    const globalLogger = {
      debug: jest.fn(),
    } as unknown as LoggerInterface;
    const buildLogger = jest.fn(() => globalLogger);
    const sapccLoggerConfig: LoggerOptions = {
      handler: {
        info: jest.fn(),
      } as unknown as LoggerInterface,
    };
    const sapccConfig = {
      location: "",
      configuration: {},
      logger: sapccLoggerConfig,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loggerManager = new LoggerManager(
      {
        integrations: {
          sapcc: sapccConfig,
        },
      },
      buildLogger
    );

    const glogger = loggerManager.get();
    glogger.debug("other");

    expect(buildLogger).toBeCalledWith(undefined);
    expect(globalLogger.debug).toBeCalledWith("other");
  });

  it("returns global logger if integration doesn't have own one", () => {
    const buildLogger = jest.fn(() => ({} as any));

    const loggerManager = new LoggerManager(
      {
        integrations: {},
      },
      buildLogger
    );

    const globalLogger = loggerManager.get();
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

    const globalLogger = loggerManager.get();

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
    const wrappedLogger = injectMetadata(logger, metadataGetter);

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
    const wrappedLogger = injectMetadata(logger, metadataGetter);

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
    const wrappedLogger = injectMetadata(
      injectMetadata(logger, metadataGetter),
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
    const wrappedLogger = injectMetadata(
      injectMetadata(logger, metadataGetter),
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
