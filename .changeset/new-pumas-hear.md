---
"@vue-storefront/sdk": patch
---

[FIXED] handling void response in `middlewareModule`. Previously an invalid-json error was thrown, now undefined will be returned.
