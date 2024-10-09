import type { LoggerInterface } from "./types";

const methodsToExclude = ["log"];

export function injectMetadata(
  logger: LoggerInterface,
  externalData: Record<string, any>
): LoggerInterface {
  return new Proxy(logger, {
    get(target, prop) {
      const targetProp = target[prop as keyof LoggerInterface];
      if (
        typeof targetProp === "function" &&
        !methodsToExclude.includes(prop as string)
      ) {
        return (...args: any[]) => {
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
