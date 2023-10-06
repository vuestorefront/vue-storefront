---
"@vue-storefront/middleware": patch
---

`getApiClient` helper returns now ApiClient interface

Usage:

```typescript
const sapcc = context.getApiClient<Api, Config, Client>("sapcc");
// typeof sapcc === ApiClient<Api, Config, Client>
```