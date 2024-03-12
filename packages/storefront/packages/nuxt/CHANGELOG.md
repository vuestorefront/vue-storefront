# Change log

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
