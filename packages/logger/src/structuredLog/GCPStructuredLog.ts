import type { LogData, Metadata } from "../interfaces/Logger";
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
    emergency: "EMERGENCY",
    alert: "ALERT",
    critical: "CRITICAL",
    error: "ERROR",
    warning: "WARNING",
    notice: "NOTICE",
    info: "INFO",
    debug: "DEBUG",
  };

  /**
   * Creates a structured log object for GCP.
   */
  public createLog(
    logData: LogData,
    options: LoggerOptions,
    severity?: LogLevel,
    metadata: Metadata = {}
  ): GCPStructuredDTO {
    const structuredDto: GCPStructuredDTO = {
      timestamp: this.getCurrentTimestamp(),
      severity: this.mapLogLevelToGCPSeverity(severity),
      message: this.formatMessage(logData),
      ...metadata,
    };

    if (logData instanceof Error) {
      const stackTrace = options.includeStackTrace
        ? this.extractTrace(logData)
        : undefined;

      if (stackTrace) {
        structuredDto.stackTrace = stackTrace;
      }
    }

    return structuredDto;
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
  private formatMessage(logData: LogData): string {
    if (logData instanceof Error) {
      return logData.message;
    }

    if (typeof logData === "string") {
      return logData;
    }

    return JSON.stringify(logData);
  }

  /**
   * @returns The stack trace if the log data is an error.
   */
  private extractTrace(logData: unknown): string | undefined {
    return logData instanceof Error ? logData.stack : undefined;
  }
}
