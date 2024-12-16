---
"@vue-storefront/middleware": patch
---

- **[FIXED]** Fix /readyz returning 503 if readinessProbes not passed in middleware.config.ts

Before this fix, sending a GET request to `http://localhost:4000/readyz` would return { "status": "error" } and a HTTP 503 status. This happened only when `readinessProbes` wasn't added to middleware options (the default behavior)
