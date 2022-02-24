# Migrating eCommerce integrations to 2.3.0-rc.3

## Introduction

This migration guide helps Integrators make their integrations and plugins compatible with version 2.3.0-rc.3.

It only contains code examples. For more information about this version, refer to the [Overview](./overview.md) page.

## Changes

- Added `extendApp` to Server Middleware extensions (`ApiClientExtension` interface). It allows direct access to the Express server instance.

```typescript
export const customExtension = {
  name: 'customExtension',

  extendApp: (app: Express) => {
    app.use(customPlugin());

    app.get('/customEndpoint', customMiddleware(), (request, response) => {
      //
    });
  }
};
```
