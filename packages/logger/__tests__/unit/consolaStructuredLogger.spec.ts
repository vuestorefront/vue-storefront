import { ConsolaStructuredLogger } from "../../src/ConsolaStructuredLogger";
import { StructuredLog } from "../../src/interfaces/StructuredLog";

// We do not want to serialize the log payload at this point
process.env.NODE_ENV = "dev";

describe("ConsolaStructuredLogger", () => {
  let logger: ConsolaStructuredLogger;
  let structuredLog: StructuredLog;

  beforeEach(() => {
    structuredLog = {
      createLog: jest.fn(),
    };
    logger = new ConsolaStructuredLogger(structuredLog);
  });

  it("should create a ConsolaStructuredLogger instance", () => {
    expect(logger).toBeInstanceOf(ConsolaStructuredLogger);
  });

  it("should log structured data at the specified level", () => {
    const logData = "test message";
    const level = "info";

    logger.logStructured = jest.fn();

    logger.log(level, logData);

    expect(logger.logStructured).toHaveBeenCalledWith(
      level,
      logData,
      undefined
    );
  });

  it("should log at the emergency level", () => {
    const logData = "emergency log";

    logger.logStructured = jest.fn();

    logger.emergency(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(
      "emergency",
      logData,
      undefined
    );
  });

  it("should log at the alert level", () => {
    const logData = "alert log";

    logger.logStructured = jest.fn();

    logger.alert(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(
      "alert",
      logData,
      undefined
    );
  });

  it("should log at the critical level", () => {
    const logData = "critical log";

    logger.logStructured = jest.fn();

    logger.critical(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(
      "critical",
      logData,
      undefined
    );
  });

  it("should log at the error level", () => {
    const logData = "error log";

    logger.logStructured = jest.fn();

    logger.error(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(
      "error",
      logData,
      undefined
    );
  });

  it("should log at the warning level", () => {
    const logData = "warning log";

    logger.logStructured = jest.fn();

    logger.warning(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(
      "warning",
      logData,
      undefined
    );
  });

  it("should log at the notice level", () => {
    const logData = "notice log";

    logger.logStructured = jest.fn();

    logger.notice(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(
      "notice",
      logData,
      undefined
    );
  });

  it("should log at the info level", () => {
    const logData = "info log";

    logger.logStructured = jest.fn();

    logger.info(logData, undefined);

    expect(logger.logStructured).toHaveBeenCalledWith(
      "info",
      logData,
      undefined
    );
  });

  it("should log at the debug level", () => {
    const logData = "debug log";

    logger.logStructured = jest.fn();

    logger.debug(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(
      "debug",
      logData,
      undefined
    );
  });
});
