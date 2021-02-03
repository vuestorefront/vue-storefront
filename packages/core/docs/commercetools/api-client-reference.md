# API Reference
<a name="addtocartmd"></a>

# `addToCart`

▸ `Const`**default**(`settings`: *any*, `__namedParameters`: Cart, `product`: ProductVariant, `quantity`: *number*, `customQuery?`: *CustomQueryFn*<*any*\>): *Promise*<CartResponse\>

### `settings`

* Type: `any`

### `__namedParameters`

* Type: `Cart`

### `product`

* Type: `ProductVariant`

### `quantity`

* Type: `number`

### `customQuery?`

* Type: `CustomQueryFn`

Defined in: [addToCart/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/addToCart/index.ts#L1)

<a name="applycartcouponmd"></a>

# `applyCartCoupon`

▸ `Const`**default**(`settings`: *any*, `cart`: Cart, `discountCode`: *string*, `customQuery?`: *CustomQueryFn*<*any*\>): *Promise*<CartResponse\>

### `settings`

* Type: `any`

### `cart`

* Type: `Cart`

### `discountCode`

* Type: `string`

### `customQuery?`

* Type: `CustomQueryFn`

Defined in: [applyCartCoupon/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/applyCartCoupon/index.ts#L1)

<a name="createcartmd"></a>

# `createCart`

▸ `Const`**default**(`__namedParameters`: *Object*, `cartDraft?`: *CartData*, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*any*\>

### `__namedParameters`

* Type: `Object`

### `cartDraft`

* Type: `CartData`

### `customQueryFn?`

* Type: `CustomQueryFn`

Defined in: [createCart/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/createCart/index.ts#L1)

<a name="createcart_defaultmutationmd"></a>

# `createCart/defaultMutation`

Defined in: [createCart/defaultMutation.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/createCart/defaultMutation.ts#L1)

<a name="createmyorderfromcartmd"></a>

# `createMyOrderFromCart`

▸ `Const`**default**(`__namedParameters`: *Object*, `draft`: OrderMyCartCommand, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*FetchResult*<*Record*<*order*, Order\>, *Record*<*string*, *any*\>, *Record*<*string*, *any*\>\>\>

### `__namedParameters`

* Type: `Object`

### `draft`

* Type: `OrderMyCartCommand`

### `customQueryFn?`

* Type: `CustomQueryFn`

Defined in: [createMyOrderFromCart/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/createMyOrderFromCart/index.ts#L1)

<a name="createmyorderfromcart_defaultmutationmd"></a>

# `createMyOrderFromCart/defaultMutation`

Defined in: [createMyOrderFromCart/defaultMutation.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/createMyOrderFromCart/defaultMutation.ts#L1)

<a name="customerchangemypasswordmd"></a>

# `customerChangeMyPassword`

▸ `Const`**default**(`__namedParameters`: *Object*, `version`: *any*, `currentPassword`: *string*, `newPassword`: *string*): *Promise*<*ApolloQueryResult*<*Record*<*user*, Customer\>\>\>

### `__namedParameters`

* Type: `Object`

### `version`

* Type: `any`

### `currentPassword`

* Type: `string`

### `newPassword`

* Type: `string`

Defined in: [customerChangeMyPassword/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/customerChangeMyPassword/index.ts#L1)

<a name="customerchangemypassword_defaultmutationmd"></a>

# `customerChangeMyPassword/defaultMutation`

Defined in: [customerChangeMyPassword/defaultMutation.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/customerChangeMyPassword/defaultMutation.ts#L1)

<a name="customersignmeinmd"></a>

# `customerSignMeIn`

▸ `Const`**default**(`context`: *any*, `draft`: CustomerSignMeInDraft): *Promise*<*ApolloQueryResult*<*Record*<*user*, CustomerSignInResult\>\>\>

### `context`

* Type: `any`

### `draft`

* Type: `CustomerSignMeInDraft`

Defined in: [customerSignMeIn/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/customerSignMeIn/index.ts#L1)

<a name="customersignmein_defaultmutationmd"></a>

# `customerSignMeIn/defaultMutation`

Defined in: [customerSignMeIn/defaultMutation.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/customerSignMeIn/defaultMutation.ts#L1)

<a name="customersignmeupmd"></a>

# `customerSignMeUp`

▸ `Const`**default**(`context`: *any*, `draft`: CustomerSignMeUpDraft): *Promise*<*ApolloQueryResult*<*Record*<*user*, CustomerSignInResult\>\>\>

### `context`

* Type: `any`

### `draft`

* Type: `CustomerSignMeUpDraft`

Defined in: [customerSignMeUp/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/customerSignMeUp/index.ts#L1)

<a name="customersignmeup_defaultmutationmd"></a>

# `customerSignMeUp/defaultMutation`

Defined in: [customerSignMeUp/defaultMutation.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/customerSignMeUp/defaultMutation.ts#L1)

<a name="customersignoutmd"></a>

# `customerSignOut`

▸ `Const`**default**(`__namedParameters`: *Object*): *Promise*<*void*\>

### `__namedParameters`

* Type: `Object`

Defined in: [customerSignOut/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/customerSignOut/index.ts#L1)

<a name="customerupdatememd"></a>

# `customerUpdateMe`

▸ `Const`**default**(`__namedParameters`: *Object*, `currentUser`: *any*, `updatedUserData`: *any*): *Promise*<*any*\>

### `__namedParameters`

* Type: `Object`

### `currentUser`

* Type: `any`

### `updatedUserData`

* Type: `any`

Defined in: [customerUpdateMe/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/customerUpdateMe/index.ts#L1)

<a name="customerupdateme_defaultmutationmd"></a>

# `customerUpdateMe/defaultMutation`

Defined in: [customerUpdateMe/defaultMutation.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/customerUpdateMe/defaultMutation.ts#L1)

<a name="getcartmd"></a>

# `getCart`

▸ `Const`**default**(`__namedParameters`: *Object*, `cartId`: *string*): *Promise*<*ApolloQueryResult*<*Record*<*cart*, Cart\>\>\>

### `__namedParameters`

* Type: `Object`

### `cartId`

* Type: `string`

Defined in: [getCart/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/getCart/index.ts#L1)

<a name="getcart_defaultquerymd"></a>

# `getCart/defaultQuery`

Defined in: [getCart/defaultQuery.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/getCart/defaultQuery.ts#L1)

<a name="getcategorymd"></a>

# `getCategory`

▸ `Const`**default**(`context`: *any*, `params`: *any*, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*ApolloQueryResult*<[*CategoryData*](../interfaces/getcategory.categorydata.md)\>\>

### `context`

* Type: `any`

### `params`

* Type: `any`

### `customQueryFn?`

* Type: `CustomQueryFn`

Defined in: [getCategory/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/getCategory/index.ts#L1)

<a name="getcategory_defaultquerymd"></a>

# `getCategory/defaultQuery`

Defined in: [getCategory/defaultQuery.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/getCategory/defaultQuery.ts#L1)

<a name="getmemd"></a>

# `getMe`

▸ `Const`**default**(`__namedParameters`: *Object*, `params?`: [*GetMeParams*](../interfaces/getme.getmeparams.md), `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*ApolloQueryResult*<[*OrdersData*](../interfaces/getme.ordersdata.md)\>\>

### `__namedParameters`

* Type: `Object`

### `params`

* Type: `GetMeParams`

### `customQueryFn?`

* Type: `CustomQueryFn`

Defined in: [getMe/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/getMe/index.ts#L1)

<a name="getme_defaultquerymd"></a>

# `getMe/defaultQuery`

Defined in: [getMe/defaultQuery.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/getMe/defaultQuery.ts#L1)

<a name="getordersmd"></a>

# `getOrders`

▸ `Const`**default**(`__namedParameters`: *Object*, `params`: *any*, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*ApolloQueryResult*<OrdersData\>\>

### `__namedParameters`

* Type: `Object`

### `params`

* Type: `any`

### `customQueryFn?`

* Type: `CustomQueryFn`

Defined in: [getOrders/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/getOrders/index.ts#L1)

<a name="getorders_defaultquerymd"></a>

# `getOrders/defaultQuery`

Defined in: [getOrders/defaultQuery.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/getOrders/defaultQuery.ts#L1)

<a name="getproductmd"></a>

# `getProduct`

▸ `Const`**default**(`context`: *any*, `params`: *any*, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*ApolloQueryResult*<[*ProductData*](../interfaces/getproduct.productdata.md)\>\>

### `context`

* Type: `any`

### `params`

* Type: `any`

### `customQueryFn?`

* Type: `CustomQueryFn`

Defined in: [getProduct/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/getProduct/index.ts#L1)

<a name="getproduct_defaultquerymd"></a>

# `getProduct/defaultQuery`

Defined in: [getProduct/defaultQuery.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/getProduct/defaultQuery.ts#L1)

<a name="getshippingmethodsmd"></a>

# `getShippingMethods`

▸ `Const`**default**(`__namedParameters`: *Object*, `cartId?`: *string*, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*ApolloQueryResult*<[*ShippingMethodData*](../interfaces/getshippingmethods.shippingmethoddata.md)\>\>

### `__namedParameters`

* Type: `Object`

### `cartId?`

* Type: `string`

### `customQueryFn?`

* Type: `CustomQueryFn`

Defined in: [getShippingMethods/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/getShippingMethods/index.ts#L1)

<a name="getshippingmethods_defaultquerymd"></a>

# `getShippingMethods/defaultQuery`

Defined in: [getShippingMethods/defaultQuery.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/getShippingMethods/defaultQuery.ts#L1)

<a name="indexmd"></a>

# `index`

Defined in: [index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/index.ts#L1)

<a name="isguestmd"></a>

# `isGuest`

▸ `Const`**default**(`context`: *any*): *any*

### `context`

* Type: `any`

Defined in: [isGuest/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/isGuest/index.ts#L1)

<a name="removecartcouponmd"></a>

# `removeCartCoupon`

▸ `Const`**default**(`context`: *any*, `cart`: Cart, `discountCode`: ReferenceInput, `customQuery?`: *CustomQueryFn*<*any*\>): *Promise*<CartResponse\>

### `context`

* Type: `any`

### `cart`

* Type: `Cart`

### `discountCode`

* Type: `ReferenceInput`

### `customQuery?`

* Type: `CustomQueryFn`

Defined in: [removeCartCoupon/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/removeCartCoupon/index.ts#L1)

<a name="removefromcartmd"></a>

# `removeFromCart`

▸ `Const`**default**(`context`: *any*, `cart`: Cart, `product`: LineItem, `customQuery?`: *CustomQueryFn*<*any*\>): *Promise*<CartResponse\>

### `context`

* Type: `any`

### `cart`

* Type: `Cart`

### `product`

* Type: `LineItem`

### `customQuery?`

* Type: `CustomQueryFn`

Defined in: [removeFromCart/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/removeFromCart/index.ts#L1)

<a name="updatecartmd"></a>

# `updateCart`

▸ `Const`**default**(`context`: *any*, `params`: [*UpdateCartParams*](../interfaces/updatecart.updatecartparams.md), `customQueryFn?`: *CustomQueryFn*<*any*\>): *any*

### `context`

* Type: `any`

### `params`

* Type: `UpdateCartParams`

### `customQueryFn?`

* Type: `CustomQueryFn`

Defined in: [updateCart/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/updateCart/index.ts#L1)

<a name="updatecart_defaultmutationmd"></a>

# `updateCart/defaultMutation`

Defined in: [updateCart/defaultMutation.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/updateCart/defaultMutation.ts#L1)

<a name="updatecartquantitymd"></a>

# `updateCartQuantity`

▸ `Const`**default**(`context`: *any*, `cart`: Cart, `product`: LineItem, `customQuery?`: *CustomQueryFn*<*any*\>): *Promise*<CartResponse\>

### `context`

* Type: `any`

### `cart`

* Type: `Cart`

### `product`

* Type: `LineItem`

### `customQuery?`

* Type: `CustomQueryFn`

Defined in: [updateCartQuantity/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/updateCartQuantity/index.ts#L1)

<a name="updateshippingdetailsmd"></a>

# `updateShippingDetails`

▸ `Const`**default**(`context`: *any*, `cart`: Cart, `shippingDetails`: Address, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<CartResponse\>

### `context`

* Type: `any`

### `cart`

* Type: `Cart`

### `shippingDetails`

* Type: `Address`

### `customQueryFn?`

* Type: `CustomQueryFn`

Defined in: [updateShippingDetails/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/7646f230c/packages/commercetools/api-client/src/api/updateShippingDetails/index.ts#L1)
