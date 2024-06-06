---
"@vue-storefront/middleware": major
---

[CHANGED] Middleware extension hooks now allow for performing asynchronous operations. Example:

```ts
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
