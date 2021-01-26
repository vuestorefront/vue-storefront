
<a name="readmemd"></a>

## API Client Reference - v1.1.0

### Table of contents

#### Modules

- [addToCart](#modulesaddtocartmd)
- [applyCartCoupon](#modulesapplycartcouponmd)
- [createCart](#modulescreatecartmd)
- [createCart/defaultMutation](#modulescreatecart_defaultmutationmd)
- [createMyOrderFromCart](#modulescreatemyorderfromcartmd)
- [createMyOrderFromCart/defaultMutation](#modulescreatemyorderfromcart_defaultmutationmd)
- [customerChangeMyPassword](#modulescustomerchangemypasswordmd)
- [customerChangeMyPassword/defaultMutation](#modulescustomerchangemypassword_defaultmutationmd)
- [customerSignMeIn](#modulescustomersignmeinmd)
- [customerSignMeIn/defaultMutation](#modulescustomersignmein_defaultmutationmd)
- [customerSignMeUp](#modulescustomersignmeupmd)
- [customerSignMeUp/defaultMutation](#modulescustomersignmeup_defaultmutationmd)
- [customerSignOut](#modulescustomersignoutmd)
- [customerUpdateMe](#modulescustomerupdatememd)
- [customerUpdateMe/defaultMutation](#modulescustomerupdateme_defaultmutationmd)
- [getCart](#modulesgetcartmd)
- [getCart/defaultQuery](#modulesgetcart_defaultquerymd)
- [getCategory](#modulesgetcategorymd)
- [getCategory/defaultQuery](#modulesgetcategory_defaultquerymd)
- [getMe](#modulesgetmemd)
- [getMe/defaultQuery](#modulesgetme_defaultquerymd)
- [getOrders](#modulesgetordersmd)
- [getOrders/defaultQuery](#modulesgetorders_defaultquerymd)
- [getProduct](#modulesgetproductmd)
- [getProduct/defaultQuery](#modulesgetproduct_defaultquerymd)
- [getShippingMethods](#modulesgetshippingmethodsmd)
- [getShippingMethods/defaultQuery](#modulesgetshippingmethods_defaultquerymd)
- [index](#modulesindexmd)
- [isGuest](#modulesisguestmd)
- [removeCartCoupon](#modulesremovecartcouponmd)
- [removeFromCart](#modulesremovefromcartmd)
- [updateCart](#modulesupdatecartmd)
- [updateCart/defaultMutation](#modulesupdatecart_defaultmutationmd)
- [updateCartQuantity](#modulesupdatecartquantitymd)
- [updateShippingDetails](#modulesupdateshippingdetailsmd)

## Interfaces


<a name="interfacesgetcategorycategorydatamd"></a>

### Interface: CategoryData

[getCategory](#modulesgetcategorymd).CategoryData

#### Hierarchy

* **CategoryData**

#### Properties

##### categories

• **categories**: CategoryQueryResult

Defined in: [getCategory/index.ts:10](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/getCategory/index.ts#L10)


<a name="interfacesgetmegetmeparamsmd"></a>

### Interface: GetMeParams

[getMe](#modulesgetmemd).GetMeParams

#### Hierarchy

* **GetMeParams**

#### Properties

##### customer

• `Optional` **customer**: *boolean*

Defined in: [getMe/index.ts:8](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/getMe/index.ts#L8)


<a name="interfacesgetmeordersdatamd"></a>

### Interface: OrdersData

[getMe](#modulesgetmemd).OrdersData

#### Hierarchy

* **OrdersData**

#### Properties

##### me

• **me**: *any*

Defined in: [getMe/index.ts:13](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/getMe/index.ts#L13)


<a name="interfacesgetproductproductdatamd"></a>

### Interface: ProductData

[getProduct](#modulesgetproductmd).ProductData

#### Hierarchy

* **ProductData**

#### Properties

##### products

• **products**: ProductQueryResult

Defined in: [getProduct/index.ts:10](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/getProduct/index.ts#L10)


<a name="interfacesgetshippingmethodsshippingmethoddatamd"></a>

### Interface: ShippingMethodData

[getShippingMethods](#modulesgetshippingmethodsmd).ShippingMethodData

#### Hierarchy

* **ShippingMethodData**

#### Properties

##### shippingMethods

• **shippingMethods**: ShippingMethod[]

Defined in: [getShippingMethods/index.ts:8](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/getShippingMethods/index.ts#L8)


<a name="interfacesupdatecartupdatecartparamsmd"></a>

### Interface: UpdateCartParams

[updateCart](#modulesupdatecartmd).UpdateCartParams

#### Hierarchy

* **UpdateCartParams**

#### Properties

##### actions

• **actions**: CartUpdateAction[] | MyCartUpdateAction[]

Defined in: [updateCart/index.ts:13](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/updateCart/index.ts#L13)

___

##### id

• **id**: *string*

Defined in: [updateCart/index.ts:11](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/updateCart/index.ts#L11)

___

##### version

• **version**: *number*

Defined in: [updateCart/index.ts:12](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/updateCart/index.ts#L12)

___

##### versionFallback

• `Optional` **versionFallback**: *boolean*

Defined in: [updateCart/index.ts:14](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/updateCart/index.ts#L14)

## Modules


<a name="modulesaddtocartmd"></a>

### Module: addToCart

#### Functions

##### default

▸ `Const`**default**(`settings`: *any*, `__namedParameters`: Cart, `product`: ProductVariant, `quantity`: *number*, `customQuery?`: *CustomQueryFn*<*any*\>): *Promise*<CartResponse\>

###### Parameters:

• **settings**: *any*

• **__namedParameters**: Cart

• **product**: ProductVariant

• **quantity**: *number*

• **customQuery**: *CustomQueryFn*<*any*\>

**Returns:** *Promise*<CartResponse\>

Defined in: [addToCart/index.ts:6](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/addToCart/index.ts#L6)


<a name="modulesapplycartcouponmd"></a>

### Module: applyCartCoupon

#### Functions

##### default

▸ `Const`**default**(`settings`: *any*, `cart`: Cart, `discountCode`: *string*, `customQuery?`: *CustomQueryFn*<*any*\>): *Promise*<CartResponse\>

###### Parameters:

Name | Type |
------ | ------ |
`settings` | *any* |
`cart` | Cart |
`discountCode` | *string* |
`customQuery?` | *CustomQueryFn*<*any*\> |

**Returns:** *Promise*<CartResponse\>

Defined in: [applyCartCoupon/index.ts:6](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/applyCartCoupon/index.ts#L6)


<a name="modulescreatecartmd"></a>

### Module: createCart

#### Functions

##### default

▸ `Const`**default**(`__namedParameters`: *Object*, `cartDraft?`: *CartData*, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*any*\>

###### Parameters:

• **__namedParameters**: *Object*

• **cartDraft**: *CartData*

• **customQueryFn**: *CustomQueryFn*<*any*\>

**Returns:** *Promise*<*any*\>

Defined in: [createCart/index.ts:7](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/createCart/index.ts#L7)


<a name="modulescreatecart_defaultmutationmd"></a>

### Module: createCart/defaultMutation

#### Properties

##### default

• **default**: DocumentNode


<a name="modulescreatemyorderfromcartmd"></a>

### Module: createMyOrderFromCart

#### Functions

##### default

▸ `Const`**default**(`__namedParameters`: *Object*, `draft`: OrderMyCartCommand, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*FetchResult*<*Record*<*order*, Order\>, *Record*<*string*, *any*\>, *Record*<*string*, *any*\>\>\>

###### Parameters:

• **__namedParameters**: *Object*

• **draft**: OrderMyCartCommand

• **customQueryFn**: *CustomQueryFn*<*any*\>

**Returns:** *Promise*<*FetchResult*<*Record*<*order*, Order\>, *Record*<*string*, *any*\>, *Record*<*string*, *any*\>\>\>

Defined in: [createMyOrderFromCart/index.ts:7](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/createMyOrderFromCart/index.ts#L7)


<a name="modulescreatemyorderfromcart_defaultmutationmd"></a>

### Module: createMyOrderFromCart/defaultMutation

#### Properties

##### default

• **default**: DocumentNode


<a name="modulescustomerchangemypasswordmd"></a>

### Module: customerChangeMyPassword

#### Functions

##### default

▸ `Const`**default**(`__namedParameters`: *Object*, `version`: *any*, `currentPassword`: *string*, `newPassword`: *string*): *Promise*<*ApolloQueryResult*<*Record*<*user*, Customer\>\>\>

###### Parameters:

• **__namedParameters**: *Object*

• **version**: *any*

• **currentPassword**: *string*

• **newPassword**: *string*

**Returns:** *Promise*<*ApolloQueryResult*<*Record*<*user*, Customer\>\>\>

Defined in: [customerChangeMyPassword/index.ts:4](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/customerChangeMyPassword/index.ts#L4)


<a name="modulescustomerchangemypassword_defaultmutationmd"></a>

### Module: customerChangeMyPassword/defaultMutation

#### Properties

##### default

• **default**: DocumentNode


<a name="modulescustomersignmeinmd"></a>

### Module: customerSignMeIn

#### Functions

##### default

▸ `Const`**default**(`context`: *any*, `draft`: CustomerSignMeInDraft): *Promise*<*ApolloQueryResult*<*Record*<*user*, CustomerSignInResult\>\>\>

###### Parameters:

Name | Type |
------ | ------ |
`context` | *any* |
`draft` | CustomerSignMeInDraft |

**Returns:** *Promise*<*ApolloQueryResult*<*Record*<*user*, CustomerSignInResult\>\>\>

Defined in: [customerSignMeIn/index.ts:5](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/customerSignMeIn/index.ts#L5)


<a name="modulescustomersignmein_defaultmutationmd"></a>

### Module: customerSignMeIn/defaultMutation

#### Properties

##### default

• **default**: DocumentNode


<a name="modulescustomersignmeupmd"></a>

### Module: customerSignMeUp

#### Functions

##### default

▸ `Const`**default**(`context`: *any*, `draft`: CustomerSignMeUpDraft): *Promise*<*ApolloQueryResult*<*Record*<*user*, CustomerSignInResult\>\>\>

###### Parameters:

Name | Type |
------ | ------ |
`context` | *any* |
`draft` | CustomerSignMeUpDraft |

**Returns:** *Promise*<*ApolloQueryResult*<*Record*<*user*, CustomerSignInResult\>\>\>

Defined in: [customerSignMeUp/index.ts:5](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/customerSignMeUp/index.ts#L5)


<a name="modulescustomersignmeup_defaultmutationmd"></a>

### Module: customerSignMeUp/defaultMutation

#### Properties

##### default

• **default**: DocumentNode


<a name="modulescustomersignoutmd"></a>

### Module: customerSignOut

#### Functions

##### default

▸ `Const`**default**(`__namedParameters`: *Object*): *Promise*<*void*\>

###### Parameters:

• **__namedParameters**: *Object*

**Returns:** *Promise*<*void*\>

Defined in: [customerSignOut/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/customerSignOut/index.ts#L1)


<a name="modulescustomerupdatememd"></a>

### Module: customerUpdateMe

#### Functions

##### default

▸ `Const`**default**(`__namedParameters`: *Object*, `currentUser`: *any*, `updatedUserData`: *any*): *Promise*<*any*\>

###### Parameters:

• **__namedParameters**: *Object*

• **currentUser**: *any*

• **updatedUserData**: *any*

**Returns:** *Promise*<*any*\>

Defined in: [customerUpdateMe/index.ts:4](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/customerUpdateMe/index.ts#L4)


<a name="modulescustomerupdateme_defaultmutationmd"></a>

### Module: customerUpdateMe/defaultMutation

#### Properties

##### default

• **default**: DocumentNode


<a name="modulesgetcartmd"></a>

### Module: getCart

#### Functions

##### default

▸ `Const`**default**(`__namedParameters`: *Object*, `cartId`: *string*): *Promise*<*ApolloQueryResult*<*Record*<*cart*, Cart\>\>\>

###### Parameters:

• **__namedParameters**: *Object*

• **cartId**: *string*

**Returns:** *Promise*<*ApolloQueryResult*<*Record*<*cart*, Cart\>\>\>

Defined in: [getCart/index.ts:4](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/getCart/index.ts#L4)


<a name="modulesgetcart_defaultquerymd"></a>

### Module: getCart/defaultQuery

#### Properties

##### default

• **default**: DocumentNode


<a name="modulesgetcategorymd"></a>

### Module: getCategory

#### Table of contents

##### Interfaces

- [CategoryData](#interfacesgetcategorycategorydatamd)

#### Functions

##### default

▸ `Const`**default**(`context`: *any*, `params`: *any*, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*ApolloQueryResult*<[*CategoryData*](#interfacesgetcategorycategorydatamd)\>\>

###### Parameters:

Name | Type |
------ | ------ |
`context` | *any* |
`params` | *any* |
`customQueryFn?` | *CustomQueryFn*<*any*\> |

**Returns:** *Promise*<*ApolloQueryResult*<[*CategoryData*](#interfacesgetcategorycategorydatamd)\>\>

Defined in: [getCategory/index.ts:13](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/getCategory/index.ts#L13)


<a name="modulesgetcategory_defaultquerymd"></a>

### Module: getCategory/defaultQuery

#### Properties

##### default

• **default**: DocumentNode


<a name="modulesgetmemd"></a>

### Module: getMe

#### Table of contents

##### Interfaces

- [GetMeParams](#interfacesgetmegetmeparamsmd)
- [OrdersData](#interfacesgetmeordersdatamd)

#### Functions

##### default

▸ `Const`**default**(`__namedParameters`: *Object*, `params?`: [*GetMeParams*](#interfacesgetmegetmeparamsmd), `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*ApolloQueryResult*<[*OrdersData*](#interfacesgetmeordersdatamd)\>\>

###### Parameters:

• **__namedParameters**: *Object*

• **params**: [*GetMeParams*](#interfacesgetmegetmeparamsmd)

• **customQueryFn**: *CustomQueryFn*<*any*\>

**Returns:** *Promise*<*ApolloQueryResult*<[*OrdersData*](#interfacesgetmeordersdatamd)\>\>

Defined in: [getMe/index.ts:16](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/getMe/index.ts#L16)


<a name="modulesgetme_defaultquerymd"></a>

### Module: getMe/defaultQuery

#### Variables

##### basicProfile

• `Const` **basicProfile**: DocumentNode

Defined in: [getMe/defaultQuery.ts:4](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/getMe/defaultQuery.ts#L4)

___

##### fullProfile

• `Const` **fullProfile**: DocumentNode

Defined in: [getMe/defaultQuery.ts:16](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/getMe/defaultQuery.ts#L16)


<a name="modulesgetordersmd"></a>

### Module: getOrders

#### Functions

##### default

▸ `Const`**default**(`__namedParameters`: *Object*, `params`: *any*, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*ApolloQueryResult*<OrdersData\>\>

###### Parameters:

• **__namedParameters**: *Object*

• **params**: *any*

• **customQueryFn**: *CustomQueryFn*<*any*\>

**Returns:** *Promise*<*ApolloQueryResult*<OrdersData\>\>

Defined in: [getOrders/index.ts:12](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/getOrders/index.ts#L12)


<a name="modulesgetorders_defaultquerymd"></a>

### Module: getOrders/defaultQuery

#### Properties

##### default

• **default**: DocumentNode


<a name="modulesgetproductmd"></a>

### Module: getProduct

#### Table of contents

##### Interfaces

- [ProductData](#interfacesgetproductproductdatamd)

#### Functions

##### default

▸ `Const`**default**(`context`: *any*, `params`: *any*, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*ApolloQueryResult*<[*ProductData*](#interfacesgetproductproductdatamd)\>\>

###### Parameters:

Name | Type |
------ | ------ |
`context` | *any* |
`params` | *any* |
`customQueryFn?` | *CustomQueryFn*<*any*\> |

**Returns:** *Promise*<*ApolloQueryResult*<[*ProductData*](#interfacesgetproductproductdatamd)\>\>

Defined in: [getProduct/index.ts:13](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/getProduct/index.ts#L13)


<a name="modulesgetproduct_defaultquerymd"></a>

### Module: getProduct/defaultQuery

#### Properties

##### default

• **default**: DocumentNode


<a name="modulesgetshippingmethodsmd"></a>

### Module: getShippingMethods

#### Table of contents

##### Interfaces

- [ShippingMethodData](#interfacesgetshippingmethodsshippingmethoddatamd)

#### Functions

##### default

▸ `Const`**default**(`__namedParameters`: *Object*, `cartId?`: *string*, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<*ApolloQueryResult*<[*ShippingMethodData*](#interfacesgetshippingmethodsshippingmethoddatamd)\>\>

###### Parameters:

• **__namedParameters**: *Object*

• **cartId**: *string*

• **customQueryFn**: *CustomQueryFn*<*any*\>

**Returns:** *Promise*<*ApolloQueryResult*<[*ShippingMethodData*](#interfacesgetshippingmethodsshippingmethoddatamd)\>\>

Defined in: [getShippingMethods/index.ts:11](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/getShippingMethods/index.ts#L11)


<a name="modulesgetshippingmethods_defaultquerymd"></a>

### Module: getShippingMethods/defaultQuery

#### Properties

##### default

• **default**: DocumentNode


<a name="modulesindexmd"></a>

### Module: index

#### References

##### addToCart

Renames and exports: [default](#default)

___

##### applyCartCoupon

Renames and exports: [default](#default)

___

##### createCart

Renames and exports: [default](#default)

___

##### createMyOrderFromCart

Renames and exports: [default](#default)

___

##### customerChangeMyPassword

Renames and exports: [default](#default)

___

##### customerSignMeIn

Renames and exports: [default](#default)

___

##### customerSignMeUp

Renames and exports: [default](#default)

___

##### customerSignOut

Renames and exports: [default](#default)

___

##### customerUpdateMe

Renames and exports: [default](#default)

___

##### getCart

Renames and exports: [default](#default)

___

##### getCategory

Renames and exports: [default](#default)

___

##### getMe

Renames and exports: [default](#default)

___

##### getOrders

Renames and exports: [default](#default)

___

##### getProduct

Renames and exports: [default](#default)

___

##### getShippingMethods

Renames and exports: [default](#default)

___

##### isGuest

Renames and exports: [default](#default)

___

##### removeCartCoupon

Renames and exports: [default](#default)

___

##### removeFromCart

Renames and exports: [default](#default)

___

##### updateCart

Renames and exports: [default](#default)

___

##### updateCartQuantity

Renames and exports: [default](#default)

___

##### updateShippingDetails

Renames and exports: [default](#default)


<a name="modulesisguestmd"></a>

### Module: isGuest

#### Functions

##### default

▸ `Const`**default**(`context`: *any*): *any*

###### Parameters:

Name | Type |
------ | ------ |
`context` | *any* |

**Returns:** *any*

Defined in: [isGuest/index.ts:3](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/isGuest/index.ts#L3)


<a name="modulesremovecartcouponmd"></a>

### Module: removeCartCoupon

#### Functions

##### default

▸ `Const`**default**(`context`: *any*, `cart`: Cart, `discountCode`: ReferenceInput, `customQuery?`: *CustomQueryFn*<*any*\>): *Promise*<CartResponse\>

###### Parameters:

Name | Type |
------ | ------ |
`context` | *any* |
`cart` | Cart |
`discountCode` | ReferenceInput |
`customQuery?` | *CustomQueryFn*<*any*\> |

**Returns:** *Promise*<CartResponse\>

Defined in: [removeCartCoupon/index.ts:6](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/removeCartCoupon/index.ts#L6)


<a name="modulesremovefromcartmd"></a>

### Module: removeFromCart

#### Functions

##### default

▸ `Const`**default**(`context`: *any*, `cart`: Cart, `product`: LineItem, `customQuery?`: *CustomQueryFn*<*any*\>): *Promise*<CartResponse\>

###### Parameters:

Name | Type |
------ | ------ |
`context` | *any* |
`cart` | Cart |
`product` | LineItem |
`customQuery?` | *CustomQueryFn*<*any*\> |

**Returns:** *Promise*<CartResponse\>

Defined in: [removeFromCart/index.ts:6](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/removeFromCart/index.ts#L6)


<a name="modulesupdatecartmd"></a>

### Module: updateCart

#### Table of contents

##### Interfaces

- [UpdateCartParams](#interfacesupdatecartupdatecartparamsmd)

#### Functions

##### default

▸ `Const`**default**(`context`: *any*, `params`: [*UpdateCartParams*](#interfacesupdatecartupdatecartparamsmd), `customQueryFn?`: *CustomQueryFn*<*any*\>): *any*

###### Parameters:

Name | Type |
------ | ------ |
`context` | *any* |
`params` | [*UpdateCartParams*](#interfacesupdatecartupdatecartparamsmd) |
`customQueryFn?` | *CustomQueryFn*<*any*\> |

**Returns:** *any*

Defined in: [updateCart/index.ts:17](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/updateCart/index.ts#L17)


<a name="modulesupdatecart_defaultmutationmd"></a>

### Module: updateCart/defaultMutation

#### Properties

##### default

• **default**: DocumentNode


<a name="modulesupdatecartquantitymd"></a>

### Module: updateCartQuantity

#### Functions

##### default

▸ `Const`**default**(`context`: *any*, `cart`: Cart, `product`: LineItem, `customQuery?`: *CustomQueryFn*<*any*\>): *Promise*<CartResponse\>

###### Parameters:

Name | Type |
------ | ------ |
`context` | *any* |
`cart` | Cart |
`product` | LineItem |
`customQuery?` | *CustomQueryFn*<*any*\> |

**Returns:** *Promise*<CartResponse\>

Defined in: [updateCartQuantity/index.ts:6](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/updateCartQuantity/index.ts#L6)


<a name="modulesupdateshippingdetailsmd"></a>

### Module: updateShippingDetails

#### Functions

##### default

▸ `Const`**default**(`context`: *any*, `cart`: Cart, `shippingDetails`: Address, `customQueryFn?`: *CustomQueryFn*<*any*\>): *Promise*<CartResponse\>

###### Parameters:

Name | Type |
------ | ------ |
`context` | *any* |
`cart` | Cart |
`shippingDetails` | Address |
`customQueryFn?` | *CustomQueryFn*<*any*\> |

**Returns:** *Promise*<CartResponse\>

Defined in: [updateShippingDetails/index.ts:6](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/api-client/src/api/updateShippingDetails/index.ts#L6)
