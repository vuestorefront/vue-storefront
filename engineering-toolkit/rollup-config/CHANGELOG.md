# @vue-storefront/rollup-config

## 1.0.0

### Major Changes

- **[CHANGED]** Changed minimum Node version from 16 to 18. The condition that was forcing the Node version to be lower than 19 is also removed.

## 0.0.8

### Patch Changes

- [CHANGED] Always clear rollup-plugin-typescript2 cache when building. If you built once with an error, you'd always get an error even if you fixed the underlying code issue that caused the build to fail. This could be fixed by removing node_modules/.cache, but it's better to never create the cache at all.

## 0.0.7

### Patch Changes

- c8b0d48: [FIXED] issue with Unexpected token when jsons are being build, now it will build properly.

## 0.0.6

### Patch Changes

- 316688d: Fix buiding output for server package in api-clients
