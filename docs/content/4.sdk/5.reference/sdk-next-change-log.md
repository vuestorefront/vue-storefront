# Change log: `@vue-storefront/next`

## 4.2.0

### Minor Changes

- **[CHANGED]** `defaultMethodsRequestConfig`, so the `getCategory`, and `getPage` methods will use `GET` request as a default.

## 4.1.1

### Patch Changes

- **[CHANGED]** the package `@vue-storefront/sdk` is now a peer dependency instead of dependency

## 4.1.0

### Minor Changes

- **[CHANGE]**: Added the `resolveSdkOptions` helper that automatically setup proper SSR & SPA URLs for middleware when multistore option is enabled. To use it, change your SDK configuration:

```diff
-import type { CreateSdkOptions } from '@vue-storefront/next';
+import { resolveSdkOptions } from '@vue-storefront/next';

-const options: CreateSdkOptions = {
+const options = resolveSdkOptions({
  middleware: {
    apiUrl,
    cdnCacheBustingId,
    ssrApiUrl,
  },
  multistore: {
    enabled: isMultiStoreEnabled,
  },
});
```

## 4.0.0

### Major Changes

- **[ADDED]** global state management with Zustand. This will allow you to keep your global state in a more organized way.
  It shares the data about:
- cart
- customer
- currency
- locale

This change will require you to refactor your hooks to make use of the introduced state manager.
As this is only a state management, you will still need to use the hooks to fetch the data and put it into the state.

To make use of the new state solution you will need to change the file `sdk/sdk-context.ts`.

```ts
// before
"use client";

import { createSdkContext } from "@vue-storefront/next/client";

import type { Sdk } from "./sdk.server";

export const [SdkProvider, useSdk] = createSdkContext<Sdk>();
```

```ts
// after
"use client";

import { createAlokaiContext } from "@vue-storefront/next/client";
import type { SfContract } from "storefront-middleware/types";

import type { Sdk } from "./sdk.server";

export const {
  AlokaiProvider,
  useSdk,
  useSfCartState,
  useSfCurrenciesState,
  useSfCurrencyState,
  useSfCustomerState,
  useSfLocaleState,
  useSfLocalesState,
} = createAlokaiContext<Sdk, SfContract>();
```

The type `SfContract` is a type that represents the contract between the middleware and the state manager.
It is delivered out of the box.

Example of usage:

```tsx
import { useQuery } from "@tanstack/react-query";
import {
  useSdk,
  useSfCartState,
  useSfCustomerState,
  useSfCurrencyState,
  useSfLocaleState,
} from "@/sdk/alokai-context";

function Component() {
  const sdk = useSdk();
  const [cart, setCart] = useSfCartState();
  const [customer] = useSfCustomerState();
  const [currency] = useSfCurrencyState();
  const [locale] = useSfLocaleState();

  const result = useQuery({
    queryFn: () => sdk.unified.getCart(),
    queryKey: ["cart", "main"],
  });
  // updating the cart state
  useEffect(() => {
    setCart(result.data);
  }, [result.data]);

  return (
    <div>
      <p>Cart total: {cart.total}</p>
      <p>
        Customer name: {customer.firstName} {customer.lastName}
      </p>
      <p>Currency: {currency}</p>
      <p>Locale: {locale}</p>
    </div>
  );
}
```

- **[BREAKING]** [CHANGED] the function `createSdkContext` exported from the `client` is changed to `createAlokaiContext`.
  Also, it no longer returns an array with two elements, but an object with multiple properties.
  This change is related to the fact that now it not only provide SDK context but also global state management context and hooks for handling it.

```diff
- import { createSdkContext } from '@vue-storefront/next/client';
+ import { createAlokaiContext } from '@vue-storefront/next/client';
```

### Patch Changes

- Updated dependencies:
  - @vue-storefront/sdk@3.2.0

## 3.0.1

### Patch Changes

**[FIXED]**: Added getCurrencies unified endpoint to be fetch by HTTP GET. This change enable caching this endpoint on CDN.

## 3.0.0

### Major Changes

**[BREAKING CHANGE]**: Now the SDK is separately initialized on the server and client. We recommend splitting configuration files for SDK Options and Configuration to re-use them between instances. Introduce the `defineSdkConfig` helper function. Changed the `SdkProvider` interface, taking only type and no arguments. The SDK instance is passed to the Provider in the place where it's used.

### Minor Changes

**[ADDED]** Value of Busting ID for CDN Cache. You can access it via `config.cdnCacheBustingId`.
**[CHANGED]** Deprecated `middlewareUrl` in `defineSdkConfig` context. Use `config.middlewareUrl` instead.
**[CHANGED]** Deprecated `defaults` in `defineSdkConfig` context. Use `config.defaultMethodsRequestConfig` instead.

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
