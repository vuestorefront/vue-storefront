export interface UseProduct
<
  PRODUCT, 
  CONFIGURATION, 
  CONFIGURE,
> {
  product: PRODUCT;
  configuration: CONFIGURATION;
  configure: CONFIGURE;
}

export interface UseCategory
<
  CATEGORY, 
  APPLIED_FILTERS, 
  APPLY_FILTER,
  CLEAR_FILTERS,
> {
  category: CATEGORY;
  appliedFilters: APPLIED_FILTERS;
  applyFilter: APPLY_FILTER;
  clearFilters: CLEAR_FILTERS;
}

export interface UseCart
<
  CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  COUPON,
  APPLY_COUPON,
  REMOVE_COUPON,
> {
  cart: CART;
  addToCart: ADD_TO_CART;
  removeFromCart: REMOVE_FROM_CART;
  clearCart: CLEAR_CART;
  coupon: COUPON;
  applyCoupon: APPLY_COUPON;
  removeCoupon: REMOVE_COUPON;
}

export interface UseWishlist
<
  WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_WISHLIST,
> {
  wishlist: WISHLIST;
  addToWishlist: ADD_TO_WISHLIST;
  removeFromWishlist: REMOVE_FROM_WISHLIST;
  clearWishlist: CLEAR_WISHLIST;
}

export interface UseCompare
<
  COMPARE,
  ADD_TO_COMPARE,
  REMOVE_FROM_COMPARE,
  CLEAR_COMPARE,
> {
  compare: COMPARE;
  addToCompare: ADD_TO_COMPARE;
  removeFromCompare: REMOVE_FROM_COMPARE;
  clearCompare: CLEAR_COMPARE;
}