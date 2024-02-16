---
"@vue-storefront/multistore": patch
---

[FIXED] Type issue in multistore package. Cache control `set` method can return `any` type and `get` method can return `undefined`. Also, `MiddlewareConfiguration` type has been removed as it is no longer necessary.
