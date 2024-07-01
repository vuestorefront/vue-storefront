---
"@vue-storefront/middleware": minor
---

[ADDED] Provided easy access to methods added by middleware extensions via the `context.extendedApi` property.

```ts
const extensionA = {
  name: 'extensionA',
  extendApiMethods: {
    methodA: async () => { ... }
  }
}

const extensionB = {
  name: 'extensionB',
  extendApiMethods: {
    methodB: async () => { ... }
  }
}

const extensionC = {
  name: 'extensionC',
  extendApiMethods: {
    methodC: async (context) => {
      context.extendedApi.methodA();
      context.extendedApi.extensionB.methodB();
    }
  }
}
```
