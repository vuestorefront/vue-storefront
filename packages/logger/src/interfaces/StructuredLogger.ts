import { LogVerbosity } from "./LogVerbosity";

export interface StructuredLogger {
  logStructured(level: LogVerbosity, logData: unknown): void;
}
