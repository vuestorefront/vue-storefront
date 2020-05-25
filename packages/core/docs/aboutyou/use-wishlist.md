---
platform: AboutYouCloud
---


<IncludeContent content-key="use-wishlist" />

::: slot wishlist-interface
```javascript
export interface WishlistResponseData {
    key: string;
    items: WishlistItem[];
}
export interface WishlistItem {
    key: string;
    product?: BapiProduct;
    variant?: Variant;
}
```
:::

::: slot wishlist-initialization
```javascript
import { onSSR } from '@vue-storefront/core';
import { useWishlist } from '@vue-storefront/about-you';

export default {
  setup() {
    const { wishlist, addToWishlist, loadWishlist } = useWishlist();

    onSSR(async () => {
      await loadWishlist();
    });

    return {
      wishlist,
      addToWishlist
    };
  }
};
```
:::
