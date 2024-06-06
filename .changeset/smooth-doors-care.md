---
"@vue-storefront/middleware": major
---

[CHANGED] Middleware extension hooks and the `onCreate` function can now be asynchronous. Examples:

```ts
// middleware.config.ts
const middlewareExtension = {
  name: 'example-extension',
  hooks: () => ({
    beforeCreate: async ({ configuration }) => Promise.resolve(configuration),
    afterCreate: async ({ configuration }) => Promise.resolve(configuration),
    beforeCall: async ({ args }) => Promise.resolve(args),
    afterCall: async ({ response }) => Promise.resolve(response),
  }),
}
```

```ts
// index.server.ts
import { apiClientFactory } from '@vue-storefront/middleware';

const { createApiClient } = apiClientFactory({
  onCreate: async (config) => Promise.resolve({
    config,
    client: {}
  }),
  api: {},
});

export { createApiClient };
```
