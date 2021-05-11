# Getters

> The getters are closely connected to the composables. If you are not already familiar with the concept, please refer to the composables chapter first.

## What are getters?

Getters are pure functions that allows you to receive properties from objects. They return an agnostic or a primitive type. It makes them independent from the backend, which is used in the project and let you change it without additional work on frontend site.  
Each composable has its own getters object e.g. `cartGetters` named according to values they return, so **you should use getters dedicated for specific composable**. `getCartTotalItems` is one of getters functions accessible as `cartGetters` property. It is utilized to provide a total quantity of items currently present in the cart.

## When should I use them?

The getters are needed when you want to use data in UI components like e.g. quantity of the products that are in the cart currently. **They should always be used whenever it is possible to provide data from objects** such as `cart` or `products`.

## How can I use getters?

In order to use `getTotalItems` you need to import `cartGetters` from your integration and then apply it as the computed property.

```vue
<template>
  <div>
    <!-- ... -->
    <span>
      {{ cartTotalItems }}
    </span>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
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
      cartTotalItems,
    };
  }
}
</script>
```

The getters use arguments like `cart.value` in the function to get the data from. But they need to be extracted from composable `useCart` first.

**It's important to use getters as the computed property** to have them always updated:

```vue
<!-- don't do this: -->
<script>
//...
  export default {
    setup() {
      const cartTotalItems = cartGetters.getTotalItems(cart.value);
      return {
        cartTotalItems
      };
    };
  }
</script>
```

```vue
<!-- instead do this: -->
<script>
//...
  import { computed } from '@vue/composition-api';
  export default {
    setup() {
      const cartTotalItems = computed(() => cartGetters.getTotalItems(cart.value);

      return {
        cartTotalItems,
      };
    }
  }
</script>
```

You can also use getters in template like so:

```vue
<!-- or this: -->
<template>
  <!-- ... -->
  <span>
    {{ cartGetters.getTotalItems(cart) }}
  </span>
</template>
<script>
//...
export default {
  setup() {
    const { cart, load } = useCart();

    onSSR(async () => {
      await load();
    });

    return {
      cart,
      cartGetters
    };
  }
};
</script>
```

## Available Getters

List of all available getters:

### productGetters

composable: useProduct

```js
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

composable: useCart

```js
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

composable: useWishlist

```js
getItems;
getItemName;
getItemImage;
getItemPrice;
getItemQty;
getItemAttributes;
getItemSku;
getTotals;
getTotalItems;
getFormattedPrice;
```

### categoryGetters

composable: useCategory

```js
getTree;
getBreadcrumbs;
```

### userGetters

composable: useUser

```js
getFirstName;
getLastName;
getFullName;
getEmailAddress;
```

### userShippingGetters

composable: useUserShipping

```js
getAddresses;
getDefault;
getTotal;
getId;
getPostCode;
getStreetName;
getStreetNumber;
getCity;
getFirstName;
getLastName;
getCountry;
getPhone;
getEmail;
getProvince;
getCompanyName;
getTaxNumber;
getApartmentNumber;
isDefault;
```

### userBillingGetters

composable: useUserBilling

```js
getAddresses;
getDefault;
getTotal;
getId;
getPostCode;
getStreetName;
getStreetNumber;
getCity;
getFirstName;
getLastName;
getCountry;
getPhone;
getEmail;
getProvince;
getCompanyName;
getTaxNumber;
getApartmentNumber;
isDefault;
```

### userOrderGetters

composable: useUserOrder

```js
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

composable: useReview

```js
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

composable: useFacet

```js
getAll;
getGrouped;
getCategoryTree;
getSortOptions;
getProducts;
getPagination;
getBreadcrumbs;
```
