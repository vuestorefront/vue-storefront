import { ConsolaOptions, ConsolaReporter, createConsola } from "consola";

import dotenv from "dotenv";
import { LogLevel } from "./interfaces/LogLevel";
import type {
  LogData,
  LoggerInterface,
  Metadata,
} from "./interfaces/LoggerInterface";
import type { LoggerOptions } from "./interfaces/LoggerOptions";
import type { StructuredLog } from "./interfaces/StructuredLog";

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
    level: "info",
    includeStackTrace: true,
  }
): LoggerInterface => {
  const levelMap: Record<LogLevel, number> = {
    emergency: 0,
    alert: 0,
    critical: 0,
    error: 0,
    warning: 1,
    notice: 2,
    info: 3,
    debug: 4,
  };

  const jsonReporter: ConsolaReporter = {
    log: (logObject) => {
      if (
        process.env.NODE_ENV === "development" ||
        typeof window !== "undefined"
      ) {
        console.log(logObject.args[0].structuredLog);
      } else {
        console.log(JSON.stringify(logObject.args[0].structuredLog));
      }
    },
  };

  const logger = createConsola({
    level: levelMap?.[options.level] ?? levelMap.info,
    reporters: [jsonReporter],
  });

  if (options.reporters) {
    logger.setReporters(options.reporters);
  }

  const mapToConsolaLevel = (level: LogLevel): number => {
    return levelMap?.[level] ?? levelMap.info; // Default to 'info' level
  };

  const logStructured = (
    level: LogLevel,
    logData: LogData,
    metadata?: Metadata
  ): void => {
    const structuredLogEntry = structuredLog.createLog(
      logData,
      options,
      level,
      metadata
    );

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
    level: LogLevel,
    logData: LogData,
    metadata?: Metadata
  ): void => {
    logStructured(level, logData, metadata);
  };

  const logAtLevel = (level: LogLevel) => {
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
    log,
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
