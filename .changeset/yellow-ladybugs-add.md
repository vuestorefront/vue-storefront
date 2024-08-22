---
"@vue-storefront/sdk": patch
---

[FIXED]: `Content-Length` header will no longer be appended to requests if its value is "0" - such situation caused Next.js server to crash
