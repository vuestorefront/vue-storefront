import type { LoggerInterface } from "@vue-storefront/logger";

const METHODS_TO_SKIP = ["log"];

export function injectMetadata(
  logger: LoggerInterface,
  metadataGetter: (metadata: Record<string, any>) => Record<string, any>
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
