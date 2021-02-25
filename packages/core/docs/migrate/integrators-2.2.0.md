# Integrators upgrade notes

## Factory usage

We have changes a bit the naming and signatures of core factory functions. Below is the full list of what hs been implemented or changed:

| Factory | Old method | New method | Old signature | New signature |
|------------|--------|---------------|---------------|---|
|      useCartFactory      |   addToCart     |  addItem |     context, { currentCart: cart.value, product, quantity }, customQuery      |       context, { currentCart: cart.value, product, quantity, customQuery }      |
|      useCartFactory      |   loadCart     |  load |     context: Context, customQuery?: CustomQuery      |        context: Context, { customQuery?: any }      |
|      useCartFactory      |   removeFromCart     |  removeItem |     context: Context, params: { currentCart: CART, product: CART_ITEM },  customQuery?: CustomQuery     |       context: Context, params: { currentCart: CART, product: CART_ITEM, customQuery?: CustomQuery }      |
|      useCartFactory      |   updateQuantity     |  updateItemQty |     context: Context, params: { currentCart: CART, product: CART_ITEM, quantity: number }, customQuery?: CustomQuery    |       context: Context, params: { currentCart: CART, product: CART_ITEM, customQuery?: CustomQuery }      |
|      useCartFactory      |   clearCart     |  clear |     context: Context, prams: { currentCart: CART }    |     context: Context, params: { currentCart: CART }     |
|      useCartFactory      |   applyCoupon     |  No changes |     context: Context, params: { currentCart: CART; couponCode: string }, customQuery?: CustomQuery    |     context: Context, params: { currentCart: CART, couponCode: string, customQuery?: CustomQuery }    |
|      useCartFactory      |   removeCoupon     |  No changes |     context: Context, params: { currentCart: CART; coupon: COUPON }, customQuery?: CustomQuery   |     context: Context, params: { currentCart: CART; coupon: COUPON, customQuery?: CustomQuery }   |
|      useCategoryFactory      |   categorySearch     |  No changes |     context: Context, searchParams: CATEGORY_SEARCH_PARAMS, customQuery: CustomQuery  |     context: Context, params: CATEGORY_SEARCH_PARAMS & { customQuery?: CustomQuery }   |
|      useProductFactory      |   productsSearch     |  No changes |     context: Context, searchParams: PRODUCT_SEARCH_PARAMS, customQuery?: CustomQuery  |    context: Context, params: PRODUCT_SEARCH_PARAMS & { customQuery?: CustomQuery }   |
|      useReviewFactory      |   searchReviews     |  No changes |     context: Context, params: REVIEWS_SEARCH_PARAMS, customQuery?: CustomQuery  |    context: Context, params: REVIEWS_SEARCH_PARAMS & { customQuery?: CustomQuery }  |
|      useReviewFactory      |   addReview     |  No changes |     context: Context, params: REVIEW_ADD_PARAMS, customQuery?: CustomQuery  |   context: Context, params: REVIEW_ADD_PARAMS & { customQuery?: CustomQuery } |
|      useUserBillingFactory      |   setDefault     | setDefaultAddress |     context: Context, params: { address: Readonly<USER_BILLING_ITEM>; shipping: Readonly<USER_BILLING>; })  |   No changes |
|      useUserShippingFactory      |   setDefault     | setDefaultAddress |     context: Context, params: { address: Readonly<USER_SHIPPING_ITEM>; shipping: Readonly<USER_SHIPPING>; })  |   No changes |
|      useUserFactory      |   loadUser    |  load |     context: Context,      |     context: Context, params?: {}      |
|      useUserOrdersFactory      |   searchOrders    |  No changes |     context: Context, params: ORDER_SEARCH_PARAMS, customQuery?: CustomQuery     |     context: Context, params: ORDER_SEARCH_PARAMS & { customQuery?: CustomQuery }      |
|      useWishlistFactory      |   addToWishlist     |  addItem |     context, { currentWishlist: WISHLIST, product: PRODUCT }, customQuery      |       context, { currentWishlist: WISHLIST, product: PRODUCT, customQuery }      |
|      useWishlistFactory      |   loadWishlist     |  load |     context: Context, customQuery?: CustomQuery      |       No changes      |
|      useWishlistFactory      |   removeFromWishlist     |  removeItem |     context: Context, params: { currentWishlist: WISHLIST, product: WISHLIST_ITEM },  customQuery?: CustomQuery     |       context: Context, params: { currentWishlist: WISHLIST, product: WISHLIST_ITEM,  customQuery?: CustomQuery }   |
|      useWishlistFactory      |   clearWishlist     |  clear |     context: Context, params: { currentWishlist: WISHLIST }    |     No changes    |
|      useWishlistFactory      |   loadWishlist     |  load |     context: Context, customQuery?: CustomQuery      |        context: Context, { customQuery?: any }      |