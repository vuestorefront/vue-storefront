---
"@vue-storefront/next": minor
---

[CHANGE]: Added the `resolveSdkOptions` helper that automatically setup proper SSR & SPA URLs for middleware when multistore option is enabled. To use it, change your SDK configuration:

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
