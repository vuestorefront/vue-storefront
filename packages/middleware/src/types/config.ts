import type { HelmetOptions } from "helmet";
import { Integration } from "./common";
import { TObject } from "./base";
import { IntegrationContext } from "./server";

/**
 * Based on the syslog levels defined in RFC 5424.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc5424
 */
export type LogVerbosity =
  | "emergency"
  | "alert"
  | "critical"
  | "error"
  | "warning"
  | "notice"
  | "info"
  | "debug";

/**
 * Options for the logger.
 */
export interface LoggerOptions {
  /**
   * The log verbosity level aligned with RFC5424.
   */
  verbosity?: LogVerbosity;

  /**
   * Whether to include the stack trace in the log message.
   */
  includeStackTrace?: boolean;
}

export interface Helmet extends HelmetOptions {
  helmet?: boolean | HelmetOptions;
}
export type Integrations<TIntegrationsContext extends TObject = TObject> = {
  [IntegrationCode in keyof TIntegrationsContext]: IntegrationCode extends string
    ? Integration<
        TIntegrationsContext[IntegrationCode]["config"],
        TIntegrationsContext[IntegrationCode]["api"],
        TIntegrationsContext[IntegrationCode]
      >
    : never;
};

export interface MiddlewareConfig<
  TIntegrationsContext extends Record<string, IntegrationContext> = Record<
    string,
    IntegrationContext
  >
> {
  logger?: LoggerOptions;
  integrations: Integrations<TIntegrationsContext>;
  helmet?: boolean | Readonly<HelmetOptions>;
}
