import type { Environment, LogLevel } from "@vue-storefront/logger";

export type LoggerModuleConfig = Partial<{
  level: LogLevel;
  includeStackTrace: boolean;
  environment: Environment;
  handler: Partial<{
    emergency: (args: unknown) => void;
    alert: (args: unknown) => void;
    critical: (args: unknown) => void;
    error: (args: unknown) => void;
    warning: (args: unknown) => void;
    notice: (args: unknown) => void;
    info: (args: unknown) => void;
    debug: (args: unknown) => void;
  }>;
  [key: string]: any;
}>;
