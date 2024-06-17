# Change log

## 2.1.0

### Minor Changes

- **[ADDED]** Added .config parameter in createSdk callback

### Patch Changes

- Updated dependencies:
  - @vue-storefront/sdk@3.1.0

## 2.0.1

### Patch Changes

- Updated dependencies:
  - @vue-storefront/sdk@3.0.0

## 2.0.0

- **[CHANGED]** Updated the `@vue-storefront/sdk` dependency to version `2.0.0`.
- **[ADDED]** `defaults` property to the injected context

## 1.1.1

- **[FIXED]** "The inferred type of 'SdkProvider' cannot be named without a reference to (...)" error when calling `createSdkContext`.

## 1.1.0

- **[ADDED]** `middlewareModule` to `createSdk` params.

```diff [sdk.config.ts]
- import { UnifiedApiExtension } from "storefront-middleware/types"
+ import { UnifiedEndpoints } from "storefront-middleware/types"

export const { getSdk } = createSdk(
  options,
-  ({ buildModule, middlewareUrl, getRequestHeaders }) => ({
-    commerce: buildModule(unifiedModule<UnifiedApiExtension>, {
-      apiUrl: `${middlewareUrl}/commerce`,
-      requestOptions: {
-        headers: getRequestHeaders,
+  ({ buildModule, middlewareModule, middlewareUrl, getRequestHeaders }) => ({
+    commerce: buildModule(middlewareModule<UnifiedEndpoints>, {
+      apiUrl: `${middlewareUrl}/commerce`,
+      defaultRequestConfig: {
+        headers: getRequestHeaders(),
      },
    }),
  })
);
```

## 1.0.2

- **[FIXED]** Multi-store URL calculation, now working correctly in the browser.

## 1.0.1

- **[CHANGED]** Set `@vue-storefront/sdk` as a dependency instead of a peer dependency

## 1.0.0

- Initialized the package
