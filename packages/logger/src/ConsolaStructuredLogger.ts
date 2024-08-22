import consola, {
  ConsolaOptions,
  ConsolaReporter,
  createConsola,
} from "consola";
import { LogLevel } from "./interfaces/LogLevel";
import type { Logger } from "./interfaces/Logger";
import type { LoggerOptions } from "./interfaces/LoggerOptions";
import type { StructuredLog } from "./interfaces/StructuredLog";
import type { StructuredLogger } from "./interfaces/StructuredLogger";

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
    [LogLevel.Emergency]: 0,
    [LogLevel.Alert]: 0,
    [LogLevel.Critical]: 0,
    [LogLevel.Error]: 0,
    [LogLevel.Warning]: 1,
    [LogLevel.Notice]: 2,
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
    return this.levelMap?.[level] ?? LogLevel.Info; // Default to consola 'info'
  }

  public logStructured(level: LogLevel, logData: unknown): void {
    const structuredLog = this.structuredLog.createLog(
      logData,
      this.options,
      level
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
        this.logger.info({ structuredLog });
        break;
    }
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
