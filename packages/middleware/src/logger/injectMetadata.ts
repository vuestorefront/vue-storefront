import merge from "lodash.merge";
import type { LoggerInterface } from "@vue-storefront/logger";
import { AlokaiLocal } from "../types";

const METHODS_TO_SKIP = ["log"];

type Metadata = { alokai: AlokaiLocal["metadata"] & Record<string, any> };

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Function wrapping passed logger with additional metadata. So when log function is called
 * then metadata will be available without explicitly passing it.
 *
 * It solves a problem of having access to metadata in different moment than log function
 * is called.
 *
 * @remarks Multiple wrapping is supported. Use metadata parameter in passed getter to decide
 * which fields should be overwritten.
 */
export function injectMetadata(
  logger: LoggerInterface,
  metadataGetter: (metadata: Metadata) => DeepPartial<Metadata>
): LoggerInterface {
  return new Proxy(logger, {
    get(target, prop) {
      const shouldSkipMethod =
        typeof target[prop] !== "function" ||
        METHODS_TO_SKIP.includes(prop as string);

      if (!shouldSkipMethod) {
        return (...args: any[]) => {
          const [message, metadata] = args;
          target[prop](message, merge(metadata, metadataGetter(metadata)));
        };
      }
      return target[prop];
    },
  });
}
