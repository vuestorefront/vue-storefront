type LogData = string | Error;
type Metadata = Record<string, unknown>;
type Environment = "production" | "dev" | "stage" | "test";
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
  environment: Environment;
  handler: LoggerInterface;
  [key: string]: any;
}>;
