import { PredefinedExtensions } from "../types";
import { defineApiClient, defineConfig } from "../defineConfig";
import * as klevuApiClient from "./klevu";

export const newConfig = defineConfig({
  integrations: {
    klevu: {
      apiClient: klevuApiClient,
      configuration: {},
      extensions: (extensions: PredefinedExtensions<typeof klevuApiClient>) => [
        ...extensions,
        {
          name: "klevuExtension",
          extendApiMethods: {
            helloWorld: (context) => {
              console.log("world", context);
              return "dupa";
            },
          },
        },
      ],
    },
    klevu2: defineApiClient({
      apiClient: klevuApiClient,
      configuration: {
        hello: "world",
      },
      extensions: (extensions) => [
        ...extensions,
        {
          name: "klevu2Extension",
          extendApiMethods: {
            helloWorld2: (context) => {
              console.log("world2", context);
            },
          },
        },
        {
          name: "klevu2Extension",
          extendApiMethods: {
            helloWorld3: (context) => {
              console.log("world2", context);
            },
          },
        },
      ],
    }),
  },
  orchestration: {
    someMethod: (context, params: { helloWorld: string }) => {
      console.log(params);

      const klevu = context.getApiClient("klevu");
      const klevu2 = context.getApiClient("klevu2");
      klevu2.api.helloWorld2();
      klevu.api.helloWorld();
    },
  },
});
