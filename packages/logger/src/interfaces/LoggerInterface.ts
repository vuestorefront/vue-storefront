/**
 * Metadata is a record with string keys and arbitrary values.
 */
export type Metadata = {
  /**
   * Arbitrary metadata.
   */
  [key: string]: any;
  /**
   * Alokai's metadata object.
   * It's forbidden to overwrite this object. If you attempt to do so, the logger will emit a warning and remove the data.
   */
  alokai?: never;
};

/**
 * Log data can be a string, an error, or and arbitrary object.
 */
export type LogData = string | Error | unknown;

/**
 * Common interface for a logger.
 */
export interface LoggerInterface {
  emergency(logData: LogData, metadata?: Metadata): void;
  alert(logData: LogData, metadata?: Metadata): void;
  critical(logData: LogData, metadata?: Metadata): void;
  error(logData: LogData, metadata?: Metadata): void;
  warning(logData: LogData, metadata?: Metadata): void;
  notice(logData: LogData, metadata?: Metadata): void;
  info(logData: LogData, metadata?: Metadata): void;
  debug(logData: LogData, metadata?: Metadata): void;
}
