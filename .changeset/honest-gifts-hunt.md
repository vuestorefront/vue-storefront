---
"@vue-storefront/multistore": minor
---

[ADDED] Support for asynchronous `fetchConfiguration()` and cacheManagerFactory's `get()` / `set()` methods.

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
