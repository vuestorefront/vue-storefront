import { LogLevel } from "../LogLevel";

export interface GCPStructuredLogger {
  logStructured(level: LogLevel, logData: unknown): void;
}

export interface GCPStructuredDTO {
  timestamp: string;
  severity: string;
  message: string;
  trace?: string;
  sourceLocation?: {
    file: string;
    line: number;
    function?: string;
  };
  [key: string]: any;
}
