---
"@vue-storefront/middleware": patch
---

[FIXED] a potential XSS (Cross-Site Scripting) vulnerability in the middleware. Now, each parameter is properly sanitized and validated before being used in the middleware.
