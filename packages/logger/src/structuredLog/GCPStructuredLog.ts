import { GCPStructuredDTO } from "../interfaces/gcp/GCPStructuredLogger";
import { StructuredLog } from "../interfaces/StructuredLog";
import { LogLevel } from "../interfaces/LogLevel";
import { LoggerOptions } from "../interfaces/LoggerOptions";

type GCPSeverity =
  | "DEFAULT"
  | "DEBUG"
  | "INFO"
  | "NOTICE"
  | "WARNING"
  | "ERROR"
  | "CRITICAL"
  | "ALERT"
  | "EMERGENCY";

type GCPSeverityMap = Record<LogLevel, GCPSeverity>;

/**
 * A structured log for Google Cloud Platform.
 */
export class GCPStructuredLog implements StructuredLog {
  /**
   * The mapping of log levels to GCP severity levels.
   */
  private severityMap: GCPSeverityMap = {
    [LogLevel.Emergency]: "EMERGENCY",
    [LogLevel.Alert]: "ALERT",
    [LogLevel.Critical]: "CRITICAL",
    [LogLevel.Error]: "ERROR",
    [LogLevel.Warning]: "WARNING",
    [LogLevel.Notice]: "NOTICE",
    [LogLevel.Info]: "INFO",
    [LogLevel.Debug]: "DEBUG",
  };

  /**
   * Creates a structured log object for GCP.
   */
  public createLog(
    logData: unknown,
    options: LoggerOptions,
    severity?: LogLevel
  ): GCPStructuredDTO {
    return {
      timestamp: this.getCurrentTimestamp(),
      severity: this.mapLogLevelToGCPSeverity(severity),
      message: this.formatMessage(logData),
      trace: options.includeStackTrace ? this.extractTrace(logData) : undefined,
    };
  }

  /**
   * @returns The current timestamp in ISO 8601 format.
   */
  private getCurrentTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   *
   * @returns The GCP severity level for the given log level.
   */
  private mapLogLevelToGCPSeverity(level: LogLevel): string {
    return this.severityMap[level] || "DEFAULT";
  }

  /**
   *
   * @returns The formatted log message.
   */
  private formatMessage(logData: unknown): string {
    if (logData instanceof Error) {
      return logData.message;
    }

    try {
      return typeof logData === "object"
        ? JSON.stringify(logData)
        : String(logData);
    } catch (error) {
      return "Unable to stringify log data";
    }
  }

  /**
   * @returns The stack trace if the log data is an error.
   */
  private extractTrace(logData: unknown): string | undefined {
    return logData instanceof Error ? logData.stack : undefined;
  }
}
