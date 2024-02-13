---
"@vue-storefront/sdk": patch
---

[FIXED] Resolved an issue where the `option` parameter type resolution in the `buildModule` function was not working correctly. The `options` parameter is now required or optional, depending on the module implementation.
