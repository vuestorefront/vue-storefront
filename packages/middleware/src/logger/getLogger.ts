import type { Response } from "express";
import type { LoggerInterface } from "@vue-storefront/logger";
import type { AlokaiContainer } from "../types";

type ContextSubset = { res: Response };
type LoggerSource = AlokaiContainer | Response | ContextSubset;
function isAlokaiContainer(source: LoggerSource): source is AlokaiContainer {
  return "logger" in source;
}
function isContext(source: LoggerSource): source is ContextSubset {
  return "res" in source;
}
function findLogger(source: LoggerSource): LoggerInterface {
  if (isAlokaiContainer(source)) {
    return source?.logger;
  }
  const base = isContext(source) ? source?.res : source;
  return base?.locals?.alokai?.logger;
}

export function getLogger(source: LoggerSource): LoggerInterface {
  const logger = findLogger(source);
  if (!logger) {
    throw new Error("Logger instance could not be determined");
  }
  return logger;
}
