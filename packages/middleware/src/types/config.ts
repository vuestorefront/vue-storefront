import { HelmetOptions } from "helmet";
import { Client, Config } from "./base";
import { Extension } from "./exntensions";
import { CustomQueryFunction } from "./query";
// import { OrchestrationMethods } from "./orchestration";

// Integration Config Types

export interface IntegrationConfig {
  location?: string;
  apiClient?: Client;
  configuration: Config;
  extensions?: (extensions: Extension[]) => Extension[];
  customQueries?: Record<string, CustomQueryFunction>;
  initConfig?: Config;
  errorHandler?: (error: unknown, req: Request, res: Response) => void;
}

// type ExtendAppParams = {
//   app: Express;
//   configuration: Config;
// }

// type ExtendAppFunction2 = (params: ExtendAppParams) => Promise<void>;

type ContextualizedApi2<IntegrationName extends string, Context> = Record<
  string,
  (context: {getApiClient: Record<IntegrationName, Context>}, params: any) => any
>;

type Extension2<IntegrationName, Context> = {
  name: string;
  extendApiMethods?: Record<
    string,
    ContextualizedApi2<IntegrationName, Context>
  >;
  // extendApp?: ExtendAppFunction;
  // hooks?: Hooks;
}

export type IntegrationsConfig =
  Record<string, IntegrationConfig>;

type ExtensionFromIntegration<IntegrationName, Integration extends Client> =
  (extension: Extension2<IntegrationName, Integration>) => Extension2<IntegrationName, Integration>

type ExtensionsFromIntegration<Integration extends Client> = 
  (extensions: Extension[]) => Extension[]

type IntegrationConfigConstructor<IntegrationConfig> = {
  [IntegrationCode in keyof IntegrationConfig]: 
    IntegrationCode extends 'extensions' ? (extensions: Extension[]) => [
      ReturnType<IntegrationConfig[IntegrationCode]['extensions']>[number] extends infer ExtensionEntry ?
        {
          name: ExtensionEntry['name'],
          extendApiMethods?: ContextualizedApi2<IntegrationCode, ExtensionEntry['extendApiMethods']>
        }
        : never
    ] :
    IntegrationConfig[IntegrationCode]
};

// export type IntegrationsConfig2 =
//   IntegrationConfigConstructor
//   Record<string, IntegrationConfig> extends Record<infer 

export interface MiddlewareConfig2<
  IntegrationsConfigType extends IntegrationsConfig
> {
  integrations: IntegrationConfigConstructor<IntegrationsConfigType>;
  options?: {
    helmet?: boolean | HelmetOptions;
  };
}

export function defineConfig2<IntegrationsConfigType extends IntegrationsConfig>(
  config: MiddlewareConfig2<IntegrationsConfigType>
): any {
  return config
}



// Middleware Types

export interface MiddlewareConfig<
  IntegrationsConfigType extends IntegrationsConfig
> {
  integrations: IntegrationsConfigType
  options?: {
    helmet?: boolean | HelmetOptions;
  };
}

export interface CreateServerParams {
  integrations: IntegrationsConfig;
  helmet?: boolean | HelmetOptions;
}
