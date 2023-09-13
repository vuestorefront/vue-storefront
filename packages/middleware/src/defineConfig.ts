import { BaseIntegrationsConfig, MiddlewareConfig } from "./types/config";
// import * as klevuApiClient from "./playground/klevu";

export function defineConfig<IntegrationsConfig extends BaseIntegrationsConfig>(
  config: MiddlewareConfig<IntegrationsConfig>
): MiddlewareConfig<IntegrationsConfig> {
  return config;
}

// export const newConfig = defineConfig({
//   integrations: {
//     klevu: {
//       apiClient: klevuApiClient,
//       configuration: {
//         // TODO: verify type inference
//       },
//       extensions: (extensions) => [
//         ...extensions,
//         {
//           name: "klevuExtension",
//           extendApiMethods: {
//             helloWorld: (context) => {
//               console.log("world", context);
//             },
//           },
//         },
//       ]
//     },
//   },
//   orchestration: {
//     someMethod: (context, params) => {
//       const klevu = context.getApiClient("klevu");
//       klevu.api.hello();
//     },
//   },
// });
