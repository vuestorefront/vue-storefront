import {
  defineNuxtModule,
  addImports,
  addTemplate,
  createResolver,
  addPluginTemplate,
  addTypeTemplate,
  addImportsSources,
} from "@nuxt/kit";
import { genInlineTypeImport } from "knitwork";
import { type SdkModuleOptions } from "./types";

export default defineNuxtModule<SdkModuleOptions>({
  meta: {
    name: "@vue-storefront/nuxt",
    configKey: "vsf",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {
    middleware: {
      apiUrl: "http://localhost:4000",
    },
    multistore: {
      enabled: false,
    },
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
        content: "Vue Storefront 2",
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
