---
"@vue-storefront/middleware": minor
---

[ADDED] an `init` function to the `apiClientFactory` parameters. It reduces boilerplate code and helps with type suggestions of the input and output of the function.

```diff
- const init = (config) => {
-   return {
-     ...config,
-     client: buildClient(config),
-   }
- }

- const { createApiClient } = apiClientFactory({
+ const { createApiClient, init } = apiClientFactory({
  onCreate: (config) => config,
  api: { ... }
+  init: (config) => {
+    return {
+      ...config,
+      client: buildClient(config),
+    }
+  },
})

export const { createApiClient, init };
```
