---
"@vue-storefront/sdk": patch
---

[FIXED] support for `GET` requests in default HTTP client, which was throwing an error "SDKError: Request with GET/HEAD method cannot have body". Now, the client can handle `GET` requests properly.
