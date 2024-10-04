import { ConsolaStructuredLogger } from "./ConsolaStructuredLogger";
import { GCPStructuredLog } from "./structuredLog/GCPStructuredLog";
import { LoggerOptions } from "./interfaces/LoggerOptions";

export enum LoggerType {
  ConsolaGcp = "consola-gcp",
}

/**
 * Creates a logger based on the type
 * Available types:
 * - consola-gcp (Consola logger with GCP structured log)
 *
 * @param type The type of logger to create
 */
export class LoggerFactory {
  static create(
    type: LoggerType,
    options: LoggerOptions = {
      level: "info",
      includeStackTrace: true,
      environment: "production",
    }
  ) {
    switch (type) {
      case LoggerType.ConsolaGcp:
        return new ConsolaStructuredLogger(new GCPStructuredLog(), options);
      default:
        throw new Error(`Logger type ${type} is not supported`);
    }
  }
}
