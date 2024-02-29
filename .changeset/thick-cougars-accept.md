---
"@vue-storefront/middleware": patch
---

[ADDED] Adds WithoutContext type helper.

```ts
type ApiClientMethods = {
  getProduct: (context: any, id: string) => Promise<Product>;
};

type Endpoints = WithoutContext<ApiClientMethods>;
```
