import type { LoggerInterface } from "@vue-storefront/logger";
import { AlokaiLocal } from "../types";

const METHODS_TO_SKIP = ["log"];

type Metadata = AlokaiLocal["metadata"] & Record<string, any>;

export function injectMetadata(
  logger: LoggerInterface,
  metadataGetter: (metadata: Metadata) => Metadata
): LoggerInterface {
  return new Proxy(logger, {
    get(target, prop) {
      const shouldSkipMethod =
        typeof target[prop] !== "function" ||
        METHODS_TO_SKIP.includes(prop as string);

      if (!shouldSkipMethod) {
        return (...args: any[]) => {
          const [message, metadata] = args;
          target[prop](message, {
            ...metadata,
            ...metadataGetter(metadata),
          });
        };
      }
      return target[prop];
    },
  });
}
