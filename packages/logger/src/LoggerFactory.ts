import { ConsolaStructuredLogger } from "./ConsolaStructuredLogger";
import { GCPStructuredLog } from "./structuredLog/GCPStructuredLog";
import { LoggerOptions } from "./interfaces/LoggerOptions";

type LoggerType = "consola-structured"; // | "winston" | "pino";

export class LoggerFactory {
  static create(type: LoggerType, options: LoggerOptions = {}) {
    switch (type) {
      case "consola-structured":
        return new ConsolaStructuredLogger(new GCPStructuredLog(), options);
      default:
        throw new Error(`Logger type ${type} is not supported`);
    }
  }
}
