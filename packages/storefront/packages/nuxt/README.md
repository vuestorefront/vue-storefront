# @vue-storefront/nuxt

## Quick Setup

1. Add `@vue-storefront/nuxt` dependency to your project

```bash
# Using pnpm
pnpm add -D @vue-storefront/nuxt

# Using yarn
yarn add --dev @vue-storefront/nuxt

# Using npm
npm install --save-dev @vue-storefront/nuxt
```

2. Add `@vue-storefront/nuxt` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["@vue-storefront/nuxt"],
});
```

3. Configure the module

There are two ways you can configure the SDK module. The first is by using the `vsfSdk` key in the Nuxt configuration object and providing necessary information such as the Middleware instance address:

```ts
export default defineNuxtConfig({
  modules: ["@vue-storefront/nuxt"],
  vsfSdk: {
    apiBaseUrl: "localhost:4000",
    apiProtocol: "http",
    apiSubpath: "",
    isMultistoreEnabled: false,
  },
});
```

4. Create SDK config file - `sdk.config.ts` in root directory of your project:

The `defineSdkConfig` function is used for this purpose. The parameter for calling this function should be an anonymous function that receives an injected context from the module, containing:

- the `buildModule` function,
- the middleware URL (`middlewareUrl`),
- a function for retrieving the Cookie header with cookie values (`getCookieHeader`).

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

That's it! You can now use VueStorefront Module in your Nuxt app ✨