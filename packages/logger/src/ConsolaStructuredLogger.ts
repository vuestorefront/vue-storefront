import consola, {
  ConsolaOptions,
  ConsolaReporter,
  createConsola,
} from "consola";

import dotenv from "dotenv";

import { LogLevel } from "./interfaces/LogLevel";
import type { LogData, Logger, Metadata } from "./interfaces/Logger";
import type { LoggerOptions } from "./interfaces/LoggerOptions";
import type { StructuredLog } from "./interfaces/StructuredLog";
import type { StructuredLogger } from "./interfaces/StructuredLogger";

dotenv.config();
interface ConsolaLoggerOptions
  extends LoggerOptions,
    Partial<Omit<ConsolaOptions, "level">> {}
export class ConsolaStructuredLogger implements Logger, StructuredLogger {
  /**
   * The logger instance from the `consola` package.
   */
  private logger: typeof consola;

  /**
   * The options for the logger.
   */
  private options: LoggerOptions;

  /**
   * The structured log builder for GCP.
   */
  private structuredLog: StructuredLog;

  private levelMap: Record<LogLevel, number> = {
    emergency: 0,
    alert: 0,
    critical: 0,
    error: 0,
    warning: 1,
    notice: 2,
    info: 3,
    debug: 4,
  };

  private jsonReporter: ConsolaReporter = {
    log: (logObject) => {
      if (
        process.env.NODE_ENV !== "production" ||
        typeof window !== "undefined"
      ) {
        console.log(logObject.args[0].structuredLog);
      } else {
        console.log(JSON.stringify(logObject.args[0].structuredLog));
      }
    },
  };

  constructor(
    structuredLog: StructuredLog,
    options: ConsolaLoggerOptions = {
      level: "info",
      includeStackTrace: true,
    }
  ) {
    this.logger = createConsola({
      level: this.mapToConsolaLevel(options.level),
      reporters: [this.jsonReporter],
    });

    if (options.reporters) {
      this.logger.setReporters(options.reporters);
    }

    this.structuredLog = structuredLog;
    this.options = {
      level: "info",
      includeStackTrace: true,
      ...options,
    };
  }

  private mapToConsolaLevel(level: LogLevel): number {
    return this.levelMap?.[level] ?? this.levelMap.info; // Default to consola 'info'
  }

  public logStructured(
    level: LogLevel,
    logData: LogData,
    metadata?: Metadata
  ): void {
    const structuredLog = this.structuredLog.createLog(
      logData,
      this.options,
      level,
      metadata
    );

    const consolaLevel = this.mapToConsolaLevel(level);

    switch (consolaLevel) {
      case 0:
        this.logger.error({ structuredLog });
        break;
      case 1:
        this.logger.warn({ structuredLog });
        break;
      case 2:
        this.logger.log({ structuredLog });
        break;
      case 3:
        this.logger.info({ structuredLog });
        break;
      case 4:
        this.logger.debug({ structuredLog });
        break;
      default:
        this.logger.info(structuredLog);
        break;
    }
  }

  public log(level: LogLevel, logData: LogData, metadata?: Metadata): void {
    this.logStructured(level, logData, metadata);
  }

  private logAtLevel(level: LogLevel) {
    return (logData: LogData, metadata?: Metadata) =>
      this.log(level, logData, metadata);
  }

  public emergency = this.logAtLevel("emergency");

  public alert = this.logAtLevel("alert");

  public critical = this.logAtLevel("critical");

  public error = this.logAtLevel("error");

  public warning = this.logAtLevel("warning");

  public notice = this.logAtLevel("notice");

  public info = this.logAtLevel("info");

  public debug = this.logAtLevel("debug");
}
