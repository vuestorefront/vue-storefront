import consola, { ConsolaReporter, createConsola } from "consola";
import type { Logger } from "./interfaces/Logger";
import { LogLevel } from "./interfaces/LogLevel";
import type { LoggerOptions } from "./interfaces/LoggerOptions";
import type { GCPStructuredLogger } from "./interfaces/gcp/GCPStructuredLogger";
import { StructuredLog } from "./interfaces/StructuredLog";

interface ConsolaLoggerOptions extends LoggerOptions {
  reporters?: ConsolaReporter[];
}
export class ConsolaStructuredLogger implements Logger, GCPStructuredLogger {
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
    [LogLevel.Emergency]: 0,
    [LogLevel.Alert]: 0,
    [LogLevel.Critical]: 0,
    [LogLevel.Error]: 1,
    [LogLevel.Warning]: 2,
    [LogLevel.Notice]: 3,
    [LogLevel.Info]: 3,
    [LogLevel.Debug]: 4,
  };

  private jsonReporter: ConsolaReporter = {
    log: (logObject) => {
      console.log(JSON.stringify(logObject.args[0].structuredLog));
    },
  };

  constructor(
    structuredLog: StructuredLog,
    options: ConsolaLoggerOptions = {
      level: LogLevel.Info,
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
      level: LogLevel.Info,
      includeStackTrace: true,
      ...options,
    };
  }

  private mapToConsolaLevel(level: LogLevel): number {
    return this.levelMap[level] || LogLevel.Info; // Default to consola 'info'
  }

  public logStructured(level: LogLevel, logData: unknown): void {
    const structuredLog = this.structuredLog.createLog(
      logData,
      this.options,
      level
    );

    this.logger.log({ structuredLog });
  }

  public log(level: LogLevel, logData: unknown): void {
    this.logStructured(level, logData);
  }

  private logAtLevel(level: LogLevel) {
    return (logData: unknown) => this.log(level, logData);
  }

  public emergency = this.logAtLevel(LogLevel.Emergency);

  public alert = this.logAtLevel(LogLevel.Alert);

  public critical = this.logAtLevel(LogLevel.Critical);

  public error = this.logAtLevel(LogLevel.Error);

  public warning = this.logAtLevel(LogLevel.Warning);

  public notice = this.logAtLevel(LogLevel.Notice);

  public info = this.logAtLevel(LogLevel.Info);

  public debug = this.logAtLevel(LogLevel.Debug);
}
