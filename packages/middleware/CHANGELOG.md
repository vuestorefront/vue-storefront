# Change log

## 3.5.1

### Patch Changes

- Enhanced error handling in **getAxiosStatusCode** for greater reliability, reducing the risk of unexpected errors and crashes when retrieving status codes from Axios errors.

## 3.5.0

### Minor Changes

- Added HTTP `GET` method support. Divided dynamic route logic into smaller, unit-tested middlewares.

## 3.4.0

### Minor Changes

- The `extendApp` callback which can be registered in extensions is now asynchronous and can be awaited to perform necessary operations while building the app.

## 3.3.1

### Patch Changes

- fixed error objects detection

## 3.3.0

### Minor Changes

- Added possibility to pass API methods to createApiClient both as a plain object and a factory.

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

## [3.0.1](<(https://github.com/vuestorefront/middleware/compare/v3.0.0...v3.0.1)> '2023-05-31')

### Bug Fixes

- all 4xx error code respond with error not just generic message (#6)

## 3.0.0

### Chores

- stable release.
