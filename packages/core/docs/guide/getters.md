# Getters

## What are getters?

Getters are pure functions that allows you to receive properties from objects. They return an agnostic or primitive type. Each composable has its own getters e.g. `cartGetters` named according to values they return e.g. `getCartTotalItems` utilized to reach total quantity of items currently in the cart. 

## When should I use them? 

Getters are needed when you want to use data in UI components e.g. quantity of the products that are in the cart currently. 

As you can see on below example to access number of products in the cart you need to import the function from your integration package and set `getTotalItems` as computed property which then can be utlized in the component.   

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
What if we woudln't use getters to access data?  

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
	import { useCart } from '{INTEGRATION}';
	import { onSSR } from '@vue-storefront/core';

	export default {
		setup() {
			const { cart, load } = useCart();
			const cartTotalItems = computed(() => cart.lineItems.reduce((previous, current) => previous + current.quantity, 0)

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

## How can I use getters?


## Available Getters 

List of all available getters:

### productGetters 
```ts
	getName: (product: PRODUCT) => string;
	getSlug: (product: PRODUCT) => string;
	getPrice: (product: PRODUCT) => AgnosticPrice;
	getGallery: (product: PRODUCT) => AgnosticMediaGalleryItem[];
	getCoverImage: (product: PRODUCT) => string;
	getFiltered: (products: PRODUCT[], filters?: PRODUCT_FILTER) => PRODUCT[];
	getAttributes: (products: PRODUCT[] | PRODUCT, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
	getDescription: (product: PRODUCT) => string;
	getCategoryIds: (product: PRODUCT) => string[];
	getId: (product: PRODUCT) => string;
	getFormattedPrice: (price: number) => string;
	getTotalReviews: (product: PRODUCT) => number;
	getAverageRating: (product: PRODUCT) => number;
	getBreadcrumbs?: (product: PRODUCT) => AgnosticBreadcrumb[];
```

### cartGetters
```ts
	getItems: (cart: CART) => CART_ITEM[];
	getItemName: (cartItem: CART_ITEM) => string;
	getItemImage: (cartItem: CART_ITEM) => string;
	getItemPrice: (cartItem: CART_ITEM) => AgnosticPrice;
	getItemQty: (cartItem: CART_ITEM) => number;
	getItemAttributes: (cartItem: CART_ITEM, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
	getItemSku: (cartItem: CART_ITEM) => string;
	getTotals: (cart: CART) => AgnosticTotals;
	getShippingPrice: (cart: CART) => number;
	getTotalItems: (cart: CART) => number;
	getFormattedPrice: (price: number) => string;
	getCoupons: (cart: CART) => AgnosticCoupon[];
	getDiscounts: (cart: CART) => AgnosticDiscount[];
```

### wishlistGetters
```ts
	getItems: (wishlist: WISHLIST) => WISHLIST_ITEM[];
	getItemName: (wishlistItem: WISHLIST_ITEM) => string;
	getItemImage: (wishlistItem: WISHLIST_ITEM) => string;
	getItemPrice: (wishlistItem: WISHLIST_ITEM) => AgnosticPrice;
	getItemAttributes: (wishlistItem: WISHLIST_ITEM, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
	getItemSku: (wishlistItem: WISHLIST_ITEM) => string;
	getTotals: (wishlist: WISHLIST) => AgnosticTotals;
	getTotalItems: (wishlist: WISHLIST) => number;
	getFormattedPrice: (price: number) => string;
```

### categoryGetters
```ts
	getTree: (category: CATEGORY) => AgnosticCategoryTree | null;
	getBreadcrumbs?: (category: CATEGORY) => AgnosticBreadcrumb[];
```

### userGetters 
```ts
	getShippingMethodId: (shippingMethod: SHIPPING_METHOD) => string;
	getShippingMethodName: (shippingMethod: SHIPPING_METHOD) => string;
	getShippingMethodDescription: (shippingMethod: SHIPPING_METHOD) => string;
	getShippingMethodPrice: (shippingMethod: SHIPPING_METHOD) => number;
	getFormattedPrice: (price: number) => string;
```

### checkoutGetters
```ts
	getShippingMethodId: (shippingMethod: SHIPPING_METHOD) => string;
  getShippingMethodName: (shippingMethod: SHIPPING_METHOD) => string;
  getShippingMethodDescription: (shippingMethod: SHIPPING_METHOD) => string;
  getShippingMethodPrice: (shippingMethod: SHIPPING_METHOD) => number;
  getFormattedPrice: (price: number) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
```

### userOrderGetters
```ts
	getDate: (order: ORDER) => string;
	getId: (order: ORDER) => string;
	getStatus: (order: ORDER) => string;
	getPrice: (order: ORDER) => number;
	getItems: (order: ORDER) => ORDER_ITEM[];
	getItemSku: (item: ORDER_ITEM) => string;
	getItemName: (item: ORDER_ITEM) => string;
	getItemQty: (item: ORDER_ITEM) => number;
	getItemPrice: (item: ORDER_ITEM) => number;
	getFormattedPrice: (price: number) => string;
	[getterName: string]: (element: any, options?: any) => unknown;
```

### reviewGetters
```ts
	getItems: (review: REVIEW) => REVIEW_ITEM[];
	getReviewId: (item: REVIEW_ITEM) => string;
	getReviewAuthor: (item: REVIEW_ITEM) => string;
	getReviewMessage: (item: REVIEW_ITEM) => string;
	getReviewRating: (item: REVIEW_ITEM) => number;
	getReviewDate: (item: REVIEW_ITEM) => string;
	getTotalReviews: (review: REVIEW) => number;
	getAverageRating: (review: REVIEW) => number;
	getRatesCount: (review: REVIEW) => AgnosticRateCount[];
	getReviewsPage: (review: REVIEW) => number;
```

### facetsGetters
```ts
	getAll: (searchData: FacetSearchResult<SEARCH_DATA>, criteria?: CRITERIA) => AgnosticFacet[];
  getGrouped: (searchData: FacetSearchResult<SEARCH_DATA>, criteria?: CRITERIA) => AgnosticGroupedFacet[];
  getCategoryTree: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticCategoryTree;
  getSortOptions: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticSort;
  getProducts: (searchData: FacetSearchResult<SEARCH_DATA>) => RESULTS;
  getPagination: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticPagination;
  getBreadcrumbs: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticBreadcrumb[];
  [getterName: string]: (element: any, options?: any) => unknown;
```