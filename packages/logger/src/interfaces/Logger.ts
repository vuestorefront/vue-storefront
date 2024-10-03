import { LogLevel } from "./LogLevel";

/**
 * Metadata is a record with string keys and arbitrary values.
 */
export type Metadata = Record<string, unknown>;

/**
 * Log data can be a string, an error, or and arbitrary object.
 */
export type LogData = string | Error;

/**
 * Common interface for a logger.
 */
export interface Logger {
  log(level: LogLevel, logData: LogData, metadata?: Metadata): void;
  emergency(logData: LogData, metadata?: Metadata): void;
  alert(logData: LogData, metadata?: Metadata): void;
  critical(logData: LogData, metadata?: Metadata): void;
  error(logData: LogData, metadata?: Metadata): void;
  warning(logData: LogData, metadata?: Metadata): void;
  notice(logData: LogData, metadata?: Metadata): void;
  info(logData: LogData, metadata?: Metadata): void;
  debug(logData: LogData, metadata?: Metadata): void;
}
