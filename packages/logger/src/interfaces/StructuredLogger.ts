import { LogLevel } from "./LogLevel";

export interface StructuredLogger {
  logStructured(level: LogLevel, logData: unknown): void;
}
