# Change log: `@vue-storefront/nuxt`

## 6.1.0

### Minor Changes

- **[CHANGED]** `defaultMethodsRequestConfig`, so the `getCategory`, and `getPage` methods will use `GET` request as a default.

## 6.0.2

### Patch Changes

- **[CHANGED]** the package `@vue-storefront/sdk` is now a peer dependency instead of dependency

## 6.0.1

### Patch Changes

**[FIXED]** Removed backquote from defineSdkConfig.template

## 6.0.0

### Major Changes

- **[BREAKING]**: Added functionality that automatically configures the proper URLs for SSR & SPA modes when mutlistore mode is enabled. Left your environment variables like in normal mode, just set `NUXT_PUBLIC_ALOKAI_MULTISTORE_ENABLED` to `true`.

## 5.0.0

### Major Changes

- **[ADDED]** global state management with Pinia. This will allow you to keep your global state in a more organized way.
  It shares the data about:
- cart
- customer
- currency
- locale

This change will require you to refactor your composables to make use of the introduced state manager.
As this is only a state management, you will still need to use the composables to fetch the data and put it into the state.

Every part of global state can now be used as refs so reading and writing to them is more straightforward.

Example of usage:

```vue
<template>
  <div>
    <p>Cart total: {{ cart.total }}</p>
    <p>Customer name: {{ customer.firstName }} {{ customer.lastName }}</p>
    <p>Currency: {{ currency }}</p>
    <p>Locale: {{ locale }}</p>
  </div>
</template>

<script setup>
const { cart, customer, currency, currencies, locale, locales } =
  storeToRefs(useSfState());

// updating the currency state
currency.value = "USD";

// updating the cart state
onMounted(async () => {
  cart.value = await useSdk().unified.getCart();
});
</script>
```

- **[BREAKING]** [CHANGED] module configKey is changed from `vsf` to `alokai`. Also, the support for the `vsf` key in Runtime Envs has been changed to `alokai`.

```diff
 meta: {
    name: "@vue-storefront/nuxt",
-   configKey: "vsf",
+   configKey: "alokai",
    compatibility: {
      nuxt: "^3.0.0",
    },
```

```diff
nuxt.options.runtimeConfig.public.alokai = defu(
-  nuxt.options.runtimeConfig.public?.vsf as any,
+  nuxt.options.runtimeConfig.public?.alokai as any,
   options
);
```

### Patch Changes

- Updated dependencies:
  - @vue-storefront/sdk@3.2.0

## 4.1.1

### Patch Changes

**[FIXED]**: Added getCurrencies unified endpoint to be fetch by HTTP GET. This change enable caching this endpoint on CDN.

## 4.1.0

### Minor Changes

**[ADDED]**: Using the `GIT_SHA` environment variable as secondary input for `cdnCacheBustingId` option. You can still override this value through `NUXT_PUBLIC_ALOKAI_MIDDLEWARE_CDN_CACHE_BUSTING_ID`.
**[ADDED]** Value of Busting ID for CDN Cache. You can access it via `config.cdnCacheBustingId`.
**[CHANGED]** Deprecated `middlewareUrl` in `defineSdkConfig` context. Use `config.middlewareUrl` instead.
**[CHANGED]** Deprecated `defaults` in `defineSdkConfig` context. Use `config.defaultMethodsRequestConfig` instead.
**[CHANGED]** Depreacted `vsf` key in RuntimeConfig. Use `alokai` instead. You should change you environment variables. Example: Change from `NUXT_PUBLIC_VSF_MIDDLEWARE_API_URL` to `NUXT_PUBLIC_ALOKAI_MIDDLEWARE_API_URL`.
**[CHANGED]** Internal naming changed from VSF to Alokai. For e.g. we inject the SDK into the `$alokai` key in Nuxt App instead of `$vsf` as in previous versions.

## 4.0.1

### Patch Changes

- **[CHANGED]** shared package wasn't being bundled with the release of the package

## 4.0.0

### Major Changes

- **[CHANGED]** Updated core sdk dependency to latest version
- **[ADDED]** Added .config parameter in createSdk callback

### Patch Changes

- Updated dependencies:
  - @vue-storefront/sdk@3.1.0

## 3.1.1

### Patch Changes

- **[FIXED]** Using the runtime config is now working properly. You can use `NUXT_PUBLIC_VSF_MIDDLEWARE_API_URL`, `NUXT_PUBLIC_VSF_MIDDLEWARE_SSR_API_URL` and `NUXT_PUBLIC_VSF_MULTISTORE_ENABLED` environments variables to define config in the runtime.

## 3.1.0

- **[ADDED]** `middlewareModule` to `defineSdkConfig` params.

```diff [sdk.config.ts]
- import { UnifiedApiExtension } from "storefront-middleware/types"
+ import { UnifiedEndpoints } from "storefront-middleware/types"

export default defineSdkConfig(
-  ({ buildModule, middlewareUrl, getRequestHeaders }) => ({
-    commerce: buildModule(unifiedModule<UnifiedApiExtension>, {
-      apiUrl: `${middlewareUrl}/commerce`,
-      requestOptions: { headers: getRequestHeaders },
+  ({ buildModule, middlewareModule, middlewareUrl, getRequestHeaders }) => ({
+      commerce: buildModule(middlewareModule<UnifiedEndpoints>, {
+        apiUrl: `${middlewareUrl}/commerce`,
+        defaultRequestConfig: { headers: getRequestHeaders() },
      }),
  })
);
```

- **[CHANGED]** deprecate `getCookieHeader`, use `getRequestHeaders` instead

```diff [sdk.config.ts]
export default defineSdkConfig(
-  ({ buildModule, middlewareModule, middlewareUrl, getCookieHeader }) => ({
+  ({ buildModule, middlewareModule, middlewareUrl, getRequestHeaders }) => ({
      commerce: buildModule(middlewareModule<UnifiedEndpoints>, {
        apiUrl: `${middlewareUrl}/commerce`,
-        defaultRequestConfig: { headers: getCookieHeader() }, // Only cookie header is included.
+        defaultRequestConfig: { headers: getRequestHeaders() }, // All headers are included.
      }),
  })
);
```

## 3.0.3

- **[CHANGED]** `@nuxt/kit` locked `3.7.4` version to `@nuxt/kit@^3.7.4`

## 3.0.2

- **[FIXED]** Multi-store URL calculation, now working correctly in the browser.

## 3.0.1

- **[CHANGED]** Set `@vue-storefront/sdk` as a dependency instead of a peer dependency

## 3.0.0

- **[BREAKING]** Rewritten from scratch. Now the package exports a Nuxt module which allows to initialize the Vue Storefront SDK.
