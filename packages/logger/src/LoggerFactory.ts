import { GCPStructuredLog } from "./structuredLog/GCPStructuredLog";
import { LoggerOptions } from "./interfaces/LoggerOptions";
import { createConsolaStructuredLogger } from "./ConsolaStructuredLogger";

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
  static create(type: LoggerType, options?: LoggerOptions) {
    const defaultOptions = {
      verbosity: "info",
      includeStackTrace: false,
    } satisfies LoggerOptions;

    const mergedOptions = {
      ...defaultOptions,
      ...options,
    };

    switch (type) {
      case LoggerType.ConsolaGcp:
        return createConsolaStructuredLogger(
          new GCPStructuredLog(),
          mergedOptions
        );
      default:
        throw new Error(`Logger type ${type} is not supported`);
    }
  }
}
