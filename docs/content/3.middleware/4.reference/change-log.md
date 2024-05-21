# Change log

## 4.0.0

### Major Changes

- **[CHANGED]** Changed minimum Node version from 16 to 18. The condition that was forcing the Node version to be lower than 19 is also removed.

## 3.10.0

### Minor Changes

- **[ADDED]** Options as a second parameter of `createServer`. This allows you to pass additional options to `cors`, `body-parser` and `cookie-parser` express middlewares.

```ts
import { createServer } from "@vue-storefront/middleware";
import config from "../middleware.config";

createServer(config, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
  bodyParser: {
    limit: "50mb",
  },
  cookieParser: {
    secret: "secret",
  },
});
```

- **[ADDED]** `http://localhost:4000` to the default cors origin.

## 3.9.0

### Minor Changes

- 712ba85a6: [ADDED] Adds WithoutContext type helper.

  ```ts
  type ApiClientMethods = {
    getProduct: (context: any, id: string) => Promise<Product>;
  };

  type Endpoints = WithoutContext<ApiClientMethods>;
  ```

## 3.8.1

### Patch Changes

- c4534b523: [CHANGED] Returning HTTP Code 408 in case of ECONNABORTED from 3rd party service, and 500 in case of ECONNRESET instead of general fallback to HTTP Code 500, to provide more precise information about the case.

## 3.8.0

### Minor Changes

- 1e9fe5366: It is now possible to add namespaced extensions to integrations. Namespaced extensions are registered under `/{integration-name}/{extension-name}` extension of integration's namespace in opposition to non-namespaced extensions which are registered under `/{integration-name}` integration's namespace. Default value is `false`. Extensions without a namespace can potentially override existing endpoints, so it's recommended to use namespaced extensions whenever possible.

  Read more about extensions in our [docs](https://docs.vuestorefront.io/middleware/guides/extensions).

## 3.7.1

### Patch Changes

- 76e5f92e6: Fix the issue with error handling during the timeouted requests

## 3.7.0

### Minor Changes

- 496bfb840: Hide error data from the response, now only the message will be exposed to the client.

## 3.6.2

### Patch Changes

- 6c769c7a8: Fix status code resolving for the apollo client

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
