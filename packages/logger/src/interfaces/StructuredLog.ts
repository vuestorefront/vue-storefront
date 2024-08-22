import { LoggerOptions } from "./LoggerOptions";
import { LogLevel } from "./LogLevel";

/**
 * Interface for creating structured logs for different logging services.
 */
export interface StructuredLog {
  /**
   * Create a structured log for the given log data.
   */
  createLog(
    logData: unknown,
    options: Pick<LoggerOptions, "includeStackTrace">,
    severity?: LogLevel
  ): Record<string, unknown>;
}
