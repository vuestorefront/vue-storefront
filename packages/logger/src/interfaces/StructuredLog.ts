import type { LogData, Metadata } from "./Logger";
import type { LoggerOptions } from "./LoggerOptions";
import { LogLevel } from "./LogLevel";

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
    severity?: LogLevel,
    metadata?: Metadata
  ): Record<string, unknown>;
}
