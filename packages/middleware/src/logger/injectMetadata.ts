import merge from "lodash.merge";
import type { LoggerInterface } from "@vue-storefront/logger";
import type { AlokaiLocal } from "../types";

type Metadata = { alokai: AlokaiLocal["metadata"] & Record<string, any> };

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Unique key by which, we internally access original unlocked logger instance
 */
const UNLOCKED_LOGGER_KEY = Symbol("UNLOCKED_LOGGER_KEY");

/**
 * Wraps provided logger in guard function to prevent overwriting "alokai" key in metadata object.
 * It's private function of the package that cannot be exported.
 */
export function lockLogger(logger: LoggerInterface): LoggerInterface {
  return new Proxy(logger, {
    get(target, prop) {
      if (prop === UNLOCKED_LOGGER_KEY) {
        return logger;
      }
      return (...args: any[]) => {
        const [message, metadata] = args;
        const providedForbiddenMetadata = Boolean(metadata?.alokai);
        if (providedForbiddenMetadata) {
          delete metadata.alokai;
          target.warning(
            "You attempted to overwrite alokai's metadata object. It's forbidden and your data will be removed."
          );
        }
        target[prop](message, {
          ...metadata,
        });
      };
    },
  });
}

/**
 * Returns version of logger without guard.
 * It's private function of the package that cannot be exported.
 */
export function unlockLogger(logger: LoggerInterface) {
  const unlockedLogger = logger[UNLOCKED_LOGGER_KEY];
  return unlockedLogger || logger;
}

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
  const unlockedLogger = unlockLogger(logger);
  const loggerWithMetadata = new Proxy(unlockedLogger, {
    get(target, prop) {
      const shouldSkipMethod = typeof target[prop] !== "function";

      if (!shouldSkipMethod) {
        return (...args: any[]) => {
          const [message, metadata] = args;
          target[prop](message, merge(metadata, metadataGetter(metadata)));
        };
      }
      return target[prop];
    },
  });
  return lockLogger(loggerWithMetadata);
}
