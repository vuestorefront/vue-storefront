import { createConsolaStructuredLogger } from "./ConsolaStructuredLogger";
import type { LoggerOptions } from "./interfaces/LoggerOptions";
import { GCPStructuredLog } from "./structuredLog/GCPStructuredLog";

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

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class LoggerFactory {
  static create(
    type: LoggerType,
    options?: LoggerOptions,
    environment = process.env.NODE_ENV ?? "production"
  ) {
    const defaultOptions = {
      includeStackTrace: false,
      verbosity: "info",
    } satisfies LoggerOptions;

    const mergedOptions = {
      ...defaultOptions,
      ...options,
    };

    switch (type) {
      case LoggerType.ConsolaGcp:
        return createConsolaStructuredLogger(
          new GCPStructuredLog(),
          environment,
          mergedOptions
        );
      default:
        throw new Error(`Logger type ${type} is not supported`);
    }
  }
}
