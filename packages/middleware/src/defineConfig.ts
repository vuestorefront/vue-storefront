import { createEmptyApiClient } from "./helpers";
import {
  IntegrationsConfig,
  MiddlewareConfig,
  CreateServerParams,
  Extension,
} from "./types";
import * as klevuApiClient from "./playground/klevu";

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

export const newConfig = defineConfig({
  integrations: {
    klevu: {
      apiClient: klevuApiClient,
      configuration: {
        // TODO: verify type inference
      },
      extensions: (
        extensions: (typeof klevuApiClient)["createApiClient"]["_predefinedExtensions"]
      ) => [
        ...extensions,
        {
          name: "klevuExtension",
          extendApiMethods: {
            helloWorld: (context) => {
              context.getApiClient("klevu");
              console.log("world", context);
              return "dupa";
            },
          },
        },
      ],
    },
  },
  orchestration: {
    someMethod: (context, params) => {
      const klevu = context.getApiClient("klevu");
      klevu.api.helloWorld();
    },
  },
});
