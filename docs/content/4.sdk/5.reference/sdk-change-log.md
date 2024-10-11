# Change log: `@vue-storefront/sdk`

## 3.2.3

### Patch Changes

- **[FIXED]** Headers with same name will now have their values merged using the ";' delimiter, rather than ",". This is seen when middleware and defaultRequestConfig set the same header - e.g. `Cookie`.

After this change, `Cookie: vsf-locale=en` + `Cookie: custom-cookie=123` will result in `Cookie: vsf-locale=en; custom-cookie=123`, rather than being wrongly separated by `,`.

## 3.2.2

### Patch Changes

- **[CHANGED]** response type of HTTPClient to `Promise<any>`. Previously it was `Promise<true> | SdkHttpError`, which was making it impossible the use of an `axios` with the `middlewareModule`. Now, it more flexible and can be used with any HTTP client.

## 3.2.1

### Patch Changes

**[FIXED]** `Content-Length` header will no longer be appended to requests if its value is "0" - such situation caused Next.js server to crash

## 3.2.0

### Minor Changes

- **[ADDED]** `logger` option to the `middlewareModule` config. This option allows you to turn on/off the logging of the SDK requests and responses or to provide a custom logger function.

```diff
import { initSDK, buildModule, middlewareModule } from "@vue-storefront/sdk";
import { Endpoints } from "@vsf-enterprise/sapcc-api";

const sdk = initSDK({
  commerce: buildModule(middlewareModule<Endpoints>, {
    apiUrl: "http://localhost:8181/commerce",
+   logger: true,
  }),
});
```

Logger can be also turned on by setting the `ALOKAI_SDK_DEBUG` environment variable to `true`.

## 3.1.1

### Patch Changes

- **[CHANGED]** handle error for not available middleware

## 3.1.0

### Minor Changes

- **[CHANGED]** cdnCacheBustingId is now optional

## 3.0.0

### Major Changes

- **[CHANGED]** Changed minimum Node version from 16 to 18. The condition that was forcing the Node version to be lower than 19 is also removed.

## 2.0.0

### Major Changes

- **[ADDED]** CDN support for the `middlewareModule`.
  Now, the module's configuration includes `cdnCacheBustingId` property, which allows you to set a unique identifier for the CDN cache busting.
  **The property is obligatory and must be a string.**

```diff [sdk.config.ts]

export const { getSdk } = createSdk(
  options,
  ({ buildModule, middlewareModule, middlewareUrl, getRequestHeaders }) => ({
    example: buildModule(middlewareModule<Endpoints>, {
      apiUrl: `${middlewareUrl}/test_integration`,
+      cdnCacheBustingId: process.env.CDN_CACHE_BUSTING_ID,
      defaultRequestConfig: {
        headers: getRequestHeaders(),
      },
    }),
  })
);
```

### Patch Changes

- **[FIXED]** support for `GET` requests in default HTTP client, which was throwing an error "SDKError: Request with GET/HEAD method cannot have body". Now, the client can handle `GET` requests properly.

## 1.5.0

### Minor Changes

- **[ADDED]** a way to specify the default request configuration for each method.

Example: Set the `getProducts` method to be a `GET` request by default and use custom headers.

```typescript
import { initSDK, buildModule, middlewareModule } from "@vue-storefront/sdk";
import { Endpoints } from "@vsf-enterprise/sapcc-api";

const sdk = initSDK({
  commerce: buildModule(middlewareModule<Endpoints>, {
    apiUrl: "http://localhost:8181/commerce",
    methodsRequestConfig: {
      getProduct: {
        method: "GET",
        headers: {
          "X-Header-Name": "Header-Value",
        },
      },
    },
  }),
});
```

## 1.4.4

### Patch Changes

- **[FIXED]** type issue with obligatory generic type argument for `Extension` interface. Now, it can be used without any type arg.
- **[FIXED]** BaseConfig extensibility. Now, it allows to add additional custom properties.

## 1.4.3

### Patch Changes

- **[FIXED]** issue with type inference. Previously, types were not infered properly when there were no extension declared. Now it has been fixed.

## 1.4.2

### Patch Changes

- **[FIXED]** handling void response in `middlewareModule`. Previously an invalid-json error was thrown, now undefined will be returned.

## 1.4.1

### Patch Changes

- **[FIXED]** error handling for default HTTP client. Default HTTP Client was not throwing an error on each failed request, now it does.

## 1.4.0

### Minor Changes

- **[ADDED]** New SDK module - `middlewareModule`. It is a recommended way to communicate with the Server Middleware.

### Patch Changes

- **[CHANGED]** SDK extension allows now to override module methods in `extend` property.

## 1.3.4

### Patch Changes

- **[CHANGED]** Updated `buildModule` function to work well with modules, whether they have optional or mandatory options.

- Simplified how `buildModule` is set up,
- Added a new type, `ModuleInitializerWithMandatoryOptions`.

## 1.3.3

### Patch Changes

- **[FIXED]** `buildModule` types in tsconfig strict mode

## 1.3.2

### Patch Changes

- 44c067dff: [FIXED] Make the second generic argument in the `buildModule` function optional. It's not required for the `buildModule` function to have the second argument. In some cases, when the first generic argument was provided, the second one was required.

## 1.3.1

### Patch Changes

- 72826cd11: [FIXED] Resolved an issue where the `option` parameter type resolution in the `buildModule` function was not working correctly. The `options` parameter is now required or optional, depending on the module implementation.

## 1.3.0

### Minor Changes

- feec8789d: [ADDED] in this release we allowed extension to use module methods, access module configuration and optional context object. For more information please visit documentation about [extending modules](https://docs.vuestorefront.io/sdk/advanced/extending-module#extend).

## 1.2.2

### Patch Changes

- 62d5457fa: [CHANGED]
  - Previously, developers trying to create the sdkConfig object received very few suggestions, either while passing the module configuration object, or while working with the extensions. They were also able to create overrides with signatures different from the original methods which we strongly advise against. We adjusted the types to make the process of creating the sdkConfig object easier and more intuitive. We also added more suggestions to the extensions and options objects.

## 1.2.1

### Patch Changes

- 62d5457fa: [CHANGED]
  - Previously, developers trying to create the sdkConfig object received very few suggestions, either while passing the module configuration object, or while working with the extensions. They were also able to create overrides with signatures different from the original methods which we strongly advise against. We adjusted the types to make the process of creating the sdkConfig object easier and more intuitive. We also added more suggestions to the extensions and options objects.

## 1.2.0

### Minor Changes

- ad50ec8c8: Add around interceptors

## 1.1.1

### Patch Changes

- fix: prevent registering the same event multiple times

## 1.1.0

### Minor Changes

- Added handling of connectors implemented as proxy objects
