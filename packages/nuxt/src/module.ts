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
import { defu } from "defu";

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
      cdnCacheBustingId: "no-cache-busting-id-set",
    },
    multistore: {
      enabled: false,
    },
  },
  setup(options, nuxt) {
    const projectLayer = nuxt.options._layers[0];

    const projectRootResolver = createResolver(projectLayer.config.rootDir);
    const buildDirectoryResolver = createResolver(nuxt.options.buildDir);
    const localResolver = createResolver(import.meta.url);

    nuxt.options.runtimeConfig.public.alokai = defu(
      nuxt.options.runtimeConfig.public?.vsf as any,
      nuxt.options.runtimeConfig.public?.alokai as any,
      options
    );

    nuxt.options.runtimeConfig.public.alokai = defu(
      nuxt.options.runtimeConfig.public?.alokai as any,
      { middleware: { cdnCacheBustingId: process.env?.GIT_SHA } },
      nuxt.options.runtimeConfig.public?.vsf as any,
      options
    );

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
      filename: "alokaiModule.d.ts",
      src: localResolver.resolve("./runtime/types.template"),
    });

    addImports({
      name: "composeMiddlewareUrl",
      as: "composeMiddlewareUrl",
      from: localResolver.resolve("./runtime/utils/composeMiddlewareUrl"),
    });

    addImports({
      name: "getDefaultMethodsRequestConfig",
      as: "getDefaultMethodsRequestConfig",
      from: localResolver.resolve("./runtime/utils/defaults"),
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
      filename: "alokaiSdkPlugin.ts",
      write: true,
    });

    addImportsSources([
      {
        imports: ["useSdk"],
        from: buildDirectoryResolver.resolve("useSdk.ts"),
      },
      {
        imports: ["defineSdkConfig"],
        from: buildDirectoryResolver.resolve("defineSdkConfig.ts"),
      },
    ]);
  },
});
