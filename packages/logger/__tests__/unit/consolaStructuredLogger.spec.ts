import { ConsolaStructuredLogger } from "../../src/ConsolaStructuredLogger";
import { LogLevel } from "../../src/interfaces/LogLevel";
import { StructuredLog } from "../../src/interfaces/StructuredLog";

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
    const logData = { message: "test message" };
    const level = LogLevel.Info;

    logger.logStructured = jest.fn();

    logger.log(level, logData);

    expect(logger.logStructured).toHaveBeenCalledWith(level, logData);
  });

  it("should log at the emergency level", () => {
    const logData = "emergency log";

    logger.logStructured = jest.fn();

    logger.emergency(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(
      LogLevel.Emergency,
      logData
    );
  });

  it("should log at the alert level", () => {
    const logData = "alert log";

    logger.logStructured = jest.fn();

    logger.alert(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(LogLevel.Alert, logData);
  });

  it("should log at the critical level", () => {
    const logData = "critical log";

    logger.logStructured = jest.fn();

    logger.critical(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(
      LogLevel.Critical,
      logData
    );
  });

  it("should log at the error level", () => {
    const logData = "error log";

    logger.logStructured = jest.fn();

    logger.error(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(LogLevel.Error, logData);
  });

  it("should log at the warning level", () => {
    const logData = "warning log";

    logger.logStructured = jest.fn();

    logger.warning(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(
      LogLevel.Warning,
      logData
    );
  });

  it("should log at the notice level", () => {
    const logData = "notice log";

    logger.logStructured = jest.fn();

    logger.notice(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(LogLevel.Notice, logData);
  });

  it("should log at the info level", () => {
    const logData = "info log";

    logger.logStructured = jest.fn();

    logger.info(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(LogLevel.Info, logData);
  });

  it("should log at the debug level", () => {
    const logData = "debug log";

    logger.logStructured = jest.fn();

    logger.debug(logData);

    expect(logger.logStructured).toHaveBeenCalledWith(LogLevel.Debug, logData);
  });
});
