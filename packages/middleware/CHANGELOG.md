# @vue-storefront/middleware

## 3.6.1

### Patch Changes

- 3335b9b48: `getApiClient` helper returns now ApiClient interface

  Usage:

  ```typescript
  const sapcc = context.getApiClient<Api, Config, Client>("sapcc");
  // typeof sapcc === ApiClient<Api, Config, Client>
  ```

## 3.6.0

### Minor Changes

- 1caa56efb: Add orchestration possibility by receiving loaded integrations from `context`
- 1caa56efb: Extend `IntegrationContext` type with `MiddlewareContext`
- 1caa56efb: Add new interface: `ApiClient`

### Patch Changes

- 1caa56efb: Remove singleton app from createServer function

## 3.5.1

### Patch Changes

- f8a7893: Enhanced error handling in **getAxiosStatusCode** for greater reliability, reducing the risk of unexpected errors and crashes when retrieving status codes from Axios errors.

## 3.5.0

### Minor Changes

- 50a0cd7: Added HTTP `GET` method support. Divided dynamic route logic into smaller, unit-tested middlewares.

## 3.4.0

### Minor Changes

- e2ff011: The `extendApp` callback which can be registered in extensions is now asynchronous and can be awaited to perform necessary operations while building the app.

## 3.3.1

### Patch Changes

- 5df8936: Fixed error objects detection

## 3.3.0

### Minor Changes

- 93e7c7c: Added possibility to pass API methods to createApiClient both as a plain object and a factory.

## 3.2.1

### Patch Changes

- Removed terser from the build process

## 3.2.0

### Features

- expose integration methods inside extensions context
- make integration name available within the `extendApp` extension method

## 3.1.0

### Features

- add configurable error handler

## 3.0.1

### Bug Fixes

- all 4xx error code respond with error not just generic message (#6)

## 3.0.0

This release decoupled the middleware from the core.

### Chores

- stable release.
