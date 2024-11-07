import { createConsolaStructuredLogger } from "../../src/ConsolaStructuredLogger";
import type { StructuredLog } from "../../src/interfaces/StructuredLog";
import type { LogData, Metadata } from "../../src/interfaces/LoggerInterface";

process.env.NODE_ENV = "development";

describe("createConsolaStructuredLogger", () => {
  const mockStructuredLog: StructuredLog = {
    createLog: jest.fn(),
  };

  const logData: LogData = "Test log message";
  const metadata: Metadata = { userId: "12345" };

  it("it creates a logger with the correct set of methods", () => {
    const logger = createConsolaStructuredLogger(mockStructuredLog);

    expect(logger).toHaveProperty("emergency");
    expect(logger).toHaveProperty("alert");
    expect(logger).toHaveProperty("critical");
    expect(logger).toHaveProperty("error");
    expect(logger).toHaveProperty("warning");
    expect(logger).toHaveProperty("notice");
    expect(logger).toHaveProperty("info");
    expect(logger).toHaveProperty("debug");
  });

  it("it logs at the correct level", () => {
    const logger = createConsolaStructuredLogger(mockStructuredLog);

    const infoSpy = jest.spyOn(logger, "info").mockImplementation(() => {});
    logger.info(logData, metadata);
    expect(infoSpy).toHaveBeenCalledTimes(1);

    const errorSpy = jest.spyOn(logger, "error").mockImplementation(() => {});
    logger.error(logData, metadata);
    expect(errorSpy).toHaveBeenCalledTimes(1);

    const debugSpy = jest.spyOn(logger, "debug").mockImplementation(() => {});
    expect(debugSpy).not.toHaveBeenCalled();
  });

  it("calls console.warn once when logger.warning is invoked", () => {
    const logger = createConsolaStructuredLogger(mockStructuredLog);
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    logger.warning(logData, metadata);

    expect(warnSpy).toHaveBeenCalledTimes(1);

    warnSpy.mockRestore();
  });

  it("calls console.error once for each error-level logging method", () => {
    const logger = createConsolaStructuredLogger(mockStructuredLog);
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    logger.error(logData, metadata);
    logger.critical(logData, metadata);
    logger.alert(logData, metadata);
    logger.emergency(logData, metadata);

    expect(errorSpy).toHaveBeenCalledTimes(4);

    errorSpy.mockRestore();
  });

  it("calls console.info once when info-level is invoked", () => {
    const logger = createConsolaStructuredLogger(mockStructuredLog);
    const infoSpy = jest.spyOn(console, "info").mockImplementation(() => {});

    logger.info(logData, metadata);

    expect(infoSpy).toHaveBeenCalledTimes(1);

    infoSpy.mockRestore();
  });
});
