import { ConsolaOptions, createConsola } from "consola";

import dotenv from "dotenv";
import { LogVerbosity } from "./interfaces/LogVerbosity";
import type {
  LogData,
  LoggerInterface,
  Metadata,
} from "./interfaces/LoggerInterface";
import type { LoggerOptions } from "./interfaces/LoggerOptions";
import type { StructuredLog } from "./interfaces/StructuredLog";
import { jsonReporter } from "./reporters/consola/jsonReporter";

// We do not want to load the .env in the browser and in the edge runtime
if (typeof window === "undefined" && process.env.NEXT_RUNTIME !== "edge") {
  dotenv.config();
}

interface ConsolaLoggerOptions
  extends LoggerOptions,
    Partial<Omit<ConsolaOptions, "level">> {}

const createConsolaStructuredLogger = (
  structuredLog: StructuredLog,
  options: ConsolaLoggerOptions = {
    verbosity: "info",
    includeStackTrace: true,
  }
): LoggerInterface => {
  const levelMap: Record<LogVerbosity, number> = {
    emergency: 0,
    alert: 0,
    critical: 0,
    error: 0,
    warning: 1,
    notice: 2,
    info: 3,
    debug: 4,
  };

  const buildJsonReporter = () => {
    return {
      log: jsonReporter,
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
    emergency,
    alert,
    critical,
    error,
    warning,
    notice,
    info,
    debug,
  };
};

export { createConsolaStructuredLogger };
