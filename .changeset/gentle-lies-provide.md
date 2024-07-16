---
"@vue-storefront/middleware": minor
---

[ADDED] Added factory function for the extension API. Previously the extension API was an object with a set of methods. Now it can be created using a factory function the same way as the base API.

Previously only object was allowed:

```ts
export const extension: ApiClientExtension = {
  name: "extension",
  extendApiMethods: {
    ...extendedMethods, //methods as an object
  },
};
```

Now you can either use an object or a factory function:

```ts
export const extension: ApiClientExtension = {
  name: "extension",
  // methods as a factory function with injected config object
  extendApiMethods: ({ config }) => {
    return createMyMethods(config);
  },
};
```
