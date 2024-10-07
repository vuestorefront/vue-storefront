type LogData = string | Error;
type Metadata = Record<string, unknown>;
type LogLevel =
  | "emergency"
  | "alert"
  | "critical"
  | "error"
  | "warning"
  | "notice"
  | "info"
  | "debug";

export interface LoggerInterface {
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

export type LoggerModuleConfig = Partial<{
  level: LogLevel;
  includeStackTrace: boolean;
  handler: LoggerInterface;
  [key: string]: any;
}>;
