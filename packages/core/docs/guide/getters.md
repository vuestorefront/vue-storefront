# Getters

## What are getters?

Getters are pure functions that allows you to receive properties from objects. They return an agnostic or primitive type. It makes them independent from the backend, which is used in the project and let you change it without additional work on frontend site.  
Each composable has its own getters e.g. `cartGetters` named according to values they return, so you need to use proper getters for every composable. `getCartTotalItems` is utilized to reach total quantity of items currently present in the cart.

## When should I use them?

Getters are needed when you want to use data in UI components like e.g. quantity of the products that are in the cart currently. They should always be used whenever it is possible to provide data from objects like `cart` or `product`.

## How can I use getters?

In order to use `getTotalItems` you need to import `cartGetters` from your integration and then apply it as the computed property. The getters use object `cart` as the argument in the function to get the data from, so it should be decomposed from proper composable function `useCart`.

```vue
<template>
  <div>
    //...
    <span>
      {{ cartTotalItems }}
    </span>
  </div>
</template>

<script>
import { useCart, cartGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
	setup() {
		const { cart, load } = useCart();
		const cartTotalItems = computed(() => cartGetters.getTotalItems(cart.value);

		onSSR(async () => {
			await load();
		});

		return {
			cart,
			load,
			cartTotalItems,
		};
	}
}
</script>
```

It's important to use getters as the computed property to have them always updated:

```vue
<script>
// don't do this
//...
const cartTotalItems = cartGetters.getTotalItems(cart.value);
</script>
```

```vue
<script>
// instead do this
//...
const cartTotalItems = computed(() => cartGetters.getTotalItems(cart.value);
</script>
```

## Available Getters

List of all available getters:

### productGetters

```ts
getName;
getSlug;
getPrice;
getGallery;
getCoverImage;
getFiltered;
getAttributes;
getDescription;
getCategoryIds;
getId;
getFormattedPrice;
getTotalReviews;
getAverageRating;
getBreadcrumbs;
```

### cartGetters

```ts
getItems;
getItemName;
getItemImage;
getItemPrice;
getItemQty;
getItemAttributes;
getItemSku;
getTotals;
getShippingPrice;
getTotalItems;
getFormattedPrice;
getCoupons;
getDiscounts;
```

### wishlistGetters

```ts
getItems;
getItemName;
getItemImage;
getItemPrice;
getItemAttributes;
getItemSku;
getTotals;
getTotalItems;
getFormattedPrice;
```

### categoryGetters

```ts
getTree;
getBreadcrumbs;
```

### userGetters

```ts
getShippingMethodId;
getShippingMethodName;
getShippingMethodDescription;
getShippingMethodPrice;
getFormattedPrice;
```

### checkoutGetters

```ts
getShippingMethodId;
getShippingMethodName;
getShippingMethodDescription;
getShippingMethodPrice;
getFormattedPrice;
```

### userOrderGetters

```ts
getDate;
getId;
getStatus;
getPrice;
getItems;
getItemSku;
getItemName;
getItemQty;
getItemPrice;
getFormattedPrice;
```

### reviewGetters

```ts
getItems;
getReviewId;
getReviewAuthor;
getReviewMessage;
getReviewRating;
getReviewDate;
getTotalReviews;
getAverageRating;
getRatesCount;
getReviewsPage;
```

### facetsGetters

```ts
getAll;
getGrouped;
getCategoryTree;
getSortOptions;
getProducts;
getPagination;
getBreadcrumbs;
```
