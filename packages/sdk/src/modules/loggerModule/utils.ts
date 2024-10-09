import type { LoggerModuleConfig } from "./types";

export const isEmptyObject = (obj = {}) => {
  return Object.keys(obj).length === 0;
};

export const isInvalidConfig = (config?: LoggerModuleConfig) => {
  if (config) {
    const { handler, ...rest } = config;
    return !!handler && !isEmptyObject(rest);
  }
  return false;
};
