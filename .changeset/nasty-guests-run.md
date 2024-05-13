---
"@vue-storefront/sdk": major
---

[ADDED] CDN support for the `middlewareModule`.
Now, the module's configuration includes `cdnCacheBustingId` property, which allows you to set a unique identifier for the CDN cache busting.
**The property is obligatory and must be a string.**

```diff [sdk.config.ts]

export const { getSdk } = createSdk(
  options,
  ({ buildModule, middlewareModule, middlewareUrl, getRequestHeaders }) => ({
    example: buildModule(middlewareModule<Endpoints>, {
      apiUrl: `${middlewareUrl}/test_integration`,
+      cdnCacheBustingId: process.env.CDN_CACHE_BUSTING_ID,
      defaultRequestConfig: {
        headers: getRequestHeaders(),
      },
    }),
  })
);
```
