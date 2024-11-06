import {
  removeAnsiColorCodesFromStr as defaultRemoveAnsiCodes,
  type RemoveAnsiCode,
} from "../utils/removeAnsiCodes";
import type { LogData, Metadata } from "../interfaces/LoggerInterface";
import { GCPStructuredDTO } from "../interfaces/gcp/GCPStructuredLogger";
import { StructuredLog } from "../interfaces/StructuredLog";
import { LogVerbosity } from "../interfaces/LogVerbosity";
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

type GCPSeverityMap = Record<LogVerbosity, GCPSeverity>;

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
   * The function to remove ANSI color codes from the log message.
   */
  private removeAnsiCodes: RemoveAnsiCode;

  constructor(removeAnsiCodes: RemoveAnsiCode = defaultRemoveAnsiCodes) {
    this.removeAnsiCodes = removeAnsiCodes;
  }

  /**
   * Creates a structured log object for GCP.
   */
  public createLog(
    logData: LogData,
    options: LoggerOptions,
    severity?: LogVerbosity,
    metadata: Metadata = {}
  ): GCPStructuredDTO {
    const structuredDto: GCPStructuredDTO = {
      timestamp: this.getCurrentTimestamp(),
      severity: this.mapLogVerbosityToGCPSeverity(severity),
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
  private mapLogVerbosityToGCPSeverity(level: LogVerbosity): string {
    return this.severityMap[level] || "DEFAULT";
  }

  /**
   *
   * @returns The formatted log message.
   */
  private formatMessage(logData: LogData): string {
    let message = "";
    if (logData instanceof Error) {
      message = logData.message;
    } else if (typeof logData === "string") {
      message = logData;
    } else {
      message = JSON.stringify(logData);
    }

    return this.removeAnsiCodes(message);
  }

  /**
   * @returns The stack trace if the log data is an error.
   */
  private extractTrace(logData: unknown): string | undefined {
    return logData instanceof Error ? logData.stack : undefined;
  }
}
