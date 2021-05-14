# Migration guide 2.3.0-rc.3 for commercetools

## Introduction

This migration guide helps developers using our `commercetools` integration to upgrade to version 2.3.0-rc.3.

For more information about this version, refer to the [Overview](./overview.md) page.

## Changes

- Fixed mapping for product attributes with type `set`.
- Fixed cart getters to not throw errors when some properties are missing.
- Fixed error thrown by the Composition API plugin when importing `useWishlist`.

We also made changes to the following files:
- updated `components/Checkout/VsfShippingProvider.vue`,
- deleted unused `packages/commercetools/theme/helpers/filters/getFiltersForUrl.js`,
- deleted unused `packages/commercetools/theme/helpers/filters/getFiltersFromUrl.js`.
