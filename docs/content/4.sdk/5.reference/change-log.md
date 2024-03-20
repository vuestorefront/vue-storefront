# Change log

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
