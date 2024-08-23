---
"@vue-storefront/sdk": patch
---

[CHANGED] response type of HTTPClient to `Promise<any>`. Previously it was `Promise<true> | SdkHttpError`, which was making it impossible the use of an `axios` with the `middlewareModule`. Now, it more flexible and can be used with any HTTP client.
