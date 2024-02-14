---
"@vue-storefront/sdk": patch
---

[FIXED] Make the second generic argument in the `buildModule` function optional. It's not required for the `buildModule` function to have the second argument. In some cases, when the first generic argument was provided, the second one was required.
