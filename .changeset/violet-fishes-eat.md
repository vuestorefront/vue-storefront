---
"@vue-storefront/sdk": minor
---

[ADDED] a way to specify the default request configuration for each method.

Example: Set the `getProducts` method to be a `GET` request by default and use custom headers.

```typescript
import { initSDK, buildModule, middlewareModule } from "@vue-storefront/sdk";
import { Endpoints } from "@vsf-enterprise/sapcc-api";

const sdk = initSDK({
  commerce: buildModule(middlewareModule<Endpoints>, {
    apiUrl: "http://localhost:8181/commerce",
    methodsRequestConfig: {
      getProduct: {
        method: "GET",
        headers: {
          "X-Header-Name": "Header-Value",
        },
      },
    },
  }),
});
```
