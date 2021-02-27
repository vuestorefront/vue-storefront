# Project upgrade notes

## Composables usage

We have changes a bit the naming and signatures of composable functions. Below is the full list of what hs been implemented or changed:

| Composable | Method | Old signature | New signature |
|------------|--------|---------------|---------------|
|      useCart      |   addToCart     |       (product: PRODUCT, quantity: number, customQuery?: CustomQuery)        |       ({ product: PRODUCT, quantity: number, customQuery?: CustomQuery })        |
|      useCart      |   removeFromCart    |       (product: CART_ITEM, customQuery?: CustomQuery)        |       ({ product: CART_ITEM, customQuery?: CustomQuery })        |
|      useCart      |   updateQuantity     |       (product: CART_ITEM, quantity?: number, customQuery?: CustomQuery)        |    ({ product: CART_ITEM, quantity?: number, customQuery?: CustomQuery })           |
|      useCart      |   load     |      (customQuery?: CustomQuery)         |        ({ customQuery?: CustomQuery } = {})       |
|      useCart      |   clearCart    |      ()         |       ()        |
|      useCart      |   applyCoupon     |      (couponCode: string, customQuery?: CustomQuery)         |        ({ couponCode: string, customQuery?: CustomQuery })       |
|      useCart      |   isInCart    |      (product: PRODUCT)         |       ({ product: PRODUCT })        |
|      useCart      |   removeCoupon     |       (coupon: COUPON, customQuery?: CustomQuery)        |       ({ coupon: COUPON, customQuery?: CustomQuery })        |
|      useCart      |   setCart     |       (newCart: CART)        |       ({ newCart: CART })        |
|      useCategory      |   search     |       (searchParams: CATEGORY_SEARCH_PARAMS, customQuery?: CustomQuery)       |       ({ ...searchParams: CATEGORY_SEARCH_PARAMS, customQuery?: CustomQuery })        |
|      useContent      |   search     |       (params: CONTENT_SEARCH_PARAMS)       |       No changes        |
|      useFacet      |   search     |       (params?: AgnosticFacetSearchParams)      |       No changes        |
|      useProduct      |   search     |       (searchParams: PRODUCT_SEARCH_PARAMS, customQuery?: CustomQuery)       |       ({ ...searchParams: PRODUCT_SEARCH_PARAMS, customQuery?: CustomQuery })        |
|      useReview      |   search     |       (searchParams: REVIEWS_SEARCH_PARAMS, customQuery?: CustomQuery)       |       ({ ...searchParams: REVIEWS_SEARCH_PARAMS, customQuery?: CustomQuery })        |
|      useReview      |   addReview     |       (addParams: REVIEW_ADD_PARAMS, customQuery?: CustomQuery)       |       ({ ...addParams: REVIEW_ADD_PARAMS, customQuery?: CustomQuery })        |
|      useUserBilling      |   addAddress     |       (address: USER_BILLING_ITEM)      |       ({ address: USER_BILLING_ITEM })        |
|      useUserBilling      |   deleteAddress     |      (address: USER_BILLING_ITEM)      |       ({ address: USER_BILLING_ITEM })        |
|      useUserBilling      |   updateAddress     |       (address: USER_BILLING_ITEM)      |       ({ address: USER_BILLING_ITEM })        |
|      useUserBilling      |   setDefault     |       (address: USER_BILLING_ITEM)      |       ({ address: USER_BILLING_ITEM })        |
|      useUserBilling      |   load     |       ()       |       ()        |
|      useUserShipping      |   addAddress     |       (address: USER_SHIPPING_ITEM)      |       ({ address: USER_SHIPPING_ITEM })        |
|      useUserShipping      |   deleteAddress     |      (address: USER_SHIPPING_ITEM)      |       ({ address: USER_SHIPPING_ITEM })        |
|      useUserShipping      |   updateAddress     |       (address: USER_SHIPPING_ITEM)      |       ({ address: USER_SHIPPING_ITEM })        |
|      useUserShipping      |   setDefault     |       (address: USER_SHIPPING_ITEM)      |       ({ address: USER_SHIPPING_ITEM })        |
|      useUserShipping      |   load     |       ()       |       ()        |
|      useUser      |   updateUser     |       (params: UPDATE_USER_PARAMS)       |       ({ user: UPDATE_USER_PARAMS })        |
|      useUser      |   register     |       (registerUserData: REGISTER_USER_PARAMS)       |       ({ user: REGISTER_USER_PARAMS })        |
|      useUser      |   login     |       (loginUserData: { username: string; password: string; })       |       ({ user: LOGIN_USER_PARAMS })        |
|      useUser      |   logout     |       ()       |       ()        |
|      useUser      |   changePassword     |       (currentPassword: string, newPassword: string)       |       ({ currentPassword: string, newPassword: string })        |
|      useUser      |   load     |       ()       |       ()        |
|      useUserOrders      |   searchOrders     |       (searchParams: ORDER_SEARCH_PARAMS, customQuery?: CustomQuery)       |       ({ ...searchParams: ORDER_SEARCH_PARAMS, customQuery?: CustomQuery } = {})        |
|      useWishlist      |   addToWishlist     |       (product: PRODUCT, customQuery?: CustomQuery)       |       ({ product: PRODUCT, customQuery?: CustomQuery })        |
|      useWishlist      |   removeFromWishlist     |       (product: WISHLIST_ITEM, customQuery?: CustomQuery)       |       ({ product: WISHLIST_ITEM, customQuery?: CustomQuery })        |
|      useWishlist      |   load     |       (customQuery?: CustomQuery)       |       ({ customQuery?: CustomQuery } = {})        |
|      useWishlist      |   clearWishlist     |       ()       |       ()        |
|      useWishlist      |   isOnWishlist     |       (product: PRODUCT)       |       ({ product: PRODUCT })        |