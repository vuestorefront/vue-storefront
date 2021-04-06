
<a name="1modulesapi_addtocartmd"></a>

## `addToCart`

Defined in: [packages/commercetools/api-client/src/api/addToCart/index.ts:7](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/addToCart/index.ts#L7)

#### Parameters:

Name | Type |
:------ | :------ |
|
`__namedParameters` | [*Cart*](#cart) |
`product` | [*ProductVariant*](#productvariant) |
`quantity` | *number* |
`customQuery?` | *Record*<string, string\> |

**Returns:** *Promise*<[*CartResponse*](#cartresponse)\>

<a name="1modulesapi_applycartcouponmd"></a>

## `applyCartCoupon`

Defined in: [packages/commercetools/api-client/src/api/applyCartCoupon/index.ts:7](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/applyCartCoupon/index.ts#L7)

#### Parameters:

Name | Type |
:------ | :------ |
|
`cart` | [*Cart*](#cart) |
`discountCode` | *string* |
`customQuery?` | *Record*<string, string\> |

**Returns:** *Promise*<[*CartResponse*](#cartresponse)\>

<a name="1modulesapi_createcartmd"></a>

## `createCart`

Defined in: [packages/commercetools/api-client/src/api/createCart/index.ts:6](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/createCart/index.ts#L6)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`cartDraft` | [*CartData*](#interfacestypes_apicartdatamd) |
`customQuery?` | *Record*<string, string\> |

**Returns:** *Promise*<any\>

<a name="1modulesapi_createmyorderfromcartmd"></a>

## `createMyOrderFromCart`

Defined in: [packages/commercetools/api-client/src/api/createMyOrderFromCart/index.ts:7](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/createMyOrderFromCart/index.ts#L7)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`draft` | [*OrderMyCartCommand*](#ordermycartcommand) |
`customQuery?` | *Record*<string, string\> |

**Returns:** *Promise*<FetchResult<Record<*order*, [*Order*](#order)\>, Record<string, any\>, Record<string, any\>\>\>

<a name="1modulesapi_customerchangemypasswordmd"></a>

## `customerChangeMyPassword`

Defined in: [packages/commercetools/api-client/src/api/customerChangeMyPassword/index.ts:4](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/customerChangeMyPassword/index.ts#L4)

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`version` | *any* |
`currentPassword` | *string* |
`newPassword` | *string* |

**Returns:** *Promise*<ApolloQueryResult<Record<*user*, [*Customer*](#customer)\>\>\>

<a name="1modulesapi_customersignmeinmd"></a>

## `customerSignMeIn`

Defined in: [packages/commercetools/api-client/src/api/customerSignMeIn/index.ts:5](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/customerSignMeIn/index.ts#L5)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`draft` | [*CustomerSignMeInDraft*](#customersignmeindraft) |

**Returns:** *Promise*<ApolloQueryResult<Record<*user*, [*CustomerSignInResult*](#customersigninresult)\>\>\>

<a name="1modulesapi_customersignmeupmd"></a>

## `customerSignMeUp`

Defined in: [packages/commercetools/api-client/src/api/customerSignMeUp/index.ts:5](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/customerSignMeUp/index.ts#L5)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`draft` | [*CustomerSignMeUpDraft*](#customersignmeupdraft) |

**Returns:** *Promise*<ApolloQueryResult<Record<*user*, [*CustomerSignInResult*](#customersigninresult)\>\>\>

<a name="1modulesapi_customersignoutmd"></a>

## `customerSignOut`

Defined in: [packages/commercetools/api-client/src/api/customerSignOut/index.ts:1](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/customerSignOut/index.ts#L1)

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** *Promise*<void\>

<a name="1modulesapi_customerupdatememd"></a>

## `customerUpdateMe`

Defined in: [packages/commercetools/api-client/src/api/customerUpdateMe/index.ts:4](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/customerUpdateMe/index.ts#L4)

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`currentUser` | *any* |
`updatedUserData` | *any* |

**Returns:** *Promise*<any\>

<a name="1modulesapi_getcartmd"></a>

## `getCart`

Defined in: [packages/commercetools/api-client/src/api/getCart/index.ts:4](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/getCart/index.ts#L4)

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`cartId` | *string* |

**Returns:** *Promise*<ApolloQueryResult<Record<*cart*, [*Cart*](#cart)\>\>\>

<a name="1modulesapi_getcategorymd"></a>

## `getCategory`

Defined in: [packages/commercetools/api-client/src/api/getCategory/index.ts:12](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/getCategory/index.ts#L12)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`params` | *any* |
`customQuery?` | *Record*<string, string\> |

**Returns:** *Promise*<ApolloQueryResult<[*CategoryData*](#interfacesapi_getcategorycategorydatamd)\>\>

<a name="1modulesapi_getmemd"></a>

## `getMe`

Defined in: [packages/commercetools/api-client/src/api/getMe/index.ts:15](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/getMe/index.ts#L15)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`params` | [*GetMeParams*](#interfacesapi_getmegetmeparamsmd) |
`customQuery?` | *Record*<string, string\> |

**Returns:** *Promise*<ApolloQueryResult<[*OrdersData*](#interfacesapi_getmeordersdatamd)\>\>

<a name="1modulesapi_getordersmd"></a>

## `getOrders`

Defined in: [packages/commercetools/api-client/src/api/getOrders/index.ts:12](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/getOrders/index.ts#L12)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`params` | *any* |
`customQuery?` | *Record*<string, string\> |

**Returns:** *Promise*<ApolloQueryResult<OrdersData\>\>

<a name="1modulesapi_getproductmd"></a>

## `getProduct`

Defined in: [packages/commercetools/api-client/src/api/getProduct/index.ts:12](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/getProduct/index.ts#L12)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`params` | *any* |
`customQuery?` | *Record*<string, string\> |

**Returns:** *Promise*<ApolloQueryResult<[*ProductData*](#interfacesapi_getproductproductdatamd)\>\>

<a name="1modulesapi_getshippingmethodsmd"></a>

## `getShippingMethods`

Defined in: [packages/commercetools/api-client/src/api/getShippingMethods/index.ts:11](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/getShippingMethods/index.ts#L11)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`cartId?` | *string* |
`customQuery?` | *Record*<string, string\> |

**Returns:** *Promise*<ApolloQueryResult<[*ShippingMethodData*](#interfacesapi_getshippingmethodsshippingmethoddatamd)\>\>

<a name="1modulesapi_isguestmd"></a>

## `isGuest`

Defined in: [packages/commercetools/api-client/src/api/isGuest/index.ts:3](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/isGuest/index.ts#L3)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |

**Returns:** *any*

<a name="1modulesapi_removecartcouponmd"></a>

## `removeCartCoupon`

Defined in: [packages/commercetools/api-client/src/api/removeCartCoupon/index.ts:7](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/removeCartCoupon/index.ts#L7)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`cart` | [*Cart*](#cart) |
`discountCode` | [*ReferenceInput*](#referenceinput) |
`customQuery?` | *Record*<string, string\> |

**Returns:** *Promise*<[*CartResponse*](#cartresponse)\>

<a name="1modulesapi_removefromcartmd"></a>

## `removeFromCart`

Defined in: [packages/commercetools/api-client/src/api/removeFromCart/index.ts:7](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/removeFromCart/index.ts#L7)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`cart` | [*Cart*](#cart) |
`product` | [*LineItem*](#lineitem) |
`customQuery?` | *Record*<string, string\> |

**Returns:** *Promise*<[*CartResponse*](#cartresponse)\>

<a name="1modulesapi_updatecartmd"></a>

## `updateCart`

Defined in: [packages/commercetools/api-client/src/api/updateCart/index.ts:15](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/updateCart/index.ts#L15)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`params` | [*UpdateCartParams*](#interfacesapi_updatecartupdatecartparamsmd) |
`customQuery?` | *Record*<string, string\> |

**Returns:** *any*

<a name="1modulesapi_updatecartquantitymd"></a>

## `updateCartQuantity`

Defined in: [packages/commercetools/api-client/src/api/updateCartQuantity/index.ts:7](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/updateCartQuantity/index.ts#L7)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`cart` | [*Cart*](#cart) |
`product` | [*LineItem*](#lineitem) |
`customQuery?` | *Record*<string, string\> |

**Returns:** *Promise*<[*CartResponse*](#cartresponse)\>

<a name="1modulesapi_updateshippingdetailsmd"></a>

## `updateShippingDetails`

Defined in: [packages/commercetools/api-client/src/api/updateShippingDetails/index.ts:7](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/updateShippingDetails/index.ts#L7)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *any* |
`cart` | [*Cart*](#cart) |
`shippingDetails` | [*Address*](#address) |
`customQuery?` | *Record*<string, string\> |

**Returns:** *Promise*<[*CartResponse*](#cartresponse)\>

<a name="1modulestypes_apimd"></a>

## `Types`

### `CartMutationResponse`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:90](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L90)

___

### `CartQueryResponse`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:88](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L88)

___

### `CartResponse`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:91](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L91)

___

### `ChangeMyPasswordResponse`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:96](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L96)

___

### `CommercetoolsMethods`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:122](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L122)

___

### `MutationResponse`

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *string* |
`V` | - |

Defined in: [packages/commercetools/api-client/src/types/Api.ts:87](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L87)

___

### `OrderMutationResponse`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:92](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L92)

___

### `OrderQueryResponse`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:89](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L89)

___

### `OrderResponse`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:93](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L93)

___

### `QueryResponse`

#### Type parameters:

Name | Type |
:------ | :------ |
`K` | *string* |
`V` | - |

Defined in: [packages/commercetools/api-client/src/types/Api.ts:86](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L86)

___

### `ShippingMethodsResponse`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:94](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L94)

___

### `SignInResponse`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:95](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L95)

<a name="1modulestypes_graphqlmd"></a>



### `AbsoluteDiscountValue`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:43](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L43)

___

### `AbsoluteDiscountValueInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`money` | [*MoneyInput*](#moneyinput)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:50](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L50)

___

### `ActiveCartInterface`

A field to access the active cart.

#### Type declaration:

Name | Type |
:------ | :------ |
`activeCart`? | [*Maybe*](#maybe)<[*Cart*](#cart)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:55](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L55)

___

### `AddAttributeDefinition`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeDefinition` | [*AttributeDefinitionDraft*](#attributedefinitiondraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:59](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L59)

___

### `AddCartCustomLineItem`

#### Type declaration:

Name | Type |
:------ | :------ |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`externalTaxRate`? | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`money` | [*BaseMoneyInput*](#basemoneyinput) |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`quantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetails`? | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |
`slug` | [*Scalars*](#scalars)[*String*] |
`taxCategory`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:63](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L63)

___

### `AddCartDiscountCode`

#### Type declaration:

Name | Type |
:------ | :------ |
`code` | [*Scalars*](#scalars)[*String*] |
`validateDuplicates`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:74](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L74)

___

### `AddCartItemShippingAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`address` | [*AddressInput*](#addressinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:79](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L79)

___

### `AddCartLineItem`

#### Type declaration:

Name | Type |
:------ | :------ |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`distributionChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`externalPrice`? | [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> |
`externalTaxRate`? | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`externalTotalPrice`? | [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> |
`productId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetails`? | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`supplyChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:83](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L83)

___

### `AddCartPayment`

#### Type declaration:

Name | Type |
:------ | :------ |
`payment` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:98](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L98)

___

### `AddCartShoppingList`

#### Type declaration:

Name | Type |
:------ | :------ |
`distributionChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`shoppingList` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`supplyChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:102](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L102)

___

### `AddCategoryAsset`

#### Type declaration:

Name | Type |
:------ | :------ |
`asset` | [*AssetDraftInput*](#assetdraftinput) |
`position`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:108](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L108)

___

### `AddCustomerAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`address` | [*AddressInput*](#addressinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:113](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L113)

___

### `AddCustomerBillingAddressId`

#### Type declaration:

Name | Type |
:------ | :------ |
`addressId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:117](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L117)

___

### `AddCustomerShippingAddressId`

#### Type declaration:

Name | Type |
:------ | :------ |
`addressId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:121](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L121)

___

### `AddCustomerStore`

#### Type declaration:

Name | Type |
:------ | :------ |
`store` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:125](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L125)

___

### `AddInventoryEntryQuantity`

#### Type declaration:

Name | Type |
:------ | :------ |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:129](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L129)

___

### `AddLocalizedEnumValue`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`value` | [*LocalizedEnumValueDraft*](#localizedenumvaluedraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:133](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L133)

___

### `AddMyCartLineItem`

#### Type declaration:

Name | Type |
:------ | :------ |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`distributionChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`productId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetails`? | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`supplyChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:138](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L138)

___

### `AddOrderDelivery`

#### Type declaration:

Name | Type |
:------ | :------ |
`address`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |
`items`? | [*Maybe*](#maybe)<[*DeliveryItemDraftType*](#deliveryitemdrafttype)[]\> |
`parcels`? | [*Maybe*](#maybe)<[*DeliveryItemDraftType*](#deliveryitemdrafttype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:150](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L150)

___

### `AddOrderItemShippingAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`address` | [*AddressInput*](#addressinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:156](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L156)

___

### `AddOrderParcelToDelivery`

#### Type declaration:

Name | Type |
:------ | :------ |
`deliveryId` | [*Scalars*](#scalars)[*String*] |
`items`? | [*Maybe*](#maybe)<[*DeliveryItemDraftType*](#deliveryitemdrafttype)[]\> |
`measurements`? | [*Maybe*](#maybe)<[*ParcelMeasurementsDraftType*](#parcelmeasurementsdrafttype)\> |
`trackingData`? | [*Maybe*](#maybe)<[*TrackingDataDraftType*](#trackingdatadrafttype)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:160](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L160)

___

### `AddOrderPayment`

#### Type declaration:

Name | Type |
:------ | :------ |
`payment` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:167](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L167)

___

### `AddOrderReturnInfo`

#### Type declaration:

Name | Type |
:------ | :------ |
`items` | [*ReturnItemDraftType*](#returnitemdrafttype)[] |
`returnDate`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`returnTrackingId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:171](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L171)

___

### `AddPlainEnumValue`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`value` | [*PlainEnumValueDraft*](#plainenumvaluedraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:177](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L177)

___

### `AddProductAsset`

#### Type declaration:

Name | Type |
:------ | :------ |
`asset` | [*AssetDraftInput*](#assetdraftinput) |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`position`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:182](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L182)

___

### `AddProductExternalImage`

#### Type declaration:

Name | Type |
:------ | :------ |
`image` | [*ImageInput*](#imageinput) |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:191](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L191)

___

### `AddProductPrice`

#### Type declaration:

Name | Type |
:------ | :------ |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`price` | [*ProductPriceDataInput*](#productpricedatainput) |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:198](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L198)

___

### `AddProductToCategory`

#### Type declaration:

Name | Type |
:------ | :------ |
`category` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`orderHint`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:206](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L206)

___

### `AddProductVariant`

#### Type declaration:

Name | Type |
:------ | :------ |
`assets`? | [*Maybe*](#maybe)<[*AssetDraftInput*](#assetdraftinput)[]\> |
`attributes`? | [*Maybe*](#maybe)<[*ProductAttributeInput*](#productattributeinput)[]\> |
`images`? | [*Maybe*](#maybe)<[*ImageInput*](#imageinput)[]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`prices`? | [*Maybe*](#maybe)<[*ProductPriceDataInput*](#productpricedatainput)[]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:212](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L212)

___

### `AddShippingMethodShippingRate`

#### Type declaration:

Name | Type |
:------ | :------ |
`shippingRate` | [*ShippingRateDraft*](#shippingratedraft) |
`zone` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:289](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L289)

___

### `AddShippingMethodZone`

#### Type declaration:

Name | Type |
:------ | :------ |
`zone` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:294](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L294)

___

### `AddShoppingListLineItem`

#### Type declaration:

Name | Type |
:------ | :------ |
`addedAt`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`productId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:298](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L298)

___

### `AddShoppingListTextLineItem`

#### Type declaration:

Name | Type |
:------ | :------ |
`addedAt`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`quantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:307](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L307)

___

### `AddZoneLocation`

#### Type declaration:

Name | Type |
:------ | :------ |
`location` | [*ZoneLocation*](#zonelocation) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:315](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L315)

___

### `Address`

An address represents a postal address.

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *Address* |
`additionalAddressInfo`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`additionalStreetInfo`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`apartment`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`building`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`city`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`company`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`contactInfo` | [*AddressContactInfo*](#addresscontactinfo) |
`country` | [*Scalars*](#scalars)[*Country*] |
`department`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`email`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`externalId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`fax`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`firstName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`lastName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`mobile`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`pOBox`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`phone`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`postalCode`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`region`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`salutation`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`state`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`streetName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`streetNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`title`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:223](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L223)

___

### `AddressContactInfo`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *AddressContactInfo* |
`email`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`fax`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`mobile`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`phone`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:253](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L253)

___

### `AddressInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`additionalAddressInfo`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`additionalStreetInfo`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`apartment`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`building`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`city`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`company`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`country` | [*Scalars*](#scalars)[*Country*] |
`department`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`email`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`externalId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`fax`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`firstName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`lastName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`mobile`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`pOBox`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`phone`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`postalCode`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`region`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`salutation`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`state`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`streetName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`streetNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`title`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:261](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L261)

___

### `ApiClientWithSecret`

API Clients can be used to obtain OAuth 2 access tokens. The secret is only
shown once in the response of creating the API Client.

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *APIClientWithSecret* |
`createdAt`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`id` | [*Scalars*](#scalars)[*String*] |
`lastUsedAt`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> |
`name` | [*Scalars*](#scalars)[*String*] |
`scope` | [*Scalars*](#scalars)[*String*] |
`secret` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:358](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L358)

___

### `ApiClientWithoutSecret`

API Clients can be used to obtain OAuth 2 access tokens

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *APIClientWithoutSecret* |
`createdAt`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`id` | [*Scalars*](#scalars)[*String*] |
`lastUsedAt`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> |
`name` | [*Scalars*](#scalars)[*String*] |
`scope` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:338](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L338)

___

### `ApiClientWithoutSecretQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *APIClientWithoutSecretQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*ApiClientWithoutSecret*](#apiclientwithoutsecret)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:347](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L347)

___

### `ApplyCartDeltaToCustomLineItemShippingDetailsTargets`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`targetsDelta` | [*ShippingTargetDraft*](#shippingtargetdraft)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:368](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L368)

___

### `ApplyCartDeltaToLineItemShippingDetailsTargets`

#### Type declaration:

Name | Type |
:------ | :------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`targetsDelta` | [*ShippingTargetDraft*](#shippingtargetdraft)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:373](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L373)

___

### `Asset`

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`__typename`? | *Asset* | - |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> | - |
`customFieldList`? | [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> | Custom fields are returned as a list instead of an object structure.   |
`customFields`? | [*Maybe*](#maybe)<[*Type*](#type)\> | This field would contain type data   |
`customFieldsRaw`? | [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> | This field contains non-typed data. Consider using `customFields` as a typed alternative.   |
`description`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`descriptionAllLocales`? | [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> | - |
`id` | [*Scalars*](#scalars)[*String*] | - |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`name`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] | - |
`sources` | [*AssetSource*](#assetsource)[] | - |
`tags` | [*Scalars*](#scalars)[*String*][] | - |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:378](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L378)

___

### `AssetCustomFieldListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:412](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L412)

___

### `AssetCustomFieldsRawArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:407](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L407)

___

### `AssetDescriptionArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:402](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L402)

___

### `AssetDimensions`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *AssetDimensions* |
`height` | [*Scalars*](#scalars)[*Int*] |
`width` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:417](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L417)

___

### `AssetDimensionsInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`height` | [*Scalars*](#scalars)[*Int*] |
`width` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:423](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L423)

___

### `AssetDraftInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`sources`? | [*Maybe*](#maybe)<[*AssetSourceInput*](#assetsourceinput)[]\> |
`tags`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:428](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L428)

___

### `AssetNameArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:397](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L397)

___

### `AssetSource`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *AssetSource* |
`contentType`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`dimensions`? | [*Maybe*](#maybe)<[*AssetDimensions*](#assetdimensions)\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`uri` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:438](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L438)

___

### `AssetSourceInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`contentType`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`dimensions`? | [*Maybe*](#maybe)<[*AssetDimensionsInput*](#assetdimensionsinput)\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`uri` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:446](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L446)

___

### `Attribute`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:453](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L453)

___

### `AttributeDefinition`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *AttributeDefinition* |
`attributeConstraint` | [*AttributeConstraint*](../enums/types_graphql.attributeconstraint.md) |
`inputHint` | [*TextInputHint*](../enums/types_graphql.textinputhint.md) |
`inputTip`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`inputTipAllLocales`? | [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> |
`isRequired` | [*Scalars*](#scalars)[*Boolean*] |
`isSearchable` | [*Scalars*](#scalars)[*Boolean*] |
`label`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`labelAllLocales` | [*LocalizedString*](#localizedstring)[] |
`name` | [*Scalars*](#scalars)[*String*] |
`type` | [*AttributeDefinitionType*](#attributedefinitiontype) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:468](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L468)

___

### `AttributeDefinitionDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeConstraint`? | [*Maybe*](#maybe)<[*AttributeConstraint*](../enums/types_graphql.attributeconstraint.md)\> |
`inputHint`? | [*Maybe*](#maybe)<[*TextInputHint*](../enums/types_graphql.textinputhint.md)\> |
`inputTip`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`isRequired` | [*Scalars*](#scalars)[*Boolean*] |
`isSearchable` | [*Scalars*](#scalars)[*Boolean*] |
`label` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`name` | [*Scalars*](#scalars)[*String*] |
`type` | [*AttributeTypeDraft*](#attributetypedraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:492](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L492)

___

### `AttributeDefinitionInputTipArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:487](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L487)

___

### `AttributeDefinitionLabelArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:482](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L482)

___

### `AttributeDefinitionResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *AttributeDefinitionResult* |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`results` | [*AttributeDefinition*](#attributedefinition)[] |
`total` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:503](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L503)

___

### `AttributeDefinitionType`

(https://dev.commercetools.com/http-api-projects-productTypes.html#attributetype)[https://dev.commercetools.com/http-api-projects-productTypes.html#attributetype]

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:512](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L512)

___

### `AttributeSetElementTypeDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`boolean`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`date`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`datetime`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`enum`? | [*Maybe*](#maybe)<[*EnumTypeDraft*](#enumtypedraft)\> |
`lenum`? | [*Maybe*](#maybe)<[*LocalizableEnumTypeDraft*](#localizableenumtypedraft)\> |
`ltext`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`money`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`number`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`reference`? | [*Maybe*](#maybe)<[*ReferenceTypeDefinitionDraft*](#referencetypedefinitiondraft)\> |
`text`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`time`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:516](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L516)

___

### `AttributeSetTypeDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`elementType` | [*AttributeSetElementTypeDraft*](#attributesetelementtypedraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:530](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L530)

___

### `AttributeTypeDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`boolean`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`date`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`datetime`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`enum`? | [*Maybe*](#maybe)<[*EnumTypeDraft*](#enumtypedraft)\> |
`lenum`? | [*Maybe*](#maybe)<[*LocalizableEnumTypeDraft*](#localizableenumtypedraft)\> |
`ltext`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`money`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`number`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`reference`? | [*Maybe*](#maybe)<[*ReferenceTypeDefinitionDraft*](#referencetypedefinitiondraft)\> |
`set`? | [*Maybe*](#maybe)<[*AttributeSetTypeDraft*](#attributesettypedraft)\> |
`text`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`time`? | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:534](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L534)

___

### `BaseMoney`

#### Type declaration:

Name | Type |
:------ | :------ |
`centAmount` | [*Scalars*](#scalars)[*Long*] |
`currencyCode` | [*Scalars*](#scalars)[*Currency*] |
`fractionDigits` | [*Scalars*](#scalars)[*Int*] |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:549](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L549)

___

### `BaseMoneyInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`centPrecision`? | [*Maybe*](#maybe)<[*MoneyInput*](#moneyinput)\> |
`highPrecision`? | [*Maybe*](#maybe)<[*HighPrecisionMoneyInput*](#highprecisionmoneyinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:556](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L556)

___

### `BaseSearchKeywordInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`custom`? | [*Maybe*](#maybe)<[*CustomSuggestTokenizerInput*](#customsuggesttokenizerinput)\> |
`whitespace`? | [*Maybe*](#maybe)<[*WhitespaceSuggestTokenizerInput*](#whitespacesuggesttokenizerinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:561](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L561)

___

### `BooleanAttribute`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:566](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L566)

___

### `BooleanAttributeDefinitionType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:572](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L572)

___

### `BooleanField`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:577](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L577)

___

### `BooleanType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:583](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L583)

___

### `Cart`

A shopping cart holds product variants and can be ordered. Each cart either
belongs to a registered customer or is an anonymous cart.

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:591](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L591)

___

### `CartClassificationInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`values` | [*LocalizedEnumValueInput*](#localizedenumvalueinput)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:654](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L654)

___

### `CartClassificationType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:658](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L658)

___

### `CartCustomFieldListArgs`

A shopping cart holds product variants and can be ordered. Each cart either
belongs to a registered customer or is an anonymous cart.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:649](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L649)

___

### `CartCustomFieldsRawArgs`

A shopping cart holds product variants and can be ordered. Each cart either
belongs to a registered customer or is an anonymous cart.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:641](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L641)

___

### `CartDiscount`

Cart discounts are recalculated every time LineItems or CustomLineItems are
added or removed from the Cart or an order is created from the cart.

The number of active cart discounts that do not require a discount code
(isActive=true and requiresDiscountCode=false) is limited to 100.

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:670](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L670)

___

### `CartDiscountCustomFieldListArgs`

Cart discounts are recalculated every time LineItems or CustomLineItems are
added or removed from the Cart or an order is created from the cart.

The number of active cart discounts that do not require a discount code
(isActive=true and requiresDiscountCode=false) is limited to 100.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:740](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L740)

___

### `CartDiscountCustomFieldsRawArgs`

Cart discounts are recalculated every time LineItems or CustomLineItems are
added or removed from the Cart or an order is created from the cart.

The number of active cart discounts that do not require a discount code
(isActive=true and requiresDiscountCode=false) is limited to 100.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:729](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L729)

___

### `CartDiscountDescriptionArgs`

Cart discounts are recalculated every time LineItems or CustomLineItems are
added or removed from the Cart or an order is created from the cart.

The number of active cart discounts that do not require a discount code
(isActive=true and requiresDiscountCode=false) is limited to 100.

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:718](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L718)

___

### `CartDiscountDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`cartPredicate` | [*Scalars*](#scalars)[*String*] |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`isActive`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`requiresDiscountCode`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`sortOrder` | [*Scalars*](#scalars)[*String*] |
`stackingMode`? | [*Maybe*](#maybe)<[*StackingMode*](../enums/types_graphql.stackingmode.md)\> |
`target`? | [*Maybe*](#maybe)<[*CartDiscountTargetInput*](#cartdiscounttargetinput)\> |
`validFrom`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`value` | [*CartDiscountValueInput*](#cartdiscountvalueinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:745](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L745)

___

### `CartDiscountNameArgs`

Cart discounts are recalculated every time LineItems or CustomLineItems are
added or removed from the Cart or an order is created from the cart.

The number of active cart discounts that do not require a discount code
(isActive=true and requiresDiscountCode=false) is limited to 100.

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:707](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L707)

___

### `CartDiscountQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *CartDiscountQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*CartDiscount*](#cartdiscount)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:761](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L761)

___

### `CartDiscountTarget`

#### Type declaration:

Name | Type |
:------ | :------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:769](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L769)

___

### `CartDiscountTargetInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItems`? | [*Maybe*](#maybe)<[*CustomLineItemsTargetInput*](#customlineitemstargetinput)\> |
`lineItems`? | [*Maybe*](#maybe)<[*LineItemsTargetInput*](#lineitemstargetinput)\> |
`multiBuyCustomLineItems`? | [*Maybe*](#maybe)<[*MultiBuyCustomLineItemsTargetInput*](#multibuycustomlineitemstargetinput)\> |
`multiBuyLineItems`? | [*Maybe*](#maybe)<[*MultiBuyLineItemsTargetInput*](#multibuylineitemstargetinput)\> |
`shipping`? | [*Maybe*](#maybe)<[*ShippingTargetInput*](#shippingtargetinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:773](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L773)

___

### `CartDiscountUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`changeCartPredicate`? | [*Maybe*](#maybe)<[*ChangeCartDiscountCartPredicate*](#changecartdiscountcartpredicate)\> |
`changeIsActive`? | [*Maybe*](#maybe)<[*ChangeCartDiscountIsActive*](#changecartdiscountisactive)\> |
`changeName`? | [*Maybe*](#maybe)<[*ChangeCartDiscountName*](#changecartdiscountname)\> |
`changeRequiresDiscountCode`? | [*Maybe*](#maybe)<[*ChangeCartDiscountRequiresDiscountCode*](#changecartdiscountrequiresdiscountcode)\> |
`changeSortOrder`? | [*Maybe*](#maybe)<[*ChangeCartDiscountSortOrder*](#changecartdiscountsortorder)\> |
`changeStackingMode`? | [*Maybe*](#maybe)<[*ChangeCartDiscountStackingMode*](#changecartdiscountstackingmode)\> |
`changeTarget`? | [*Maybe*](#maybe)<[*ChangeCartDiscountTarget*](#changecartdiscounttarget)\> |
`changeValue`? | [*Maybe*](#maybe)<[*ChangeCartDiscountValue*](#changecartdiscountvalue)\> |
`setCustomField`? | [*Maybe*](#maybe)<[*SetCartDiscountCustomField*](#setcartdiscountcustomfield)\> |
`setCustomType`? | [*Maybe*](#maybe)<[*SetCartDiscountCustomType*](#setcartdiscountcustomtype)\> |
`setDescription`? | [*Maybe*](#maybe)<[*SetCartDiscountDescription*](#setcartdiscountdescription)\> |
`setKey`? | [*Maybe*](#maybe)<[*SetCartDiscountKey*](#setcartdiscountkey)\> |
`setValidFrom`? | [*Maybe*](#maybe)<[*SetCartDiscountValidFrom*](#setcartdiscountvalidfrom)\> |
`setValidFromAndUntil`? | [*Maybe*](#maybe)<[*SetCartDiscountValidFromAndUntil*](#setcartdiscountvalidfromanduntil)\> |
`setValidUntil`? | [*Maybe*](#maybe)<[*SetCartDiscountValidUntil*](#setcartdiscountvaliduntil)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:781](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L781)

___

### `CartDiscountValue`

#### Type declaration:

Name | Type |
:------ | :------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:799](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L799)

___

### `CartDiscountValueInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`absolute`? | [*Maybe*](#maybe)<[*AbsoluteDiscountValueInput*](#absolutediscountvalueinput)\> |
`giftLineItem`? | [*Maybe*](#maybe)<[*GiftLineItemValueInput*](#giftlineitemvalueinput)\> |
`relative`? | [*Maybe*](#maybe)<[*RelativeDiscountValueInput*](#relativediscountvalueinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:803](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L803)

___

### `CartDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`anonymousId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`billingAddress`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |
`country`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> |
`currency` | [*Scalars*](#scalars)[*Currency*] |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`customLineItems`? | [*Maybe*](#maybe)<[*CustomLineItemDraft*](#customlineitemdraft)[]\> |
`customerEmail`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`customerGroup`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`customerId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`deleteDaysAfterLastModification`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`discountCodes`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`externalTaxRateForShippingMethod`? | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`inventoryMode`? | [*Maybe*](#maybe)<[*InventoryMode*](../enums/types_graphql.inventorymode.md)\> |
`itemShippingAddresses`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)[]\> |
`lineItems`? | [*Maybe*](#maybe)<[*LineItemDraft*](#lineitemdraft)[]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |
`origin`? | [*Maybe*](#maybe)<[*CartOrigin*](../enums/types_graphql.cartorigin.md)\> |
`shippingAddress`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |
`shippingMethod`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`shippingRateInput`? | [*Maybe*](#maybe)<[*ShippingRateInputDraft*](#shippingrateinputdraft)\> |
`store`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`taxCalculationMode`? | [*Maybe*](#maybe)<[*TaxCalculationMode*](../enums/types_graphql.taxcalculationmode.md)\> |
`taxMode`? | [*Maybe*](#maybe)<[*TaxMode*](../enums/types_graphql.taxmode.md)\> |
`taxRoundingMode`? | [*Maybe*](#maybe)<[*RoundingMode*](../enums/types_graphql.roundingmode.md)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:809](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L809)

___

### `CartQueryInterface`

Fields to access carts. Includes direct access to a single cart and searching for carts.

#### Type declaration:

Name | Type |
:------ | :------ |
`cart`? | [*Maybe*](#maybe)<[*Cart*](#cart)\> |
`carts` | [*CartQueryResult*](#cartqueryresult) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:844](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L844)

___

### `CartQueryInterfaceCartArgs`

Fields to access carts. Includes direct access to a single cart and searching for carts.

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:850](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L850)

___

### `CartQueryInterfaceCartsArgs`

Fields to access carts. Includes direct access to a single cart and searching for carts.

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:855](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L855)

___

### `CartQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *CartQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Cart*](#cart)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:862](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L862)

___

### `CartScoreInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`dummy`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:870](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L870)

___

### `CartScoreType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:874](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L874)

___

### `CartUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addCustomLineItem`? | [*Maybe*](#maybe)<[*AddCartCustomLineItem*](#addcartcustomlineitem)\> |
`addDiscountCode`? | [*Maybe*](#maybe)<[*AddCartDiscountCode*](#addcartdiscountcode)\> |
`addItemShippingAddress`? | [*Maybe*](#maybe)<[*AddCartItemShippingAddress*](#addcartitemshippingaddress)\> |
`addLineItem`? | [*Maybe*](#maybe)<[*AddCartLineItem*](#addcartlineitem)\> |
`addPayment`? | [*Maybe*](#maybe)<[*AddCartPayment*](#addcartpayment)\> |
`addShoppingList`? | [*Maybe*](#maybe)<[*AddCartShoppingList*](#addcartshoppinglist)\> |
`applyDeltaToCustomLineItemShippingDetailsTargets`? | [*Maybe*](#maybe)<[*ApplyCartDeltaToCustomLineItemShippingDetailsTargets*](#applycartdeltatocustomlineitemshippingdetailstargets)\> |
`applyDeltaToLineItemShippingDetailsTargets`? | [*Maybe*](#maybe)<[*ApplyCartDeltaToLineItemShippingDetailsTargets*](#applycartdeltatolineitemshippingdetailstargets)\> |
`changeCustomLineItemMoney`? | [*Maybe*](#maybe)<[*ChangeCartCustomLineItemMoney*](#changecartcustomlineitemmoney)\> |
`changeCustomLineItemQuantity`? | [*Maybe*](#maybe)<[*ChangeCartCustomLineItemQuantity*](#changecartcustomlineitemquantity)\> |
`changeLineItemQuantity`? | [*Maybe*](#maybe)<[*ChangeCartLineItemQuantity*](#changecartlineitemquantity)\> |
`changeTaxCalculationMode`? | [*Maybe*](#maybe)<[*ChangeCartTaxCalculationMode*](#changecarttaxcalculationmode)\> |
`changeTaxMode`? | [*Maybe*](#maybe)<[*ChangeCartTaxMode*](#changecarttaxmode)\> |
`changeTaxRoundingMode`? | [*Maybe*](#maybe)<[*ChangeCartTaxRoundingMode*](#changecarttaxroundingmode)\> |
`recalculate`? | [*Maybe*](#maybe)<[*RecalculateCart*](#recalculatecart)\> |
`removeCustomLineItem`? | [*Maybe*](#maybe)<[*RemoveCartCustomLineItem*](#removecartcustomlineitem)\> |
`removeDiscountCode`? | [*Maybe*](#maybe)<[*RemoveCartDiscountCode*](#removecartdiscountcode)\> |
`removeItemShippingAddress`? | [*Maybe*](#maybe)<[*RemoveCartItemShippingAddress*](#removecartitemshippingaddress)\> |
`removeLineItem`? | [*Maybe*](#maybe)<[*RemoveCartLineItem*](#removecartlineitem)\> |
`removePayment`? | [*Maybe*](#maybe)<[*RemoveCartPayment*](#removecartpayment)\> |
`setAnonymousId`? | [*Maybe*](#maybe)<[*SetCartAnonymousId*](#setcartanonymousid)\> |
`setBillingAddress`? | [*Maybe*](#maybe)<[*SetCartBillingAddress*](#setcartbillingaddress)\> |
`setCartTotalTax`? | [*Maybe*](#maybe)<[*SetCartTotalTax*](#setcarttotaltax)\> |
`setCountry`? | [*Maybe*](#maybe)<[*SetCartCountry*](#setcartcountry)\> |
`setCustomField`? | [*Maybe*](#maybe)<[*SetCartCustomField*](#setcartcustomfield)\> |
`setCustomLineItemCustomField`? | [*Maybe*](#maybe)<[*SetCartCustomLineItemCustomField*](#setcartcustomlineitemcustomfield)\> |
`setCustomLineItemCustomType`? | [*Maybe*](#maybe)<[*SetCartCustomLineItemCustomType*](#setcartcustomlineitemcustomtype)\> |
`setCustomLineItemShippingDetails`? | [*Maybe*](#maybe)<[*SetCartCustomLineItemShippingDetails*](#setcartcustomlineitemshippingdetails)\> |
`setCustomLineItemTaxAmount`? | [*Maybe*](#maybe)<[*SetCartCustomLineItemTaxAmount*](#setcartcustomlineitemtaxamount)\> |
`setCustomLineItemTaxRate`? | [*Maybe*](#maybe)<[*SetCartCustomLineItemTaxRate*](#setcartcustomlineitemtaxrate)\> |
`setCustomShippingMethod`? | [*Maybe*](#maybe)<[*SetCartCustomShippingMethod*](#setcartcustomshippingmethod)\> |
`setCustomType`? | [*Maybe*](#maybe)<[*SetCartCustomType*](#setcartcustomtype)\> |
`setCustomerEmail`? | [*Maybe*](#maybe)<[*SetCartCustomerEmail*](#setcartcustomeremail)\> |
`setCustomerGroup`? | [*Maybe*](#maybe)<[*SetCartCustomerGroup*](#setcartcustomergroup)\> |
`setCustomerId`? | [*Maybe*](#maybe)<[*SetCartCustomerId*](#setcartcustomerid)\> |
`setDeleteDaysAfterLastModification`? | [*Maybe*](#maybe)<[*SetCartDeleteDaysAfterLastModification*](#setcartdeletedaysafterlastmodification)\> |
`setLineItemCustomField`? | [*Maybe*](#maybe)<[*SetCartLineItemCustomField*](#setcartlineitemcustomfield)\> |
`setLineItemCustomType`? | [*Maybe*](#maybe)<[*SetCartLineItemCustomType*](#setcartlineitemcustomtype)\> |
`setLineItemPrice`? | [*Maybe*](#maybe)<[*SetCartLineItemPrice*](#setcartlineitemprice)\> |
`setLineItemShippingDetails`? | [*Maybe*](#maybe)<[*SetCartLineItemShippingDetails*](#setcartlineitemshippingdetails)\> |
`setLineItemTaxAmount`? | [*Maybe*](#maybe)<[*SetCartLineItemTaxAmount*](#setcartlineitemtaxamount)\> |
`setLineItemTaxRate`? | [*Maybe*](#maybe)<[*SetCartLineItemTaxRate*](#setcartlineitemtaxrate)\> |
`setLineItemTotalPrice`? | [*Maybe*](#maybe)<[*SetCartLineItemTotalPrice*](#setcartlineitemtotalprice)\> |
`setLocale`? | [*Maybe*](#maybe)<[*SetCartLocale*](#setcartlocale)\> |
`setShippingAddress`? | [*Maybe*](#maybe)<[*SetCartShippingAddress*](#setcartshippingaddress)\> |
`setShippingMethod`? | [*Maybe*](#maybe)<[*SetCartShippingMethod*](#setcartshippingmethod)\> |
`setShippingMethodTaxAmount`? | [*Maybe*](#maybe)<[*SetCartShippingMethodTaxAmount*](#setcartshippingmethodtaxamount)\> |
`setShippingMethodTaxRate`? | [*Maybe*](#maybe)<[*SetCartShippingMethodTaxRate*](#setcartshippingmethodtaxrate)\> |
`setShippingRateInput`? | [*Maybe*](#maybe)<[*SetCartShippingRateInput*](#setcartshippingrateinput)\> |
`updateItemShippingAddress`? | [*Maybe*](#maybe)<[*UpdateCartItemShippingAddress*](#updatecartitemshippingaddress)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:888](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L888)

___

### `CartValueInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`dummy`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:949](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L949)

___

### `CartValueType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:953](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L953)

___

### `Category`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:958](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L958)

___

### `CategoryCustomFieldListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1035](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1035)

___

### `CategoryCustomFieldsRawArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1030](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1030)

___

### `CategoryDescriptionArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1005](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1005)

___

### `CategoryDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`assets`? | [*Maybe*](#maybe)<[*AssetDraftInput*](#assetdraftinput)[]\> |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`externalId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`metaDescription`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`metaKeywords`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`metaTitle`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`orderHint`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`parent`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`slug` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1040](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1040)

___

### `CategoryMetaDescriptionArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1025](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1025)

___

### `CategoryMetaKeywordsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1020](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1020)

___

### `CategoryMetaTitleArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1015](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1015)

___

### `CategoryNameArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1000](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1000)

___

### `CategoryOrderHint`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *CategoryOrderHint* |
`categoryId` | [*Scalars*](#scalars)[*String*] |
`orderHint` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1055](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1055)

___

### `CategoryOrderHintInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`orderHint` | [*Scalars*](#scalars)[*String*] |
`uuid` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1061](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1061)

___

### `CategoryQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *CategoryQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Category*](#category)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1066](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1066)

___

### `CategorySearch`

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`__typename`? | *CategorySearch* | - |
`ancestors` | [*CategorySearch*](#categorysearch)[] | - |
`ancestorsRef` | [*Reference*](#reference)[] | - |
`assets` | [*Asset*](#asset)[] | - |
`childCount` | [*Scalars*](#scalars)[*Int*] | - |
`children` | [*CategorySearch*](#categorysearch)[] | Direct child categories.   |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] | - |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> | - |
`customFieldList`? | [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> | Custom fields are returned as a list instead of an object structure.   |
`customFields`? | [*Maybe*](#maybe)<[*Type*](#type)\> | This field would contain type data   |
`customFieldsRaw`? | [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> | This field contains non-typed data. Consider using `customFields` as a typed alternative.   |
`description`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`descriptionAllLocales`? | [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> | - |
`externalId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`id` | [*Scalars*](#scalars)[*String*] | - |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`lastModifiedAt` | [*Scalars*](#scalars)[*DateTime*] | - |
`name`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] | - |
`orderHint` | [*Scalars*](#scalars)[*String*] | - |
`parent`? | [*Maybe*](#maybe)<[*CategorySearch*](#categorysearch)\> | - |
`parentRef`? | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`productCount` | [*Scalars*](#scalars)[*Int*] | - |
`productTypeNames` | [*Scalars*](#scalars)[*String*][] | - |
`slug`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`slugAllLocales` | [*LocalizedString*](#localizedstring)[] | - |
`stagedProductCount` | [*Scalars*](#scalars)[*Int*] | - |
`version` | [*Scalars*](#scalars)[*Long*] | - |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1074](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1074)

___

### `CategorySearchCustomFieldListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1129](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1129)

___

### `CategorySearchCustomFieldsRawArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1124](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1124)

___

### `CategorySearchDescriptionArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1114](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1114)

___

### `CategorySearchNameArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1109](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1109)

___

### `CategorySearchResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *CategorySearchResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*CategorySearch*](#categorysearch)[] |
`total` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1134](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1134)

___

### `CategorySearchSlugArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1119](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1119)

___

### `CategorySlugArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1010](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1010)

___

### `CategoryUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addAsset`? | [*Maybe*](#maybe)<[*AddCategoryAsset*](#addcategoryasset)\> |
`changeAssetName`? | [*Maybe*](#maybe)<[*ChangeCategoryAssetName*](#changecategoryassetname)\> |
`changeAssetOrder`? | [*Maybe*](#maybe)<[*ChangeCategoryAssetOrder*](#changecategoryassetorder)\> |
`changeName`? | [*Maybe*](#maybe)<[*ChangeCategoryName*](#changecategoryname)\> |
`changeOrderHint`? | [*Maybe*](#maybe)<[*ChangeCategoryOrderHint*](#changecategoryorderhint)\> |
`changeParent`? | [*Maybe*](#maybe)<[*ChangeCategoryParent*](#changecategoryparent)\> |
`changeSlug`? | [*Maybe*](#maybe)<[*ChangeCategorySlug*](#changecategoryslug)\> |
`removeAsset`? | [*Maybe*](#maybe)<[*RemoveCategoryAsset*](#removecategoryasset)\> |
`setAssetCustomField`? | [*Maybe*](#maybe)<[*SetCategoryAssetCustomField*](#setcategoryassetcustomfield)\> |
`setAssetCustomType`? | [*Maybe*](#maybe)<[*SetCategoryAssetCustomType*](#setcategoryassetcustomtype)\> |
`setAssetDescription`? | [*Maybe*](#maybe)<[*SetCategoryAssetDescription*](#setcategoryassetdescription)\> |
`setAssetKey`? | [*Maybe*](#maybe)<[*SetCategoryAssetKey*](#setcategoryassetkey)\> |
`setAssetSources`? | [*Maybe*](#maybe)<[*SetCategoryAssetSources*](#setcategoryassetsources)\> |
`setAssetTags`? | [*Maybe*](#maybe)<[*SetCategoryAssetTags*](#setcategoryassettags)\> |
`setCustomField`? | [*Maybe*](#maybe)<[*SetCategoryCustomField*](#setcategorycustomfield)\> |
`setCustomType`? | [*Maybe*](#maybe)<[*SetCategoryCustomType*](#setcategorycustomtype)\> |
`setDescription`? | [*Maybe*](#maybe)<[*SetCategoryDescription*](#setcategorydescription)\> |
`setExternalId`? | [*Maybe*](#maybe)<[*SetCategoryExternalId*](#setcategoryexternalid)\> |
`setKey`? | [*Maybe*](#maybe)<[*SetCategoryKey*](#setcategorykey)\> |
`setMetaDescription`? | [*Maybe*](#maybe)<[*SetCategoryMetaDescription*](#setcategorymetadescription)\> |
`setMetaKeywords`? | [*Maybe*](#maybe)<[*SetCategoryMetaKeywords*](#setcategorymetakeywords)\> |
`setMetaTitle`? | [*Maybe*](#maybe)<[*SetCategoryMetaTitle*](#setcategorymetatitle)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1142](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1142)

___

### `ChangeAttributeName`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`newAttributeName` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1167](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1167)

___

### `ChangeAttributeOrder`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeDefinitions` | [*AttributeDefinitionDraft*](#attributedefinitiondraft)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1172](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1172)

___

### `ChangeAttributeOrderByName`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeNames` | [*Scalars*](#scalars)[*String*][] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1176](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1176)

___

### `ChangeCartCustomLineItemMoney`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`money` | [*BaseMoneyInput*](#basemoneyinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1180](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1180)

___

### `ChangeCartCustomLineItemQuantity`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1185](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1185)

___

### `ChangeCartDiscountCartPredicate`

#### Type declaration:

Name | Type |
:------ | :------ |
`cartPredicate` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1190](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1190)

___

### `ChangeCartDiscountIsActive`

#### Type declaration:

Name | Type |
:------ | :------ |
`isActive` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1194](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1194)

___

### `ChangeCartDiscountName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1198](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1198)

___

### `ChangeCartDiscountRequiresDiscountCode`

#### Type declaration:

Name | Type |
:------ | :------ |
`requiresDiscountCode` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1202](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1202)

___

### `ChangeCartDiscountSortOrder`

#### Type declaration:

Name | Type |
:------ | :------ |
`sortOrder` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1206](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1206)

___

### `ChangeCartDiscountStackingMode`

#### Type declaration:

Name | Type |
:------ | :------ |
`stackingMode` | [*StackingMode*](../enums/types_graphql.stackingmode.md) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1210](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1210)

___

### `ChangeCartDiscountTarget`

#### Type declaration:

Name | Type |
:------ | :------ |
`target` | [*CartDiscountTargetInput*](#cartdiscounttargetinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1214](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1214)

___

### `ChangeCartDiscountValue`

#### Type declaration:

Name | Type |
:------ | :------ |
`value` | [*CartDiscountValueInput*](#cartdiscountvalueinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1218](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1218)

___

### `ChangeCartLineItemQuantity`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalPrice`? | [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> |
`externalTotalPrice`? | [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1222](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1222)

___

### `ChangeCartTaxCalculationMode`

#### Type declaration:

Name | Type |
:------ | :------ |
`taxCalculationMode` | [*TaxCalculationMode*](../enums/types_graphql.taxcalculationmode.md) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1229](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1229)

___

### `ChangeCartTaxMode`

#### Type declaration:

Name | Type |
:------ | :------ |
`taxMode` | [*TaxMode*](../enums/types_graphql.taxmode.md) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1233](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1233)

___

### `ChangeCartTaxRoundingMode`

#### Type declaration:

Name | Type |
:------ | :------ |
`taxRoundingMode` | [*RoundingMode*](../enums/types_graphql.roundingmode.md) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1237](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1237)

___

### `ChangeCategoryAssetName`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1241](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1241)

___

### `ChangeCategoryAssetOrder`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetOrder` | [*Scalars*](#scalars)[*String*][] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1247](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1247)

___

### `ChangeCategoryName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1251](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1251)

___

### `ChangeCategoryOrderHint`

#### Type declaration:

Name | Type |
:------ | :------ |
`orderHint` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1255](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1255)

___

### `ChangeCategoryParent`

#### Type declaration:

Name | Type |
:------ | :------ |
`parent` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1259](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1259)

___

### `ChangeCategorySlug`

#### Type declaration:

Name | Type |
:------ | :------ |
`slug` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1263](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1263)

___

### `ChangeCustomerAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`address` | [*AddressInput*](#addressinput) |
`addressId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1267](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1267)

___

### `ChangeCustomerEmail`

#### Type declaration:

Name | Type |
:------ | :------ |
`email` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1272](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1272)

___

### `ChangeCustomerGroupName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1276](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1276)

___

### `ChangeDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`description` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1280](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1280)

___

### `ChangeDiscountCodeCartDiscounts`

#### Type declaration:

Name | Type |
:------ | :------ |
`cartDiscounts` | [*ReferenceInput*](#referenceinput)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1284](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1284)

___

### `ChangeDiscountCodeGroups`

#### Type declaration:

Name | Type |
:------ | :------ |
`groups` | [*Scalars*](#scalars)[*String*][] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1288](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1288)

___

### `ChangeDiscountCodeIsActive`

#### Type declaration:

Name | Type |
:------ | :------ |
`isActive` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1292](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1292)

___

### `ChangeEnumKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`key` | [*Scalars*](#scalars)[*String*] |
`newKey` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1296](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1296)

___

### `ChangeInputHint`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`newValue` | [*TextInputHint*](../enums/types_graphql.textinputhint.md) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1302](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1302)

___

### `ChangeInventoryEntryQuantity`

#### Type declaration:

Name | Type |
:------ | :------ |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1307](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1307)

___

### `ChangeIsSearchable`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`isSearchable` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1311](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1311)

___

### `ChangeLabel`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`label` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1316](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1316)

___

### `ChangeLocalizedEnumValueLabel`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`newValue` | [*LocalizedEnumValueDraft*](#localizedenumvaluedraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1321](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1321)

___

### `ChangeLocalizedEnumValueOrder`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`values` | [*LocalizedEnumValueDraft*](#localizedenumvaluedraft)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1326](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1326)

___

### `ChangeMyCartTaxMode`

#### Type declaration:

Name | Type |
:------ | :------ |
`taxMode` | [*TaxMode*](../enums/types_graphql.taxmode.md) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1331](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1331)

___

### `ChangeName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1335](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1335)

___

### `ChangeOrderPaymentState`

#### Type declaration:

Name | Type |
:------ | :------ |
`paymentState` | [*PaymentState*](../enums/types_graphql.paymentstate.md) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1339](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1339)

___

### `ChangeOrderShipmentState`

#### Type declaration:

Name | Type |
:------ | :------ |
`shipmentState` | [*ShipmentState*](../enums/types_graphql.shipmentstate.md) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1343](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1343)

___

### `ChangeOrderState`

#### Type declaration:

Name | Type |
:------ | :------ |
`orderState` | [*OrderState*](../enums/types_graphql.orderstate.md) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1347](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1347)

___

### `ChangePlainEnumValueLabel`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`newValue` | [*PlainEnumValueDraft*](#plainenumvaluedraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1351](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1351)

___

### `ChangePlainEnumValueOrder`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`values` | [*PlainEnumValueDraft*](#plainenumvaluedraft)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1356](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1356)

___

### `ChangeProductAssetName`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1361](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1361)

___

### `ChangeProductAssetOrder`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetOrder` | [*Scalars*](#scalars)[*String*][] |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1371](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1371)

___

### `ChangeProductDiscountIsActive`

#### Type declaration:

Name | Type |
:------ | :------ |
`isActive` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1379](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1379)

___

### `ChangeProductDiscountName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1383](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1383)

___

### `ChangeProductDiscountPredicate`

#### Type declaration:

Name | Type |
:------ | :------ |
`predicate` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1387](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1387)

___

### `ChangeProductDiscountSortOrder`

#### Type declaration:

Name | Type |
:------ | :------ |
`sortOrder` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1391](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1391)

___

### `ChangeProductDiscountValue`

#### Type declaration:

Name | Type |
:------ | :------ |
`value` | [*ProductDiscountValueInput*](#productdiscountvalueinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1395](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1395)

___

### `ChangeProductImageLabel`

#### Type declaration:

Name | Type |
:------ | :------ |
`imageUrl` | [*Scalars*](#scalars)[*String*] |
`label`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1399](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1399)

___

### `ChangeProductMasterVariant`

#### Type declaration:

Name | Type |
:------ | :------ |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1407](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1407)

___

### `ChangeProductName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1413](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1413)

___

### `ChangeProductPrice`

#### Type declaration:

Name | Type |
:------ | :------ |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`price` | [*ProductPriceDataInput*](#productpricedatainput) |
`priceId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1418](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1418)

___

### `ChangeProductSlug`

#### Type declaration:

Name | Type |
:------ | :------ |
`slug` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1427](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1427)

___

### `ChangeProjectSettingsCountries`

#### Type declaration:

Name | Type |
:------ | :------ |
`countries` | [*Scalars*](#scalars)[*Country*][] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1432](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1432)

___

### `ChangeProjectSettingsCurrencies`

#### Type declaration:

Name | Type |
:------ | :------ |
`currencies` | [*Scalars*](#scalars)[*Currency*][] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1436](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1436)

___

### `ChangeProjectSettingsLanguages`

#### Type declaration:

Name | Type |
:------ | :------ |
`languages` | [*Scalars*](#scalars)[*Locale*][] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1440](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1440)

___

### `ChangeProjectSettingsMessagesConfiguration`

#### Type declaration:

Name | Type |
:------ | :------ |
`messagesConfiguration` | [*MessagesConfigurationDraft*](#messagesconfigurationdraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1444](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1444)

___

### `ChangeProjectSettingsMessagesEnabled`

#### Type declaration:

Name | Type |
:------ | :------ |
`messagesEnabled` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1448](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1448)

___

### `ChangeProjectSettingsName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1452](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1452)

___

### `ChangeShippingMethodIsDefault`

#### Type declaration:

Name | Type |
:------ | :------ |
`isDefault` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1456](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1456)

___

### `ChangeShippingMethodName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1460](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1460)

___

### `ChangeShippingMethodTaxCategory`

#### Type declaration:

Name | Type |
:------ | :------ |
`taxCategory` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1464](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1464)

___

### `ChangeShoppingListLineItemQuantity`

#### Type declaration:

Name | Type |
:------ | :------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1468](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1468)

___

### `ChangeShoppingListLineItemsOrder`

#### Type declaration:

Name | Type |
:------ | :------ |
`lineItemOrder` | [*Scalars*](#scalars)[*String*][] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1473](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1473)

___

### `ChangeShoppingListName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1477](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1477)

___

### `ChangeShoppingListTextLineItemName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`textLineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1481](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1481)

___

### `ChangeShoppingListTextLineItemQuantity`

#### Type declaration:

Name | Type |
:------ | :------ |
`quantity` | [*Scalars*](#scalars)[*Int*] |
`textLineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1486](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1486)

___

### `ChangeShoppingListTextLineItemsOrder`

#### Type declaration:

Name | Type |
:------ | :------ |
`textLineItemOrder` | [*Scalars*](#scalars)[*String*][] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1491](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1491)

___

### `ChangeZoneName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1495](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1495)

___

### `Channel`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1499](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1499)

___

### `ChannelCustomFieldsRawArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1532](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1532)

___

### `ChannelDescriptionArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1527](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1527)

___

### `ChannelNameArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1522](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1522)

___

### `ChannelQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ChannelQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Channel*](#channel)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1537](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1537)

___

### `ChannelReferenceIdentifier`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ChannelReferenceIdentifier* |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1545](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1545)

___

### `ClassificationShippingRateInput`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1570](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1570)

___

### `ClassificationShippingRateInputDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`key` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1583](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1583)

___

### `ClassificationShippingRateInputLabelArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1578](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1578)

___

### `CreateApiClient`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`scope` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1587](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1587)

___

### `CreateStore`

#### Type declaration:

Name | Type |
:------ | :------ |
`key` | [*Scalars*](#scalars)[*String*] |
`languages`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`name`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1592](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1592)

___

### `CreateZone`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`locations`? | [*Maybe*](#maybe)<[*ZoneLocation*](#zonelocation)[]\> |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1598](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1598)

___

### `CustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1901](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1901)

___

### `CustomFieldInput`

A key-value pair representing the field name and value of one single custom field.

The value of this custom field consists of escaped JSON based on the FieldDefinition of the Type.

Examples for `value`:

* FieldType `String`: `"\"This is a string\""`
* FieldType `DateTimeType`: `"\"2001-09-11T14:00:00.000Z\""`
* FieldType `Number`: `"4"`
* FieldType `Set` with an elementType of `String`: `"[\"This is a string\", \"This is another string\"]"`
* FieldType `Reference`: `"{\"id\", \"b911b62d-353a-4388-93ee-8d488d9af962\", \"typeId\", \"product\"}"`

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] | - |
`value` | [*Scalars*](#scalars)[*String*] | The value of this custom field consists of escaped JSON based on the FieldDefinition of the Type.  Examples for `value`:  * FieldType `String`: `"\"This is a string\""` * FieldType `DateTimeType`: `"\"2001-09-11T14:00:00.000Z\""` * FieldType `Number`: `"4"` * FieldType `Set` with an elementType of `String`: `"[\"This is a string\", \"This is another string\"]"` * FieldType `Reference`: `"{\"id\", \"b911b62d-353a-4388-93ee-8d488d9af962\", \"typeId\", \"product\"}"`    |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1917](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1917)

___

### `CustomFieldsDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1932](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1932)

___

### `CustomFieldsType`

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`__typename`? | *CustomFieldsType* | - |
`customFieldList`? | [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> | Custom fields are returned as a list instead of an object structure.   |
`customFields` | [*Type*](#type) | This field would contain type data   |
`customFieldsRaw`? | [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> | This field contains non-typed data. For a typed alternative, have a look at `customFields`.   |
`type`? | [*Maybe*](#maybe)<[*TypeDefinition*](#typedefinition)\> | - |
`typeRef` | [*Reference*](#reference) | - |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1939](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1939)

___

### `CustomFieldsTypeCustomFieldListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1956](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1956)

___

### `CustomFieldsTypeCustomFieldsRawArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1951](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1951)

___

### `CustomLineItem`

A custom line item is a generic item that can be added to the cart but is not
bound to a product. You can use it for discounts (negative money), vouchers,
complex cart rules, additional services or fees. You control the lifecycle of this item.

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`__typename`? | *CustomLineItem* | - |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> | - |
`customFieldList`? | [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> | Custom fields are returned as a list instead of an object structure.   |
`customFields`? | [*Maybe*](#maybe)<[*Type*](#type)\> | This field would contain type data   |
`customFieldsRaw`? | [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> | This field contains non-typed data. Consider using `customFields` as a typed alternative.   |
`discountedPricePerQuantity` | [*DiscountedLineItemPriceForQuantity*](#discountedlineitempriceforquantity)[] | - |
`id` | [*Scalars*](#scalars)[*String*] | - |
`money` | [*BaseMoney*](#basemoney) | - |
`name`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] | - |
`quantity` | [*Scalars*](#scalars)[*Long*] | - |
`shippingDetails`? | [*Maybe*](#maybe)<[*ItemShippingDetails*](#itemshippingdetails)\> | - |
`slug` | [*Scalars*](#scalars)[*String*] | - |
`state` | [*ItemState*](#itemstate)[] | - |
`taxCategory`? | [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> | - |
`taxCategoryRef`? | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`taxRate`? | [*Maybe*](#maybe)<[*TaxRate*](#taxrate)\> | - |
`totalPrice` | [*Money*](#money) | - |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1965](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1965)

___

### `CustomLineItemCustomFieldListArgs`

A custom line item is a generic item that can be added to the cart but is not
bound to a product. You can use it for discounts (negative money), vouchers,
complex cart rules, additional services or fees. You control the lifecycle of this item.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2011](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2011)

___

### `CustomLineItemCustomFieldsRawArgs`

A custom line item is a generic item that can be added to the cart but is not
bound to a product. You can use it for discounts (negative money), vouchers,
complex cart rules, additional services or fees. You control the lifecycle of this item.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2002](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2002)

___

### `CustomLineItemDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`externalTaxRate`? | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`money` | [*BaseMoneyInput*](#basemoneyinput) |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`quantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetails`? | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |
`slug` | [*Scalars*](#scalars)[*String*] |
`taxCategory`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2016](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2016)

___

### `CustomLineItemNameArgs`

A custom line item is a generic item that can be added to the cart but is not
bound to a product. You can use it for discounts (negative money), vouchers,
complex cart rules, additional services or fees. You control the lifecycle of this item.

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1993](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1993)

___

### `CustomLineItemReturnItem`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2027](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2027)

___

### `CustomLineItemsTarget`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2040](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2040)

___

### `CustomLineItemsTargetInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`predicate` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2046](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2046)

___

### `CustomSuggestTokenizerInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`suggestTokenizer`? | [*Maybe*](#maybe)<[*BaseSearchKeywordInput*](#basesearchkeywordinput)\> |
`text` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2050](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2050)

___

### `Customer`

A customer is a person purchasing products. Carts, Orders and Reviews can be associated to a customer.

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1606](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1606)

___

### `CustomerActiveCartInterface`

A field to access a customer's active cart.

#### Type declaration:

Name | Type |
:------ | :------ |
`customerActiveCart`? | [*Maybe*](#maybe)<[*Cart*](#cart)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1664](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1664)

___

### `CustomerActiveCartInterfaceCustomerActiveCartArgs`

A field to access a customer's active cart.

#### Type declaration:

Name | Type |
:------ | :------ |
`customerId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1669](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1669)

___

### `CustomerCustomFieldListArgs`

A customer is a person purchasing products. Carts, Orders and Reviews can be associated to a customer.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1658](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1658)

___

### `CustomerCustomFieldsRawArgs`

A customer is a person purchasing products. Carts, Orders and Reviews can be associated to a customer.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1652](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1652)

___

### `CustomerGroup`

A customer can be a member in a customer group (e.g. reseller, gold member). A
customer group can be used in price calculations with special prices being
assigned to certain customer groups.

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1677](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1677)

___

### `CustomerGroupCustomFieldListArgs`

A customer can be a member in a customer group (e.g. reseller, gold member). A
customer group can be used in price calculations with special prices being
assigned to certain customer groups.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1709](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1709)

___

### `CustomerGroupCustomFieldsRawArgs`

A customer can be a member in a customer group (e.g. reseller, gold member). A
customer group can be used in price calculations with special prices being
assigned to certain customer groups.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1700](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1700)

___

### `CustomerGroupDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`groupName` | [*Scalars*](#scalars)[*String*] |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1714](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1714)

___

### `CustomerGroupQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *CustomerGroupQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*CustomerGroup*](#customergroup)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1720](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1720)

___

### `CustomerGroupUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`changeName`? | [*Maybe*](#maybe)<[*ChangeCustomerGroupName*](#changecustomergroupname)\> |
`setCustomField`? | [*Maybe*](#maybe)<[*SetCustomerGroupCustomField*](#setcustomergroupcustomfield)\> |
`setCustomType`? | [*Maybe*](#maybe)<[*SetCustomerGroupCustomType*](#setcustomergroupcustomtype)\> |
`setKey`? | [*Maybe*](#maybe)<[*SetCustomerGroupKey*](#setcustomergroupkey)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1728](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1728)

___

### `CustomerQueryInterface`

Fields to access customer accounts. Includes direct access to a single customer and searching for customers.

#### Type declaration:

Name | Type |
:------ | :------ |
`customer`? | [*Maybe*](#maybe)<[*Customer*](#customer)\> |
`customers` | [*CustomerQueryResult*](#customerqueryresult) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1736](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1736)

___

### `CustomerQueryInterfaceCustomerArgs`

Fields to access customer accounts. Includes direct access to a single customer and searching for customers.

#### Type declaration:

Name | Type |
:------ | :------ |
`emailToken`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`passwordToken`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1742](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1742)

___

### `CustomerQueryInterfaceCustomersArgs`

Fields to access customer accounts. Includes direct access to a single customer and searching for customers.

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1750](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1750)

___

### `CustomerQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *CustomerQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Customer*](#customer)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1757](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1757)

___

### `CustomerSignInDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`anonymousCartId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`anonymousCartSignInMode`? | [*Maybe*](#maybe)<[*AnonymousCartSignInMode*](../enums/types_graphql.anonymouscartsigninmode.md)\> |
`anonymousId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`email` | [*Scalars*](#scalars)[*String*] |
`password` | [*Scalars*](#scalars)[*String*] |
`updateProductData`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1765](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1765)

___

### `CustomerSignInResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *CustomerSignInResult* |
`cart`? | [*Maybe*](#maybe)<[*Cart*](#cart)\> |
`customer` | [*Customer*](#customer) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1774](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1774)

___

### `CustomerSignMeInDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`activeCartSignInMode`? | [*Maybe*](#maybe)<[*AnonymousCartSignInMode*](../enums/types_graphql.anonymouscartsigninmode.md)\> |
`email` | [*Scalars*](#scalars)[*String*] |
`password` | [*Scalars*](#scalars)[*String*] |
`updateProductData`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1780](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1780)

___

### `CustomerSignMeUpDraft`

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`addresses`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)[]\> | - |
`billingAddresses`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*][]\> | The indices of the billing addresses in the `addresses` list. The `billingAddressIds` of the customer will be set to the IDs of that addresses.   |
`companyName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> | - |
`dateOfBirth`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> | - |
`defaultBillingAddress`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> | The index of the address in the `addresses` list. The `defaultBillingAddressId` of the customer will be set to the ID of that address.   |
`defaultShippingAddress`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> | The index of the address in the `addresses` list. The `defaultShippingAddressId` of the customer will be set to the ID of that address.   |
`email` | [*Scalars*](#scalars)[*String*] | - |
`firstName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`lastName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> | - |
`middleName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`password` | [*Scalars*](#scalars)[*String*] | - |
`salutation`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`shippingAddresses`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*][]\> | The indices of the shipping addresses in the `addresses` list. The `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses.   |
`stores`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)[]\> | - |
`title`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`vatId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1787](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1787)

___

### `CustomerSignUpDraft`

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`addresses`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)[]\> | - |
`anonymousCartId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`anonymousId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`billingAddresses`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*][]\> | The indices of the billing addresses in the `addresses` list. The `billingAddressIds` of the customer will be set to the IDs of that addresses.   |
`companyName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> | - |
`customerGroup`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> | - |
`customerNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`dateOfBirth`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> | - |
`defaultBillingAddress`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> | The index of the address in the `addresses` list. The `defaultBillingAddressId` of the customer will be set to the ID of that address.   |
`defaultShippingAddress`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> | The index of the address in the `addresses` list. The `defaultShippingAddressId` of the customer will be set to the ID of that address.   |
`email` | [*Scalars*](#scalars)[*String*] | - |
`externalId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`firstName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`isEmailVerified`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> | - |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`lastName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> | - |
`middleName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`password` | [*Scalars*](#scalars)[*String*] | - |
`salutation`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`shippingAddresses`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*][]\> | The indices of the shipping addresses in the `addresses` list. The `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses.   |
`stores`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)[]\> | - |
`title`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`vatId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1821](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1821)

___

### `CustomerToken`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *CustomerToken* |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] |
`customerId` | [*Scalars*](#scalars)[*String*] |
`expiresAt` | [*Scalars*](#scalars)[*DateTime*] |
`id` | [*Scalars*](#scalars)[*String*] |
`value` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1861](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1861)

___

### `CustomerUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addAddress`? | [*Maybe*](#maybe)<[*AddCustomerAddress*](#addcustomeraddress)\> |
`addBillingAddressId`? | [*Maybe*](#maybe)<[*AddCustomerBillingAddressId*](#addcustomerbillingaddressid)\> |
`addShippingAddressId`? | [*Maybe*](#maybe)<[*AddCustomerShippingAddressId*](#addcustomershippingaddressid)\> |
`addStore`? | [*Maybe*](#maybe)<[*AddCustomerStore*](#addcustomerstore)\> |
`changeAddress`? | [*Maybe*](#maybe)<[*ChangeCustomerAddress*](#changecustomeraddress)\> |
`changeEmail`? | [*Maybe*](#maybe)<[*ChangeCustomerEmail*](#changecustomeremail)\> |
`removeAddress`? | [*Maybe*](#maybe)<[*RemoveCustomerAddress*](#removecustomeraddress)\> |
`removeBillingAddressId`? | [*Maybe*](#maybe)<[*RemoveCustomerBillingAddressId*](#removecustomerbillingaddressid)\> |
`removeShippingAddressId`? | [*Maybe*](#maybe)<[*RemoveCustomerShippingAddressId*](#removecustomershippingaddressid)\> |
`removeStore`? | [*Maybe*](#maybe)<[*RemoveCustomerStore*](#removecustomerstore)\> |
`setCompanyName`? | [*Maybe*](#maybe)<[*SetCustomerCompanyName*](#setcustomercompanyname)\> |
`setCustomField`? | [*Maybe*](#maybe)<[*SetCustomerCustomField*](#setcustomercustomfield)\> |
`setCustomType`? | [*Maybe*](#maybe)<[*SetCustomerCustomType*](#setcustomercustomtype)\> |
`setCustomerGroup`? | [*Maybe*](#maybe)<[*SetCustomerGroup*](#setcustomergroup)\> |
`setCustomerNumber`? | [*Maybe*](#maybe)<[*SetCustomerNumber*](#setcustomernumber)\> |
`setDateOfBirth`? | [*Maybe*](#maybe)<[*SetCustomerDateOfBirth*](#setcustomerdateofbirth)\> |
`setDefaultBillingAddress`? | [*Maybe*](#maybe)<[*SetCustomerDefaultBillingAddress*](#setcustomerdefaultbillingaddress)\> |
`setDefaultShippingAddress`? | [*Maybe*](#maybe)<[*SetCustomerDefaultShippingAddress*](#setcustomerdefaultshippingaddress)\> |
`setExternalId`? | [*Maybe*](#maybe)<[*SetCustomerExternalId*](#setcustomerexternalid)\> |
`setFirstName`? | [*Maybe*](#maybe)<[*SetCustomerFirstName*](#setcustomerfirstname)\> |
`setKey`? | [*Maybe*](#maybe)<[*SetCustomerKey*](#setcustomerkey)\> |
`setLastName`? | [*Maybe*](#maybe)<[*SetCustomerLastName*](#setcustomerlastname)\> |
`setLocale`? | [*Maybe*](#maybe)<[*SetCustomerLocale*](#setcustomerlocale)\> |
`setMiddleName`? | [*Maybe*](#maybe)<[*SetCustomerMiddleName*](#setcustomermiddlename)\> |
`setSalutation`? | [*Maybe*](#maybe)<[*SetCustomerSalutation*](#setcustomersalutation)\> |
`setStores`? | [*Maybe*](#maybe)<[*SetCustomerStores*](#setcustomerstores)\> |
`setTitle`? | [*Maybe*](#maybe)<[*SetCustomerTitle*](#setcustomertitle)\> |
`setVatId`? | [*Maybe*](#maybe)<[*SetCustomerVatId*](#setcustomervatid)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:1870](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L1870)

___

### `DateAttribute`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2055](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2055)

___

### `DateAttributeDefinitionType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2061](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2061)

___

### `DateField`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2066](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2066)

___

### `DateTimeAttribute`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2072](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2072)

___

### `DateTimeAttributeDefinitionType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2078](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2078)

___

### `DateTimeField`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2083](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2083)

___

### `DateTimeType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2089](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2089)

___

### `DateType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2094](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2094)

___

### `Delivery`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *Delivery* |
`address`? | [*Maybe*](#maybe)<[*Address*](#address)\> |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] |
`id` | [*Scalars*](#scalars)[*String*] |
`items` | [*DeliveryItem*](#deliveryitem)[] |
`parcels` | [*Parcel*](#parcel)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2099](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2099)

___

### `DeliveryItem`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *DeliveryItem* |
`id` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2108](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2108)

___

### `DeliveryItemDraftType`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2114](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2114)

___

### `Dimensions`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *Dimensions* |
`height` | [*Scalars*](#scalars)[*Int*] |
`width` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2119](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2119)

___

### `DimensionsInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`height` | [*Scalars*](#scalars)[*Int*] |
`width` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2125](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2125)

___

### `DiscountCode`

With discount codes it is possible to give specific cart discounts to an
eligible amount of users. They are defined by a string value which can be added
to a cart so that specific cart discounts can be applied to the cart.

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2134](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2134)

___

### `DiscountCodeCustomFieldListArgs`

With discount codes it is possible to give specific cart discounts to an
eligible amount of users. They are defined by a string value which can be added
to a cart so that specific cart discounts can be applied to the cart.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2199](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2199)

___

### `DiscountCodeCustomFieldsRawArgs`

With discount codes it is possible to give specific cart discounts to an
eligible amount of users. They are defined by a string value which can be added
to a cart so that specific cart discounts can be applied to the cart.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2190](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2190)

___

### `DiscountCodeDescriptionArgs`

With discount codes it is possible to give specific cart discounts to an
eligible amount of users. They are defined by a string value which can be added
to a cart so that specific cart discounts can be applied to the cart.

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2181](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2181)

___

### `DiscountCodeDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`cartDiscounts` | [*ReferenceInput*](#referenceinput)[] |
`cartPredicate`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`code` | [*Scalars*](#scalars)[*String*] |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`groups`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`isActive`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`maxApplications`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`maxApplicationsPerCustomer`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`name`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`validFrom`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2204](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2204)

___

### `DiscountCodeInfo`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *DiscountCodeInfo* |
`discountCode`? | [*Maybe*](#maybe)<[*DiscountCode*](#discountcode)\> |
`discountCodeRef` | [*Reference*](#reference) |
`state`? | [*Maybe*](#maybe)<[*DiscountCodeState*](../enums/types_graphql.discountcodestate.md)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2219](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2219)

___

### `DiscountCodeNameArgs`

With discount codes it is possible to give specific cart discounts to an
eligible amount of users. They are defined by a string value which can be added
to a cart so that specific cart discounts can be applied to the cart.

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2172](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2172)

___

### `DiscountCodeQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *DiscountCodeQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*DiscountCode*](#discountcode)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2226](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2226)

___

### `DiscountCodeUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`changeCartDiscounts`? | [*Maybe*](#maybe)<[*ChangeDiscountCodeCartDiscounts*](#changediscountcodecartdiscounts)\> |
`changeGroups`? | [*Maybe*](#maybe)<[*ChangeDiscountCodeGroups*](#changediscountcodegroups)\> |
`changeIsActive`? | [*Maybe*](#maybe)<[*ChangeDiscountCodeIsActive*](#changediscountcodeisactive)\> |
`setCartPredicate`? | [*Maybe*](#maybe)<[*SetDiscountCodeCartPredicate*](#setdiscountcodecartpredicate)\> |
`setCustomField`? | [*Maybe*](#maybe)<[*SetDiscountCodeCustomField*](#setdiscountcodecustomfield)\> |
`setCustomType`? | [*Maybe*](#maybe)<[*SetDiscountCodeCustomType*](#setdiscountcodecustomtype)\> |
`setDescription`? | [*Maybe*](#maybe)<[*SetDiscountCodeDescription*](#setdiscountcodedescription)\> |
`setMaxApplications`? | [*Maybe*](#maybe)<[*SetDiscountCodeMaxApplications*](#setdiscountcodemaxapplications)\> |
`setMaxApplicationsPerCustomer`? | [*Maybe*](#maybe)<[*SetDiscountCodeMaxApplicationsPerCustomer*](#setdiscountcodemaxapplicationspercustomer)\> |
`setName`? | [*Maybe*](#maybe)<[*SetDiscountCodeName*](#setdiscountcodename)\> |
`setValidFrom`? | [*Maybe*](#maybe)<[*SetDiscountCodeValidFrom*](#setdiscountcodevalidfrom)\> |
`setValidFromAndUntil`? | [*Maybe*](#maybe)<[*SetDiscountCodeValidFromAndUntil*](#setdiscountcodevalidfromanduntil)\> |
`setValidUntil`? | [*Maybe*](#maybe)<[*SetDiscountCodeValidUntil*](#setdiscountcodevaliduntil)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2260](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2260)

___

### `DiscountedLineItemPortion`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *DiscountedLineItemPortion* |
`discount`? | [*Maybe*](#maybe)<[*CartDiscount*](#cartdiscount)\> |
`discountRef` | [*Reference*](#reference) |
`discountedAmount` | [*BaseMoney*](#basemoney) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2278](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2278)

___

### `DiscountedLineItemPrice`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *DiscountedLineItemPrice* |
`includedDiscounts` | [*DiscountedLineItemPortion*](#discountedlineitemportion)[] |
`value` | [*BaseMoney*](#basemoney) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2285](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2285)

___

### `DiscountedLineItemPriceForQuantity`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *DiscountedLineItemPriceForQuantity* |
`discountedPrice` | [*DiscountedLineItemPrice*](#discountedlineitemprice) |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2291](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2291)

___

### `DiscountedProductPriceValue`

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`__typename`? | *DiscountedProductPriceValue* | - |
`discount`? | [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> | - |
`discountRef` | [*Reference*](#reference) | - |
`discountRel`? | [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> | Temporal. Will be renamed some time in the future. Please use 'discount'.   |
`value` | [*BaseMoney*](#basemoney) | - |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2297](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2297)

___

### `DiscountedProductPriceValueInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`discount` | [*ReferenceInput*](#referenceinput) |
`value` | [*BaseMoneyInput*](#basemoneyinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2306](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2306)

___

### `EnumAttribute`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2311](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2311)

___

### `EnumAttributeDefinitionType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2318](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2318)

___

### `EnumAttributeDefinitionTypeValuesArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeKeys`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeKeys`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2324](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2324)

___

### `EnumField`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2332](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2332)

___

### `EnumType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2338](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2338)

___

### `EnumTypeDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`values` | [*PlainEnumValueDraft*](#plainenumvaluedraft)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2344](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2344)

___

### `EnumValue`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *EnumValue* |
`key` | [*Scalars*](#scalars)[*String*] |
`label` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2348](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2348)

___

### `ExternalDiscountValue`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2354](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2354)

___

### `ExternalDiscountValueInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`dummy`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2359](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2359)

___

### `ExternalLineItemTotalPriceDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`price` | [*BaseMoneyInput*](#basemoneyinput) |
`totalPrice` | [*MoneyInput*](#moneyinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2363](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2363)

___

### `ExternalOAuth`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ExternalOAuth* |
`authorizationHeader` | [*Scalars*](#scalars)[*String*] |
`url` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2368](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2368)

___

### `ExternalOAuthDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`authorizationHeader` | [*Scalars*](#scalars)[*String*] |
`url` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2374](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2374)

___

### `ExternalTaxAmountDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`taxRate` | [*ExternalTaxRateDraft*](#externaltaxratedraft) |
`totalGross` | [*MoneyInput*](#moneyinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2379](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2379)

___

### `ExternalTaxRateDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`amount` | [*Scalars*](#scalars)[*Float*] |
`country` | [*Scalars*](#scalars)[*Country*] |
`includedInPrice`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`name` | [*Scalars*](#scalars)[*String*] |
`state`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`subRates`? | [*Maybe*](#maybe)<[*SubRateDraft*](#subratedraft)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2384](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2384)

___

### `FieldDefinition`

Field definitions describe custom fields and allow you to define some meta-information associated with the field.

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *FieldDefinition* |
`inputHint` | [*TextInputHint*](../enums/types_graphql.textinputhint.md) |
`label`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`labelAllLocales` | [*LocalizedString*](#localizedstring)[] |
`name` | [*Scalars*](#scalars)[*String*] |
`required` | [*Scalars*](#scalars)[*Boolean*] |
`type` | [*FieldType*](#fieldtype) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2394](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2394)

___

### `FieldDefinitionLabelArgs`

Field definitions describe custom fields and allow you to define some meta-information associated with the field.

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2405](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2405)

___

### `FieldType`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2410](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2410)

___

### `Geometry`

#### Type declaration:

Name | Type |
:------ | :------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2414](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2414)

___

### `GiftLineItemValue`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2418](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2418)

___

### `GiftLineItemValueInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`distributionChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`product` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`supplyChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`variantId` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2427](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2427)

___

### `HighPrecisionMoney`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2434](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2434)

___

### `HighPrecisionMoneyInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`centAmount`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`currencyCode` | [*Scalars*](#scalars)[*Currency*] |
`fractionDigits` | [*Scalars*](#scalars)[*Int*] |
`preciseAmount` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2443](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2443)

___

### `IOsUserType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2698](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2698)

___

### `Image`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *Image* |
`dimensions` | [*Dimensions*](#dimensions) |
`label`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`url` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2450](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2450)

___

### `ImageInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`dimensions` | [*DimensionsInput*](#dimensionsinput) |
`label`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`url` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2457](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2457)

___

### `ImportOrderCustomLineItemState`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`state` | [*ItemStateDraftType*](#itemstatedrafttype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2463](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2463)

___

### `ImportOrderLineItemState`

#### Type declaration:

Name | Type |
:------ | :------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`state` | [*ItemStateDraftType*](#itemstatedrafttype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2468](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2468)

___

### `InStore`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2483](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2483)

___

### `InStoreCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2523](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2523)

___

### `InStoreCartsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2527](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2527)

___

### `InStoreCustomerActiveCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`customerId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2534](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2534)

___

### `InStoreCustomerArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`emailToken`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`passwordToken`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2509](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2509)

___

### `InStoreCustomersArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2516](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2516)

___

### `InStoreMe`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2550](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2550)

___

### `InStoreMeCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2562](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2562)

___

### `InStoreMeCartsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2566](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2566)

___

### `InStoreMeOrderArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2573](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2573)

___

### `InStoreMeOrdersArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2578](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2578)

___

### `InStoreMeShoppingListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2585](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2585)

___

### `InStoreMeShoppingListsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2590](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2590)

___

### `InStoreOrderArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2538](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2538)

___

### `InStoreOrdersArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2543](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2543)

___

### `InStoreShippingMethodsByCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2505](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2505)

___

### `Initiator`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *Initiator* |
`anonymousId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`clientId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`customer`? | [*Maybe*](#maybe)<[*Reference*](#reference)\> |
`externalUserId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`isPlatformClient`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`user`? | [*Maybe*](#maybe)<[*Reference*](#reference)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2473](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2473)

___

### `InterfaceInteractionsRaw`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *InterfaceInteractionsRaw* |
`fields` | [*RawCustomField*](#rawcustomfield)[] |
`type`? | [*Maybe*](#maybe)<[*TypeDefinition*](#typedefinition)\> |
`typeRef` | [*Reference*](#reference) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2597](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2597)

___

### `InterfaceInteractionsRawFieldsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2604](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2604)

___

### `InterfaceInteractionsRawResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *InterfaceInteractionsRawResult* |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`results` | [*InterfaceInteractionsRaw*](#interfaceinteractionsraw)[] |
`total` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2609](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2609)

___

### `InventoryEntry`

Inventory allows you to track stock quantity per SKU and optionally per supply channel

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2618](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2618)

___

### `InventoryEntryCustomFieldListArgs`

Inventory allows you to track stock quantity per SKU and optionally per supply channel

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2648](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2648)

___

### `InventoryEntryCustomFieldsRawArgs`

Inventory allows you to track stock quantity per SKU and optionally per supply channel

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2642](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2642)

___

### `InventoryEntryDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`expectedDelivery`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`quantityOnStock`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`restockableInDays`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sku` | [*Scalars*](#scalars)[*String*] |
`supplyChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2653](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2653)

___

### `InventoryEntryQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *InventoryEntryQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*InventoryEntry*](#inventoryentry)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2662](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2662)

___

### `InventoryEntryUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addQuantity`? | [*Maybe*](#maybe)<[*AddInventoryEntryQuantity*](#addinventoryentryquantity)\> |
`changeQuantity`? | [*Maybe*](#maybe)<[*ChangeInventoryEntryQuantity*](#changeinventoryentryquantity)\> |
`removeQuantity`? | [*Maybe*](#maybe)<[*RemoveInventoryEntryQuantity*](#removeinventoryentryquantity)\> |
`setCustomField`? | [*Maybe*](#maybe)<[*SetInventoryEntryCustomField*](#setinventoryentrycustomfield)\> |
`setCustomType`? | [*Maybe*](#maybe)<[*SetInventoryEntryCustomType*](#setinventoryentrycustomtype)\> |
`setExpectedDelivery`? | [*Maybe*](#maybe)<[*SetInventoryEntryExpectedDelivery*](#setinventoryentryexpecteddelivery)\> |
`setRestockableInDays`? | [*Maybe*](#maybe)<[*SetInventoryEntryRestockableInDays*](#setinventoryentryrestockableindays)\> |
`setSupplyChannel`? | [*Maybe*](#maybe)<[*SetInventoryEntrySupplyChannel*](#setinventoryentrysupplychannel)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2670](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2670)

___

### `ItemShippingDetails`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ItemShippingDetails* |
`targets` | [*ItemShippingTarget*](#itemshippingtarget)[] |
`valid` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2706](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2706)

___

### `ItemShippingDetailsDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`targets` | [*ShippingTargetDraft*](#shippingtargetdraft)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2712](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2712)

___

### `ItemShippingDetailsDraftType`

#### Type declaration:

Name | Type |
:------ | :------ |
`targets` | [*ShippingTargetDraftType*](#shippingtargetdrafttype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2716](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2716)

___

### `ItemShippingTarget`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ItemShippingTarget* |
`addressKey` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2720](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2720)

___

### `ItemState`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ItemState* |
`quantity` | [*Scalars*](#scalars)[*Long*] |
`state`? | [*Maybe*](#maybe)<[*State*](#state)\> |
`stateRef` | [*Reference*](#reference) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2726](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2726)

___

### `ItemStateDraftType`

#### Type declaration:

Name | Type |
:------ | :------ |
`quantity` | [*Scalars*](#scalars)[*Long*] |
`state` | [*ReferenceInput*](#referenceinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2733](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2733)

___

### `KeyReference`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *KeyReference* |
`key` | [*Scalars*](#scalars)[*String*] |
`typeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2738](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2738)

___

### `LineItem`

A line item is a snapshot of a product variant at the time it was added to the cart.

Since a product variant may change at any time, the ProductVariant data is copied into the field variant.
The relation to the Product is kept but the line item will not automatically update if the product variant changes.
On the cart, the line item can be updated manually. The productSlug refers to the current version of the product.
It can be used to link to the product. If the product has been deleted, the line item remains but refers to a
non-existent product and the productSlug is left empty.

Please also note that creating an order is impossible if the product or product
variant a line item relates to has been deleted.

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`__typename`? | *LineItem* | - |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> | - |
`customFieldList`? | [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> | Custom fields are returned as a list instead of an object structure.   |
`customFields`? | [*Maybe*](#maybe)<[*Type*](#type)\> | This field would contain type data   |
`customFieldsRaw`? | [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> | This field contains non-typed data. Consider using `customFields` as a typed alternative.   |
`discountedPricePerQuantity` | [*DiscountedLineItemPriceForQuantity*](#discountedlineitempriceforquantity)[] | - |
`distributionChannel`? | [*Maybe*](#maybe)<[*Channel*](#channel)\> | - |
`distributionChannelRef`? | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`id` | [*Scalars*](#scalars)[*String*] | - |
`inventoryMode`? | [*Maybe*](#maybe)<[*ItemShippingDetails*](#itemshippingdetails)\> | - |
`lineItemMode` | [*LineItemMode*](../enums/types_graphql.lineitemmode.md) | - |
`name`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] | - |
`price` | [*ProductPrice*](#productprice) | - |
`priceMode` | [*LineItemPriceMode*](../enums/types_graphql.lineitempricemode.md) | - |
`productId` | [*Scalars*](#scalars)[*String*] | - |
`productSlug`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`productType`? | [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> | - |
`productTypeRef`? | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`quantity` | [*Scalars*](#scalars)[*Long*] | - |
`shippingDetails`? | [*Maybe*](#maybe)<[*ItemShippingDetails*](#itemshippingdetails)\> | - |
`state` | [*ItemState*](#itemstate)[] | - |
`supplyChannel`? | [*Maybe*](#maybe)<[*Channel*](#channel)\> | - |
`supplyChannelRef`? | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`taxRate`? | [*Maybe*](#maybe)<[*TaxRate*](#taxrate)\> | - |
`taxedPrice`? | [*Maybe*](#maybe)<[*TaxedItemPrice*](#taxeditemprice)\> | - |
`totalPrice`? | [*Maybe*](#maybe)<[*Money*](#money)\> | - |
`variant`? | [*Maybe*](#maybe)<[*ProductVariant*](#productvariant)\> | - |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2755](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2755)

___

### `LineItemCustomFieldListArgs`

A line item is a snapshot of a product variant at the time it was added to the cart.

Since a product variant may change at any time, the ProductVariant data is copied into the field variant.
The relation to the Product is kept but the line item will not automatically update if the product variant changes.
On the cart, the line item can be updated manually. The productSlug refers to the current version of the product.
It can be used to link to the product. If the product has been deleted, the line item remains but refers to a
non-existent product and the productSlug is left empty.

Please also note that creating an order is impossible if the product or product
variant a line item relates to has been deleted.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2848](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2848)

___

### `LineItemCustomFieldsRawArgs`

A line item is a snapshot of a product variant at the time it was added to the cart.

Since a product variant may change at any time, the ProductVariant data is copied into the field variant.
The relation to the Product is kept but the line item will not automatically update if the product variant changes.
On the cart, the line item can be updated manually. The productSlug refers to the current version of the product.
It can be used to link to the product. If the product has been deleted, the line item remains but refers to a
non-existent product and the productSlug is left empty.

Please also note that creating an order is impossible if the product or product
variant a line item relates to has been deleted.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2832](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2832)

___

### `LineItemDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`distributionChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`externalPrice`? | [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> |
`externalTaxRate`? | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`externalTotalPrice`? | [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> |
`productId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetails`? | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`supplyChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2853](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2853)

___

### `LineItemNameArgs`

A line item is a snapshot of a product variant at the time it was added to the cart.

Since a product variant may change at any time, the ProductVariant data is copied into the field variant.
The relation to the Product is kept but the line item will not automatically update if the product variant changes.
On the cart, the line item can be updated manually. The productSlug refers to the current version of the product.
It can be used to link to the product. If the product has been deleted, the line item remains but refers to a
non-existent product and the productSlug is left empty.

Please also note that creating an order is impossible if the product or product
variant a line item relates to has been deleted.

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2800](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2800)

___

### `LineItemProductSlugArgs`

A line item is a snapshot of a product variant at the time it was added to the cart.

Since a product variant may change at any time, the ProductVariant data is copied into the field variant.
The relation to the Product is kept but the line item will not automatically update if the product variant changes.
On the cart, the line item can be updated manually. The productSlug refers to the current version of the product.
It can be used to link to the product. If the product has been deleted, the line item remains but refers to a
non-existent product and the productSlug is left empty.

Please also note that creating an order is impossible if the product or product
variant a line item relates to has been deleted.

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2816](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2816)

___

### `LineItemReturnItem`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2893](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2893)

___

### `LineItemsTarget`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2906](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2906)

___

### `LineItemsTargetInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`predicate` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2912](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2912)

___

### `LocalizableEnumAttributeDefinitionType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2916](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2916)

___

### `LocalizableEnumAttributeDefinitionTypeValuesArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeKeys`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeKeys`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2922](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2922)

___

### `LocalizableEnumTypeDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`values` | [*LocalizedEnumValueDraft*](#localizedenumvaluedraft)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2930](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2930)

___

### `LocalizableEnumValueType`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *LocalizableEnumValueType* |
`key` | [*Scalars*](#scalars)[*String*] |
`label`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`labelAllLocales` | [*LocalizedString*](#localizedstring)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2934](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2934)

___

### `LocalizableEnumValueTypeLabelArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2941](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2941)

___

### `LocalizableEnumValueTypeResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *LocalizableEnumValueTypeResult* |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`results` | [*LocalizableEnumValueType*](#localizableenumvaluetype)[] |
`total` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2946](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2946)

___

### `LocalizableTextAttributeDefinitionType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2954](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2954)

___

### `LocalizedEnumAttribute`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2959](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2959)

___

### `LocalizedEnumAttributeLabelArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2966](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2966)

___

### `LocalizedEnumField`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2970](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2970)

___

### `LocalizedEnumFieldLabelArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2977](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2977)

___

### `LocalizedEnumType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2981](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2981)

___

### `LocalizedEnumValue`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *LocalizedEnumValue* |
`key` | [*Scalars*](#scalars)[*String*] |
`label`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`labelAllLocales` | [*LocalizedString*](#localizedstring)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2987](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2987)

___

### `LocalizedEnumValueDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`key` | [*Scalars*](#scalars)[*String*] |
`label` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2999](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2999)

___

### `LocalizedEnumValueInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`key` | [*Scalars*](#scalars)[*String*] |
`label` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3004](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3004)

___

### `LocalizedEnumValueLabelArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:2994](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L2994)

___

### `LocalizedString`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *LocalizedString* |
`locale` | [*Scalars*](#scalars)[*Locale*] |
`value` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3009](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3009)

___

### `LocalizedStringAttribute`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3015](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3015)

___

### `LocalizedStringAttributeValueArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3021](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3021)

___

### `LocalizedStringField`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3025](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3025)

___

### `LocalizedStringFieldValueArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3031](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3031)

___

### `LocalizedStringItemInputType`

#### Type declaration:

Name | Type |
:------ | :------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |
`value` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3035](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3035)

___

### `LocalizedStringType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3040](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3040)

___

### `LocalizedText`

#### Type declaration:

Name | Type |
:------ | :------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |
`text` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3045](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3045)

___

### `Location`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *Location* |
`country` | [*Scalars*](#scalars)[*Country*] |
`state`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3050](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3050)

___

### `MainProductType`

Sunrise Product Data Set Structure

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3057](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3057)

___

### `Maybe`

#### Type parameters:

Name |
:------ |
`T` |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3)

___

### `Me`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3083](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3083)

___

### `MeCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3095](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3095)

___

### `MeCartsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3099](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3099)

___

### `MeFieldInterface`

The me field gives access to the data that is specific to the customer or anonymous session linked to the access token.

#### Type declaration:

Name | Type |
:------ | :------ |
`me` | [*MeQueryInterface*](#mequeryinterface) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3131](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3131)

___

### `MeOrderArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3106](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3106)

___

### `MeOrdersArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3111](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3111)

___

### `MeQueryInterface`

#### Type declaration:

Name | Type |
:------ | :------ |
`activeCart`? | [*Maybe*](#maybe)<[*Cart*](#cart)\> |
`cart`? | [*Maybe*](#maybe)<[*Cart*](#cart)\> |
`carts` | [*CartQueryResult*](#cartqueryresult) |
`order`? | [*Maybe*](#maybe)<[*Order*](#order)\> |
`orders` | [*OrderQueryResult*](#orderqueryresult) |
`shoppingList`? | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> |
`shoppingLists` | [*ShoppingListQueryResult*](#shoppinglistqueryresult) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3135](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3135)

___

### `MeQueryInterfaceCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3145](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3145)

___

### `MeQueryInterfaceCartsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3149](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3149)

___

### `MeQueryInterfaceOrderArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3156](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3156)

___

### `MeQueryInterfaceOrdersArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3161](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3161)

___

### `MeQueryInterfaceShoppingListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3168](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3168)

___

### `MeQueryInterfaceShoppingListsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3173](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3173)

___

### `MeShoppingListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3118](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3118)

___

### `MeShoppingListsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3123](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3123)

___

### `MessagesConfiguration`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *MessagesConfiguration* |
`deleteDaysAfterCreation`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`enabled` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3180](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3180)

___

### `MessagesConfigurationDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`deleteDaysAfterCreation` | [*Scalars*](#scalars)[*Int*] |
`enabled` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3186](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3186)

___

### `Money`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3191](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3191)

___

### `MoneyAttribute`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3200](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3200)

___

### `MoneyAttributeDefinitionType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3207](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3207)

___

### `MoneyDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`centAmount` | [*Scalars*](#scalars)[*Long*] |
`currencyCode` | [*Scalars*](#scalars)[*Currency*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3212](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3212)

___

### `MoneyField`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3217](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3217)

___

### `MoneyInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`centAmount` | [*Scalars*](#scalars)[*Long*] |
`currencyCode` | [*Scalars*](#scalars)[*Currency*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3224](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3224)

___

### `MoneyType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3229](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3229)

___

### `MoveProductImageToPosition`

#### Type declaration:

Name | Type |
:------ | :------ |
`imageUrl` | [*Scalars*](#scalars)[*String*] |
`position` | [*Scalars*](#scalars)[*Int*] |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3234](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3234)

___

### `MultiBuyCustomLineItemsTarget`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3242](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3242)

___

### `MultiBuyCustomLineItemsTargetInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`discountedQuantity` | [*Scalars*](#scalars)[*Long*] |
`maxOccurrence`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`predicate` | [*Scalars*](#scalars)[*String*] |
`selectionMode`? | [*Maybe*](#maybe)<[*SelectionMode*](../enums/types_graphql.selectionmode.md)\> |
`triggerQuantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3252](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3252)

___

### `MultiBuyLineItemsTarget`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3260](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3260)

___

### `MultiBuyLineItemsTargetInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`discountedQuantity` | [*Scalars*](#scalars)[*Long*] |
`maxOccurrence`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`predicate` | [*Scalars*](#scalars)[*String*] |
`selectionMode`? | [*Maybe*](#maybe)<[*SelectionMode*](../enums/types_graphql.selectionmode.md)\> |
`triggerQuantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3270](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3270)

___

### `Mutation`

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`__typename`? | *Mutation* | - |
`createApiClient`? | [*Maybe*](#maybe)<[*ApiClientWithSecret*](#apiclientwithsecret)\> | - |
`createCart`? | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`createCartDiscount`? | [*Maybe*](#maybe)<[*CartDiscount*](#cartdiscount)\> | - |
`createCategory`? | [*Maybe*](#maybe)<[*Category*](#category)\> | - |
`createCustomerGroup`? | [*Maybe*](#maybe)<[*CustomerGroup*](#customergroup)\> | - |
`createDiscountCode`? | [*Maybe*](#maybe)<[*DiscountCode*](#discountcode)\> | - |
`createInventoryEntry`? | [*Maybe*](#maybe)<[*InventoryEntry*](#inventoryentry)\> | - |
`createMyCart`? | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`createMyOrderFromCart`? | [*Maybe*](#maybe)<[*Order*](#order)\> | - |
`createMyShoppingList`? | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> | - |
`createOrderFromCart`? | [*Maybe*](#maybe)<[*Order*](#order)\> | - |
`createProduct`? | [*Maybe*](#maybe)<[*Product*](#product)\> | - |
`createProductDiscount`? | [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> | - |
`createProductType`? | [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> | - |
`createShippingMethod`? | [*Maybe*](#maybe)<[*ShippingMethod*](#shippingmethod)\> | - |
`createShoppingList`? | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> | - |
`createStore`? | [*Maybe*](#maybe)<[*Store*](#store)\> | - |
`createTaxCategory`? | [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> | - |
`createZone`? | [*Maybe*](#maybe)<[*Zone*](#zone)\> | - |
`customerChangeMyPassword`? | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`customerChangePassword`? | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`customerConfirmEmail`? | [*Maybe*](#maybe)<[*Customer*](#customer)\> | Verifies customer's email using a token.   |
`customerConfirmMyEmail`? | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`customerCreateEmailVerificationToken` | [*CustomerToken*](#customertoken) | - |
`customerCreatePasswordResetToken`? | [*Maybe*](#maybe)<[*CustomerToken*](#customertoken)\> | The token value is used to reset the password of the customer with the given email. The token is valid only for 10 minutes.   |
`customerResetMyPassword`? | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`customerResetPassword`? | [*Maybe*](#maybe)<[*Customer*](#customer)\> | The following workflow can be used to reset the customer’s password:  1. Create a password reset token and send it embedded in a link to the customer. 2. When the customer clicks on the link, you may optionally retrieve customer by password token. 3. When the customer entered new password, use reset customer’s password to reset the password.    |
`customerSignIn` | [*CustomerSignInResult*](#customersigninresult) | Retrieves the authenticated customer (a customer that matches the given email/password pair).  There may be carts and orders created before the sign in that should be assigned to the customer account. With the `anonymousCartId`, a single anonymous cart can be assigned. With the `anonymousId`, all orders and carts that have this `anonymousId` set will be assigned to the customer. If both `anonymousCartId` and `anonymousId` are given, the anonymous cart must have the `anonymousId`.  Additionally, there might also exist one or more active customer carts from an earlier session. On customer sign in there are several ways how to proceed with this cart and the cart referenced by the `anonymousCartId`.  * If the customer does not have a cart yet, the anonymous cart becomes the customer's cart. * If the customer already has one or more carts, the content of the anonymous cart will be copied to the customer's active cart that has been modified most recently.    In this case the `CartState` of the anonymous cart gets changed to `Merged` while the customer's cart remains the `Active` cart.    If a `LineItem` in the anonymous cart matches an existing line item, or a `CustomLineItem` matches an existing custom line item in the customer's cart, the maximum quantity of both line items is used as the new quantity.    `ItemShippingDetails` are copied from the item with the highest quantity.    If `itemShippingAddresses` are different in the two carts, the resulting cart contains the addresses of both the customer cart and the anonymous cart.    Note, that it is not possible to merge carts that differ in their currency (set during creation of the cart).  If a cart is is returned as part of the `CustomerSignInResult`, it has been recalculated (it will have up-to-date prices, taxes and discounts, and invalid line items have been removed).    |
`customerSignMeIn` | [*CustomerSignInResult*](#customersigninresult) | Retrieves the authenticated customer (a customer that matches the given email/password pair).  If used with an access token for Anonymous Sessions, all orders and carts belonging to the `anonymousId` will be assigned to the newly created customer.  * If the customer does not have a cart yet, the anonymous cart that was modified most recently becomes the customer's cart. * If the customer already has a cart, the most recently modified anonymous cart will be handled according to the `AnonymousCartSignInMode`.  If a cart is is returned as part of the `CustomerSignInResult`, it has been recalculated (it will have up-to-date prices, taxes and discounts, and invalid line items have been removed).    |
`customerSignMeUp` | [*CustomerSignInResult*](#customersigninresult) | If used with an access token for Anonymous Sessions, all orders and carts belonging to the anonymousId will be assigned to the newly created customer.   |
`customerSignUp` | [*CustomerSignInResult*](#customersigninresult) | Creates a customer. If an anonymous cart is given then the cart is assigned to the created customer and the version number of the Cart will increase. If the id of an anonymous session is given, all carts and orders will be assigned to the created customer.   |
`deleteApiClient`? | [*Maybe*](#maybe)<[*ApiClientWithoutSecret*](#apiclientwithoutsecret)\> | - |
`deleteCart`? | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`deleteCartDiscount`? | [*Maybe*](#maybe)<[*CartDiscount*](#cartdiscount)\> | - |
`deleteCategory`? | [*Maybe*](#maybe)<[*Category*](#category)\> | - |
`deleteCustomer`? | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`deleteCustomerGroup`? | [*Maybe*](#maybe)<[*CustomerGroup*](#customergroup)\> | - |
`deleteDiscountCode`? | [*Maybe*](#maybe)<[*DiscountCode*](#discountcode)\> | - |
`deleteInventoryEntry`? | [*Maybe*](#maybe)<[*InventoryEntry*](#inventoryentry)\> | - |
`deleteMyCart`? | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`deleteMyCustomer`? | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`deleteMyShoppingList`? | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> | - |
`deleteOrder`? | [*Maybe*](#maybe)<[*Order*](#order)\> | - |
`deleteProduct`? | [*Maybe*](#maybe)<[*Product*](#product)\> | - |
`deleteProductDiscount`? | [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> | - |
`deleteProductType`? | [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> | - |
`deleteShippingMethod`? | [*Maybe*](#maybe)<[*ShippingMethod*](#shippingmethod)\> | - |
`deleteShoppingList`? | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> | - |
`deleteStore`? | [*Maybe*](#maybe)<[*Store*](#store)\> | - |
`deleteTaxCategory`? | [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> | - |
`deleteZone`? | [*Maybe*](#maybe)<[*Zone*](#zone)\> | - |
`replicateCart`? | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`updateCart`? | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`updateCartDiscount`? | [*Maybe*](#maybe)<[*CartDiscount*](#cartdiscount)\> | - |
`updateCategory`? | [*Maybe*](#maybe)<[*Category*](#category)\> | - |
`updateCustomer`? | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`updateCustomerGroup`? | [*Maybe*](#maybe)<[*CustomerGroup*](#customergroup)\> | - |
`updateDiscountCode`? | [*Maybe*](#maybe)<[*DiscountCode*](#discountcode)\> | - |
`updateInventoryEntry`? | [*Maybe*](#maybe)<[*InventoryEntry*](#inventoryentry)\> | - |
`updateMyCart`? | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`updateMyCustomer`? | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`updateMyShoppingList`? | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> | - |
`updateOrder`? | [*Maybe*](#maybe)<[*Order*](#order)\> | - |
`updateProduct`? | [*Maybe*](#maybe)<[*Product*](#product)\> | - |
`updateProductDiscount`? | [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> | - |
`updateProductType`? | [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> | - |
`updateProject`? | [*Maybe*](#maybe)<[*ProjectProjection*](#projectprojection)\> | - |
`updateShippingMethod`? | [*Maybe*](#maybe)<[*ShippingMethod*](#shippingmethod)\> | - |
`updateShoppingList`? | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> | - |
`updateStore`? | [*Maybe*](#maybe)<[*Store*](#store)\> | - |
`updateTaxCategory`? | [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> | - |
`updateZone`? | [*Maybe*](#maybe)<[*Zone*](#zone)\> | - |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3278](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3278)

___

### `MutationCreateApiClientArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*CreateApiClient*](#createapiclient) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3825](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3825)

___

### `MutationCreateCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*CartDraft*](#cartdraft) |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3703](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3703)

___

### `MutationCreateCartDiscountArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*CartDiscountDraft*](#cartdiscountdraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3537](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3537)

___

### `MutationCreateCategoryArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*CategoryDraft*](#categorydraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3437](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3437)

___

### `MutationCreateCustomerGroupArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*CustomerGroupDraft*](#customergroupdraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3420](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3420)

___

### `MutationCreateDiscountCodeArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*DiscountCodeDraft*](#discountcodedraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3522](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3522)

___

### `MutationCreateInventoryEntryArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*InventoryEntryDraft*](#inventoryentrydraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3688](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3688)

___

### `MutationCreateMyCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*MyCartDraft*](#mycartdraft) |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3726](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3726)

___

### `MutationCreateMyOrderFromCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*OrderMyCartCommand*](#ordermycartcommand) |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3765](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3765)

___

### `MutationCreateMyShoppingListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*MyShoppingListDraft*](#myshoppinglistdraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3788](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3788)

___

### `MutationCreateOrderFromCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*OrderCartCommand*](#ordercartcommand) |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3744](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3744)

___

### `MutationCreateProductArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*ProductDraft*](#productdraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3571](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3571)

___

### `MutationCreateProductDiscountArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*ProductDiscountDraft*](#productdiscountdraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3554](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3554)

___

### `MutationCreateProductTypeArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*ProductTypeDraft*](#producttypedraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3454](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3454)

___

### `MutationCreateShippingMethodArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*ShippingMethodDraft*](#shippingmethoddraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3471](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3471)

___

### `MutationCreateShoppingListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*ShoppingListDraft*](#shoppinglistdraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3770](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3770)

___

### `MutationCreateStoreArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*CreateStore*](#createstore) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3808](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3808)

___

### `MutationCreateTaxCategoryArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*TaxCategoryDraft*](#taxcategorydraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3505](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3505)

___

### `MutationCreateZoneArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*CreateZone*](#createzone) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3488](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3488)

___

### `MutationCustomerChangeMyPasswordArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`currentPassword` | [*Scalars*](#scalars)[*String*] |
`newPassword` | [*Scalars*](#scalars)[*String*] |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3670](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3670)

___

### `MutationCustomerChangePasswordArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`currentPassword` | [*Scalars*](#scalars)[*String*] |
`id` | [*Scalars*](#scalars)[*String*] |
`newPassword` | [*Scalars*](#scalars)[*String*] |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3614](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3614)

___

### `MutationCustomerConfirmEmailArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`tokenValue` | [*Scalars*](#scalars)[*String*] |
`version`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3629](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3629)

___

### `MutationCustomerConfirmMyEmailArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`tokenValue` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3677](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3677)

___

### `MutationCustomerCreateEmailVerificationTokenArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`ttlMinutes` | [*Scalars*](#scalars)[*Int*] |
`version`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3641](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3641)

___

### `MutationCustomerCreatePasswordResetTokenArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`email` | [*Scalars*](#scalars)[*String*] |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`ttlMinutes`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3635](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3635)

___

### `MutationCustomerResetMyPasswordArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`newPassword` | [*Scalars*](#scalars)[*String*] |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`tokenValue` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3682](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3682)

___

### `MutationCustomerResetPasswordArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`newPassword` | [*Scalars*](#scalars)[*String*] |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`tokenValue` | [*Scalars*](#scalars)[*String*] |
`version`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3622](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3622)

___

### `MutationCustomerSignInArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*CustomerSignInDraft*](#customersignindraft) |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3593](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3593)

___

### `MutationCustomerSignMeInArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*CustomerSignMeInDraft*](#customersignmeindraft) |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3653](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3653)

___

### `MutationCustomerSignMeUpArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*CustomerSignMeUpDraft*](#customersignmeupdraft) |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3648](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3648)

___

### `MutationCustomerSignUpArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`draft` | [*CustomerSignUpDraft*](#customersignupdraft) |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3588](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3588)

___

### `MutationDeleteApiClientArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3829](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3829)

___

### `MutationDeleteCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |
`personalDataErasure`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3715](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3715)

___

### `MutationDeleteCartDiscountArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3548](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3548)

___

### `MutationDeleteCategoryArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3448](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3448)

___

### `MutationDeleteCustomerArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`personalDataErasure`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3606](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3606)

___

### `MutationDeleteCustomerGroupArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3431](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3431)

___

### `MutationDeleteDiscountCodeArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3532](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3532)

___

### `MutationDeleteInventoryEntryArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3698](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3698)

___

### `MutationDeleteMyCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3738](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3738)

___

### `MutationDeleteMyCustomerArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`personalDataErasure`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3664](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3664)

___

### `MutationDeleteMyShoppingListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3798](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3798)

___

### `MutationDeleteOrderArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`personalDataErasure`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3757](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3757)

___

### `MutationDeleteProductArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3582](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3582)

___

### `MutationDeleteProductDiscountArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3565](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3565)

___

### `MutationDeleteProductTypeArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3465](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3465)

___

### `MutationDeleteShippingMethodArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3482](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3482)

___

### `MutationDeleteShoppingListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`personalDataErasure`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3781](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3781)

___

### `MutationDeleteStoreArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3819](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3819)

___

### `MutationDeleteTaxCategoryArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3516](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3516)

___

### `MutationDeleteZoneArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3499](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3499)

___

### `MutationReplicateCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`reference` | [*ReferenceInput*](#referenceinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3722](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3722)

___

### `MutationUpdateCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*CartUpdateAction*](#cartupdateaction)[] |
`id` | [*Scalars*](#scalars)[*String*] |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3708](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3708)

___

### `MutationUpdateCartDiscountArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*CartDiscountUpdateAction*](#cartdiscountupdateaction)[] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3541](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3541)

___

### `MutationUpdateCategoryArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*CategoryUpdateAction*](#categoryupdateaction)[] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3441](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3441)

___

### `MutationUpdateCustomerArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*CustomerUpdateAction*](#customerupdateaction)[] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3598](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3598)

___

### `MutationUpdateCustomerGroupArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*CustomerGroupUpdateAction*](#customergroupupdateaction)[] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3424](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3424)

___

### `MutationUpdateDiscountCodeArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*DiscountCodeUpdateAction*](#discountcodeupdateaction)[] |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3526](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3526)

___

### `MutationUpdateInventoryEntryArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*InventoryEntryUpdateAction*](#inventoryentryupdateaction)[] |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3692](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3692)

___

### `MutationUpdateMyCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*MyCartUpdateAction*](#mycartupdateaction)[] |
`id` | [*Scalars*](#scalars)[*String*] |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3731](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3731)

___

### `MutationUpdateMyCustomerArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*MyCustomerUpdateAction*](#mycustomerupdateaction)[] |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3658](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3658)

___

### `MutationUpdateMyShoppingListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*MyShoppingListUpdateAction*](#myshoppinglistupdateaction)[] |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3792](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3792)

___

### `MutationUpdateOrderArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*OrderUpdateAction*](#orderupdateaction)[] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`storeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3749](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3749)

___

### `MutationUpdateProductArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*ProductUpdateAction*](#productupdateaction)[] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3575](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3575)

___

### `MutationUpdateProductDiscountArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*ProductDiscountUpdateAction*](#productdiscountupdateaction)[] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3558](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3558)

___

### `MutationUpdateProductTypeArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*ProductTypeUpdateAction*](#producttypeupdateaction)[] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3458](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3458)

___

### `MutationUpdateProjectArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*ProjectSettingsUpdateAction*](#projectsettingsupdateaction)[] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3803](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3803)

___

### `MutationUpdateShippingMethodArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*ShippingMethodUpdateAction*](#shippingmethodupdateaction)[] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3475](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3475)

___

### `MutationUpdateShoppingListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*ShoppingListUpdateAction*](#shoppinglistupdateaction)[] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3774](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3774)

___

### `MutationUpdateStoreArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*StoreUpdateAction*](#storeupdateaction)[] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3812](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3812)

___

### `MutationUpdateTaxCategoryArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*TaxCategoryUpdateAction*](#taxcategoryupdateaction)[] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3509](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3509)

___

### `MutationUpdateZoneArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`actions` | [*ZoneUpdateAction*](#zoneupdateaction)[] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3492](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3492)

___

### `MyCartDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`billingAddress`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |
`country`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> |
`currency` | [*Scalars*](#scalars)[*Currency*] |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`customerEmail`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`deleteDaysAfterLastModification`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`discountCodes`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`inventoryMode`? | [*Maybe*](#maybe)<[*InventoryMode*](../enums/types_graphql.inventorymode.md)\> |
`itemShippingAddresses`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)[]\> |
`lineItems`? | [*Maybe*](#maybe)<[*MyLineItemDraft*](#mylineitemdraft)[]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |
`shippingAddress`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |
`shippingMethod`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`taxMode`? | [*Maybe*](#maybe)<[*TaxMode*](../enums/types_graphql.taxmode.md)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3833](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3833)

___

### `MyCartUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addDiscountCode`? | [*Maybe*](#maybe)<[*AddCartDiscountCode*](#addcartdiscountcode)\> |
`addItemShippingAddress`? | [*Maybe*](#maybe)<[*AddCartItemShippingAddress*](#addcartitemshippingaddress)\> |
`addLineItem`? | [*Maybe*](#maybe)<[*AddMyCartLineItem*](#addmycartlineitem)\> |
`addPayment`? | [*Maybe*](#maybe)<[*AddCartPayment*](#addcartpayment)\> |
`addShoppingList`? | [*Maybe*](#maybe)<[*AddCartShoppingList*](#addcartshoppinglist)\> |
`applyDeltaToLineItemShippingDetailsTargets`? | [*Maybe*](#maybe)<[*ApplyCartDeltaToLineItemShippingDetailsTargets*](#applycartdeltatolineitemshippingdetailstargets)\> |
`changeLineItemQuantity`? | [*Maybe*](#maybe)<[*ChangeCartLineItemQuantity*](#changecartlineitemquantity)\> |
`changeTaxMode`? | [*Maybe*](#maybe)<[*ChangeMyCartTaxMode*](#changemycarttaxmode)\> |
`recalculate`? | [*Maybe*](#maybe)<[*RecalculateCart*](#recalculatecart)\> |
`removeDiscountCode`? | [*Maybe*](#maybe)<[*RemoveCartDiscountCode*](#removecartdiscountcode)\> |
`removeItemShippingAddress`? | [*Maybe*](#maybe)<[*RemoveCartItemShippingAddress*](#removecartitemshippingaddress)\> |
`removeLineItem`? | [*Maybe*](#maybe)<[*RemoveCartLineItem*](#removecartlineitem)\> |
`removePayment`? | [*Maybe*](#maybe)<[*RemoveCartPayment*](#removecartpayment)\> |
`setBillingAddress`? | [*Maybe*](#maybe)<[*SetCartBillingAddress*](#setcartbillingaddress)\> |
`setCountry`? | [*Maybe*](#maybe)<[*SetCartCountry*](#setcartcountry)\> |
`setCustomField`? | [*Maybe*](#maybe)<[*SetCartCustomField*](#setcartcustomfield)\> |
`setCustomType`? | [*Maybe*](#maybe)<[*SetCartCustomType*](#setcartcustomtype)\> |
`setCustomerEmail`? | [*Maybe*](#maybe)<[*SetCartCustomerEmail*](#setcartcustomeremail)\> |
`setDeleteDaysAfterLastModification`? | [*Maybe*](#maybe)<[*SetCartDeleteDaysAfterLastModification*](#setcartdeletedaysafterlastmodification)\> |
`setLineItemCustomField`? | [*Maybe*](#maybe)<[*SetCartLineItemCustomField*](#setcartlineitemcustomfield)\> |
`setLineItemCustomType`? | [*Maybe*](#maybe)<[*SetCartLineItemCustomType*](#setcartlineitemcustomtype)\> |
`setLineItemShippingDetails`? | [*Maybe*](#maybe)<[*SetCartLineItemShippingDetails*](#setcartlineitemshippingdetails)\> |
`setLocale`? | [*Maybe*](#maybe)<[*SetCartLocale*](#setcartlocale)\> |
`setShippingAddress`? | [*Maybe*](#maybe)<[*SetCartShippingAddress*](#setcartshippingaddress)\> |
`setShippingMethod`? | [*Maybe*](#maybe)<[*SetMyCartShippingMethod*](#setmycartshippingmethod)\> |
`updateItemShippingAddress`? | [*Maybe*](#maybe)<[*UpdateCartItemShippingAddress*](#updatecartitemshippingaddress)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3850](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3850)

___

### `MyCustomerUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addAddress`? | [*Maybe*](#maybe)<[*AddCustomerAddress*](#addcustomeraddress)\> |
`addBillingAddressId`? | [*Maybe*](#maybe)<[*AddCustomerBillingAddressId*](#addcustomerbillingaddressid)\> |
`addShippingAddressId`? | [*Maybe*](#maybe)<[*AddCustomerShippingAddressId*](#addcustomershippingaddressid)\> |
`changeAddress`? | [*Maybe*](#maybe)<[*ChangeCustomerAddress*](#changecustomeraddress)\> |
`changeEmail`? | [*Maybe*](#maybe)<[*ChangeCustomerEmail*](#changecustomeremail)\> |
`removeAddress`? | [*Maybe*](#maybe)<[*RemoveCustomerAddress*](#removecustomeraddress)\> |
`removeBillingAddressId`? | [*Maybe*](#maybe)<[*RemoveCustomerBillingAddressId*](#removecustomerbillingaddressid)\> |
`removeShippingAddressId`? | [*Maybe*](#maybe)<[*RemoveCustomerShippingAddressId*](#removecustomershippingaddressid)\> |
`setCompanyName`? | [*Maybe*](#maybe)<[*SetCustomerCompanyName*](#setcustomercompanyname)\> |
`setCustomField`? | [*Maybe*](#maybe)<[*SetCustomerCustomField*](#setcustomercustomfield)\> |
`setCustomType`? | [*Maybe*](#maybe)<[*SetCustomerCustomType*](#setcustomercustomtype)\> |
`setDateOfBirth`? | [*Maybe*](#maybe)<[*SetCustomerDateOfBirth*](#setcustomerdateofbirth)\> |
`setDefaultBillingAddress`? | [*Maybe*](#maybe)<[*SetCustomerDefaultBillingAddress*](#setcustomerdefaultbillingaddress)\> |
`setDefaultShippingAddress`? | [*Maybe*](#maybe)<[*SetCustomerDefaultShippingAddress*](#setcustomerdefaultshippingaddress)\> |
`setFirstName`? | [*Maybe*](#maybe)<[*SetCustomerFirstName*](#setcustomerfirstname)\> |
`setLastName`? | [*Maybe*](#maybe)<[*SetCustomerLastName*](#setcustomerlastname)\> |
`setLocale`? | [*Maybe*](#maybe)<[*SetCustomerLocale*](#setcustomerlocale)\> |
`setMiddleName`? | [*Maybe*](#maybe)<[*SetCustomerMiddleName*](#setcustomermiddlename)\> |
`setSalutation`? | [*Maybe*](#maybe)<[*SetCustomerSalutation*](#setcustomersalutation)\> |
`setTitle`? | [*Maybe*](#maybe)<[*SetCustomerTitle*](#setcustomertitle)\> |
`setVatId`? | [*Maybe*](#maybe)<[*SetCustomerVatId*](#setcustomervatid)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3883](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3883)

___

### `MyLineItemDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`distributionChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`productId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetails`? | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`supplyChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3907](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3907)

___

### `MyShoppingListDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`deleteDaysAfterLastModification`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`lineItems`? | [*Maybe*](#maybe)<[*ShoppingListLineItemDraft*](#shoppinglistlineitemdraft)[]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`textLineItems`? | [*Maybe*](#maybe)<[*TextLineItemDraft*](#textlineitemdraft)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3918](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3918)

___

### `MyShoppingListUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addLineItem`? | [*Maybe*](#maybe)<[*AddShoppingListLineItem*](#addshoppinglistlineitem)\> |
`addTextLineItem`? | [*Maybe*](#maybe)<[*AddShoppingListTextLineItem*](#addshoppinglisttextlineitem)\> |
`changeLineItemQuantity`? | [*Maybe*](#maybe)<[*ChangeShoppingListLineItemQuantity*](#changeshoppinglistlineitemquantity)\> |
`changeLineItemsOrder`? | [*Maybe*](#maybe)<[*ChangeShoppingListLineItemsOrder*](#changeshoppinglistlineitemsorder)\> |
`changeName`? | [*Maybe*](#maybe)<[*ChangeShoppingListName*](#changeshoppinglistname)\> |
`changeTextLineItemName`? | [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemName*](#changeshoppinglisttextlineitemname)\> |
`changeTextLineItemQuantity`? | [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemQuantity*](#changeshoppinglisttextlineitemquantity)\> |
`changeTextLineItemsOrder`? | [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemsOrder*](#changeshoppinglisttextlineitemsorder)\> |
`removeLineItem`? | [*Maybe*](#maybe)<[*RemoveShoppingListLineItem*](#removeshoppinglistlineitem)\> |
`removeTextLineItem`? | [*Maybe*](#maybe)<[*RemoveShoppingListTextLineItem*](#removeshoppinglisttextlineitem)\> |
`setCustomField`? | [*Maybe*](#maybe)<[*SetShoppingListCustomField*](#setshoppinglistcustomfield)\> |
`setCustomType`? | [*Maybe*](#maybe)<[*SetShoppingListCustomType*](#setshoppinglistcustomtype)\> |
`setDeleteDaysAfterLastModification`? | [*Maybe*](#maybe)<[*SetShoppingListDeleteDaysAfterLastModification*](#setshoppinglistdeletedaysafterlastmodification)\> |
`setDescription`? | [*Maybe*](#maybe)<[*SetShoppingListDescription*](#setshoppinglistdescription)\> |
`setLineItemCustomField`? | [*Maybe*](#maybe)<[*SetShoppingListLineItemCustomField*](#setshoppinglistlineitemcustomfield)\> |
`setLineItemCustomType`? | [*Maybe*](#maybe)<[*SetShoppingListLineItemCustomType*](#setshoppinglistlineitemcustomtype)\> |
`setTextLineItemCustomField`? | [*Maybe*](#maybe)<[*SetShoppingListTextLineItemCustomField*](#setshoppinglisttextlineitemcustomfield)\> |
`setTextLineItemCustomType`? | [*Maybe*](#maybe)<[*SetShoppingListTextLineItemCustomType*](#setshoppinglisttextlineitemcustomtype)\> |
`setTextLineItemDescription`? | [*Maybe*](#maybe)<[*SetShoppingListTextLineItemDescription*](#setshoppinglisttextlineitemdescription)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3927](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3927)

___

### `NestedAttributeDefinitionType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3951](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3951)

___

### `NumberAttribute`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3957](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3957)

___

### `NumberAttributeDefinitionType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3963](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3963)

___

### `NumberField`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3968](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3968)

___

### `NumberType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3974](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3974)

___

### `Order`

An order can be created from a cart, usually after a checkout process has been completed.
[documentation](https://docs.commercetools.com/http-api-projects-orders.html)

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:3982](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L3982)

___

### `OrderCartCommand`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |
`orderNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderState`? | [*Maybe*](#maybe)<[*OrderState*](../enums/types_graphql.orderstate.md)\> |
`paymentState`? | [*Maybe*](#maybe)<[*PaymentState*](../enums/types_graphql.paymentstate.md)\> |
`shipmentState`? | [*Maybe*](#maybe)<[*ShipmentState*](../enums/types_graphql.shipmentstate.md)\> |
`state`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4055](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4055)

___

### `OrderCustomFieldListArgs`

An order can be created from a cart, usually after a checkout process has been completed.
[documentation](https://docs.commercetools.com/http-api-projects-orders.html)

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4050](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4050)

___

### `OrderCustomFieldsRawArgs`

An order can be created from a cart, usually after a checkout process has been completed.
[documentation](https://docs.commercetools.com/http-api-projects-orders.html)

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4042](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4042)

___

### `OrderMyCartCommand`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4065](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4065)

___

### `OrderQueryInterface`

Fields to access orders. Includes direct access to a single order and searching for orders.

#### Type declaration:

Name | Type |
:------ | :------ |
`order`? | [*Maybe*](#maybe)<[*Order*](#order)\> |
`orders` | [*OrderQueryResult*](#orderqueryresult) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4071](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4071)

___

### `OrderQueryInterfaceOrderArgs`

Fields to access orders. Includes direct access to a single order and searching for orders.

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4077](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4077)

___

### `OrderQueryInterfaceOrdersArgs`

Fields to access orders. Includes direct access to a single order and searching for orders.

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4083](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4083)

___

### `OrderQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *OrderQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Order*](#order)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4090](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4090)

___

### `OrderUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addDelivery`? | [*Maybe*](#maybe)<[*AddOrderDelivery*](#addorderdelivery)\> |
`addItemShippingAddress`? | [*Maybe*](#maybe)<[*AddOrderItemShippingAddress*](#addorderitemshippingaddress)\> |
`addParcelToDelivery`? | [*Maybe*](#maybe)<[*AddOrderParcelToDelivery*](#addorderparceltodelivery)\> |
`addPayment`? | [*Maybe*](#maybe)<[*AddOrderPayment*](#addorderpayment)\> |
`addReturnInfo`? | [*Maybe*](#maybe)<[*AddOrderReturnInfo*](#addorderreturninfo)\> |
`changeOrderState`? | [*Maybe*](#maybe)<[*ChangeOrderState*](#changeorderstate)\> |
`changePaymentState`? | [*Maybe*](#maybe)<[*ChangeOrderPaymentState*](#changeorderpaymentstate)\> |
`changeShipmentState`? | [*Maybe*](#maybe)<[*ChangeOrderShipmentState*](#changeordershipmentstate)\> |
`importCustomLineItemState`? | [*Maybe*](#maybe)<[*ImportOrderCustomLineItemState*](#importordercustomlineitemstate)\> |
`importLineItemState`? | [*Maybe*](#maybe)<[*ImportOrderLineItemState*](#importorderlineitemstate)\> |
`removeDelivery`? | [*Maybe*](#maybe)<[*RemoveOrderDelivery*](#removeorderdelivery)\> |
`removeItemShippingAddress`? | [*Maybe*](#maybe)<[*RemoveOrderItemShippingAddress*](#removeorderitemshippingaddress)\> |
`removeParcelFromDelivery`? | [*Maybe*](#maybe)<[*RemoveOrderParcelFromDelivery*](#removeorderparcelfromdelivery)\> |
`removePayment`? | [*Maybe*](#maybe)<[*RemoveOrderPayment*](#removeorderpayment)\> |
`setBillingAddress`? | [*Maybe*](#maybe)<[*SetOrderBillingAddress*](#setorderbillingaddress)\> |
`setCustomField`? | [*Maybe*](#maybe)<[*SetOrderCustomField*](#setordercustomfield)\> |
`setCustomLineItemCustomField`? | [*Maybe*](#maybe)<[*SetOrderCustomLineItemCustomField*](#setordercustomlineitemcustomfield)\> |
`setCustomLineItemCustomType`? | [*Maybe*](#maybe)<[*SetOrderCustomLineItemCustomType*](#setordercustomlineitemcustomtype)\> |
`setCustomLineItemShippingDetails`? | [*Maybe*](#maybe)<[*SetOrderCustomLineItemShippingDetails*](#setordercustomlineitemshippingdetails)\> |
`setCustomType`? | [*Maybe*](#maybe)<[*SetOrderCustomType*](#setordercustomtype)\> |
`setCustomerEmail`? | [*Maybe*](#maybe)<[*SetOrderCustomerEmail*](#setordercustomeremail)\> |
`setCustomerId`? | [*Maybe*](#maybe)<[*SetOrderCustomerId*](#setordercustomerid)\> |
`setDeliveryAddress`? | [*Maybe*](#maybe)<[*SetOrderDeliveryAddress*](#setorderdeliveryaddress)\> |
`setDeliveryItems`? | [*Maybe*](#maybe)<[*SetOrderDeliveryItems*](#setorderdeliveryitems)\> |
`setLineItemCustomField`? | [*Maybe*](#maybe)<[*SetOrderLineItemCustomField*](#setorderlineitemcustomfield)\> |
`setLineItemCustomType`? | [*Maybe*](#maybe)<[*SetOrderLineItemCustomType*](#setorderlineitemcustomtype)\> |
`setLineItemShippingDetails`? | [*Maybe*](#maybe)<[*SetOrderLineItemShippingDetails*](#setorderlineitemshippingdetails)\> |
`setLocale`? | [*Maybe*](#maybe)<[*SetOrderLocale*](#setorderlocale)\> |
`setOrderNumber`? | [*Maybe*](#maybe)<[*SetOrderNumber*](#setordernumber)\> |
`setParcelItems`? | [*Maybe*](#maybe)<[*SetOrderParcelItems*](#setorderparcelitems)\> |
`setParcelMeasurements`? | [*Maybe*](#maybe)<[*SetOrderParcelMeasurements*](#setorderparcelmeasurements)\> |
`setParcelTrackingData`? | [*Maybe*](#maybe)<[*SetOrderParcelTrackingData*](#setorderparceltrackingdata)\> |
`setReturnPaymentState`? | [*Maybe*](#maybe)<[*SetOrderReturnPaymentState*](#setorderreturnpaymentstate)\> |
`setReturnShipmentState`? | [*Maybe*](#maybe)<[*SetOrderReturnShipmentState*](#setorderreturnshipmentstate)\> |
`setShippingAddress`? | [*Maybe*](#maybe)<[*SetOrderShippingAddress*](#setordershippingaddress)\> |
`transitionCustomLineItemState`? | [*Maybe*](#maybe)<[*TransitionOrderCustomLineItemState*](#transitionordercustomlineitemstate)\> |
`transitionLineItemState`? | [*Maybe*](#maybe)<[*TransitionOrderLineItemState*](#transitionorderlineitemstate)\> |
`transitionState`? | [*Maybe*](#maybe)<[*TransitionOrderState*](#transitionorderstate)\> |
`updateItemShippingAddress`? | [*Maybe*](#maybe)<[*UpdateOrderItemShippingAddress*](#updateorderitemshippingaddress)\> |
`updateSyncInfo`? | [*Maybe*](#maybe)<[*UpdateOrderSyncInfo*](#updateordersyncinfo)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4105](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4105)

___

### `Parcel`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *Parcel* |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] |
`id` | [*Scalars*](#scalars)[*String*] |
`items` | [*DeliveryItem*](#deliveryitem)[] |
`measurements`? | [*Maybe*](#maybe)<[*ParcelMeasurements*](#parcelmeasurements)\> |
`trackingData`? | [*Maybe*](#maybe)<[*TrackingData*](#trackingdata)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4150](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4150)

___

### `ParcelMeasurements`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ParcelMeasurements* |
`heightInMillimeter`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`lengthInMillimeter`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`weightInGram`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`widthInMillimeter`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4159](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4159)

___

### `ParcelMeasurementsDraftType`

#### Type declaration:

Name | Type |
:------ | :------ |
`heightInMillimeter`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`lengthInMillimeter`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`weightInGram`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`widthInMillimeter`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4167](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4167)

___

### `Payment`

Payments hold information about the current state of receiving and/or refunding money.
[documentation](https://docs.commercetools.com/http-api-projects-payments)

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4177](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4177)

___

### `PaymentCustomFieldListArgs`

Payments hold information about the current state of receiving and/or refunding money.
[documentation](https://docs.commercetools.com/http-api-projects-payments)

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4227](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4227)

___

### `PaymentCustomFieldsRawArgs`

Payments hold information about the current state of receiving and/or refunding money.
[documentation](https://docs.commercetools.com/http-api-projects-payments)

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4219](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4219)

___

### `PaymentInfo`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *PaymentInfo* |
`paymentRefs` | [*Reference*](#reference)[] |
`payments` | [*Payment*](#payment)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4232](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4232)

___

### `PaymentInterfaceInteractionsRawArgs`

Payments hold information about the current state of receiving and/or refunding money.
[documentation](https://docs.commercetools.com/http-api-projects-payments)

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4211](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4211)

___

### `PaymentMethodInfo`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *PaymentMethodInfo* |
`method`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`nameAllLocales`? | [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> |
`paymentInterface`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4238](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4238)

___

### `PaymentMethodInfoNameArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4246](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4246)

___

### `PaymentQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *PaymentQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Payment*](#payment)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4251](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4251)

___

### `PaymentStatus`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *PaymentStatus* |
`interfaceCode`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`interfaceText`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`state`? | [*Maybe*](#maybe)<[*State*](#state)\> |
`stateRef`? | [*Maybe*](#maybe)<[*Reference*](#reference)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4267](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4267)

___

### `PlainEnumValue`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *PlainEnumValue* |
`key` | [*Scalars*](#scalars)[*String*] |
`label` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4275](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4275)

___

### `PlainEnumValueDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`key` | [*Scalars*](#scalars)[*String*] |
`label` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4281](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4281)

___

### `PlainEnumValueResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *PlainEnumValueResult* |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`results` | [*PlainEnumValue*](#plainenumvalue)[] |
`total` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4286](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4286)

___

### `Point`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4294](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4294)

___

### `PriceFunction`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *PriceFunction* |
`currencyCode` | [*Scalars*](#scalars)[*Currency*] |
`function` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4300](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4300)

___

### `PriceFunctionDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`currencyCode` | [*Scalars*](#scalars)[*Currency*] |
`function` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4306](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4306)

___

### `Product`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4311](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4311)

___

### `ProductAttributeInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4335](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4335)

___

### `ProductCatalogData`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ProductCatalogData* |
`current`? | [*Maybe*](#maybe)<[*ProductData*](#productdata)\> |
`hasStagedChanges` | [*Scalars*](#scalars)[*Boolean*] |
`published` | [*Scalars*](#scalars)[*Boolean*] |
`staged`? | [*Maybe*](#maybe)<[*ProductData*](#productdata)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4340](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4340)

___

### `ProductCatalogDataArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4331](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4331)

___

### `ProductData`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ProductData* |
`allVariants` | [*ProductVariant*](#productvariant)[] |
`categories` | [*Category*](#category)[] |
`categoriesRef` | [*Reference*](#reference)[] |
`categoryOrderHint`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`categoryOrderHints` | [*CategoryOrderHint*](#categoryorderhint)[] |
`description`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`descriptionAllLocales`? | [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> |
`masterVariant` | [*ProductVariant*](#productvariant) |
`metaDescription`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`metaKeywords`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`metaTitle`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] |
`searchKeyword`? | [*Maybe*](#maybe)<[*SearchKeyword*](#searchkeyword)[]\> |
`searchKeywords` | [*SearchKeywords*](#searchkeywords)[] |
`skus` | [*Scalars*](#scalars)[*String*][] |
`slug`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variant`? | [*Maybe*](#maybe)<[*ProductVariant*](#productvariant)\> |
`variants` | [*ProductVariant*](#productvariant)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4348](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4348)

___

### `ProductDataAllVariantsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`hasImages`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`isOnStock`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`skus`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`stockChannelIds`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4416](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4416)

___

### `ProductDataCategoryOrderHintArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`categoryId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4386](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4386)

___

### `ProductDataDescriptionArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4376](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4376)

___

### `ProductDataMetaDescriptionArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4404](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4404)

___

### `ProductDataMetaKeywordsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4399](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4399)

___

### `ProductDataMetaTitleArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4394](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4394)

___

### `ProductDataNameArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4371](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4371)

___

### `ProductDataSearchKeywordArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4390](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4390)

___

### `ProductDataSlugArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4381](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4381)

___

### `ProductDataVariantArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4423](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4423)

___

### `ProductDataVariantsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`hasImages`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`isOnStock`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`skus`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`stockChannelIds`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4409](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4409)

___

### `ProductDiscount`

A product price can be discounted in two ways:

* with a relative or an absolute product discount, which will be automatically
applied to all prices in a product that match a discount predicate.
  A relative discount reduces the matching price by a fraction (for example 10 %
off). An absolute discount reduces the matching price by a fixed amount (for
example 10€ off). If more than one product discount matches a price, the
discount sort order determines which one will be applied.
* with an external product discount, which can then be used to explicitly set a
discounted value on a particular product price.

The discounted price is stored in the discounted field of the Product Price.

Note that when a discount is created, updated or removed it can take up to 15
minutes to update all the prices with the discounts.

The maximum number of ProductDiscounts that can be active at the same time is **200**.

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4446](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4446)

___

### `ProductDiscountDescriptionArgs`

A product price can be discounted in two ways:

* with a relative or an absolute product discount, which will be automatically
applied to all prices in a product that match a discount predicate.
  A relative discount reduces the matching price by a fraction (for example 10 %
off). An absolute discount reduces the matching price by a fixed amount (for
example 10€ off). If more than one product discount matches a price, the
discount sort order determines which one will be applied.
* with an external product discount, which can then be used to explicitly set a
discounted value on a particular product price.

The discounted price is stored in the discounted field of the Product Price.

Note that when a discount is created, updated or removed it can take up to 15
minutes to update all the prices with the discounts.

The maximum number of ProductDiscounts that can be active at the same time is **200**.

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4509](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4509)

___

### `ProductDiscountDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`isActive`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`predicate` | [*Scalars*](#scalars)[*String*] |
`sortOrder` | [*Scalars*](#scalars)[*String*] |
`validFrom`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`value` | [*ProductDiscountValueInput*](#productdiscountvalueinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4514](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4514)

___

### `ProductDiscountNameArgs`

A product price can be discounted in two ways:

* with a relative or an absolute product discount, which will be automatically
applied to all prices in a product that match a discount predicate.
  A relative discount reduces the matching price by a fraction (for example 10 %
off). An absolute discount reduces the matching price by a fixed amount (for
example 10€ off). If more than one product discount matches a price, the
discount sort order determines which one will be applied.
* with an external product discount, which can then be used to explicitly set a
discounted value on a particular product price.

The discounted price is stored in the discounted field of the Product Price.

Note that when a discount is created, updated or removed it can take up to 15
minutes to update all the prices with the discounts.

The maximum number of ProductDiscounts that can be active at the same time is **200**.

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4486](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4486)

___

### `ProductDiscountQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ProductDiscountQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*ProductDiscount*](#productdiscount)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4526](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4526)

___

### `ProductDiscountUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`changeIsActive`? | [*Maybe*](#maybe)<[*ChangeProductDiscountIsActive*](#changeproductdiscountisactive)\> |
`changeName`? | [*Maybe*](#maybe)<[*ChangeProductDiscountName*](#changeproductdiscountname)\> |
`changePredicate`? | [*Maybe*](#maybe)<[*ChangeProductDiscountPredicate*](#changeproductdiscountpredicate)\> |
`changeSortOrder`? | [*Maybe*](#maybe)<[*ChangeProductDiscountSortOrder*](#changeproductdiscountsortorder)\> |
`changeValue`? | [*Maybe*](#maybe)<[*ChangeProductDiscountValue*](#changeproductdiscountvalue)\> |
`setDescription`? | [*Maybe*](#maybe)<[*SetProductDiscountDescription*](#setproductdiscountdescription)\> |
`setKey`? | [*Maybe*](#maybe)<[*SetProductDiscountKey*](#setproductdiscountkey)\> |
`setValidFrom`? | [*Maybe*](#maybe)<[*SetProductDiscountValidFrom*](#setproductdiscountvalidfrom)\> |
`setValidFromAndUntil`? | [*Maybe*](#maybe)<[*SetProductDiscountValidFromAndUntil*](#setproductdiscountvalidfromanduntil)\> |
`setValidUntil`? | [*Maybe*](#maybe)<[*SetProductDiscountValidUntil*](#setproductdiscountvaliduntil)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4534](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4534)

___

### `ProductDiscountValue`

#### Type declaration:

Name | Type |
:------ | :------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4547](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4547)

___

### `ProductDiscountValueInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`absolute`? | [*Maybe*](#maybe)<[*AbsoluteDiscountValueInput*](#absolutediscountvalueinput)\> |
`external`? | [*Maybe*](#maybe)<[*ExternalDiscountValueInput*](#externaldiscountvalueinput)\> |
`relative`? | [*Maybe*](#maybe)<[*RelativeDiscountValueInput*](#relativediscountvalueinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4551](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4551)

___

### `ProductDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`categories`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)[]\> |
`categoryOrderHints`? | [*Maybe*](#maybe)<[*CategoryOrderHintInput*](#categoryorderhintinput)[]\> |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`masterVariant`? | [*Maybe*](#maybe)<[*ProductVariantInput*](#productvariantinput)\> |
`metaDescription`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`metaKeywords`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`metaTitle`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`productType` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`publish`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`searchKeywords`? | [*Maybe*](#maybe)<[*SearchKeywordInput*](#searchkeywordinput)[]\> |
`slug` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`state`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`taxCategory`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`variants`? | [*Maybe*](#maybe)<[*ProductVariantInput*](#productvariantinput)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4557](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4557)

___

### `ProductPrice`

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`__typename`? | *ProductPrice* | - |
`channel`? | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`country`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> | - |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> | - |
`customFieldList`? | [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> | Custom fields are returned as a list instead of an object structure.   |
`customFields`? | [*Maybe*](#maybe)<[*Type*](#type)\> | This field would contain type data   |
`customFieldsRaw`? | [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> | This field contains non-typed data. Consider using `customFields` as a typed alternative.   |
`customerGroup`? | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`discounted`? | [*Maybe*](#maybe)<[*DiscountedProductPriceValue*](#discountedproductpricevalue)\> | - |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`tiers`? | [*Maybe*](#maybe)<[*ProductPriceTier*](#productpricetier)[]\> | - |
`validFrom`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> | - |
`validUntil`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> | - |
`value` | [*BaseMoney*](#basemoney) | - |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4576](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4576)

___

### `ProductPriceCustomFieldListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4601](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4601)

___

### `ProductPriceCustomFieldsRawArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4596](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4596)

___

### `ProductPriceDataInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`channel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`country`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`customerGroup`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`tiers`? | [*Maybe*](#maybe)<[*ProductPriceTierInput*](#productpricetierinput)[]\> |
`validFrom`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`value` | [*BaseMoneyInput*](#basemoneyinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4606](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4606)

___

### `ProductPriceTier`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ProductPriceTier* |
`minimumQuantity` | [*Scalars*](#scalars)[*Int*] |
`value` | [*BaseMoney*](#basemoney) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4617](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4617)

___

### `ProductPriceTierInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`minimumQuantity` | [*Scalars*](#scalars)[*Int*] |
`value` | [*BaseMoneyInput*](#basemoneyinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4623](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4623)

___

### `ProductQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ProductQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Product*](#product)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4628](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4628)

___

### `ProductReferenceIdentifier`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ProductReferenceIdentifier* |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4636](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4636)

___

### `ProductType`

#### Type declaration:

Name | Type |
:------ | :------ |
`productTypeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4643](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4643)

___

### `ProductTypeDefinition`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4647](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4647)

___

### `ProductTypeDefinitionAttributeDefinitionsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4661](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4661)

___

### `ProductTypeDefinitionQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ProductTypeDefinitionQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*ProductTypeDefinition*](#producttypedefinition)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4669](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4669)

___

### `ProductTypeDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeDefinitions`? | [*Maybe*](#maybe)<[*AttributeDefinitionDraft*](#attributedefinitiondraft)[]\> |
`description` | [*Scalars*](#scalars)[*String*] |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4677](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4677)

___

### `ProductTypeUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addAttributeDefinition`? | [*Maybe*](#maybe)<[*AddAttributeDefinition*](#addattributedefinition)\> |
`addLocalizedEnumValue`? | [*Maybe*](#maybe)<[*AddLocalizedEnumValue*](#addlocalizedenumvalue)\> |
`addPlainEnumValue`? | [*Maybe*](#maybe)<[*AddPlainEnumValue*](#addplainenumvalue)\> |
`changeAttributeName`? | [*Maybe*](#maybe)<[*ChangeAttributeName*](#changeattributename)\> |
`changeAttributeOrder`? | [*Maybe*](#maybe)<[*ChangeAttributeOrder*](#changeattributeorder)\> |
`changeAttributeOrderByName`? | [*Maybe*](#maybe)<[*ChangeAttributeOrderByName*](#changeattributeorderbyname)\> |
`changeDescription`? | [*Maybe*](#maybe)<[*ChangeDescription*](#changedescription)\> |
`changeEnumKey`? | [*Maybe*](#maybe)<[*ChangeEnumKey*](#changeenumkey)\> |
`changeInputHint`? | [*Maybe*](#maybe)<[*ChangeInputHint*](#changeinputhint)\> |
`changeIsSearchable`? | [*Maybe*](#maybe)<[*ChangeIsSearchable*](#changeissearchable)\> |
`changeLabel`? | [*Maybe*](#maybe)<[*ChangeLabel*](#changelabel)\> |
`changeLocalizedEnumValueLabel`? | [*Maybe*](#maybe)<[*ChangeLocalizedEnumValueLabel*](#changelocalizedenumvaluelabel)\> |
`changeLocalizedEnumValueOrder`? | [*Maybe*](#maybe)<[*ChangeLocalizedEnumValueOrder*](#changelocalizedenumvalueorder)\> |
`changeName`? | [*Maybe*](#maybe)<[*ChangeName*](#changename)\> |
`changePlainEnumValueLabel`? | [*Maybe*](#maybe)<[*ChangePlainEnumValueLabel*](#changeplainenumvaluelabel)\> |
`changePlainEnumValueOrder`? | [*Maybe*](#maybe)<[*ChangePlainEnumValueOrder*](#changeplainenumvalueorder)\> |
`removeAttributeDefinition`? | [*Maybe*](#maybe)<[*RemoveAttributeDefinition*](#removeattributedefinition)\> |
`removeEnumValues`? | [*Maybe*](#maybe)<[*RemoveEnumValues*](#removeenumvalues)\> |
`setInputTip`? | [*Maybe*](#maybe)<[*SetInputTip*](#setinputtip)\> |
`setKey`? | [*Maybe*](#maybe)<[*SetKey*](#setkey)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4684](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4684)

___

### `ProductUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addAsset`? | [*Maybe*](#maybe)<[*AddProductAsset*](#addproductasset)\> |
`addExternalImage`? | [*Maybe*](#maybe)<[*AddProductExternalImage*](#addproductexternalimage)\> |
`addPrice`? | [*Maybe*](#maybe)<[*AddProductPrice*](#addproductprice)\> |
`addToCategory`? | [*Maybe*](#maybe)<[*AddProductToCategory*](#addproducttocategory)\> |
`addVariant`? | [*Maybe*](#maybe)<[*AddProductVariant*](#addproductvariant)\> |
`changeAssetName`? | [*Maybe*](#maybe)<[*ChangeProductAssetName*](#changeproductassetname)\> |
`changeAssetOrder`? | [*Maybe*](#maybe)<[*ChangeProductAssetOrder*](#changeproductassetorder)\> |
`changeImageLabel`? | [*Maybe*](#maybe)<[*ChangeProductImageLabel*](#changeproductimagelabel)\> |
`changeMasterVariant`? | [*Maybe*](#maybe)<[*ChangeProductMasterVariant*](#changeproductmastervariant)\> |
`changeName`? | [*Maybe*](#maybe)<[*ChangeProductName*](#changeproductname)\> |
`changePrice`? | [*Maybe*](#maybe)<[*ChangeProductPrice*](#changeproductprice)\> |
`changeSlug`? | [*Maybe*](#maybe)<[*ChangeProductSlug*](#changeproductslug)\> |
`moveImageToPosition`? | [*Maybe*](#maybe)<[*MoveProductImageToPosition*](#moveproductimagetoposition)\> |
`publish`? | [*Maybe*](#maybe)<[*PublishProduct*](#publishproduct)\> |
`removeAsset`? | [*Maybe*](#maybe)<[*RemoveProductAsset*](#removeproductasset)\> |
`removeFromCategory`? | [*Maybe*](#maybe)<[*RemoveProductFromCategory*](#removeproductfromcategory)\> |
`removeImage`? | [*Maybe*](#maybe)<[*RemoveProductImage*](#removeproductimage)\> |
`removePrice`? | [*Maybe*](#maybe)<[*RemoveProductPrice*](#removeproductprice)\> |
`removeVariant`? | [*Maybe*](#maybe)<[*RemoveProductVariant*](#removeproductvariant)\> |
`revertStagedChanges`? | [*Maybe*](#maybe)<[*RevertStagedChanges*](#revertstagedchanges)\> |
`revertStagedVariantChanges`? | [*Maybe*](#maybe)<[*RevertStagedVariantChanges*](#revertstagedvariantchanges)\> |
`setAssetCustomField`? | [*Maybe*](#maybe)<[*SetProductAssetCustomField*](#setproductassetcustomfield)\> |
`setAssetCustomType`? | [*Maybe*](#maybe)<[*SetProductAssetCustomType*](#setproductassetcustomtype)\> |
`setAssetDescription`? | [*Maybe*](#maybe)<[*SetProductAssetDescription*](#setproductassetdescription)\> |
`setAssetKey`? | [*Maybe*](#maybe)<[*SetProductAssetKey*](#setproductassetkey)\> |
`setAssetSources`? | [*Maybe*](#maybe)<[*SetProductAssetSources*](#setproductassetsources)\> |
`setAssetTags`? | [*Maybe*](#maybe)<[*SetProductAssetTags*](#setproductassettags)\> |
`setAttribute`? | [*Maybe*](#maybe)<[*SetProductAttribute*](#setproductattribute)\> |
`setAttributeInAllVariants`? | [*Maybe*](#maybe)<[*SetProductAttributeInAllVariants*](#setproductattributeinallvariants)\> |
`setCategoryOrderHint`? | [*Maybe*](#maybe)<[*SetProductCategoryOrderHint*](#setproductcategoryorderhint)\> |
`setDescription`? | [*Maybe*](#maybe)<[*SetProductDescription*](#setproductdescription)\> |
`setDiscountedPrice`? | [*Maybe*](#maybe)<[*SetProductDiscountedPrice*](#setproductdiscountedprice)\> |
`setImageLabel`? | [*Maybe*](#maybe)<[*SetProductImageLabel*](#setproductimagelabel)\> |
`setKey`? | [*Maybe*](#maybe)<[*SetProductKey*](#setproductkey)\> |
`setMetaAttributes`? | [*Maybe*](#maybe)<[*SetProductMetaAttributes*](#setproductmetaattributes)\> |
`setMetaDescription`? | [*Maybe*](#maybe)<[*SetProductMetaDescription*](#setproductmetadescription)\> |
`setMetaKeywords`? | [*Maybe*](#maybe)<[*SetProductMetaKeywords*](#setproductmetakeywords)\> |
`setMetaTitle`? | [*Maybe*](#maybe)<[*SetProductMetaTitle*](#setproductmetatitle)\> |
`setPrices`? | [*Maybe*](#maybe)<[*SetProductPrices*](#setproductprices)\> |
`setProductPriceCustomField`? | [*Maybe*](#maybe)<[*SetProductPriceCustomField*](#setproductpricecustomfield)\> |
`setProductPriceCustomType`? | [*Maybe*](#maybe)<[*SetProductPriceCustomType*](#setproductpricecustomtype)\> |
`setProductVariantKey`? | [*Maybe*](#maybe)<[*SetProductVariantKey*](#setproductvariantkey)\> |
`setSearchKeywords`? | [*Maybe*](#maybe)<[*SetSearchKeywords*](#setsearchkeywords)\> |
`setSku`? | [*Maybe*](#maybe)<[*SetProductSku*](#setproductsku)\> |
`setTaxCategory`? | [*Maybe*](#maybe)<[*SetProductTaxCategory*](#setproducttaxcategory)\> |
`transitionState`? | [*Maybe*](#maybe)<[*TransitionProductState*](#transitionproductstate)\> |
`unpublish`? | [*Maybe*](#maybe)<[*UnpublishProduct*](#unpublishproduct)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4707](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4707)

___

### `ProductVariant`

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`__typename`? | *ProductVariant* | - |
`assets` | [*Asset*](#asset)[] | - |
`attributeList` | [*Attribute*](#attribute)[] | Product attributes are returned as a list instead of an object structure.   |
`attributes` | [*ProductType*](#producttype) | Product attributes   |
`attributesRaw` | [*RawProductAttribute*](#rawproductattribute)[] | This field contains non-typed data. Consider using `attributes` as a typed alternative.   |
`availability`? | [*Maybe*](#maybe)<[*ProductVariantAvailabilityWithChannels*](#productvariantavailabilitywithchannels)\> | - |
`id` | [*Scalars*](#scalars)[*Int*] | - |
`images` | [*Image*](#image)[] | - |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`price`? | [*Maybe*](#maybe)<[*ProductPrice*](#productprice)\> | Returns a single price based on the price selection rules.   |
`prices`? | [*Maybe*](#maybe)<[*ProductPrice*](#productprice)[]\> | - |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4757](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4757)

___

### `ProductVariantAttributeListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4789](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4789)

___

### `ProductVariantAttributesRawArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4784](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4784)

___

### `ProductVariantAvailabilitiesResult`

Product variant availabilities

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ProductVariantAvailabilitiesResult* |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`results` | [*ProductVariantAvailabilityWithChannel*](#productvariantavailabilitywithchannel)[] |
`total` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4795](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4795)

___

### `ProductVariantAvailability`

Product variant availability

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ProductVariantAvailability* |
`availableQuantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`isOnStock` | [*Scalars*](#scalars)[*Boolean*] |
`restockableInDays`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4804](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4804)

___

### `ProductVariantAvailabilityWithChannel`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ProductVariantAvailabilityWithChannel* |
`availability` | [*ProductVariantAvailability*](#productvariantavailability) |
`channel`? | [*Maybe*](#maybe)<[*Channel*](#channel)\> |
`channelRef` | [*Reference*](#reference) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4811](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4811)

___

### `ProductVariantAvailabilityWithChannels`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ProductVariantAvailabilityWithChannels* |
`channels` | [*ProductVariantAvailabilitiesResult*](#productvariantavailabilitiesresult) |
`noChannel`? | [*Maybe*](#maybe)<[*ProductVariantAvailability*](#productvariantavailability)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4818](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4818)

___

### `ProductVariantAvailabilityWithChannelsChannelsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeChannelIds`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeChannelIds`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4824](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4824)

___

### `ProductVariantInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`assets`? | [*Maybe*](#maybe)<[*AssetDraftInput*](#assetdraftinput)[]\> |
`attributes`? | [*Maybe*](#maybe)<[*ProductAttributeInput*](#productattributeinput)[]\> |
`images`? | [*Maybe*](#maybe)<[*ImageInput*](#imageinput)[]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`prices`? | [*Maybe*](#maybe)<[*ProductPriceDataInput*](#productpricedatainput)[]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4831](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4831)

___

### `ProductVariantPriceArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`channelId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`country`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> |
`currency` | [*Scalars*](#scalars)[*Currency*] |
`customerGroupId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`date`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4776](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4776)

___

### `ProjectProjection`

Project contains information about project.

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ProjectProjection* |
`countries` | [*Scalars*](#scalars)[*Country*][] |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] |
`currencies` | [*Scalars*](#scalars)[*Currency*][] |
`externalOAuth`? | [*Maybe*](#maybe)<[*ExternalOAuth*](#externaloauth)\> |
`key` | [*Scalars*](#scalars)[*String*] |
`languages` | [*Scalars*](#scalars)[*Locale*][] |
`messages` | [*MessagesConfiguration*](#messagesconfiguration) |
`name` | [*Scalars*](#scalars)[*String*] |
`shippingRateInputType`? | [*Maybe*](#maybe)<[*ShippingRateInputType*](#shippingrateinputtype)\> |
`trialUntil`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*YearMonth*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4841](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4841)

___

### `ProjectSettingsUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`changeCountries`? | [*Maybe*](#maybe)<[*ChangeProjectSettingsCountries*](#changeprojectsettingscountries)\> |
`changeCurrencies`? | [*Maybe*](#maybe)<[*ChangeProjectSettingsCurrencies*](#changeprojectsettingscurrencies)\> |
`changeLanguages`? | [*Maybe*](#maybe)<[*ChangeProjectSettingsLanguages*](#changeprojectsettingslanguages)\> |
`changeMessagesConfiguration`? | [*Maybe*](#maybe)<[*ChangeProjectSettingsMessagesConfiguration*](#changeprojectsettingsmessagesconfiguration)\> |
`changeMessagesEnabled`? | [*Maybe*](#maybe)<[*ChangeProjectSettingsMessagesEnabled*](#changeprojectsettingsmessagesenabled)\> |
`changeName`? | [*Maybe*](#maybe)<[*ChangeProjectSettingsName*](#changeprojectsettingsname)\> |
`setExternalOAuth`? | [*Maybe*](#maybe)<[*SetProjectSettingsExternalOAuth*](#setprojectsettingsexternaloauth)\> |
`setShippingRateInputType`? | [*Maybe*](#maybe)<[*SetProjectSettingsShippingRateInputType*](#setprojectsettingsshippingrateinputtype)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4856](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4856)

___

### `PublishProduct`

#### Type declaration:

Name | Type |
:------ | :------ |
`scope`? | [*Maybe*](#maybe)<[*PublishScope*](../enums/types_graphql.publishscope.md)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4869](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4869)

___

### `Query`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4880](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4880)

___

### `QueryApiClientArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5231](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5231)

___

### `QueryApiClientsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5235](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5235)

___

### `QueryCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5168](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5168)

___

### `QueryCartDiscountArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5093](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5093)

___

### `QueryCartDiscountsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5098](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5098)

___

### `QueryCartsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5172](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5172)

___

### `QueryCategoriesArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4974](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4974)

___

### `QueryCategoryArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4969](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4969)

___

### `QueryCategoryAutocompleteArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`experimental`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`filters`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*SearchFilter*][]\> |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`locale` | [*Scalars*](#scalars)[*Locale*] |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`text` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4981](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4981)

___

### `QueryCategorySearchArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`experimental`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`filters`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*SearchFilter*][]\> |
`fulltext`? | [*Maybe*](#maybe)<[*LocalizedText*](#localizedtext)\> |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`queryFilters`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*SearchFilter*][]\> |
`sorts`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*SearchSort*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4990](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4990)

___

### `QueryChannelArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5000](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5000)

___

### `QueryChannelsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5005](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5005)

___

### `QueryCustomerActiveCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`customerId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5179](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5179)

___

### `QueryCustomerArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`emailToken`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`passwordToken`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5143](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5143)

___

### `QueryCustomerGroupArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4957](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4957)

___

### `QueryCustomerGroupsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4962](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4962)

___

### `QueryCustomersArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5150](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5150)

___

### `QueryDiscountCodeArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5082](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5082)

___

### `QueryDiscountCodesArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5086](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5086)

___

### `QueryInStoreArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`key` | [*Scalars*](#scalars)[*KeyReferenceInput*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4949](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4949)

___

### `QueryInStoresArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`keys` | [*Scalars*](#scalars)[*KeyReferenceInput*][] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:4953](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L4953)

___

### `QueryInventoryEntriesArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5161](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5161)

___

### `QueryInventoryEntryArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5157](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5157)

___

### `QueryOrderArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5183](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5183)

___

### `QueryOrdersArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5188](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5188)

___

### `QueryPaymentArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5207](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5207)

___

### `QueryPaymentsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5212](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5212)

___

### `QueryProductArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variantKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5116](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5116)

___

### `QueryProductDiscountArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5105](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5105)

___

### `QueryProductDiscountsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5109](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5109)

___

### `QueryProductTypeArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5012](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5012)

___

### `QueryProductTypesArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5017](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5017)

___

### `QueryProductsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`skus`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5123](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5123)

___

### `QueryShippingMethodArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5036](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5036)

___

### `QueryShippingMethodsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5041](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5041)

___

### `QueryShippingMethodsByCartArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5048](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5048)

___

### `QueryShippingMethodsByLocationArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`country` | [*Scalars*](#scalars)[*Country*] |
`currency`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Currency*]\> |
`state`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5052](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5052)

___

### `QueryShoppingListArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5195](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5195)

___

### `QueryShoppingListsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5200](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5200)

___

### `QueryStateArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5131](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5131)

___

### `QueryStatesArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5136](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5136)

___

### `QueryStoreArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5219](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5219)

___

### `QueryStoresArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5224](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5224)

___

### `QueryTaxCategoriesArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5075](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5075)

___

### `QueryTaxCategoryArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5070](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5070)

___

### `QueryTypeDefinitionArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5024](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5024)

___

### `QueryTypeDefinitionsArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5029](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5029)

___

### `QueryZoneArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5058](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5058)

___

### `QueryZonesArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5063](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5063)

___

### `RawCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *RawCustomField* |
`name` | [*Scalars*](#scalars)[*String*] |
`value` | [*Scalars*](#scalars)[*Json*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5242](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5242)

___

### `RawProductAttribute`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *RawProductAttribute* |
`attributeDefinition`? | [*Maybe*](#maybe)<[*AttributeDefinition*](#attributedefinition)\> |
`name` | [*Scalars*](#scalars)[*String*] |
`value` | [*Scalars*](#scalars)[*Json*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5248](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5248)

___

### `RecalculateCart`

#### Type declaration:

Name | Type |
:------ | :------ |
`updateProductData`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5255](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5255)

___

### `Reference`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *Reference* |
`id` | [*Scalars*](#scalars)[*String*] |
`typeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5259](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5259)

___

### `ReferenceAttribute`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5265](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5265)

___

### `ReferenceAttributeDefinitionType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5272](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5272)

___

### `ReferenceField`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5278](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5278)

___

### `ReferenceInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |
`typeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5285](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5285)

___

### `ReferenceType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5290](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5290)

___

### `ReferenceTypeDefinitionDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`referenceTypeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5296](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5296)

___

### `RelativeDiscountValue`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5300](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5300)

___

### `RelativeDiscountValueInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`permyriad` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5307](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5307)

___

### `RemoveAttributeDefinition`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5311](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5311)

___

### `RemoveCartCustomLineItem`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5315](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5315)

___

### `RemoveCartDiscountCode`

#### Type declaration:

Name | Type |
:------ | :------ |
`discountCode` | [*ReferenceInput*](#referenceinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5319](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5319)

___

### `RemoveCartItemShippingAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`addressKey` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5323](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5323)

___

### `RemoveCartLineItem`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalPrice`? | [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> |
`externalTotalPrice`? | [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`quantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetailsToRemove`? | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5327](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5327)

___

### `RemoveCartPayment`

#### Type declaration:

Name | Type |
:------ | :------ |
`payment` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5335](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5335)

___

### `RemoveCategoryAsset`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5339](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5339)

___

### `RemoveCustomerAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`addressId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5344](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5344)

___

### `RemoveCustomerBillingAddressId`

#### Type declaration:

Name | Type |
:------ | :------ |
`addressId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5348](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5348)

___

### `RemoveCustomerShippingAddressId`

#### Type declaration:

Name | Type |
:------ | :------ |
`addressId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5352](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5352)

___

### `RemoveCustomerStore`

#### Type declaration:

Name | Type |
:------ | :------ |
`store` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5356](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5356)

___

### `RemoveEnumValues`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`keys` | [*Scalars*](#scalars)[*String*][] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5360](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5360)

___

### `RemoveInventoryEntryQuantity`

#### Type declaration:

Name | Type |
:------ | :------ |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5365](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5365)

___

### `RemoveOrderDelivery`

#### Type declaration:

Name | Type |
:------ | :------ |
`deliveryId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5369](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5369)

___

### `RemoveOrderItemShippingAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`addressKey` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5373](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5373)

___

### `RemoveOrderParcelFromDelivery`

#### Type declaration:

Name | Type |
:------ | :------ |
`parcelId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5377](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5377)

___

### `RemoveOrderPayment`

#### Type declaration:

Name | Type |
:------ | :------ |
`payment` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5381](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5381)

___

### `RemoveProductAsset`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5385](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5385)

___

### `RemoveProductFromCategory`

#### Type declaration:

Name | Type |
:------ | :------ |
`category` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5394](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5394)

___

### `RemoveProductImage`

#### Type declaration:

Name | Type |
:------ | :------ |
`imageUrl` | [*Scalars*](#scalars)[*String*] |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5399](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5399)

___

### `RemoveProductPrice`

#### Type declaration:

Name | Type |
:------ | :------ |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`price`? | [*Maybe*](#maybe)<[*ProductPriceDataInput*](#productpricedatainput)\> |
`priceId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5406](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5406)

___

### `RemoveProductVariant`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5415](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5415)

___

### `RemoveShippingMethodShippingRate`

#### Type declaration:

Name | Type |
:------ | :------ |
`shippingRate` | [*ShippingRateDraft*](#shippingratedraft) |
`zone` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5421](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5421)

___

### `RemoveShippingMethodZone`

#### Type declaration:

Name | Type |
:------ | :------ |
`zone` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5426](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5426)

___

### `RemoveShoppingListLineItem`

#### Type declaration:

Name | Type |
:------ | :------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`quantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5430](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5430)

___

### `RemoveShoppingListTextLineItem`

#### Type declaration:

Name | Type |
:------ | :------ |
`quantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`textLineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5435](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5435)

___

### `RemoveZoneLocation`

#### Type declaration:

Name | Type |
:------ | :------ |
`location` | [*ZoneLocation*](#zonelocation) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5440](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5440)

___

### `ReservationOrderType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5444](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5444)

___

### `ResourceIdentifierInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5451](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5451)

___

### `ReturnInfo`

Stores information about returns connected to this order.

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ReturnInfo* |
`items` | [*ReturnItem*](#returnitem)[] |
`returnDate`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`returnTrackingId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5458](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5458)

___

### `ReturnItem`

#### Type declaration:

Name | Type |
:------ | :------ |
`comment`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] |
`id` | [*Scalars*](#scalars)[*String*] |
`lastModifiedAt` | [*Scalars*](#scalars)[*DateTime*] |
`paymentState` | [*ReturnPaymentState*](../enums/types_graphql.returnpaymentstate.md) |
`quantity` | [*Scalars*](#scalars)[*Long*] |
`shipmentState` | [*ReturnShipmentState*](../enums/types_graphql.returnshipmentstate.md) |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5465](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5465)

___

### `ReturnItemDraftType`

#### Type declaration:

Name | Type |
:------ | :------ |
`comment`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`customLineItemId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`lineItemId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity` | [*Scalars*](#scalars)[*Long*] |
`shipmentState` | [*ReturnShipmentState*](../enums/types_graphql.returnshipmentstate.md) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5476](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5476)

___

### `RevertStagedChanges`

#### Type declaration:

Name | Type |
:------ | :------ |
`dummy`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5498](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5498)

___

### `RevertStagedVariantChanges`

#### Type declaration:

Name | Type |
:------ | :------ |
`variantId` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5502](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5502)

___

### `Scalars`

All built-in and custom scalars, mapped to their actual values

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`BigDecimal` | *any* | The `BigDecimal` scalar type represents signed fractional values with arbitrary precision.   |
`Boolean` | *boolean* | - |
`Country` | *any* | [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1) country code.   |
`Currency` | *any* | Represents a currency. Currencies are identified by their [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) currency codes.   |
`Date` | *any* | DateTime is a scalar value that represents an ISO8601 formatted date.   |
`DateTime` | *any* | DateTime is a scalar value that represents an ISO8601 formatted date and time.   |
`Float` | *number* | - |
`ID` | *string* | - |
`Int` | *number* | - |
`Json` | *any* | Raw JSON value   |
`KeyReferenceInput` | *any* | A key that references a resource.   |
`Locale` | *any* | Locale is a scalar value represented as a string language tag.   |
`Long` | *any* | The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1.   |
`SearchFilter` | *any* | Search filter. It is represented as a string and has th same format as in REST API: "field:filter_criteria"   |
`SearchSort` | *any* | Search sort   |
`String` | *string* | - |
`Time` | *any* | Time is a scalar value that represents an ISO8601 formatted time.   |
`YearMonth` | *any* | YearMonth is a scalar value that represents an ISO8601 formatted year and month.   |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5)

___

### `ScoreShippingRateInput`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5519](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5519)

___

### `ScoreShippingRateInputDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`score` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5525](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5525)

___

### `SearchKeyword`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *SearchKeyword* |
`text` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5529](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5529)

___

### `SearchKeywordInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`keywords` | [*CustomSuggestTokenizerInput*](#customsuggesttokenizerinput)[] |
`locale` | [*Scalars*](#scalars)[*Locale*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5534](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5534)

___

### `SearchKeywords`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *SearchKeywords* |
`locale` | [*Scalars*](#scalars)[*Locale*] |
`searchKeywords` | [*SearchKeyword*](#searchkeyword)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5539](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5539)

___

### `SetAttributeDefinitionType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5551](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5551)

___

### `SetCartAnonymousId`

#### Type declaration:

Name | Type |
:------ | :------ |
`anonymousId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5557](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5557)

___

### `SetCartBillingAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`address`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5561](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5561)

___

### `SetCartCountry`

#### Type declaration:

Name | Type |
:------ | :------ |
`country`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5565](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5565)

___

### `SetCartCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5581](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5581)

___

### `SetCartCustomLineItemCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5586](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5586)

___

### `SetCartCustomLineItemCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5592](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5592)

___

### `SetCartCustomLineItemShippingDetails`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`shippingDetails`? | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5600](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5600)

___

### `SetCartCustomLineItemTaxAmount`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`externalTaxAmount`? | [*Maybe*](#maybe)<[*ExternalTaxAmountDraft*](#externaltaxamountdraft)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5605](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5605)

___

### `SetCartCustomLineItemTaxRate`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`externalTaxRate`? | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5610](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5610)

___

### `SetCartCustomShippingMethod`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalTaxRate`? | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`shippingMethodName` | [*Scalars*](#scalars)[*String*] |
`shippingRate` | [*ShippingRateDraft*](#shippingratedraft) |
`taxCategory`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5615](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5615)

___

### `SetCartCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5622](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5622)

___

### `SetCartCustomerEmail`

#### Type declaration:

Name | Type |
:------ | :------ |
`email`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5569](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5569)

___

### `SetCartCustomerGroup`

#### Type declaration:

Name | Type |
:------ | :------ |
`customerGroup`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5573](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5573)

___

### `SetCartCustomerId`

#### Type declaration:

Name | Type |
:------ | :------ |
`customerId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5577](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5577)

___

### `SetCartDeleteDaysAfterLastModification`

#### Type declaration:

Name | Type |
:------ | :------ |
`deleteDaysAfterLastModification`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5629](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5629)

___

### `SetCartDiscountCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5633](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5633)

___

### `SetCartDiscountCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5638](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5638)

___

### `SetCartDiscountDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5645](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5645)

___

### `SetCartDiscountKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5649](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5649)

___

### `SetCartDiscountValidFrom`

#### Type declaration:

Name | Type |
:------ | :------ |
`validFrom`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5653](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5653)

___

### `SetCartDiscountValidFromAndUntil`

#### Type declaration:

Name | Type |
:------ | :------ |
`validFrom`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5657](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5657)

___

### `SetCartDiscountValidUntil`

#### Type declaration:

Name | Type |
:------ | :------ |
`validUntil`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5662](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5662)

___

### `SetCartLineItemCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5666](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5666)

___

### `SetCartLineItemCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5672](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5672)

___

### `SetCartLineItemPrice`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalPrice`? | [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5680](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5680)

___

### `SetCartLineItemShippingDetails`

#### Type declaration:

Name | Type |
:------ | :------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`shippingDetails`? | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5685](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5685)

___

### `SetCartLineItemTaxAmount`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalTaxAmount`? | [*Maybe*](#maybe)<[*ExternalTaxAmountDraft*](#externaltaxamountdraft)\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5690](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5690)

___

### `SetCartLineItemTaxRate`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalTaxRate`? | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5695](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5695)

___

### `SetCartLineItemTotalPrice`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalTotalPrice`? | [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5700](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5700)

___

### `SetCartLocale`

#### Type declaration:

Name | Type |
:------ | :------ |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5705](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5705)

___

### `SetCartShippingAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`address`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5709](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5709)

___

### `SetCartShippingMethod`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalTaxRate`? | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`shippingMethod`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5713](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5713)

___

### `SetCartShippingMethodTaxAmount`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalTaxAmount`? | [*Maybe*](#maybe)<[*ExternalTaxAmountDraft*](#externaltaxamountdraft)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5718](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5718)

___

### `SetCartShippingMethodTaxRate`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalTaxRate`? | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5722](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5722)

___

### `SetCartShippingRateInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`shippingRateInput`? | [*Maybe*](#maybe)<[*ShippingRateInputDraft*](#shippingrateinputdraft)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5726](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5726)

___

### `SetCartTotalTax`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalTaxPortions`? | [*Maybe*](#maybe)<[*TaxPortionDraft*](#taxportiondraft)[]\> |
`externalTotalGross`? | [*Maybe*](#maybe)<[*MoneyInput*](#moneyinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5730](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5730)

___

### `SetCategoryAssetCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5735](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5735)

___

### `SetCategoryAssetCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5742](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5742)

___

### `SetCategoryAssetDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5751](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5751)

___

### `SetCategoryAssetKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId` | [*Scalars*](#scalars)[*String*] |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5757](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5757)

___

### `SetCategoryAssetSources`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sources`? | [*Maybe*](#maybe)<[*AssetSourceInput*](#assetsourceinput)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5762](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5762)

___

### `SetCategoryAssetTags`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`tags`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5768](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5768)

___

### `SetCategoryCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5774](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5774)

___

### `SetCategoryCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5779](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5779)

___

### `SetCategoryDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5786](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5786)

___

### `SetCategoryExternalId`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5790](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5790)

___

### `SetCategoryKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5794](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5794)

___

### `SetCategoryMetaDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`metaDescription`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5798](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5798)

___

### `SetCategoryMetaKeywords`

#### Type declaration:

Name | Type |
:------ | :------ |
`metaKeywords`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5802](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5802)

___

### `SetCategoryMetaTitle`

#### Type declaration:

Name | Type |
:------ | :------ |
`metaTitle`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5806](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5806)

___

### `SetCustomerCompanyName`

#### Type declaration:

Name | Type |
:------ | :------ |
`companyName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5810](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5810)

___

### `SetCustomerCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5814](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5814)

___

### `SetCustomerCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5819](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5819)

___

### `SetCustomerDateOfBirth`

#### Type declaration:

Name | Type |
:------ | :------ |
`dateOfBirth`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5826](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5826)

___

### `SetCustomerDefaultBillingAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`addressId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5830](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5830)

___

### `SetCustomerDefaultShippingAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`addressId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5834](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5834)

___

### `SetCustomerExternalId`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5838](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5838)

___

### `SetCustomerFirstName`

#### Type declaration:

Name | Type |
:------ | :------ |
`firstName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5842](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5842)

___

### `SetCustomerGroup`

#### Type declaration:

Name | Type |
:------ | :------ |
`customerGroup`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5846](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5846)

___

### `SetCustomerGroupCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5850](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5850)

___

### `SetCustomerGroupCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5855](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5855)

___

### `SetCustomerGroupKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5862](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5862)

___

### `SetCustomerKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5866](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5866)

___

### `SetCustomerLastName`

#### Type declaration:

Name | Type |
:------ | :------ |
`lastName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5870](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5870)

___

### `SetCustomerLocale`

#### Type declaration:

Name | Type |
:------ | :------ |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5874](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5874)

___

### `SetCustomerMiddleName`

#### Type declaration:

Name | Type |
:------ | :------ |
`middleName`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5878](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5878)

___

### `SetCustomerNumber`

#### Type declaration:

Name | Type |
:------ | :------ |
`customerNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5882](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5882)

___

### `SetCustomerSalutation`

#### Type declaration:

Name | Type |
:------ | :------ |
`salutation`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5886](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5886)

___

### `SetCustomerStores`

#### Type declaration:

Name | Type |
:------ | :------ |
`stores` | [*ResourceIdentifierInput*](#resourceidentifierinput)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5890](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5890)

___

### `SetCustomerTitle`

#### Type declaration:

Name | Type |
:------ | :------ |
`title`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5894](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5894)

___

### `SetCustomerVatId`

#### Type declaration:

Name | Type |
:------ | :------ |
`vatId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5898](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5898)

___

### `SetDiscountCodeCartPredicate`

#### Type declaration:

Name | Type |
:------ | :------ |
`cartPredicate`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5902](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5902)

___

### `SetDiscountCodeCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5906](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5906)

___

### `SetDiscountCodeCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5911](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5911)

___

### `SetDiscountCodeDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5918](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5918)

___

### `SetDiscountCodeMaxApplications`

#### Type declaration:

Name | Type |
:------ | :------ |
`maxApplications`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5922](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5922)

___

### `SetDiscountCodeMaxApplicationsPerCustomer`

#### Type declaration:

Name | Type |
:------ | :------ |
`maxApplicationsPerCustomer`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5926](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5926)

___

### `SetDiscountCodeName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5930](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5930)

___

### `SetDiscountCodeValidFrom`

#### Type declaration:

Name | Type |
:------ | :------ |
`validFrom`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5934](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5934)

___

### `SetDiscountCodeValidFromAndUntil`

#### Type declaration:

Name | Type |
:------ | :------ |
`validFrom`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5938](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5938)

___

### `SetDiscountCodeValidUntil`

#### Type declaration:

Name | Type |
:------ | :------ |
`validUntil`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5943](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5943)

___

### `SetInputTip`

#### Type declaration:

Name | Type |
:------ | :------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`inputTip`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5947](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5947)

___

### `SetInventoryEntryCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5952](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5952)

___

### `SetInventoryEntryCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5957](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5957)

___

### `SetInventoryEntryExpectedDelivery`

#### Type declaration:

Name | Type |
:------ | :------ |
`expectedDelivery`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5964](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5964)

___

### `SetInventoryEntryRestockableInDays`

#### Type declaration:

Name | Type |
:------ | :------ |
`restockableInDays`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5968](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5968)

___

### `SetInventoryEntrySupplyChannel`

#### Type declaration:

Name | Type |
:------ | :------ |
`supplyChannel`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5972](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5972)

___

### `SetKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5976](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5976)

___

### `SetMyCartShippingMethod`

#### Type declaration:

Name | Type |
:------ | :------ |
`shippingMethod`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5980](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5980)

___

### `SetOrderBillingAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`address`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5984](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5984)

___

### `SetOrderCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5996](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5996)

___

### `SetOrderCustomLineItemCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6001](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6001)

___

### `SetOrderCustomLineItemCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6007](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6007)

___

### `SetOrderCustomLineItemShippingDetails`

#### Type declaration:

Name | Type |
:------ | :------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`shippingDetails`? | [*Maybe*](#maybe)<[*ItemShippingDetailsDraftType*](#itemshippingdetailsdrafttype)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6015](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6015)

___

### `SetOrderCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6020](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6020)

___

### `SetOrderCustomerEmail`

#### Type declaration:

Name | Type |
:------ | :------ |
`email`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5988](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5988)

___

### `SetOrderCustomerId`

#### Type declaration:

Name | Type |
:------ | :------ |
`customerId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:5992](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L5992)

___

### `SetOrderDeliveryAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`address`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |
`deliveryId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6027](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6027)

___

### `SetOrderDeliveryItems`

#### Type declaration:

Name | Type |
:------ | :------ |
`deliveryId` | [*Scalars*](#scalars)[*String*] |
`items` | [*DeliveryItemDraftType*](#deliveryitemdrafttype)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6032](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6032)

___

### `SetOrderLineItemCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6037](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6037)

___

### `SetOrderLineItemCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6043](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6043)

___

### `SetOrderLineItemShippingDetails`

#### Type declaration:

Name | Type |
:------ | :------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`shippingDetails`? | [*Maybe*](#maybe)<[*ItemShippingDetailsDraftType*](#itemshippingdetailsdrafttype)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6051](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6051)

___

### `SetOrderLocale`

#### Type declaration:

Name | Type |
:------ | :------ |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6056](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6056)

___

### `SetOrderNumber`

#### Type declaration:

Name | Type |
:------ | :------ |
`orderNumber`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6060](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6060)

___

### `SetOrderParcelItems`

#### Type declaration:

Name | Type |
:------ | :------ |
`items` | [*DeliveryItemDraftType*](#deliveryitemdrafttype)[] |
`parcelId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6064](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6064)

___

### `SetOrderParcelMeasurements`

#### Type declaration:

Name | Type |
:------ | :------ |
`measurements`? | [*Maybe*](#maybe)<[*ParcelMeasurementsDraftType*](#parcelmeasurementsdrafttype)\> |
`parcelId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6069](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6069)

___

### `SetOrderParcelTrackingData`

#### Type declaration:

Name | Type |
:------ | :------ |
`parcelId` | [*Scalars*](#scalars)[*String*] |
`trackingData`? | [*Maybe*](#maybe)<[*TrackingDataDraftType*](#trackingdatadrafttype)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6074](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6074)

___

### `SetOrderReturnPaymentState`

#### Type declaration:

Name | Type |
:------ | :------ |
`paymentState` | [*ReturnPaymentState*](../enums/types_graphql.returnpaymentstate.md) |
`returnItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6079](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6079)

___

### `SetOrderReturnShipmentState`

#### Type declaration:

Name | Type |
:------ | :------ |
`returnItemId` | [*Scalars*](#scalars)[*String*] |
`shipmentState` | [*ReturnShipmentState*](../enums/types_graphql.returnshipmentstate.md) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6084](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6084)

___

### `SetOrderShippingAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`address`? | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6089](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6089)

___

### `SetProductAssetCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`name` | [*Scalars*](#scalars)[*String*] |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6093](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6093)

___

### `SetProductAssetCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6104](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6104)

___

### `SetProductAssetDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6117](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6117)

___

### `SetProductAssetKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId` | [*Scalars*](#scalars)[*String*] |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6127](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6127)

___

### `SetProductAssetSources`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sources`? | [*Maybe*](#maybe)<[*AssetSourceInput*](#assetsourceinput)[]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6136](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6136)

___

### `SetProductAssetTags`

#### Type declaration:

Name | Type |
:------ | :------ |
`assetId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`tags`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6146](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6146)

___

### `SetProductAttribute`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6156](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6156)

___

### `SetProductAttributeInAllVariants`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6164](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6164)

___

### `SetProductCategoryOrderHint`

#### Type declaration:

Name | Type |
:------ | :------ |
`categoryId` | [*Scalars*](#scalars)[*String*] |
`orderHint`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6170](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6170)

___

### `SetProductDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6176](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6176)

___

### `SetProductDiscountDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6181](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6181)

___

### `SetProductDiscountKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6192](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6192)

___

### `SetProductDiscountValidFrom`

#### Type declaration:

Name | Type |
:------ | :------ |
`validFrom`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6196](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6196)

___

### `SetProductDiscountValidFromAndUntil`

#### Type declaration:

Name | Type |
:------ | :------ |
`validFrom`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6200](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6200)

___

### `SetProductDiscountValidUntil`

#### Type declaration:

Name | Type |
:------ | :------ |
`validUntil`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6205](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6205)

___

### `SetProductDiscountedPrice`

#### Type declaration:

Name | Type |
:------ | :------ |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`discounted`? | [*Maybe*](#maybe)<[*DiscountedProductPriceValueInput*](#discountedproductpricevalueinput)\> |
`priceId` | [*Scalars*](#scalars)[*String*] |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6185](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6185)

___

### `SetProductImageLabel`

#### Type declaration:

Name | Type |
:------ | :------ |
`imageUrl` | [*Scalars*](#scalars)[*String*] |
`label`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6209](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6209)

___

### `SetProductKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6217](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6217)

___

### `SetProductMetaAttributes`

#### Type declaration:

Name | Type |
:------ | :------ |
`metaDescription`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`metaKeywords`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`metaTitle`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6221](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6221)

___

### `SetProductMetaDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`metaDescription`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6228](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6228)

___

### `SetProductMetaKeywords`

#### Type declaration:

Name | Type |
:------ | :------ |
`metaKeywords`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6233](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6233)

___

### `SetProductMetaTitle`

#### Type declaration:

Name | Type |
:------ | :------ |
`metaTitle`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6238](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6238)

___

### `SetProductPriceCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`name` | [*Scalars*](#scalars)[*String*] |
`priceId` | [*Scalars*](#scalars)[*String*] |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6243](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6243)

___

### `SetProductPriceCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`priceId` | [*Scalars*](#scalars)[*String*] |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6251](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6251)

___

### `SetProductPrices`

#### Type declaration:

Name | Type |
:------ | :------ |
`catalog`? | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`prices` | [*ProductPriceDataInput*](#productpricedatainput)[] |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6261](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6261)

___

### `SetProductSku`

#### Type declaration:

Name | Type |
:------ | :------ |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6269](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6269)

___

### `SetProductTaxCategory`

#### Type declaration:

Name | Type |
:------ | :------ |
`taxCategory`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6275](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6275)

___

### `SetProductVariantKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6279](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6279)

___

### `SetProjectSettingsExternalOAuth`

#### Type declaration:

Name | Type |
:------ | :------ |
`externalOAuth`? | [*Maybe*](#maybe)<[*ExternalOAuthDraft*](#externaloauthdraft)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6286](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6286)

___

### `SetProjectSettingsShippingRateInputType`

#### Type declaration:

Name | Type |
:------ | :------ |
`shippingRateInputType`? | [*Maybe*](#maybe)<[*ShippingRateInputTypeInput*](#shippingrateinputtypeinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6290](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6290)

___

### `SetSearchKeywords`

#### Type declaration:

Name | Type |
:------ | :------ |
`searchKeywords` | [*SearchKeywordInput*](#searchkeywordinput)[] |
`staged`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6294](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6294)

___

### `SetShippingMethodDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6299](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6299)

___

### `SetShippingMethodKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6303](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6303)

___

### `SetShippingMethodPredicate`

#### Type declaration:

Name | Type |
:------ | :------ |
`predicate`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6307](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6307)

___

### `SetShoppingListAnonymousId`

#### Type declaration:

Name | Type |
:------ | :------ |
`anonymousId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6311](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6311)

___

### `SetShoppingListCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6319](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6319)

___

### `SetShoppingListCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6324](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6324)

___

### `SetShoppingListCustomer`

#### Type declaration:

Name | Type |
:------ | :------ |
`customer`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6315](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6315)

___

### `SetShoppingListDeleteDaysAfterLastModification`

#### Type declaration:

Name | Type |
:------ | :------ |
`deleteDaysAfterLastModification`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6331](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6331)

___

### `SetShoppingListDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6335](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6335)

___

### `SetShoppingListKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6339](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6339)

___

### `SetShoppingListLineItemCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`name` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6343](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6343)

___

### `SetShoppingListLineItemCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6349](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6349)

___

### `SetShoppingListSlug`

#### Type declaration:

Name | Type |
:------ | :------ |
`slug`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6357](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6357)

___

### `SetShoppingListTextLineItemCustomField`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |
`textLineItemId` | [*Scalars*](#scalars)[*String*] |
`value`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6361](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6361)

___

### `SetShoppingListTextLineItemCustomType`

#### Type declaration:

Name | Type |
:------ | :------ |
`fields`? | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`textLineItemId` | [*Scalars*](#scalars)[*String*] |
`type`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6367](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6367)

___

### `SetShoppingListTextLineItemDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`textLineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6375](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6375)

___

### `SetStoreLanguages`

#### Type declaration:

Name | Type |
:------ | :------ |
`languages`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6380](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6380)

___

### `SetStoreName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6384](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6384)

___

### `SetTaxCategoryKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6388](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6388)

___

### `SetType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6392](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6392)

___

### `SetZoneDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6398](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6398)

___

### `SetZoneKey`

#### Type declaration:

Name | Type |
:------ | :------ |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6402](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6402)

___

### `ShippingInfo`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ShippingInfo* |
`deliveries` | [*Delivery*](#delivery)[] |
`discountedPrice`? | [*Maybe*](#maybe)<[*DiscountedLineItemPrice*](#discountedlineitemprice)\> |
`price` | [*Money*](#money) |
`shippingMethod`? | [*Maybe*](#maybe)<[*ShippingMethod*](#shippingmethod)\> |
`shippingMethodName` | [*Scalars*](#scalars)[*String*] |
`shippingMethodRef`? | [*Maybe*](#maybe)<[*Reference*](#reference)\> |
`shippingMethodState` | [*ShippingMethodState*](../enums/types_graphql.shippingmethodstate.md) |
`shippingRate` | [*ShippingRate*](#shippingrate) |
`taxCategory`? | [*Maybe*](#maybe)<[*Reference*](#reference)\> |
`taxRate`? | [*Maybe*](#maybe)<[*TaxRate*](#taxrate)\> |
`taxedPrice`? | [*Maybe*](#maybe)<[*TaxedItemPrice*](#taxeditemprice)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6415](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6415)

___

### `ShippingMethod`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6430](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6430)

___

### `ShippingMethodDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`isDefault` | [*Scalars*](#scalars)[*Boolean*] |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*Scalars*](#scalars)[*String*] |
`predicate`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`taxCategory` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`zoneRates`? | [*Maybe*](#maybe)<[*ZoneRateDraft*](#zoneratedraft)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6448](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6448)

___

### `ShippingMethodQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ShippingMethodQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*ShippingMethod*](#shippingmethod)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6458](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6458)

___

### `ShippingMethodUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addShippingRate`? | [*Maybe*](#maybe)<[*AddShippingMethodShippingRate*](#addshippingmethodshippingrate)\> |
`addZone`? | [*Maybe*](#maybe)<[*AddShippingMethodZone*](#addshippingmethodzone)\> |
`changeIsDefault`? | [*Maybe*](#maybe)<[*ChangeShippingMethodIsDefault*](#changeshippingmethodisdefault)\> |
`changeName`? | [*Maybe*](#maybe)<[*ChangeShippingMethodName*](#changeshippingmethodname)\> |
`changeTaxCategory`? | [*Maybe*](#maybe)<[*ChangeShippingMethodTaxCategory*](#changeshippingmethodtaxcategory)\> |
`removeShippingRate`? | [*Maybe*](#maybe)<[*RemoveShippingMethodShippingRate*](#removeshippingmethodshippingrate)\> |
`removeZone`? | [*Maybe*](#maybe)<[*RemoveShippingMethodZone*](#removeshippingmethodzone)\> |
`setDescription`? | [*Maybe*](#maybe)<[*SetShippingMethodDescription*](#setshippingmethoddescription)\> |
`setKey`? | [*Maybe*](#maybe)<[*SetShippingMethodKey*](#setshippingmethodkey)\> |
`setPredicate`? | [*Maybe*](#maybe)<[*SetShippingMethodPredicate*](#setshippingmethodpredicate)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6485](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6485)

___

### `ShippingMethodsByCartInterface`

A field to retrieve available shipping methods for a cart.

#### Type declaration:

Name | Type |
:------ | :------ |
`shippingMethodsByCart` | [*ShippingMethod*](#shippingmethod)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6467](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6467)

___

### `ShippingMethodsByCartInterfaceShippingMethodsByCartArgs`

A field to retrieve available shipping methods for a cart.

#### Type declaration:

Name | Type |
:------ | :------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6472](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6472)

___

### `ShippingRate`

Shipping Rate

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ShippingRate* |
`freeAbove`? | [*Maybe*](#maybe)<[*Money*](#money)\> |
`isMatching`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`price` | [*Money*](#money) |
`tiers` | [*ShippingRatePriceTier*](#shippingratepricetier)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6499](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6499)

___

### `ShippingRateCartClassificationPriceTier`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6507](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6507)

___

### `ShippingRateCartScorePriceTier`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6515](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6515)

___

### `ShippingRateCartValuePriceTier`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6524](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6524)

___

### `ShippingRateDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`freeAbove`? | [*Maybe*](#maybe)<[*MoneyDraft*](#moneydraft)\> |
`price` | [*MoneyDraft*](#moneydraft) |
`tiers`? | [*Maybe*](#maybe)<[*ShippingRatePriceTierDraft*](#shippingratepricetierdraft)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6532](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6532)

___

### `ShippingRateInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6538](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6538)

___

### `ShippingRateInputDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`Classification`? | [*Maybe*](#maybe)<[*ClassificationShippingRateInputDraft*](#classificationshippingrateinputdraft)\> |
`Score`? | [*Maybe*](#maybe)<[*ScoreShippingRateInputDraft*](#scoreshippingrateinputdraft)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6542](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6542)

___

### `ShippingRateInputLocalizedEnumValue`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ShippingRateInputLocalizedEnumValue* |
`key` | [*Scalars*](#scalars)[*String*] |
`label`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`labelAllLocales` | [*LocalizedString*](#localizedstring)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6547](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6547)

___

### `ShippingRateInputLocalizedEnumValueLabelArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6554](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6554)

___

### `ShippingRateInputType`

#### Type declaration:

Name | Type |
:------ | :------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6559](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6559)

___

### `ShippingRateInputTypeInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`CartClassification`? | [*Maybe*](#maybe)<[*CartClassificationInput*](#cartclassificationinput)\> |
`CartScore`? | [*Maybe*](#maybe)<[*CartScoreInput*](#cartscoreinput)\> |
`CartValue`? | [*Maybe*](#maybe)<[*CartValueInput*](#cartvalueinput)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6563](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6563)

___

### `ShippingRatePriceTier`

#### Type declaration:

Name | Type |
:------ | :------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6569](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6569)

___

### `ShippingRatePriceTierCartClassificationDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`price` | [*MoneyDraft*](#moneydraft) |
`value` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6573](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6573)

___

### `ShippingRatePriceTierCartScoreDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`price`? | [*Maybe*](#maybe)<[*MoneyDraft*](#moneydraft)\> |
`priceFunction`? | [*Maybe*](#maybe)<[*PriceFunctionDraft*](#pricefunctiondraft)\> |
`score` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6578](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6578)

___

### `ShippingRatePriceTierCartValueDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`minimumCentAmount` | [*Scalars*](#scalars)[*Int*] |
`price` | [*MoneyDraft*](#moneydraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6584](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6584)

___

### `ShippingRatePriceTierDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`CartClassification`? | [*Maybe*](#maybe)<[*ShippingRatePriceTierCartClassificationDraft*](#shippingratepricetiercartclassificationdraft)\> |
`CartScore`? | [*Maybe*](#maybe)<[*ShippingRatePriceTierCartScoreDraft*](#shippingratepricetiercartscoredraft)\> |
`CartValue`? | [*Maybe*](#maybe)<[*ShippingRatePriceTierCartValueDraft*](#shippingratepricetiercartvaluedraft)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6589](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6589)

___

### `ShippingTarget`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6595](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6595)

___

### `ShippingTargetDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`addressKey` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6600](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6600)

___

### `ShippingTargetDraftType`

#### Type declaration:

Name | Type |
:------ | :------ |
`addressKey` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6605](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6605)

___

### `ShippingTargetInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`dummy`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6610](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6610)

___

### `ShoppingList`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6614](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6614)

___

### `ShoppingListDescriptionArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6643](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6643)

___

### `ShoppingListDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`anonymousId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`customer`? | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`deleteDaysAfterLastModification`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`lineItems`? | [*Maybe*](#maybe)<[*ShoppingListLineItemDraft*](#shoppinglistlineitemdraft)[]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`slug`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`textLineItems`? | [*Maybe*](#maybe)<[*TextLineItemDraft*](#textlineitemdraft)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6653](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6653)

___

### `ShoppingListLineItem`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ShoppingListLineItem* |
`addedAt` | [*Scalars*](#scalars)[*DateTime*] |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> |
`deactivatedAt`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`id` | [*Scalars*](#scalars)[*String*] |
`name`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] |
`productId` | [*Scalars*](#scalars)[*String*] |
`productSlug`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`productType` | [*ProductTypeDefinition*](#producttypedefinition) |
`productTypeRef` | [*Reference*](#reference) |
`quantity` | [*Scalars*](#scalars)[*Int*] |
`variant`? | [*Maybe*](#maybe)<[*ProductVariant*](#productvariant)\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6666](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6666)

___

### `ShoppingListLineItemDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`addedAt`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`productId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sku`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variantId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6693](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6693)

___

### `ShoppingListLineItemNameArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6683](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6683)

___

### `ShoppingListLineItemProductSlugArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6688](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6688)

___

### `ShoppingListNameArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6638](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6638)

___

### `ShoppingListQueryInterface`

Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists.

#### Type declaration:

Name | Type |
:------ | :------ |
`shoppingList`? | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> |
`shoppingLists` | [*ShoppingListQueryResult*](#shoppinglistqueryresult) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6703](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6703)

___

### `ShoppingListQueryInterfaceShoppingListArgs`

Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists.

#### Type declaration:

Name | Type |
:------ | :------ |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6709](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6709)

___

### `ShoppingListQueryInterfaceShoppingListsArgs`

Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists.

#### Type declaration:

Name | Type |
:------ | :------ |
`limit`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6715](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6715)

___

### `ShoppingListQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ShoppingListQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*ShoppingList*](#shoppinglist)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6722](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6722)

___

### `ShoppingListSlugArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6648](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6648)

___

### `ShoppingListUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addLineItem`? | [*Maybe*](#maybe)<[*AddShoppingListLineItem*](#addshoppinglistlineitem)\> |
`addTextLineItem`? | [*Maybe*](#maybe)<[*AddShoppingListTextLineItem*](#addshoppinglisttextlineitem)\> |
`changeLineItemQuantity`? | [*Maybe*](#maybe)<[*ChangeShoppingListLineItemQuantity*](#changeshoppinglistlineitemquantity)\> |
`changeLineItemsOrder`? | [*Maybe*](#maybe)<[*ChangeShoppingListLineItemsOrder*](#changeshoppinglistlineitemsorder)\> |
`changeName`? | [*Maybe*](#maybe)<[*ChangeShoppingListName*](#changeshoppinglistname)\> |
`changeTextLineItemName`? | [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemName*](#changeshoppinglisttextlineitemname)\> |
`changeTextLineItemQuantity`? | [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemQuantity*](#changeshoppinglisttextlineitemquantity)\> |
`changeTextLineItemsOrder`? | [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemsOrder*](#changeshoppinglisttextlineitemsorder)\> |
`removeLineItem`? | [*Maybe*](#maybe)<[*RemoveShoppingListLineItem*](#removeshoppinglistlineitem)\> |
`removeTextLineItem`? | [*Maybe*](#maybe)<[*RemoveShoppingListTextLineItem*](#removeshoppinglisttextlineitem)\> |
`setAnonymousId`? | [*Maybe*](#maybe)<[*SetShoppingListAnonymousId*](#setshoppinglistanonymousid)\> |
`setCustomField`? | [*Maybe*](#maybe)<[*SetShoppingListCustomField*](#setshoppinglistcustomfield)\> |
`setCustomType`? | [*Maybe*](#maybe)<[*SetShoppingListCustomType*](#setshoppinglistcustomtype)\> |
`setCustomer`? | [*Maybe*](#maybe)<[*SetShoppingListCustomer*](#setshoppinglistcustomer)\> |
`setDeleteDaysAfterLastModification`? | [*Maybe*](#maybe)<[*SetShoppingListDeleteDaysAfterLastModification*](#setshoppinglistdeletedaysafterlastmodification)\> |
`setDescription`? | [*Maybe*](#maybe)<[*SetShoppingListDescription*](#setshoppinglistdescription)\> |
`setKey`? | [*Maybe*](#maybe)<[*SetShoppingListKey*](#setshoppinglistkey)\> |
`setLineItemCustomField`? | [*Maybe*](#maybe)<[*SetShoppingListLineItemCustomField*](#setshoppinglistlineitemcustomfield)\> |
`setLineItemCustomType`? | [*Maybe*](#maybe)<[*SetShoppingListLineItemCustomType*](#setshoppinglistlineitemcustomtype)\> |
`setSlug`? | [*Maybe*](#maybe)<[*SetShoppingListSlug*](#setshoppinglistslug)\> |
`setTextLineItemCustomField`? | [*Maybe*](#maybe)<[*SetShoppingListTextLineItemCustomField*](#setshoppinglisttextlineitemcustomfield)\> |
`setTextLineItemCustomType`? | [*Maybe*](#maybe)<[*SetShoppingListTextLineItemCustomType*](#setshoppinglisttextlineitemcustomtype)\> |
`setTextLineItemDescription`? | [*Maybe*](#maybe)<[*SetShoppingListTextLineItemDescription*](#setshoppinglisttextlineitemdescription)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6730](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6730)

___

### `SimpleAttributeTypeDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`dummy`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6758](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6758)

___

### `State`

[State](http://dev.commercetools.com/http-api-projects-states.html)

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6771](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6771)

___

### `StateDescriptionArgs`

[State](http://dev.commercetools.com/http-api-projects-states.html)

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6799](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6799)

___

### `StateNameArgs`

[State](http://dev.commercetools.com/http-api-projects-states.html)

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6793](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6793)

___

### `StateQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *StateQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*State*](#state)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6804](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6804)

___

### `Store`

[BETA] Stores allow defining different contexts for a project.

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6826](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6826)

___

### `StoreNameArgs`

[BETA] Stores allow defining different contexts for a project.

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6841](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6841)

___

### `StoreQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *StoreQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Store*](#store)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6846](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6846)

___

### `StoreUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`setLanguages`? | [*Maybe*](#maybe)<[*SetStoreLanguages*](#setstorelanguages)\> |
`setName`? | [*Maybe*](#maybe)<[*SetStoreName*](#setstorename)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6854](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6854)

___

### `StringAttribute`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6859](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6859)

___

### `StringField`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6865](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6865)

___

### `StringType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6871](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6871)

___

### `SubRate`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *SubRate* |
`amount` | [*Scalars*](#scalars)[*Float*] |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6876](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6876)

___

### `SubRateDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`amount` | [*Scalars*](#scalars)[*Float*] |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6882](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6882)

___

### `SyncInfo`

Stores information about order synchronization activities (like export or import).

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *SyncInfo* |
`channel`? | [*Maybe*](#maybe)<[*Channel*](#channel)\> |
`channelRef` | [*Reference*](#reference) |
`externalId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`syncedAt` | [*Scalars*](#scalars)[*DateTime*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6890](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6890)

___

### `TaxCategory`

Tax Categories define how products are to be taxed in different countries.

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6910](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6910)

___

### `TaxCategoryAddTaxRate`

#### Type declaration:

Name | Type |
:------ | :------ |
`taxRate` | [*TaxRateDraft*](#taxratedraft) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6924](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6924)

___

### `TaxCategoryChangeName`

#### Type declaration:

Name | Type |
:------ | :------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6928](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6928)

___

### `TaxCategoryDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*Scalars*](#scalars)[*String*] |
`rates`? | [*Maybe*](#maybe)<[*TaxRateDraft*](#taxratedraft)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6932](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6932)

___

### `TaxCategoryQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *TaxCategoryQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*TaxCategory*](#taxcategory)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6939](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6939)

___

### `TaxCategoryRemoveTaxRate`

#### Type declaration:

Name | Type |
:------ | :------ |
`taxRateId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6947](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6947)

___

### `TaxCategoryReplaceTaxRate`

#### Type declaration:

Name | Type |
:------ | :------ |
`taxRate` | [*TaxRateDraft*](#taxratedraft) |
`taxRateId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6951](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6951)

___

### `TaxCategorySetDescription`

#### Type declaration:

Name | Type |
:------ | :------ |
`description`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6956](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6956)

___

### `TaxCategoryUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addTaxRate`? | [*Maybe*](#maybe)<[*TaxCategoryAddTaxRate*](#taxcategoryaddtaxrate)\> |
`changeName`? | [*Maybe*](#maybe)<[*TaxCategoryChangeName*](#taxcategorychangename)\> |
`removeTaxRate`? | [*Maybe*](#maybe)<[*TaxCategoryRemoveTaxRate*](#taxcategoryremovetaxrate)\> |
`replaceTaxRate`? | [*Maybe*](#maybe)<[*TaxCategoryReplaceTaxRate*](#taxcategoryreplacetaxrate)\> |
`setDescription`? | [*Maybe*](#maybe)<[*TaxCategorySetDescription*](#taxcategorysetdescription)\> |
`setKey`? | [*Maybe*](#maybe)<[*SetTaxCategoryKey*](#settaxcategorykey)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6960](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6960)

___

### `TaxPortion`

Represents the portions that sum up to the totalGross field of a TaxedPrice. The portions are calculated
from the TaxRates. If a tax rate has SubRates, they are used and can be identified by name. Tax portions
from line items that have the same rate and name will be accumulated to the same tax portion.

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *TaxPortion* |
`amount` | [*Money*](#money) |
`name`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`rate` | [*Scalars*](#scalars)[*Float*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7006](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7006)

___

### `TaxPortionDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`amount` | [*MoneyInput*](#moneyinput) |
`name`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`rate` | [*Scalars*](#scalars)[*Float*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7013](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7013)

___

### `TaxRate`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *TaxRate* |
`amount` | [*Scalars*](#scalars)[*Float*] |
`country` | [*Scalars*](#scalars)[*Country*] |
`id`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`includedInPrice` | [*Scalars*](#scalars)[*Boolean*] |
`name` | [*Scalars*](#scalars)[*String*] |
`state`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`subRates` | [*SubRate*](#subrate)[] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7019](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7019)

___

### `TaxRateDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`amount`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Float*]\> |
`country` | [*Scalars*](#scalars)[*Country*] |
`includedInPrice` | [*Scalars*](#scalars)[*Boolean*] |
`name` | [*Scalars*](#scalars)[*String*] |
`state`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`subRates`? | [*Maybe*](#maybe)<[*SubRateDraft*](#subratedraft)[]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7030](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7030)

___

### `TaxedItemPrice`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *TaxedItemPrice* |
`totalGross` | [*Money*](#money) |
`totalNet` | [*Money*](#money) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6969](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6969)

___

### `TaxedPrice`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *TaxedPrice* |
`taxPortions` | [*TaxPortion*](#taxportion)[] |
`totalGross` | [*Money*](#money) |
`totalNet` | [*Money*](#money) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:6975](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L6975)

___

### `TextAttributeDefinitionType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7039](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7039)

___

### `TextLineItem`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *TextLineItem* |
`addedAt` | [*Scalars*](#scalars)[*DateTime*] |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> |
`description`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`descriptionAllLocales`? | [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> |
`id` | [*Scalars*](#scalars)[*String*] |
`name`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] |
`quantity` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7050](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7050)

___

### `TextLineItemDescriptionArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7067](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7067)

___

### `TextLineItemDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`addedAt`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`custom`? | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`description`? | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`quantity`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7072](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7072)

___

### `TextLineItemNameArgs`

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7062](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7062)

___

### `TimeAttribute`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7080](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7080)

___

### `TimeAttributeDefinitionType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7086](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7086)

___

### `TimeField`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7091](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7091)

___

### `TimeType`

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7097](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7097)

___

### `TrackingData`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *TrackingData* |
`carrier`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`isReturn` | [*Scalars*](#scalars)[*Boolean*] |
`provider`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`providerTransaction`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`trackingId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7102](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7102)

___

### `TrackingDataDraftType`

#### Type declaration:

Name | Type |
:------ | :------ |
`carrier`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`isReturn`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`provider`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`providerTransaction`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`trackingId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7111](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7111)

___

### `Transaction`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *Transaction* |
`amount` | [*Money*](#money) |
`id` | [*Scalars*](#scalars)[*String*] |
`interactionId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`state` | [*TransactionState*](../enums/types_graphql.transactionstate.md) |
`timestamp`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`type`? | [*Maybe*](#maybe)<[*TransactionType*](../enums/types_graphql.transactiontype.md)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7119](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7119)

___

### `TransitionOrderCustomLineItemState`

#### Type declaration:

Name | Type |
:------ | :------ |
`actualTransitionDate`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`fromState` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`quantity` | [*Scalars*](#scalars)[*Long*] |
`toState` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7144](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7144)

___

### `TransitionOrderLineItemState`

#### Type declaration:

Name | Type |
:------ | :------ |
`actualTransitionDate`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`fromState` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |
`toState` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7152](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7152)

___

### `TransitionOrderState`

#### Type declaration:

Name | Type |
:------ | :------ |
`force`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`state` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7160](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7160)

___

### `TransitionProductState`

#### Type declaration:

Name | Type |
:------ | :------ |
`force`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`state` | [*ReferenceInput*](#referenceinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7165](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7165)

___

### `Type`

#### Type declaration:

Name | Type |
:------ | :------ |
`type`? | [*Maybe*](#maybe)<[*TypeDefinition*](#typedefinition)\> |
`typeRef` | [*Reference*](#reference) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7170](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7170)

___

### `TypeDefinition`

Types define the structure of custom fields which can be attached to different entities throughout the platform.

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7176](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7176)

___

### `TypeDefinitionDescriptionArgs`

Types define the structure of custom fields which can be attached to different entities throughout the platform.

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7200](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7200)

___

### `TypeDefinitionFieldDefinitionsArgs`

Types define the structure of custom fields which can be attached to different entities throughout the platform.

#### Type declaration:

Name | Type |
:------ | :------ |
`excludeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7206](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7206)

___

### `TypeDefinitionNameArgs`

Types define the structure of custom fields which can be attached to different entities throughout the platform.

#### Type declaration:

Name | Type |
:------ | :------ |
`acceptLanguage`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7194](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7194)

___

### `TypeDefinitionQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *TypeDefinitionQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*TypeDefinition*](#typedefinition)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7211](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7211)

___

### `UnpublishProduct`

#### Type declaration:

Name | Type |
:------ | :------ |
`dummy`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7219](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7219)

___

### `UpdateCartItemShippingAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`address` | [*AddressInput*](#addressinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7223](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7223)

___

### `UpdateOrderItemShippingAddress`

#### Type declaration:

Name | Type |
:------ | :------ |
`address` | [*AddressInput*](#addressinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7227](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7227)

___

### `UpdateOrderSyncInfo`

#### Type declaration:

Name | Type |
:------ | :------ |
`channel` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`externalId`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`syncedAt`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7231](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7231)

___

### `Versioned`

Versioned object have an ID and version and modification. Every update of this object changes it's version.

#### Type declaration:

Name | Type |
:------ | :------ |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] |
`createdBy`? | [*Maybe*](#maybe)<[*Initiator*](#initiator)\> |
`id` | [*Scalars*](#scalars)[*String*] |
`lastModifiedAt` | [*Scalars*](#scalars)[*DateTime*] |
`lastModifiedBy`? | [*Maybe*](#maybe)<[*Initiator*](#initiator)\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7238](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7238)

___

### `WhitespaceSuggestTokenizerInput`

#### Type declaration:

Name | Type |
:------ | :------ |
`dummy`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7247](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7247)

___

### `Zone`

Zones allow defining ShippingRates for specific Locations.

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7252](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7252)

___

### `ZoneLocation`

#### Type declaration:

Name | Type |
:------ | :------ |
`country` | [*Scalars*](#scalars)[*Country*] |
`state`? | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7266](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7266)

___

### `ZoneQueryResult`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ZoneQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Zone*](#zone)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7271](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7271)

___

### `ZoneRate`

#### Type declaration:

Name | Type |
:------ | :------ |
`__typename`? | *ZoneRate* |
`shippingRates` | [*ShippingRate*](#shippingrate)[] |
`zone`? | [*Maybe*](#maybe)<[*Zone*](#zone)\> |
`zoneRef`? | [*Maybe*](#maybe)<[*Reference*](#reference)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7279](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7279)

___

### `ZoneRateDraft`

#### Type declaration:

Name | Type |
:------ | :------ |
`shippingRates`? | [*Maybe*](#maybe)<[*ShippingRateDraft*](#shippingratedraft)[]\> |
`zone` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7286](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7286)

___

### `ZoneUpdateAction`

#### Type declaration:

Name | Type |
:------ | :------ |
`addLocation`? | [*Maybe*](#maybe)<[*AddZoneLocation*](#addzonelocation)\> |
`changeName`? | [*Maybe*](#maybe)<[*ChangeZoneName*](#changezonename)\> |
`removeLocation`? | [*Maybe*](#maybe)<[*RemoveZoneLocation*](#removezonelocation)\> |
`setDescription`? | [*Maybe*](#maybe)<[*SetZoneDescription*](#setzonedescription)\> |
`setKey`? | [*Maybe*](#maybe)<[*SetZoneKey*](#setzonekey)\> |

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:7291](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L7291)

<a name="interfacesapi_getcategorycategorydatamd"></a>

### `CategoryData`

* **CategoryData**

### `categories`

Defined in: [packages/commercetools/api-client/src/api/getCategory/index.ts:9](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/getCategory/index.ts#L9)

<a name="interfacesapi_getmegetmeparamsmd"></a>

### `GetMeParams`

* **GetMeParams**

### `customer`

Defined in: [packages/commercetools/api-client/src/api/getMe/index.ts:7](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/getMe/index.ts#L7)

<a name="interfacesapi_getmeordersdatamd"></a>

### `OrdersData`

* **OrdersData**

### `me`

Defined in: [packages/commercetools/api-client/src/api/getMe/index.ts:12](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/getMe/index.ts#L12)

<a name="interfacesapi_getproductproductdatamd"></a>

### `ProductData`

* **ProductData**

### `products`

Defined in: [packages/commercetools/api-client/src/api/getProduct/index.ts:9](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/getProduct/index.ts#L9)

<a name="interfacesapi_getshippingmethodsshippingmethoddatamd"></a>

### `ShippingMethodData`

* **ShippingMethodData**

### `shippingMethods`

Defined in: [packages/commercetools/api-client/src/api/getShippingMethods/index.ts:8](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/getShippingMethods/index.ts#L8)

<a name="interfacesapi_updatecartupdatecartparamsmd"></a>

### `UpdateCartParams`

* **UpdateCartParams**

### `actions`

Defined in: [packages/commercetools/api-client/src/api/updateCart/index.ts:11](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/updateCart/index.ts#L11)

___

### `id`

Defined in: [packages/commercetools/api-client/src/api/updateCart/index.ts:9](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/updateCart/index.ts#L9)

___

### `version`

Defined in: [packages/commercetools/api-client/src/api/updateCart/index.ts:10](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/updateCart/index.ts#L10)

___

### `versionFallback`

Defined in: [packages/commercetools/api-client/src/api/updateCart/index.ts:12](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/api/updateCart/index.ts#L12)

<a name="interfacestypes_apibasesearchmd"></a>

### `BaseSearch`

* **BaseSearch**

  ↳ [*ProductWhereSearch*](#interfacestypes_apiproductwheresearchmd)

  ↳ [*CategoryWhereSearch*](#interfacestypes_apicategorywheresearchmd)

  ↳ [*OrderWhereSearch*](#interfacestypes_apiorderwheresearchmd)

### `limit`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:29](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L29)

___

### `offset`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:30](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L30)

___

### `sort`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:31](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L31)

<a name="interfacestypes_apicartdatamd"></a>

### `CartData`

* *Omit*<[*CartDraft*](#cartdraft), *currency*\>

  ↳ **CartData**

### `anonymousId`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:827](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L827)

___

### `billingAddress`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:816](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L816)

___

### `country`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:811](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L811)

___

### `currency`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:83](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L83)

___

### `custom`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:813](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L813)

___

### `customLineItems`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:824](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L824)

___

### `customerEmail`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:814](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L814)

___

### `customerGroup`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:830](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L830)

___

### `customerId`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:825](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L825)

___

### `deleteDaysAfterLastModification`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:820](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L820)

___

### `discountCodes`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:822](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L822)

___

### `externalTaxRateForShippingMethod`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:826](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L826)

___

### `inventoryMode`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:812](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L812)

___

### `itemShippingAddresses`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:821](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L821)

___

### `lineItems`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:823](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L823)

___

### `locale`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:819](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L819)

___

### `origin`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:832](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L832)

___

### `shippingAddress`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:815](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L815)

___

### `shippingMethod`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:817](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L817)

___

### `shippingRateInput`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:831](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L831)

___

### `store`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:833](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L833)

___

### `taxCalculationMode`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:829](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L829)

___

### `taxMode`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:818](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L818)

___

### `taxRoundingMode`

Inherited from: void

Defined in: [packages/commercetools/api-client/src/types/GraphQL.ts:828](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/GraphQL.ts#L828)

<a name="interfacestypes_apicategorywheresearchmd"></a>

### `CategoryWhereSearch`

* [*BaseSearch*](#interfacestypes_apibasesearchmd)

  ↳ **CategoryWhereSearch**

### `catId`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:68](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L68)

___

### `limit`

Inherited from: [BaseSearch](#interfacestypes_apibasesearchmd).[limit](#limit)

Defined in: [packages/commercetools/api-client/src/types/Api.ts:29](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L29)

___

### `offset`

Inherited from: [BaseSearch](#interfacestypes_apibasesearchmd).[offset](#offset)

Defined in: [packages/commercetools/api-client/src/types/Api.ts:30](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L30)

___

### `slug`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:69](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L69)

___

### `sort`

Inherited from: [BaseSearch](#interfacestypes_apibasesearchmd).[sort](#sort)

Defined in: [packages/commercetools/api-client/src/types/Api.ts:31](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L31)

<a name="interfacestypes_apifiltermd"></a>

### `Filter`

* **Filter**

### `name`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:49](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L49)

___

### `type`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:48](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L48)

___

### `value`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:50](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L50)

<a name="interfacestypes_apifilteroptionmd"></a>

### `FilterOption`

* **FilterOption**

### `label`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:62](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L62)

___

### `selected`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:64](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L64)

___

### `value`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:63](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L63)

<a name="interfacestypes_apiflowoptionsmd"></a>

### `FlowOptions`

* **FlowOptions**

### `currentToken`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:77](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L77)

___

### `customerCredentials`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:78](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L78)

___

### `requireUserSession`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:79](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L79)

<a name="interfacestypes_apiorderwheresearchmd"></a>

### `OrderWhereSearch`

* [*BaseSearch*](#interfacestypes_apibasesearchmd)

  ↳ **OrderWhereSearch**

### `id`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:73](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L73)

___

### `limit`

Inherited from: [BaseSearch](#interfacestypes_apibasesearchmd).[limit](#limit)

Defined in: [packages/commercetools/api-client/src/types/Api.ts:29](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L29)

___

### `offset`

Inherited from: [BaseSearch](#interfacestypes_apibasesearchmd).[offset](#offset)

Defined in: [packages/commercetools/api-client/src/types/Api.ts:30](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L30)

___

### `sort`

Inherited from: [BaseSearch](#interfacestypes_apibasesearchmd).[sort](#sort)

Defined in: [packages/commercetools/api-client/src/types/Api.ts:31](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L31)

<a name="interfacestypes_apiproductwheresearchmd"></a>

### `ProductWhereSearch`

* [*BaseSearch*](#interfacestypes_apibasesearchmd)

  ↳ **ProductWhereSearch**

### `catId`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:54](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L54)

___

### `filters`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:58](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L58)

___

### `id`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:57](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L57)

___

### `limit`

Inherited from: [BaseSearch](#interfacestypes_apibasesearchmd).[limit](#limit)

Defined in: [packages/commercetools/api-client/src/types/Api.ts:29](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L29)

___

### `offset`

Inherited from: [BaseSearch](#interfacestypes_apibasesearchmd).[offset](#offset)

Defined in: [packages/commercetools/api-client/src/types/Api.ts:30](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L30)

___

### `skus`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:55](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L55)

___

### `slug`

Defined in: [packages/commercetools/api-client/src/types/Api.ts:56](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L56)

___

### `sort`

Inherited from: [BaseSearch](#interfacestypes_apibasesearchmd).[sort](#sort)

Defined in: [packages/commercetools/api-client/src/types/Api.ts:31](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/Api.ts#L31)

<a name="interfacestypes_setupapiconfigmd"></a>

### `ApiConfig`

* **ApiConfig**

### `authHost`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:12](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L12)

___

### `clientId`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:14](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L14)

___

### `clientSecret`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:15](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L15)

___

### `projectKey`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:13](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L13)

___

### `scopes`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:16](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L16)

___

### `uri`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:11](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L11)

<a name="interfacestypes_setupauthmd"></a>

### `Auth`

* **Auth**

### `onTokenChange`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:40](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L40)

___

### `onTokenRead`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:41](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L41)

___

### `onTokenRemove`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:42](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L42)

<a name="interfacestypes_setupclientinstancemd"></a>

### `ClientInstance`

* *ApolloClient*<any\>

  ↳ **ClientInstance**

### `cache`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:34

___

### `defaultOptions`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:39

___

### `disableNetworkFetches`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:36

___

### `link`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:32

___

### `queryDeduplication`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:38

___

### `queryManager`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:35

___

### `sdkAuth`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:6](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L6)

___

### `store`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:33

___

### `tokenProvider`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:7](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L7)

___

### `typeDefs`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:40

___

### `version`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:37

### `\_\_actionHookForDevTools`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:56

#### Parameters:

Name | Type |
:------ | :------ |
`cb` | () => *any* |

**Returns:** *void*

___

### `\_\_requestRaw`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:57

#### Parameters:

Name | Type |
:------ | :------ |
`payload` | GraphQLRequest |

**Returns:** *Observable*<ExecutionResult<ExecutionResultDataDefault\>\>

___

### `addResolvers`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:66

#### Parameters:

Name | Type |
:------ | :------ |
`resolvers` | Resolvers \| Resolvers[] |

**Returns:** *void*

___

### `clearStore`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:60

**Returns:** *Promise*<any[]\>

___

### `extract`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:64

#### Parameters:

Name | Type |
:------ | :------ |
`optimistic?` | *boolean* |

**Returns:** *any*

___

### `getResolvers`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:68

**Returns:** Resolvers

___

### `initQueryManager`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:58

**Returns:** *QueryManager*<any\>

___

### `mutate`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:49

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |
`TVariables` | OperationVariables |

#### Parameters:

Name | Type |
:------ | :------ |
`options` | *MutationOptions*<T, TVariables\> |

**Returns:** *Promise*<FetchResult<T, Record<string, any\>, Record<string, any\>\>\>

___

### `onClearStore`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:62

#### Parameters:

Name | Type |
:------ | :------ |
`cb` | () => *Promise*<any\> |

**Returns:** () => *void*

___

### `onResetStore`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:61

#### Parameters:

Name | Type |
:------ | :------ |
`cb` | () => *Promise*<any\> |

**Returns:** () => *void*

___

### `query`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:48

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |
`TVariables` | OperationVariables |

#### Parameters:

Name | Type |
:------ | :------ |
`options` | *QueryOptions*<TVariables\> |

**Returns:** *Promise*<ApolloQueryResult<T\>\>

___

### `reFetchObservableQueries`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:63

#### Parameters:

Name | Type |
:------ | :------ |
`includeStandby?` | *boolean* |

**Returns:** *Promise*<ApolloQueryResult<any\>[]\>

___

### `readFragment`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:52

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |
`TVariables` | OperationVariables |

#### Parameters:

Name | Type |
:------ | :------ |
`options` | *Fragment*<TVariables\> |
`optimistic?` | *boolean* |

**Returns:** T

___

### `readQuery`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:51

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |
`TVariables` | OperationVariables |

#### Parameters:

Name | Type |
:------ | :------ |
`options` | *Query*<TVariables\> |
`optimistic?` | *boolean* |

**Returns:** T

___

### `resetStore`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:59

**Returns:** *Promise*<ApolloQueryResult<any\>[]\>

___

### `restore`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:65

#### Parameters:

Name | Type |
:------ | :------ |
`serializedState` | *any* |

**Returns:** *ApolloCache*<any\>

___

### `setLocalStateFragmentMatcher`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:69

#### Parameters:

Name | Type |
:------ | :------ |
`fragmentMatcher` | FragmentMatcher |

**Returns:** *void*

___

### `setResolvers`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:67

#### Parameters:

Name | Type |
:------ | :------ |
`resolvers` | Resolvers \| Resolvers[] |

**Returns:** *void*

___

### `stop`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:46

**Returns:** *void*

___

### `subscribe`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:50

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |
`TVariables` | OperationVariables |

#### Parameters:

Name | Type |
:------ | :------ |
`options` | *SubscriptionOptions*<TVariables\> |

**Returns:** *Observable*<FetchResult<T, Record<string, any\>, Record<string, any\>\>\>

___

### `watchQuery`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:47

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *any* |
`TVariables` | OperationVariables |

#### Parameters:

Name | Type |
:------ | :------ |
`options` | *WatchQueryOptions*<TVariables\> |

**Returns:** *ObservableQuery*<T, TVariables\>

___

### `writeData`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:55

#### Type parameters:

Name | Default |
:------ | :------ |
`TData` | *any* |

#### Parameters:

Name | Type |
:------ | :------ |
`options` | *WriteDataOptions*<TData\> |

**Returns:** *void*

___

### `writeFragment`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:54

#### Type parameters:

Name | Default |
:------ | :------ |
`TData` | *any* |
`TVariables` | OperationVariables |

#### Parameters:

Name | Type |
:------ | :------ |
`options` | *WriteFragmentOptions*<TData, TVariables\> |

**Returns:** *void*

___

### `writeQuery`

Inherited from: void

Defined in: node_modules/apollo-client/ApolloClient.d.ts:53

#### Type parameters:

Name | Default |
:------ | :------ |
`TData` | *any* |
`TVariables` | OperationVariables |

#### Parameters:

Name | Type |
:------ | :------ |
`options` | *WriteQueryOptions*<TData, TVariables\> |

**Returns:** *void*

<a name="interfacestypes_setupconfigmd"></a>

### `Config`

#### Type parameters

Name | Default |
:------ | :------ |
`T` | *any* |

* **Config**

### `acceptLanguage`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:77](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L77)

___

### `api`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:68](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L68)

___

### `auth`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:79](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L79)

___

### `client`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:67](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L67)

___

### `cookies`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:78](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L78)

___

### `countries`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:73](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L73)

___

### `country`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:72](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L72)

___

### `currencies`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:74](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L74)

___

### `currency`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:70](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L70)

___

### `customOptions`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:69](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L69)

___

### `forceToken`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:80](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L80)

___

### `handleIsTokenUserSession`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:81](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L81)

___

### `languageMap`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:76](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L76)

___

### `locale`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:71](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L71)

___

### `locales`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:75](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L75)

<a name="interfacestypes_setupcookiesconfigmd"></a>

### `CookiesConfig`

* **CookiesConfig**

### `countryCookieName`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:30](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L30)

___

### `currencyCookieName`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:29](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L29)

___

### `localeCookieName`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:31](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L31)

<a name="interfacestypes_setupcustomercredentialsmd"></a>

### `CustomerCredentials`

* **CustomerCredentials**

### `password`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:63](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L63)

___

### `username`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:62](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L62)

<a name="interfacestypes_setuplocaleitemmd"></a>

### `LocaleItem`

* **LocaleItem**

### `label`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:36](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L36)

___

### `name`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:35](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L35)

<a name="interfacestypes_setupsetupconfigmd"></a>

### `SetupConfig`

#### Type parameters

Name |
:------ |
`TCacheShape` |

* **SetupConfig**

### `acceptLanguage`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:55](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L55)

___

### `api`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:46](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L46)

___

### `auth`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:57](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L57)

___

### `cookies`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:56](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L56)

___

### `countries`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:51](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L51)

___

### `country`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:50](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L50)

___

### `currencies`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:52](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L52)

___

### `currency`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:48](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L48)

___

### `customOptions`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:47](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L47)

___

### `forceToken`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:58](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L58)

___

### `languageMap`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:54](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L54)

___

### `locale`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:49](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L49)

___

### `locales`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:53](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L53)

<a name="interfacestypes_setuptokenmd"></a>

### `Token`

* **Token**

### `access\_token`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:20](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L20)

___

### `expires\_at`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:21](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L21)

___

### `expires\_in`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:22](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L22)

___

### `refresh\_token`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:25](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L25)

___

### `scope`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:23](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L23)

___

### `token\_type`

Defined in: [packages/commercetools/api-client/src/types/setup.ts:24](https://github.com/vuestorefront/vue-storefront/blob/b7cb88eea60/packages/commercetools/api-client/src/types/setup.ts#L24)
