import { createEmptyApiClient } from "./helpers";
import {
  IntegrationsConfig,
  MiddlewareConfig,
  CreateServerParams,
  Extension,
  ApiClientFactoryResult,
  ApiClientConfig,
} from "./types";

const emptyApiClient = createEmptyApiClient();

export function defineConfig<IntegrationsConfigType extends IntegrationsConfig>(
  config: MiddlewareConfig<IntegrationsConfigType>
): CreateServerParams {
  return {
    integrations: {
      ...config.integrations,
      orchestration: {
        apiClient: emptyApiClient,
        configuration: {},
        extensions: () => [
          {
            name: "orchestrationExtension",
            extendApiMethods: {
              ...config.orchestration,
            },
          },
        ],
      },
    },
    helmet: config.options?.helmet,
  };
}

export function defineApiClient<
  ApiClientType extends ApiClientFactoryResult<any>,
  TExtension extends Extension
>(
  config: ApiClientConfig<ApiClientType, TExtension>
): ApiClientConfig<ApiClientType, TExtension> {
  return config;
}
