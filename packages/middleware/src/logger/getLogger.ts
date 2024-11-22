import type { LoggerInterface } from "@vue-storefront/logger";
import type { AlokaiContainer, AlokaiResponse } from "../types";
import { fallbackLogger } from "./fallbackLogger";

type ContextSubset = { res: AlokaiResponse };
type LoggerSource = AlokaiContainer | AlokaiResponse | ContextSubset;
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
    fallbackLogger.alert("Logger instance could not be resolved", {
      troubleshooting: {
        message:
          "This issue is likely caused by a version mismatch in the middleware stack. Note: Logger functionality was introduced in version 5.1.0 of the middleware package. For more details, refer to https://docs.alokai.com/middleware/guides/logging.",
        steps: [
          "Update all middleware packages to the latest compatible version to ensure logger compatibility.",
          "Ensure API client packages are also updated, as they rely on compatible middleware versions.",
          "Update unified API packages to the latest version to maintain compatibility with the updated middleware packages.",
        ],
      },
    });

    throw new Error(
      "Logger instance could not be determined. In most cases, this is due to a versions missmatch in the middleware stack."
    );
  }
  return logger;
}
