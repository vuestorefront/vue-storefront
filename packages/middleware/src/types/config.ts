import type { HelmetOptions } from "helmet";
import { Integration } from "./common";
import { TObject } from "./base";
import { IntegrationContext } from "./server";

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

export type LoggerConfig = unknown;

export interface MiddlewareConfig<
  TIntegrationsContext extends Record<string, IntegrationContext> = Record<
    string,
    IntegrationContext
  >
> {
  logger?: LoggerConfig;
  integrations: Integrations<TIntegrationsContext>;
  helmet?: boolean | Readonly<HelmetOptions>;
}
