---
"@vue-storefront/middleware": minor
---

[CHANGED] [Middleware extension](https://docs.alokai.com/middleware/guides/extensions) hooks and the [onCreate](https://docs.alokai.com/middleware/guides/api-client#creating-the-integration-client) function can now be asynchronous. Examples:

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
