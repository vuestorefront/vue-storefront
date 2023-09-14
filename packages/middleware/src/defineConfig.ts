import { createEmptyApiClient } from "./helpers";
import {
  IntegrationsConfig,
  MiddlewareConfig,
  CreateServerParams,
  defineConfig2,
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

// const integrationsConfig = {
//   klevu: {
//     apiClient: klevuApiClient,
//     configuration: {
//       // TODO: verify type inference
//     },
//     extensions: (extensions) => [
//       ...extensions,
//       {
//         name: "klevuExtension",
//         extendApiMethods: {
//           helloWorld: (context) => {
//             console.log("world", context);
//           },
//         },
//       },
//     ],
//   },
// };

export const newConfig = defineConfig({
  integrations: {
    klevu: {
      apiClient: klevuApiClient,
      configuration: {
        // TODO: verify type inference
      },
      extensions: (extensions) => [
        ...extensions,
        {
          name: "klevuExtension",
          extendApiMethods: {
            helloWorld: (context) => {
              context.getApiClient("klevu");
              console.log("world", context);
            },
          },
        },
      ],
    },
  },
  // orchestration: {
  //   someMethod: (context, params) => {
  //     const klevu = context.getApiClient("klevu");
  //     klevu.api.hello();
  //   },
  // },
});

const result = defineConfig2({
  integrations: {
    klevu: {
      apiClient: klevuApiClient,
      configuration: {
        // TODO: verify type inference
      },
      extensions: (extensions) => [
        ...extensions,
        {
          name: "klevuExtension",
          extendApiMethods: {
            helloWorld: (context) => {
              context.getApiClient("klevu");
              console.log("world", context);
            },
          },
        },
      ],
    },
  },
  // orchestration: {
  //   someMethod: (context, params) => {
  //     const klevu = context.getApiClient("klevu");
  //     klevu.api.hello();
  //   },
  // },
});
