import type { ConsolaOptions, LogObject } from "consola";
import { createConsola } from "consola";

import type {
  LogData,
  LoggerInterface,
  Metadata,
} from "./interfaces/LoggerInterface";
import type { LoggerOptions } from "./interfaces/LoggerOptions";
import type { LogVerbosity } from "./interfaces/LogVerbosity";
import type { StructuredLog } from "./interfaces/StructuredLog";
import { jsonReporter } from "./reporters/consola/jsonReporter";

interface ConsolaLoggerOptions
  extends LoggerOptions,
    Partial<Omit<ConsolaOptions, "level">> {}

const createConsolaStructuredLogger = (
  structuredLog: StructuredLog,
  environment: string,
  options: ConsolaLoggerOptions = {
    includeStackTrace: true,
    verbosity: "info",
  }
): LoggerInterface => {
  const levelMap: Record<LogVerbosity, number> = {
    alert: 0,
    critical: 0,
    debug: 4,
    emergency: 0,
    error: 0,
    info: 3,
    notice: 2,
    warning: 1,
  };

  const buildJsonReporter = () => {
    return {
      log: (logObject: LogObject) => jsonReporter(logObject, environment),
    };
  };

  const logger = createConsola({
    level: levelMap?.[options.verbosity] ?? levelMap.info,
    reporters: options.reporters || [buildJsonReporter()],
  });

  if (options.reporters) {
    logger.setReporters(options.reporters);
  }

  const mapToConsolaLevel = (level: LogVerbosity): number => {
    return levelMap?.[level] ?? levelMap.info; // Default to 'info' level
  };

  const logStructured = (
    level: LogVerbosity,
    logData: LogData,
    metadata?: Metadata
  ): void => {
    const structuredLogEntry = structuredLog.createLog(
      logData,
      options,
      level,
      metadata
    );

    /**
     * Map the log level to the consola level
     * Our log levels are more granular than consola's log levels
     * and we need to map them to the closest consola level
     */
    const consolaLevel = mapToConsolaLevel(level);

    switch (consolaLevel) {
      case 0:
        logger.error({ structuredLog: structuredLogEntry });
        break;
      case 1:
        logger.warn({ structuredLog: structuredLogEntry });
        break;
      case 2:
        logger.log({ structuredLog: structuredLogEntry });
        break;
      case 3:
        logger.info({ structuredLog: structuredLogEntry });
        break;
      case 4:
        logger.debug({ structuredLog: structuredLogEntry });
        break;
      default:
        logger.info(structuredLogEntry);
        break;
    }
  };

  const log = (
    level: LogVerbosity,
    logData: LogData,
    metadata?: Metadata
  ): void => {
    logStructured(level, logData, metadata);
  };

  const logAtLevel = (level: LogVerbosity) => {
    return (logData: LogData, metadata?: Metadata) =>
      log(level, logData, metadata);
  };

  const emergency = logAtLevel("emergency");
  const alert = logAtLevel("alert");
  const critical = logAtLevel("critical");
  const error = logAtLevel("error");
  const warning = logAtLevel("warning");
  const notice = logAtLevel("notice");
  const info = logAtLevel("info");
  const debug = logAtLevel("debug");

  return {
    alert,
    critical,
    debug,
    emergency,
    error,
    info,
    notice,
    warning,
  };
};

export { createConsolaStructuredLogger };
