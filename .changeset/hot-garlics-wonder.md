---
"@vue-storefront/nuxt": minor
---

[ADDED] Value of Busting ID for CDN Cache. You can access it via `config.cdnCacheBustingId`.
[CHANGED] Deprecated `middlewareUrl` in `defineSdkConfig` context. Use `config.middlewareUrl` instead.
[CHANGED] Deprecated `defaults` in `defineSdkConfig` context. Use `config.defaultMethodsRequestConfig` instead.
[CHANGED] Depreacted `vsf` key in RuntimeConfig. Use `alokai` instead. You should change you environment variables. Example: Change from `NUXT_PUBLIC_VSF_MIDDLEWARE_API_URL` to `NUXT_PUBLIC_ALOKAI_MIDDLEWARE_API_URL`.
[CHANGED] Internal naming changed from VSF to Alokai. For e.g. we inject the SDK into the `$alokai` key in Nuxt App instead of `$vsf` as in previous versions.
