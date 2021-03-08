# Getters

## What are getters?

Getters are pure functions which allows you to fetch response from integrated ecommerce platform. They return an agnostic or primitive type. All getters are grouped into domains they are associated with e.g. `cartGetters` and named according to values they return e.g. `getCartTotalItems`. 


## How can you create and use getters?

To create getter in your integration, use getter object from core package like so: 
```ts
	import { cartGetters } from '@vue-storefront/core';
	import { Cart, LineItem } from './../types/GraphQL';
	
	export const getCartTotalItems = (cart: Cart): number => {
		return cart.lineItems.reduce((previous, current) => previous + current.quantity, 0);
	})
	...
	const cartGetters: CartGetters<Cart, LineItem> = {
		getTotalItems: getCartTotalItems,
	};
	
	export default cartGetters;
```
You can create your own getters by expanding exisiting getters interface.

And then getters can be used in components: 

```vue
	<template>
		<div
			:cartItemsQuantity="cartTotalItems"
		>
		</div>
	</template>
	<script>
		import { cartGetters, useCart } from '<Integration>';		

		export default {
			setup() {
				const { cart } = useCart();
				const cartTotalItems = computed(() => {
					const count = cartGetters.getTotalItems(cart.value);
					return count;
				});
			})
			return {
				cartTotalItems,
			};
		}
	</script>
```


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