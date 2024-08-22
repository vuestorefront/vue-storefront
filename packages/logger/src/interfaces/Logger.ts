import { LogLevel } from "./LogLevel";

/**
 * Common interface for a logger.
 */
export interface Logger {
  log(level: LogLevel, logData: unknown): void;
  emergency(logData: unknown): void;
  alert(logData: unknown): void;
  critical(logData: unknown): void;
  error(logData: unknown): void;
  warning(logData: unknown): void;
  notice(logData: unknown): void;
  info(logData: unknown): void;
  debug(logData: unknown): void;
}
