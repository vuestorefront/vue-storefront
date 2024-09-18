# Change log

## 4.1.1

### Patch Changes

- Updated dependencies:
  - @vue-storefront/middleware@5.0.0

## 4.1.0

### Minor Changes

- **[ADDED]** Support for asynchronous `fetchConfiguration()` and cacheManagerFactory's `get()` / `set()` methods.

```diff
import { createMultistoreExtension } from "@vue-storefront/multistore";

export const multistoreExtension = createMultistoreExtension({
- fetchConfiguration: () => ({
+ fetchConfiguration: async () => ({ ... }),
  mergeConfigurations: () => ({ ... }),
  cacheManagerFactory: () => ({
-   get(key) { ... },
+   async get(key) { ... },
-   set(key, value) { ... },
+   async set(key, value) { ... },
  }),
});

```

## 4.0.0

### Major Changes

- **[CHANGED]** Changed minimum Node version from 16 to 18. The condition that was forcing the Node version to be lower than 19 is also removed.

### Patch Changes

- Updated dependencies:
  - @vue-storefront/middleware@4.0.0

## 3.0.0

### Patch Changes

- Updated dependencies:
  - @vue-storefront/middleware@3.9.0

```diff [package.json]
dependencies: {
-  "@vue-storefront/middleware": "3.x.x",
-  "@vue-storefront/multistore": "2.x.x",
+  "@vue-storefront/middleware": "^3.9.0",
+  "@vue-storefront/multistore": "^3.0.0",
}
```

## 2.0.1

### Patch Changes

- d95379e91: [FIXED] Type issue in multistore package. Cache control `set` method returns `any` type and `get` returns `StoreConfig | undefined`. Also, `MiddlewareConfiguration` type has been removed as it is no longer necessary.

## 2.0.0

### Major Changes

- 8ea533e05: [CHANGED] We standardized the way of creating and configuring multistore extension.
  Previously, the extension was created by importing `multistoreExtension` from `@vue-storefront/multistore` and passing it to the `extensions` function.
  Configuration was passed to the extension by adding `multistore` property to the `configuration` object.
  Now, the extension is created by calling `createMultistoreExtension` from `@vue-storefront/multistore` and passing the multistore configuration to it.

  ```diff [middleware.config.ts]
  - import { multistoreExtension } from "@vue-storefront/multistore";
  + import { createMultistoreExtension } from "@vue-storefront/multistore";
  import { multistoreConfig } from "./multistore.config";

  export default {
    integrations: {
      sapcc: {
        location: "@vue-storefront/sapcc-api/server",
        configuration: {
          // ...
  -        multistore: multistoreConfig,
        },
        extensions: (predefinedExtensions) => [
          ...predefinedExtensions,
  -        multistoreExtension,
  +        createMultistoreExtension(multistoreConfig),
        ],
      },
    },
  };
  ```

- 8ea533e05: [FIXED] singleton cache issue, previously the cache was a singleton which could lead to unexpected behaviour when extension was used in different integrations in parallel. Now, the cache is being created during extension creation, what ensures proper cache behaviour.

## 1.0.2

### Patch Changes

- 3410b778a: [FIXED] Unified Multistore not exposing types at its entrypoint; previously, type definitions were inaccessible, leading to integration issues. Now, types are correctly exposed, enhancing TypeScript integration and accessibility.
