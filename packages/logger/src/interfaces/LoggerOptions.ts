import { LogLevel } from "./LogLevel";

/**
 * Options for the logger.
 */
export interface LoggerOptions {
  /**
   * The log level aligned with RFC5424.
   */
  level?: LogLevel;

  /**
   * Whether to include the stack trace in the log message.
   */
  includeStackTrace?: boolean;
}
