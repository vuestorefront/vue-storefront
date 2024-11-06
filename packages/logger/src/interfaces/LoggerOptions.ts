import { LogVerbosity } from "./LogVerbosity";

/**
 * Options for the logger.
 */
export interface LoggerOptions {
  /**
   * The log level aligned with RFC5424.
   */
  verbosity?: LogVerbosity;

  /**
   * Whether to include the stack trace in the log message.
   */
  includeStackTrace?: boolean;
}
