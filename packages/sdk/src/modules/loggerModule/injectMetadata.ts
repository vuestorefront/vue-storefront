import type { LoggerInterface } from "./types";

export function injectMetadata(
  logger: LoggerInterface,
  externalData: Record<string, any>
): LoggerInterface {
  return new Proxy(logger, {
    get(target, prop) {
      const targetProp = target[prop as keyof LoggerInterface];
      if (typeof targetProp === "function") {
        return (...args: Parameters<typeof targetProp>[]) => {
          const [logData, metadata] = args;
          targetProp(logData, {
            ...metadata,
            ...externalData,
          });
        };
      }
      return targetProp;
    },
  });
}
