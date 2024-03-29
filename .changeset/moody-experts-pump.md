---
"@vue-storefront/middleware": patch
---

- **[CHANGED]** Fix typo in default error handler
  Now the default error message for error responses bearing a 4xx status code will be
  "Request failed with status code ${status}" instead of "Request faileds [...]".
