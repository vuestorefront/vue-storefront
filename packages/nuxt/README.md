# @vue-storefront/sdk-nuxt

## Quick Setup

1. Add `@vue-storefront/sdk-nuxt` dependency to your project

```bash
# Using pnpm
pnpm add -D @vue-storefront/sdk-nuxt

# Using yarn
yarn add --dev @vue-storefront/sdk-nuxt

# Using npm
npm install --save-dev @vue-storefront/sdk-nuxt
```

2. Add `@vue-storefront/sdk-nuxt` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["@vue-storefront/sdk-nuxt"],
});
```

3. Configure the module

There are two ways you can configure the SDK module. The first is by using the `vsfSdk` key in the Nuxt configuration object and providing necessary information such as the Middleware instance address:

```ts
export default defineNuxtConfig({
  modules: ["@vue-storefront/sdk-nuxt"],
  vsfSdk: {
    apiBaseUrl: "localhost:4000",
    apiProtocol: "http",
    apiSubpath: "",
    isMultistoreEnabled: false,
  },
});
```

The second is to use Runtime Config. You can set the same set of variables in Runtime Config, providing access to this data throughout the application. You can control the values of these variables through environment variables:

```ts
export default defineNuxtConfig({
  modules: ["@vue-storefront/sdk-nuxt"],
  runtimeConfig: {
    public: {
      apiBaseUrl: "localhost:4000",
    },
  },
});
```

4. Create SDK config file - `sdk.config.ts` in root directory of your project:

The `defineSdkConfig` function is used for this purpose. The parameter for calling this function should be an anonymous function that receives an injected context from the module, containing:

- the `buildModule` function,
- the middleware URL (`middlewareUrl`),
- a function for retrieving the Set-Cookie header with cookie values (`getCookieHeader`).
- a function that compose Middleware URL - in case you want to do it by yourself (`composeMiddlewareUrl`)
- a module config

You should import all other SDK configuration components. See the example below illustrating the SDK configuration with Unified and Contentful modules.

```ts
import {
  contentfulModule,
  ContentfulModuleType,
} from "@vsf-enterprise/contentful-sdk";
import { unifiedModule } from "@vsf-enterprise/unified-sdk";
import type { UnifiedApiExtension } from "../storefront-middleware/middleware.config";

export default defineSdkConfig(
  ({ buildModule, middlewareUrl, getCookieHeader }) => ({
    unified: buildModule(unifiedModule<UnifiedApiExtension>, {
      apiUrl: middlewareUrl + "/commerce",
      requestOptions: {
        headers: getCookieHeader,
      },
    }),
    contentful: buildModule<ContentfulModuleType>(contentfulModule, {
      apiUrl: middlewareUrl + "/cntf",
    }),
  }),
);
```

That's it! You can now use VueStorefront SDK in your Nuxt app ✨
