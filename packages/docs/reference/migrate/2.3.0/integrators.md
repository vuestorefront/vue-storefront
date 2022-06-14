# Migrating eCommerce integrations to 2.3.0

## Introduction

This migration guide helps Integrators make their integrations and plugins compatible with version 2.3.0.

It only contains code examples. For more information about this version, refer to the [Overview](./overview.md) page.

## Changes

- Added E2E (cypress) tests to `boilerplate` theme.

- **[BREAKING]** Changed the signature of `extendApp` in Server Middleware extensions introduced in the previous release from `extendApp(app)` to `extendApp({ app, configuration })`

```typescript
export const customExtension = {
  name: 'customExtension',

  extendApp: ({ app, configuration }: { app: Express, configuration: any }) => {
    app.use(customPlugin(configuration));

    app.get('/customEndpoint', customMiddleware(), (request, response) => {
      //
    });
  }
};
```
