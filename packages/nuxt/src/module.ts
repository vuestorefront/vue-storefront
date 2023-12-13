import {
  defineNuxtModule,
  addImports,
  addTemplate,
  createResolver,
  addPluginTemplate,
  addTypeTemplate,
  addImportsSources,
  // eslint-disable-next-line import/no-unresolved
} from "@nuxt/kit";
import { genInlineTypeImport } from "knitwork";

export interface VsfSdkModuleOptions {
  apiBaseUrl: string;
  apiProtocol: string;
  apiSubpath: string;
  isMultistoreEnabled: boolean;
}

export default defineNuxtModule<VsfSdkModuleOptions>({
  meta: {
    name: "@vue-storefront/sdk-nuxt",
    configKey: "vsfSdk",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {
    apiBaseUrl: "localhost:4000",
    apiProtocol: "http",
    apiSubpath: "",
    isMultistoreEnabled: false,
  },
  setup(options, nuxt) {
    const projectLayer = nuxt.options._layers[0];

    const projectRootResolver = createResolver(projectLayer.config.rootDir);
    const buildDirResolver = createResolver(nuxt.options.buildDir);
    const localResolver = createResolver(import.meta.url);

    nuxt.options.app.head.meta = [
      ...(nuxt.options.app.head.meta ?? []),
      {
        name: "generator",
        content: "vue storefront 2",
      },
    ];

    addTypeTemplate({
      filename: "sdk.config.d.ts",
      getContents: () => `
export type SdkConfig = ${genInlineTypeImport(
        projectRootResolver.resolve("sdk.config")
      )}
      `,
    });

    addTypeTemplate({
      filename: "vsfModule.d.ts",
      src: localResolver.resolve("./runtime/types.template"),
    });

    addImports({
      name: "composeMiddlewareUrl",
      as: "composeMiddlewareUrl",
      from: localResolver.resolve("./runtime/utils/composeMiddlewareUrl"),
    });

    addTemplate({
      src: localResolver.resolve("./runtime/useSdk.template"),
      filename: "useSdk.ts",
      write: true,
    });

    addTemplate({
      src: localResolver.resolve("./runtime/defineSdkConfig.template"),
      filename: "defineSdkConfig.ts",
      write: true,
      options: {
        moduleConfig: JSON.stringify(options),
      },
    });

    addPluginTemplate({
      src: localResolver.resolve("./runtime/plugin.template"),
      filename: "vsfSdkPlugin.ts",
      write: true,
    });

    addImportsSources([
      {
        imports: ["useSdk"],
        from: buildDirResolver.resolve("useSdk.ts"),
      },
      {
        imports: ["defineSdkConfig"],
        from: buildDirResolver.resolve("defineSdkConfig.ts"),
      },
    ]);
  },
});
