---
"@vue-storefront/multistore": patch
---

[FIXED] Type issue in multistore package. Cache control `set` method returns `any` type and `get` returns `StoreConfig | undefined`. Also, `MiddlewareConfiguration` type has been removed as it is no longer necessary.
