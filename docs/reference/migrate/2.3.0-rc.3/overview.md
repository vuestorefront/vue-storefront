# Migrating projects to 2.3.0-rc.3

## Introduction

This release mainly contains bug fixes and some new features, as we are getting closer to the stable 2.3.0 release.

## Changes

- Fixed `error` property clearing in `useUser`.
- Improved error handling in Server Middleware. When the request to the external backend fails, Server Middleware now returns `HTTP 500` code with the error message in the body.
- Added `extendApp` to Server Middleware extensions (`ApiClientExtension` interface). It allows direct access to the Express server instance.
  
We also made changes to the following files:
- updated `components/LoginModal.vue`,
- updated `layouts/default.vue`,
- removed unused `helpers/filters/getFiltersForUrl.js`,
- removed unused `helpers/filters/getFiltersFromUrl.js`,
- removed unused `helpers/filters/index.js`.
