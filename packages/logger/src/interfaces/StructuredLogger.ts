import { LogVerbosity } from "./LogVerbosity";

/**
 * A logger that can log structured data.
 * This is useful for logging to structured log services like GCP.
 */
export interface StructuredLogger {
  logStructured(severity: LogVerbosity, logData: unknown): void;
}
