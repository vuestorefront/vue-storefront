---
platform: Commercetools
---

<IncludeContent content-key="use-wishlist" />



::: slot usage

## Usage

When you already installed `@vsf-enterprise/ct-wishlist` as a dependency, there are few minor modifications required to make it work.

The first step is to add `@vsf-enterprise/ct-wishlist` to `build > transpile` array in `nuxt.config.js`.

Then we need to replace the import of `useWishlist` and `wishlistGetters` everywhere they are used from `@vue-storefront/commercetools` to `@vsf-enterprise/ct-reviews`:

```javascript
// Before
import { /* other imports */, useWishlist, wishlistGetters } from '@vue-storefront/commercetools';

// After
import { /* other imports */ } from '@vue-storefront/commercetools';
import { useWishlist, wishlistGetters } from '@vsf-enterprise/ct-wishlist';
```
