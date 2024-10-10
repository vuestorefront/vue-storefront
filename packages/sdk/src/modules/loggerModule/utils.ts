import type { LoggerModuleConfig } from "./types";

export const isEmptyObject = (obj = {}) => {
  return Object.keys(obj).length === 0;
};

/**
 * Check if the config is invalid. Invalid config is considered when both handler and other options are provided,
 * then handler will be used and other options will be ignored.
 * @param config
 */
export const isInvalidConfig = (config?: LoggerModuleConfig) => {
  if (config) {
    const { handler, ...rest } = config;
    return !!handler && !isEmptyObject(rest);
  }
  return false;
};
