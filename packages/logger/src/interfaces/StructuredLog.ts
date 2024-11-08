import type { LogData, Metadata } from "./LoggerInterface";
import type { LoggerOptions } from "./LoggerOptions";
import { LogVerbosity } from "./LogVerbosity";

/**
 * Interface for creating structured logs for different logging services.
 */
export interface StructuredLog {
  /**
   * Create a structured log for the given log data.
   */
  createLog(
    logData: LogData,
    options: Pick<LoggerOptions, "includeStackTrace">,
    severity?: LogVerbosity,
    metadata?: Metadata
  ): Record<string, unknown>;
}
