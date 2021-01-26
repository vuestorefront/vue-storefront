
<a name="readmemd"></a>

## API Reference - v1.1.0

### Table of contents

#### Modules

- [context](#modulescontextmd)
- [getters](#modulesgettersmd)
- [getters/\_utils](#modulesgetters__utilsmd)
- [getters/cartGetters](#modulesgetters_cartgettersmd)
- [getters/categoryGetters](#modulesgetters_categorygettersmd)
- [getters/checkoutGetters](#modulesgetters_checkoutgettersmd)
- [getters/facetGetters](#modulesgetters_facetgettersmd)
- [getters/orderGetters](#modulesgetters_ordergettersmd)
- [getters/productGetters](#modulesgetters_productgettersmd)
- [getters/reviewGetters](#modulesgetters_reviewgettersmd)
- [getters/userBillingGetters](#modulesgetters_userbillinggettersmd)
- [getters/userGetters](#modulesgetters_usergettersmd)
- [getters/userShippingGetters](#modulesgetters_usershippinggettersmd)
- [getters/wishlistGetters](#modulesgetters_wishlistgettersmd)
- [helpers/internals](#moduleshelpers_internalsmd)
- [helpers/internals/enhanceProduct](#moduleshelpers_internals_enhanceproductmd)
- [helpers/internals/getCouponsFromCart](#moduleshelpers_internals_getcouponsfromcartmd)
- [helpers/internals/getFiltersFromProductsAttributes](#moduleshelpers_internals_getfiltersfromproductsattributesmd)
- [helpers/internals/mapPaginationParams](#moduleshelpers_internals_mappaginationparamsmd)
- [index](#modulesindexmd)
- [types](#modulestypesmd)
- [types/GraphQL](#modulestypes_graphqlmd)
- [useCart](#modulesusecartmd)
- [useCart/currentCart](#modulesusecart_currentcartmd)
- [useCategory](#modulesusecategorymd)
- [useCheckout](#modulesusecheckoutmd)
- [useCheckout/createLoadDetails](#modulesusecheckout_createloaddetailsmd)
- [useCheckout/createLoadPaymentMethods](#modulesusecheckout_createloadpaymentmethodsmd)
- [useCheckout/createLoadShippingMethods](#modulesusecheckout_createloadshippingmethodsmd)
- [useCheckout/createPlaceOrder](#modulesusecheckout_createplaceordermd)
- [useCheckout/createSetBillingDetails](#modulesusecheckout_createsetbillingdetailsmd)
- [useCheckout/createSetPaymentMethod](#modulesusecheckout_createsetpaymentmethodmd)
- [useCheckout/createSetPersonalDetails](#modulesusecheckout_createsetpersonaldetailsmd)
- [useCheckout/createSetShippingDetails](#modulesusecheckout_createsetshippingdetailsmd)
- [useCheckout/createSetShippingMethod](#modulesusecheckout_createsetshippingmethodmd)
- [useCheckout/initFields](#modulesusecheckout_initfieldsmd)
- [useFacet](#modulesusefacetmd)
- [useFacet/\_utils](#modulesusefacet__utilsmd)
- [useProduct](#modulesuseproductmd)
- [useReview](#modulesusereviewmd)
- [useUser](#modulesuseusermd)
- [useUser/authenticate](#modulesuseuser_authenticatemd)
- [useUser/factoryParams](#modulesuseuser_factoryparamsmd)
- [useUserBilling](#modulesuseuserbillingmd)
- [useUserOrders](#modulesuseuserordersmd)
- [useUserShipping](#modulesuseusershippingmd)
- [useWishlist](#modulesusewishlistmd)

## Enums


<a name="enumstypes_graphqlanonymouscartsigninmodemd"></a>

### Enumeration: AnonymousCartSignInMode

[types/GraphQL](#modulestypes_graphqlmd).AnonymousCartSignInMode

#### Enumeration members

##### MergeWithExistingCustomerCart

• **MergeWithExistingCustomerCart**: = "MergeWithExistingCustomerCart"

`LineItem`s of the anonymous cart will be copied to the customer’s active cart that has been modified most recently.

The `CartState` of the anonymous cart gets changed to `Merged` while the
`CartState` of the customer’s cart remains `Active`.

`CustomLineItems` and `CustomFields` of the anonymous cart will not be copied to the customers cart.

If a `LineItem` in the anonymous cart matches an existing line item in the
customer’s cart (same product ID and variant ID), the maximum quantity of both
LineItems is used as the new quantity. In that case `CustomFields` on the
`LineItem` of the anonymous cart will not be in the resulting `LineItem`.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:330](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L330)

___

##### UseAsNewActiveCustomerCart

• **UseAsNewActiveCustomerCart**: = "UseAsNewActiveCustomerCart"

The anonymous cart is used as new active customer cart. No `LineItem`s get merged.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:317](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L317)


<a name="enumstypes_graphqlattributeconstraintmd"></a>

### Enumeration: AttributeConstraint

[types/GraphQL](#modulestypes_graphqlmd).AttributeConstraint

#### Enumeration members

##### CombinationUnique

• **CombinationUnique**: = "CombinationUnique"

A set of attributes, that have this constraint, should have different combinations in each variant

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:459](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L459)

___

##### None

• **None**: = "None"

No constraints are applied to the attribute

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:455](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L455)

___

##### SameForAll

• **SameForAll**: = "SameForAll"

Attribute value should be the same in all variants

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:461](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L461)

___

##### Unique

• **Unique**: = "Unique"

Attribute value should be different in each variant

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:457](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L457)


<a name="enumstypes_graphqlcartoriginmd"></a>

### Enumeration: CartOrigin

[types/GraphQL](#modulestypes_graphqlmd).CartOrigin

#### Enumeration members

##### Customer

• **Customer**: = "Customer"

The cart was created by the customer. This is the default value

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:836](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L836)

___

##### Merchant

• **Merchant**: = "Merchant"

The cart was created by the merchant on behalf of the customer

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:834](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L834)


<a name="enumstypes_graphqlcartstatemd"></a>

### Enumeration: CartState

[types/GraphQL](#modulestypes_graphqlmd).CartState

#### Enumeration members

##### Active

• **Active**: = "Active"

The cart can be updated and ordered. It is the default state.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:881](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L881)

___

##### Merged

• **Merged**: = "Merged"

Anonymous cart whose content was merged into a customers cart on signin. No further operations on the cart are allowed.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:879](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L879)

___

##### Ordered

• **Ordered**: = "Ordered"

The cart was ordered. No further operations on the cart are allowed.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:877](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L877)


<a name="enumstypes_graphqlchannelrolemd"></a>

### Enumeration: ChannelRole

[types/GraphQL](#modulestypes_graphqlmd).ChannelRole

#### Enumeration members

##### InventorySupply

• **InventorySupply**: = "InventorySupply"

Role tells that this channel can be used to track inventory entries.Channels with this role can be treated as warehouses

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1550](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1550)

___

##### OrderExport

• **OrderExport**: = "OrderExport"

Role tells that this channel can be used to track order export activities.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1556](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1556)

___

##### OrderImport

• **OrderImport**: = "OrderImport"

Role tells that this channel can be used to track order import activities.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1558](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1558)

___

##### Primary

• **Primary**: = "Primary"

This role can be combined with some other roles (e.g. with `InventorySupply`)
to represent the fact that this particular channel is the primary/master
channel among the channels of the same type.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1563](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1563)

___

##### ProductDistribution

• **ProductDistribution**: = "ProductDistribution"

Role tells that this channel can be used to expose products to a specific
distribution channel. It can be used by the cart to select a product price.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1554](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1554)


<a name="enumstypes_graphqldiscountcodestatemd"></a>

### Enumeration: DiscountCodeState

[types/GraphQL](#modulestypes_graphqlmd).DiscountCodeState

#### Enumeration members

##### ApplicationStoppedByPreviousDiscount

• **ApplicationStoppedByPreviousDiscount**: = "ApplicationStoppedByPreviousDiscount"

The discount code is active and none of the discounts were applied because the
discount application was stopped by one discount that has the StackingMode of
StopAfterThisDiscount defined

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2235](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2235)

___

##### DoesNotMatchCart

• **DoesNotMatchCart**: = "DoesNotMatchCart"

The discount code is active and it contains at least one active and valid
CartDiscount. But its cart predicate does not match the cart or none of the
contained active discount’s cart predicates match the cart

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2251](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2251)

___

##### MatchesCart

• **MatchesCart**: = "MatchesCart"

The discount code is active and it contains at least one active and valid
CartDiscount. The discount code cartPredicate matches the cart and at least
one of the contained active discount’s cart predicates matches the cart.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2246](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2246)

___

##### MaxApplicationReached

• **MaxApplicationReached**: = "MaxApplicationReached"

maxApplications or maxApplicationsPerCustomer for discountCode has been reached.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2241](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2241)

___

##### NotActive

• **NotActive**: = "NotActive"

The discount code is not active or it does not contain any active cart discounts.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2253](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2253)

___

##### NotValid

• **NotValid**: = "NotValid"

The discount code is not valid or it does not contain any valid cart
discounts. Validity is determined based on the validFrom and validUntil dates

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2239](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2239)


<a name="enumstypes_graphqlinventorymodemd"></a>

### Enumeration: InventoryMode

[types/GraphQL](#modulestypes_graphqlmd).InventoryMode

#### Enumeration members

##### None

• **None**: = "None"

Adding items to cart and ordering is independent of inventory. No inventory checks or modifications.
This is the default mode for a new cart.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2681](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2681)

___

##### ReserveOnOrder

• **ReserveOnOrder**: = "ReserveOnOrder"

Creating an order will fail with an OutOfStock error if an unavailable line item exists. Line items in the cart
are only reserved for the duration of the ordering transaction.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2685](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2685)

___

##### TrackOnly

• **TrackOnly**: = "TrackOnly"

Orders are tracked on inventory. That means, ordering a LineItem will decrement the available quantity on the
respective InventoryEntry. Creating an order will succeed even if the line item’s available quantity is zero or
negative. But creating an order will fail with an OutOfStock error if no matching inventory entry exists for a
line item.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2691](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2691)


<a name="enumstypes_graphqllineitemmodemd"></a>

### Enumeration: LineItemMode

[types/GraphQL](#modulestypes_graphqlmd).LineItemMode

#### Enumeration members

##### GiftLineItem

• **GiftLineItem**: = "GiftLineItem"

The line item was added automatically, because a discount has added a free gift to the cart.
The quantity can not be increased, and it won’t be merged when the same product variant is added.
If the gift is removed, an entry is added to the "refusedGifts" array and the discount won’t be applied again
to the cart. The price can not be changed externally.
All other updates, such as the ones related to custom fields, can be used.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2870](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2870)

___

##### Standard

• **Standard**: = "Standard"

The line item was added during cart creation or with the update action addLineItem. Its quantity can be
changed without restrictions.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2874](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2874)


<a name="enumstypes_graphqllineitempricemodemd"></a>

### Enumeration: LineItemPriceMode

[types/GraphQL](#modulestypes_graphqlmd).LineItemPriceMode

#### Enumeration members

##### ExternalPrice

• **ExternalPrice**: = "ExternalPrice"

The line item price was set externally. Cart discounts can apply to line items
with this price mode. All update actions that change the quantity of a line
item with this price mode require the externalPrice field to be given.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2884](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2884)

___

##### ExternalTotal

• **ExternalTotal**: = "ExternalTotal"

The line item price with the total was set externally.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2886](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2886)

___

##### Platform

• **Platform**: = "Platform"

The price is selected form the product variant. This is the default mode.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2879](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2879)


<a name="enumstypes_graphqlorderstatemd"></a>

### Enumeration: OrderState

[types/GraphQL](#modulestypes_graphqlmd).OrderState

#### Enumeration members

##### Cancelled

• **Cancelled**: = "Cancelled"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4096](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4096)

___

##### Complete

• **Complete**: = "Complete"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4097](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4097)

___

##### Confirmed

• **Confirmed**: = "Confirmed"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4095](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4095)

___

##### Open

• **Open**: = "Open"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4098](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4098)


<a name="enumstypes_graphqlpaymentstatemd"></a>

### Enumeration: PaymentState

[types/GraphQL](#modulestypes_graphqlmd).PaymentState

#### Enumeration members

##### BalanceDue

• **BalanceDue**: = "BalanceDue"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4260](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4260)

___

##### CreditOwed

• **CreditOwed**: = "CreditOwed"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4257](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4257)

___

##### Failed

• **Failed**: = "Failed"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4259](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4259)

___

##### Paid

• **Paid**: = "Paid"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4256](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4256)

___

##### Pending

• **Pending**: = "Pending"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4258](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4258)


<a name="enumstypes_graphqlpublishscopemd"></a>

### Enumeration: PublishScope

[types/GraphQL](#modulestypes_graphqlmd).PublishScope

#### Enumeration members

##### All

• **All**: = "All"

Publishes the complete staged projection

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4871](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4871)

___

##### Prices

• **Prices**: = "Prices"

Publishes only prices on the staged projection

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4873](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4873)


<a name="enumstypes_graphqlreturnpaymentstatemd"></a>

### Enumeration: ReturnPaymentState

[types/GraphQL](#modulestypes_graphqlmd).ReturnPaymentState

#### Enumeration members

##### Initial

• **Initial**: = "Initial"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5483](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5483)

___

##### NonRefundable

• **NonRefundable**: = "NonRefundable"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5484](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5484)

___

##### NotRefunded

• **NotRefunded**: = "NotRefunded"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5481](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5481)

___

##### Refunded

• **Refunded**: = "Refunded"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5482](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5482)


<a name="enumstypes_graphqlreturnshipmentstatemd"></a>

### Enumeration: ReturnShipmentState

[types/GraphQL](#modulestypes_graphqlmd).ReturnShipmentState

#### Enumeration members

##### Advised

• **Advised**: = "Advised"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5491](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5491)

___

##### BackInStock

• **BackInStock**: = "BackInStock"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5489](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5489)

___

##### Returned

• **Returned**: = "Returned"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5490](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5490)

___

##### Unusable

• **Unusable**: = "Unusable"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5488](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5488)


<a name="enumstypes_graphqlroundingmodemd"></a>

### Enumeration: RoundingMode

[types/GraphQL](#modulestypes_graphqlmd).RoundingMode

#### Enumeration members

##### HalfDown

• **HalfDown**: = "HalfDown"

[Round half down](https://en.wikipedia.org/wiki/Rounding#Round_half_down).
Rounding mode used by, e.g., [Avalara Sales TaxII](https://help.avalara.com/kb/001/How_does_Rounding_with_SalesTaxII_work%3F)

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5506](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5506)

___

##### HalfEven

• **HalfEven**: = "HalfEven"

[Round half to even](https://en.wikipedia.org/wiki/Rounding#Round_half_to_even).
Default rounding mode as used in IEEE 754 computing functions and operators.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5512](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5512)

___

##### HalfUp

• **HalfUp**: = "HalfUp"

[Round half up](https://en.wikipedia.org/wiki/Rounding#Round_half_up)

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5508](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5508)


<a name="enumstypes_graphqlselectionmodemd"></a>

### Enumeration: SelectionMode

[types/GraphQL](#modulestypes_graphqlmd).SelectionMode

In order to decide which of the matching items will actually be discounted

#### Enumeration members

##### Cheapest

• **Cheapest**: = "Cheapest"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5544](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5544)

___

##### MostExpensive

• **MostExpensive**: = "MostExpensive"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5543](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5543)


<a name="enumstypes_graphqlshipmentstatemd"></a>

### Enumeration: ShipmentState

[types/GraphQL](#modulestypes_graphqlmd).ShipmentState

#### Enumeration members

##### Backorder

• **Backorder**: = "Backorder"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6404](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6404)

___

##### Delayed

• **Delayed**: = "Delayed"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6403](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6403)

___

##### Partial

• **Partial**: = "Partial"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6405](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6405)

___

##### Pending

• **Pending**: = "Pending"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6406](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6406)

___

##### Ready

• **Ready**: = "Ready"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6407](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6407)

___

##### Shipped

• **Shipped**: = "Shipped"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6408](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6408)


<a name="enumstypes_graphqlshippingmethodstatemd"></a>

### Enumeration: ShippingMethodState

[types/GraphQL](#modulestypes_graphqlmd).ShippingMethodState

#### Enumeration members

##### DoesNotMatchCart

• **DoesNotMatchCart**: = "DoesNotMatchCart"

The ShippingMethod predicate does not match the cart. Ordering this cart will
fail with error ShippingMethodDoesNotMatchCart

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6478](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6478)

___

##### MatchesCart

• **MatchesCart**: = "MatchesCart"

Either there is no predicate defined for the ShippingMethod or the given predicate matches the cart

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6474](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6474)


<a name="enumstypes_graphqlstackingmodemd"></a>

### Enumeration: StackingMode

[types/GraphQL](#modulestypes_graphqlmd).StackingMode

Describes how this discount interacts with other discounts

#### Enumeration members

##### Stacking

• **Stacking**: = "Stacking"

Default. Continue applying other matching discounts after applying this one.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6763](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6763)

___

##### StopAfterThisDiscount

• **StopAfterThisDiscount**: = "StopAfterThisDiscount"

Don’t apply any more matching discounts after this one.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6761](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6761)


<a name="enumstypes_graphqlstaterolemd"></a>

### Enumeration: StateRole

[types/GraphQL](#modulestypes_graphqlmd).StateRole

#### Enumeration members

##### Return

• **Return**: = "Return"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6809](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6809)

___

##### ReviewIncludedInStatistics

• **ReviewIncludedInStatistics**: = "ReviewIncludedInStatistics"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6810](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6810)


<a name="enumstypes_graphqlstatetypemd"></a>

### Enumeration: StateType

[types/GraphQL](#modulestypes_graphqlmd).StateType

#### Enumeration members

##### LineItemState

• **LineItemState**: = "LineItemState"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6818](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6818)

___

##### OrderState

• **OrderState**: = "OrderState"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6814](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6814)

___

##### PaymentState

• **PaymentState**: = "PaymentState"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6817](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6817)

___

##### ProductState

• **ProductState**: = "ProductState"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6815](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6815)

___

##### ReviewState

• **ReviewState**: = "ReviewState"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6816](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6816)


<a name="enumstypes_graphqltaxcalculationmodemd"></a>

### Enumeration: TaxCalculationMode

[types/GraphQL](#modulestypes_graphqlmd).TaxCalculationMode

#### Enumeration members

##### LineItemLevel

• **LineItemLevel**: = "LineItemLevel"

Default. This calculation mode calculates the taxes after the unit price is multiplied with the quantity.
E.g. `($1.08 * 3 = $3.24) * 1.19 = $3.8556 -> $3.86 rounded`

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6902](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6902)

___

##### UnitPriceLevel

• **UnitPriceLevel**: = "UnitPriceLevel"

This calculation mode calculates the taxes on the unit price before multiplying with the quantity.
E.g. `($1.08 * 1.19 = $1.2852 -> $1.29 rounded) * 3 = $3.87`

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6898](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6898)


<a name="enumstypes_graphqltaxmodemd"></a>

### Enumeration: TaxMode

[types/GraphQL](#modulestypes_graphqlmd).TaxMode

#### Enumeration members

##### Disabled

• **Disabled**: = "Disabled"

No taxes are added to the cart.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6980](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6980)

___

##### External

• **External**: = "External"

The tax rates are set externally per ExternalTaxRateDraft. A cart with this tax mode can only be ordered if all
line items, all custom line items and the shipping method have an external tax rate set. The totalNet and
totalGross as well as the taxPortions fields are calculated by the platform according to the taxRoundingMode.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6990](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6990)

___

##### ExternalAmount

• **ExternalAmount**: = "ExternalAmount"

The tax amounts and the tax rates as well as the tax portions are set externally per ExternalTaxAmountDraft.
A cart with this tax mode can only be ordered if the cart itself and all line items, all custom line items and
the shipping method have an external tax amount and rate set

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6985](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6985)

___

##### Platform

• **Platform**: = "Platform"

The tax rates are selected by the platform from the TaxCategories based on the cart shipping address.
The totalNet and totalGross as well as the taxPortions fields are calculated by the platform according to the
taxRoundingMode.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6995](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6995)


<a name="enumstypes_graphqltextinputhintmd"></a>

### Enumeration: TextInputHint

[types/GraphQL](#modulestypes_graphqlmd).TextInputHint

UI hint telling what kind of edit control should be displayed for a text attribute.

#### Enumeration members

##### MultiLine

• **MultiLine**: = "MultiLine"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7042](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7042)

___

##### SingleLine

• **SingleLine**: = "SingleLine"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7043](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7043)


<a name="enumstypes_graphqltransactionstatemd"></a>

### Enumeration: TransactionState

[types/GraphQL](#modulestypes_graphqlmd).TransactionState

#### Enumeration members

##### Failure

• **Failure**: = "Failure"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7126](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7126)

___

##### Initial

• **Initial**: = "Initial"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7129](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7129)

___

##### Pending

• **Pending**: = "Pending"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7128](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7128)

___

##### Success

• **Success**: = "Success"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7127](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7127)


<a name="enumstypes_graphqltransactiontypemd"></a>

### Enumeration: TransactionType

[types/GraphQL](#modulestypes_graphqlmd).TransactionType

#### Enumeration members

##### Authorization

• **Authorization**: = "Authorization"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7137](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7137)

___

##### CancelAuthorization

• **CancelAuthorization**: = "CancelAuthorization"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7136](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7136)

___

##### Charge

• **Charge**: = "Charge"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7135](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7135)

___

##### Chargeback

• **Chargeback**: = "Chargeback"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7133](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7133)

___

##### Refund

• **Refund**: = "Refund"

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7134](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7134)

## Interfaces


<a name="interfacestypesfacetresultsdatamd"></a>

### Interface: FacetResultsData

[types](#modulestypesmd).FacetResultsData

#### Hierarchy

* **FacetResultsData**

#### Properties

##### categories

• **categories**: Category[]

Defined in: [packages/commercetools/composables/src/types/index.ts:24](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L24)

___

##### facets

• **facets**: *Record*<*string*, Filter\>

Defined in: [packages/commercetools/composables/src/types/index.ts:25](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L25)

___

##### itemsPerPage

• **itemsPerPage**: *number*

Defined in: [packages/commercetools/composables/src/types/index.ts:28](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L28)

___

##### perPageOptions

• **perPageOptions**: *number*[]

Defined in: [packages/commercetools/composables/src/types/index.ts:27](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L27)

___

##### products

• **products**: ProductVariant[]

Defined in: [packages/commercetools/composables/src/types/index.ts:23](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L23)

___

##### total

• **total**: *number*

Defined in: [packages/commercetools/composables/src/types/index.ts:26](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L26)


<a name="interfacestypesproductssearchparamsmd"></a>

### Interface: ProductsSearchParams

[types](#modulestypesmd).ProductsSearchParams

#### Hierarchy

* **ProductsSearchParams**

#### Properties

##### catId

• `Optional` **catId**: *string* | *string*[]

Defined in: [packages/commercetools/composables/src/types/index.ts:16](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L16)

___

##### filters

• `Optional` **filters**: *Record*<*string*, Filter\>

Defined in: [packages/commercetools/composables/src/types/index.ts:15](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L15)

___

##### id

• `Optional` **id**: *string*

Defined in: [packages/commercetools/composables/src/types/index.ts:19](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L19)

___

##### page

• `Optional` **page**: *number*

Defined in: [packages/commercetools/composables/src/types/index.ts:12](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L12)

___

##### perPage

• `Optional` **perPage**: *number*

Defined in: [packages/commercetools/composables/src/types/index.ts:11](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L11)

___

##### skus

• `Optional` **skus**: *string*[]

Defined in: [packages/commercetools/composables/src/types/index.ts:17](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L17)

___

##### slug

• `Optional` **slug**: *string*

Defined in: [packages/commercetools/composables/src/types/index.ts:18](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L18)

___

##### sort

• `Optional` **sort**: *any*

Defined in: [packages/commercetools/composables/src/types/index.ts:13](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L13)

___

##### term

• `Optional` **term**: *any*

Defined in: [packages/commercetools/composables/src/types/index.ts:14](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L14)

## Modules


<a name="modulescontextmd"></a>

### Module: context


<a name="modulesgettersmd"></a>

### Module: getters

#### References

##### cartGetters

Renames and exports: [default](#default)

___

##### categoryGetters

Renames and exports: [default](#default)

___

##### checkoutGetters

Renames and exports: [default](#default)

___

##### facetGetters

Renames and exports: [default](#default)

___

##### orderGetters

Renames and exports: [default](#default)

___

##### productGetters

Renames and exports: [default](#default)

___

##### reviewGetters

Renames and exports: [default](#default)

___

##### userBillingGetters

Renames and exports: [default](#default)

___

##### userGetters

Renames and exports: [default](#default)

___

##### userShippingGetters

Renames and exports: [default](#default)

___

##### wishlistGetters

Renames and exports: [default](#default)


<a name="modulesgetters__utilsmd"></a>

### Module: getters/\_utils

#### Functions

##### createPrice

▸ `Const`**createPrice**(`product`: [*ProductVariant*](#productvariant) | [*LineItem*](#lineitem)): AgnosticPrice

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*ProductVariant*](#productvariant) | [*LineItem*](#lineitem) |

**Returns:** AgnosticPrice

Defined in: [packages/commercetools/composables/src/getters/_utils.ts:82](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/_utils.ts#L82)

___

##### formatAttributeList

▸ `Const`**formatAttributeList**(`attributes`: *any*[]): AgnosticAttribute[]

###### Parameters:

Name | Type |
------ | ------ |
`attributes` | *any*[] |

**Returns:** AgnosticAttribute[]

Defined in: [packages/commercetools/composables/src/getters/_utils.ts:33](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/_utils.ts#L33)

___

##### getAttributeValue

▸ `Const`**getAttributeValue**(`attribute`: *any*): *any*

###### Parameters:

Name | Type |
------ | ------ |
`attribute` | *any* |

**Returns:** *any*

Defined in: [packages/commercetools/composables/src/getters/_utils.ts:5](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/_utils.ts#L5)

___

##### getVariantByAttributes

▸ `Const`**getVariantByAttributes**(`products`: [*ProductVariant*](#productvariant)[] | readonly [*ProductVariant*](#productvariant)[], `attributes`: *any*): [*ProductVariant*](#productvariant)

###### Parameters:

Name | Type |
------ | ------ |
`products` | [*ProductVariant*](#productvariant)[] | readonly [*ProductVariant*](#productvariant)[] |
`attributes` | *any* |

**Returns:** [*ProductVariant*](#productvariant)

Defined in: [packages/commercetools/composables/src/getters/_utils.ts:43](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/_utils.ts#L43)


<a name="modulesgetters_cartgettersmd"></a>

### Module: getters/cartGetters

#### Variables

##### default

• `Const` **default**: *CartGetters*<[*Cart*](#cart), [*LineItem*](#lineitem)\>

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:68](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L68)

Defined in: [packages/commercetools/composables/src/getters/index.ts:15](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L15)

Defined in: [packages/commercetools/composables/src/getters/index.ts:15](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L15)

#### Functions

##### getCartItemAttributes

▸ `Const`**getCartItemAttributes**(`product`: [*LineItem*](#lineitem), `filterByAttributeName?`: *string*[]): *Record*<*string*, *string* | AgnosticAttribute\>

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*LineItem*](#lineitem) |
`filterByAttributeName?` | *string*[] |

**Returns:** *Record*<*string*, *string* | AgnosticAttribute\>

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:23](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L23)

___

##### getCartItemImage

▸ `Const`**getCartItemImage**(`product`: [*LineItem*](#lineitem)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*LineItem*](#lineitem) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:17](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L17)

___

##### getCartItemName

▸ `Const`**getCartItemName**(`product`: [*LineItem*](#lineitem)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*LineItem*](#lineitem) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:15](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L15)

___

##### getCartItemPrice

▸ `Const`**getCartItemPrice**(`product`: [*LineItem*](#lineitem)): AgnosticPrice

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*LineItem*](#lineitem) |

**Returns:** AgnosticPrice

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:19](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L19)

___

##### getCartItemQty

▸ `Const`**getCartItemQty**(`product`: [*LineItem*](#lineitem)): *number*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*LineItem*](#lineitem) |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:21](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L21)

___

##### getCartItemSku

▸ `Const`**getCartItemSku**(`product`: [*LineItem*](#lineitem)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*LineItem*](#lineitem) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:26](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L26)

___

##### getCartItems

▸ `Const`**getCartItems**(`cart`: [*Cart*](#cart)): [*LineItem*](#lineitem)[]

###### Parameters:

Name | Type |
------ | ------ |
`cart` | [*Cart*](#cart) |

**Returns:** [*LineItem*](#lineitem)[]

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:7](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L7)

___

##### getCartShippingPrice

▸ `Const`**getCartShippingPrice**(`cart`: [*Cart*](#cart)): *number*

###### Parameters:

Name | Type |
------ | ------ |
`cart` | [*Cart*](#cart) |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:47](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L47)

___

##### getCartTotalItems

▸ `Const`**getCartTotalItems**(`cart`: [*Cart*](#cart)): *number*

###### Parameters:

Name | Type |
------ | ------ |
`cart` | [*Cart*](#cart) |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:49](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L49)

___

##### getCartTotals

▸ `Const`**getCartTotals**(`cart`: [*Cart*](#cart)): AgnosticTotals

###### Parameters:

Name | Type |
------ | ------ |
`cart` | [*Cart*](#cart) |

**Returns:** AgnosticTotals

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:28](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L28)

___

##### getCoupons

▸ `Const`**getCoupons**(`cart`: [*Cart*](#cart)): AgnosticCoupon[]

###### Parameters:

Name | Type |
------ | ------ |
`cart` | [*Cart*](#cart) |

**Returns:** AgnosticCoupon[]

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:59](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L59)

___

##### getDiscounts

▸ `Const`**getDiscounts**(`cart`: [*Cart*](#cart)): AgnosticDiscount[]

###### Parameters:

Name | Type |
------ | ------ |
`cart` | [*Cart*](#cart) |

**Returns:** AgnosticDiscount[]

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:64](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L64)

___

##### getFormattedPrice

▸ `Const`**getFormattedPrice**(`price`: *number*): *string*

###### Parameters:

Name | Type |
------ | ------ |
`price` | *number* |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/cartGetters.ts:57](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/cartGetters.ts#L57)


<a name="modulesgetters_categorygettersmd"></a>

### Module: getters/categoryGetters

#### Variables

##### default

• `Const` **default**: *CategoryGetters*<[*Category*](#category)\>

Defined in: [packages/commercetools/composables/src/getters/categoryGetters.ts:21](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/categoryGetters.ts#L21)

Defined in: [packages/commercetools/composables/src/getters/index.ts:16](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L16)

Defined in: [packages/commercetools/composables/src/getters/index.ts:16](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L16)

#### Functions

##### getCategoryTree

▸ `Const`**getCategoryTree**(`category`: [*Category*](#category)): AgnosticCategoryTree

###### Parameters:

Name | Type |
------ | ------ |
`category` | [*Category*](#category) |

**Returns:** AgnosticCategoryTree

Defined in: [packages/commercetools/composables/src/getters/categoryGetters.ts:4](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/categoryGetters.ts#L4)


<a name="modulesgetters_checkoutgettersmd"></a>

### Module: getters/checkoutGetters

#### Variables

##### default

• `Const` **default**: *CheckoutGetters*<[*ShippingMethod*](#shippingmethod)\>

Defined in: [packages/commercetools/composables/src/getters/checkoutGetters.ts:23](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/checkoutGetters.ts#L23)

Defined in: [packages/commercetools/composables/src/getters/index.ts:17](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L17)

Defined in: [packages/commercetools/composables/src/getters/index.ts:17](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L17)

#### Functions

##### getFormattedPrice

▸ `Const`**getFormattedPrice**(`price`: *number*): *string*

###### Parameters:

Name | Type |
------ | ------ |
`price` | *number* |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/checkoutGetters.ts:21](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/checkoutGetters.ts#L21)

___

##### getShippingMethodDescription

▸ `Const`**getShippingMethodDescription**(`shippingMethod`: [*ShippingMethod*](#shippingmethod)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`shippingMethod` | [*ShippingMethod*](#shippingmethod) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/checkoutGetters.ts:10](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/checkoutGetters.ts#L10)

___

##### getShippingMethodId

▸ `Const`**getShippingMethodId**(`shippingMethod`: [*ShippingMethod*](#shippingmethod)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`shippingMethod` | [*ShippingMethod*](#shippingmethod) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/checkoutGetters.ts:4](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/checkoutGetters.ts#L4)

___

##### getShippingMethodName

▸ `Const`**getShippingMethodName**(`shippingMethod`: [*ShippingMethod*](#shippingmethod)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`shippingMethod` | [*ShippingMethod*](#shippingmethod) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/checkoutGetters.ts:7](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/checkoutGetters.ts#L7)

___

##### getShippingMethodPrice

▸ `Const`**getShippingMethodPrice**(`shippingMethod`: [*ShippingMethod*](#shippingmethod)): *number*

###### Parameters:

Name | Type |
------ | ------ |
`shippingMethod` | [*ShippingMethod*](#shippingmethod) |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/checkoutGetters.ts:13](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/checkoutGetters.ts#L13)


<a name="modulesgetters_facetgettersmd"></a>

### Module: getters/facetGetters

#### Variables

##### default

• `Const` **default**: *FacetsGetters*<[*FacetResultsData*](#interfacestypesfacetresultsdatamd), [*ProductVariant*](#productvariant)[]\>

Defined in: [packages/commercetools/composables/src/getters/facetGetters.ts:70](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/facetGetters.ts#L70)

Defined in: [packages/commercetools/composables/src/getters/index.ts:25](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L25)

Defined in: [packages/commercetools/composables/src/getters/index.ts:25](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L25)


<a name="modulesgetters_ordergettersmd"></a>

### Module: getters/orderGetters

#### Variables

##### default

• `Const` **default**: *UserOrderGetters*<[*Order*](#order), [*LineItem*](#lineitem)\>

Defined in: [packages/commercetools/composables/src/getters/orderGetters.ts:31](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/orderGetters.ts#L31)

Defined in: [packages/commercetools/composables/src/getters/index.ts:23](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L23)

Defined in: [packages/commercetools/composables/src/getters/index.ts:23](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L23)

#### Functions

##### getFormattedPrice

▸ `Const`**getFormattedPrice**(`price`: *number*): *string*

###### Parameters:

Name | Type |
------ | ------ |
`price` | *number* |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/orderGetters.ts:29](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/orderGetters.ts#L29)

___

##### getOrderDate

▸ `Const`**getOrderDate**(`order`: [*Order*](#order)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`order` | [*Order*](#order) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/orderGetters.ts:4](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/orderGetters.ts#L4)

___

##### getOrderId

▸ `Const`**getOrderId**(`order`: [*Order*](#order)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`order` | [*Order*](#order) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/orderGetters.ts:6](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/orderGetters.ts#L6)

___

##### getOrderItemName

▸ `Const`**getOrderItemName**(`item`: [*LineItem*](#lineitem)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`item` | [*LineItem*](#lineitem) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/orderGetters.ts:23](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/orderGetters.ts#L23)

___

##### getOrderItemPrice

▸ `Const`**getOrderItemPrice**(`item`: [*LineItem*](#lineitem)): *number*

###### Parameters:

Name | Type |
------ | ------ |
`item` | [*LineItem*](#lineitem) |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/orderGetters.ts:27](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/orderGetters.ts#L27)

___

##### getOrderItemQty

▸ `Const`**getOrderItemQty**(`item`: [*LineItem*](#lineitem)): *number*

###### Parameters:

Name | Type |
------ | ------ |
`item` | [*LineItem*](#lineitem) |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/orderGetters.ts:25](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/orderGetters.ts#L25)

___

##### getOrderItemSku

▸ `Const`**getOrderItemSku**(`item`: [*LineItem*](#lineitem)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`item` | [*LineItem*](#lineitem) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/orderGetters.ts:21](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/orderGetters.ts#L21)

___

##### getOrderItems

▸ `Const`**getOrderItems**(`order`: [*Order*](#order)): [*LineItem*](#lineitem)[]

###### Parameters:

Name | Type |
------ | ------ |
`order` | [*Order*](#order) |

**Returns:** [*LineItem*](#lineitem)[]

Defined in: [packages/commercetools/composables/src/getters/orderGetters.ts:19](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/orderGetters.ts#L19)

___

##### getOrderPrice

▸ `Const`**getOrderPrice**(`order`: [*Order*](#order)): *number*

###### Parameters:

Name | Type |
------ | ------ |
`order` | [*Order*](#order) |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/orderGetters.ts:17](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/orderGetters.ts#L17)

___

##### getOrderStatus

▸ `Const`**getOrderStatus**(`order`: [*Order*](#order)): ** | Open | Pending | Confirmed | Shipped | Complete | Cancelled | Refunded

###### Parameters:

Name | Type |
------ | ------ |
`order` | [*Order*](#order) |

**Returns:** ** | Open | Pending | Confirmed | Shipped | Complete | Cancelled | Refunded

Defined in: [packages/commercetools/composables/src/getters/orderGetters.ts:15](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/orderGetters.ts#L15)


<a name="modulesgetters_productgettersmd"></a>

### Module: getters/productGetters

#### Variables

##### default

• `Const` **default**: *ProductGetters*<[*ProductVariant*](#productvariant), ProductVariantFilters\>

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:95](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L95)

Defined in: [packages/commercetools/composables/src/getters/index.ts:18](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L18)

Defined in: [packages/commercetools/composables/src/getters/index.ts:18](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L18)

#### Functions

##### getAverageRating

▸ `Const`**getAverageRating**(`product`: [*ProductVariant*](#productvariant)): *number*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*ProductVariant*](#productvariant) |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:93](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L93)

___

##### getFormattedPrice

▸ `Const`**getFormattedPrice**(`price`: *number*): *string*

###### Parameters:

Name | Type |
------ | ------ |
`price` | *number* |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:89](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L89)

___

##### getProductAttributes

▸ `Const`**getProductAttributes**(`products`: [*ProductVariant*](#productvariant) | [*ProductVariant*](#productvariant)[], `filterByAttributeName?`: *string*[]): *Record*<*string*, *string* | AgnosticAttribute\>

###### Parameters:

Name | Type |
------ | ------ |
`products` | [*ProductVariant*](#productvariant) | [*ProductVariant*](#productvariant)[] |
`filterByAttributeName?` | *string*[] |

**Returns:** *Record*<*string*, *string* | AgnosticAttribute\>

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:44](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L44)

___

##### getProductCategoryIds

▸ `Const`**getProductCategoryIds**(`product`: [*ProductVariant*](#productvariant)): *string*[]

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*ProductVariant*](#productvariant) |

**Returns:** *string*[]

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:85](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L85)

___

##### getProductCoverImage

▸ `Const`**getProductCoverImage**(`product`: [*ProductVariant*](#productvariant)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*ProductVariant*](#productvariant) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:26](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L26)

___

##### getProductDescription

▸ `Const`**getProductDescription**(`product`: [*ProductVariant*](#productvariant)): *any*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*ProductVariant*](#productvariant) |

**Returns:** *any*

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:83](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L83)

___

##### getProductFiltered

▸ `Const`**getProductFiltered**(`products`: [*ProductVariant*](#productvariant)[], `filters?`: *any*): [*ProductVariant*](#productvariant)[]

###### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`products` | [*ProductVariant*](#productvariant)[] | - |
`filters` | *any* | ... |

**Returns:** [*ProductVariant*](#productvariant)[]

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:28](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L28)

___

##### getProductGallery

▸ `Const`**getProductGallery**(`product`: [*ProductVariant*](#productvariant)): AgnosticMediaGalleryItem[]

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*ProductVariant*](#productvariant) |

**Returns:** AgnosticMediaGalleryItem[]

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:16](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L16)

___

##### getProductId

▸ `Const`**getProductId**(`product`: [*ProductVariant*](#productvariant)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*ProductVariant*](#productvariant) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:87](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L87)

___

##### getProductName

▸ `Const`**getProductName**(`product`: [*ProductVariant*](#productvariant) | *Readonly*<[*ProductVariant*](#productvariant)\>): *string*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*ProductVariant*](#productvariant) | *Readonly*<[*ProductVariant*](#productvariant)\> |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:10](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L10)

___

##### getProductPrice

▸ `Const`**getProductPrice**(`product`: [*ProductVariant*](#productvariant) | *Readonly*<[*ProductVariant*](#productvariant)\>): AgnosticPrice

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*ProductVariant*](#productvariant) | *Readonly*<[*ProductVariant*](#productvariant)\> |

**Returns:** AgnosticPrice

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:14](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L14)

___

##### getProductSlug

▸ `Const`**getProductSlug**(`product`: [*ProductVariant*](#productvariant) | *Readonly*<[*ProductVariant*](#productvariant)\>): *string*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*ProductVariant*](#productvariant) | *Readonly*<[*ProductVariant*](#productvariant)\> |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:12](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L12)

___

##### getTotalReviews

▸ `Const`**getTotalReviews**(`product`: [*ProductVariant*](#productvariant)): *number*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*ProductVariant*](#productvariant) |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/productGetters.ts:91](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/productGetters.ts#L91)


<a name="modulesgetters_reviewgettersmd"></a>

### Module: getters/reviewGetters

#### Variables

##### default

• `Const` **default**: *ReviewGetters*<Review, ReviewItem\>

Defined in: [packages/commercetools/composables/src/getters/reviewGetters.ts:39](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/reviewGetters.ts#L39)

Defined in: [packages/commercetools/composables/src/getters/index.ts:19](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L19)

Defined in: [packages/commercetools/composables/src/getters/index.ts:19](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L19)

#### Functions

##### getAverageRating

▸ `Const`**getAverageRating**(`review`: *any*): *number*

###### Parameters:

Name | Type |
------ | ------ |
`review` | *any* |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/reviewGetters.ts:31](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/reviewGetters.ts#L31)

___

##### getItems

▸ `Const`**getItems**(`review`: *any*): *any*[]

###### Parameters:

Name | Type |
------ | ------ |
`review` | *any* |

**Returns:** *any*[]

Defined in: [packages/commercetools/composables/src/getters/reviewGetters.ts:10](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/reviewGetters.ts#L10)

___

##### getRatesCount

▸ `Const`**getRatesCount**(`review`: *any*): AgnosticRateCount[]

###### Parameters:

Name | Type |
------ | ------ |
`review` | *any* |

**Returns:** AgnosticRateCount[]

Defined in: [packages/commercetools/composables/src/getters/reviewGetters.ts:34](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/reviewGetters.ts#L34)

___

##### getReviewAuthor

▸ `Const`**getReviewAuthor**(`item`: *any*): *string*

###### Parameters:

Name | Type |
------ | ------ |
`item` | *any* |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/reviewGetters.ts:16](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/reviewGetters.ts#L16)

___

##### getReviewDate

▸ `Const`**getReviewDate**(`item`: *any*): *string*

###### Parameters:

Name | Type |
------ | ------ |
`item` | *any* |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/reviewGetters.ts:25](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/reviewGetters.ts#L25)

___

##### getReviewId

▸ `Const`**getReviewId**(`item`: *any*): *string*

###### Parameters:

Name | Type |
------ | ------ |
`item` | *any* |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/reviewGetters.ts:13](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/reviewGetters.ts#L13)

___

##### getReviewMessage

▸ `Const`**getReviewMessage**(`item`: *any*): *string*

###### Parameters:

Name | Type |
------ | ------ |
`item` | *any* |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/reviewGetters.ts:19](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/reviewGetters.ts#L19)

___

##### getReviewRating

▸ `Const`**getReviewRating**(`item`: *any*): *number*

###### Parameters:

Name | Type |
------ | ------ |
`item` | *any* |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/reviewGetters.ts:22](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/reviewGetters.ts#L22)

___

##### getReviewsPage

▸ `Const`**getReviewsPage**(`review`: *any*): *number*

###### Parameters:

Name | Type |
------ | ------ |
`review` | *any* |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/reviewGetters.ts:37](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/reviewGetters.ts#L37)

___

##### getTotalReviews

▸ `Const`**getTotalReviews**(`review`: *any*): *number*

###### Parameters:

Name | Type |
------ | ------ |
`review` | *any* |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/reviewGetters.ts:28](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/reviewGetters.ts#L28)


<a name="modulesgetters_userbillinggettersmd"></a>

### Module: getters/userBillingGetters

#### Variables

##### default

• `Const` **default**: *UserBillingGetters*<*any*, *any*\>

Defined in: [packages/commercetools/composables/src/getters/userBillingGetters.ts:3](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/userBillingGetters.ts#L3)

Defined in: [packages/commercetools/composables/src/getters/index.ts:22](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L22)

Defined in: [packages/commercetools/composables/src/getters/index.ts:22](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L22)


<a name="modulesgetters_usergettersmd"></a>

### Module: getters/userGetters

#### Variables

##### default

• `Const` **default**: *UserGetters*<[*Customer*](#customer)\>

Defined in: [packages/commercetools/composables/src/getters/userGetters.ts:12](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/userGetters.ts#L12)

Defined in: [packages/commercetools/composables/src/getters/index.ts:20](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L20)

Defined in: [packages/commercetools/composables/src/getters/index.ts:20](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L20)

#### Functions

##### getUserEmailAddress

▸ `Const`**getUserEmailAddress**(`user`: [*Customer*](#customer)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`user` | [*Customer*](#customer) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/userGetters.ts:10](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/userGetters.ts#L10)

___

##### getUserFirstName

▸ `Const`**getUserFirstName**(`user`: [*Customer*](#customer)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`user` | [*Customer*](#customer) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/userGetters.ts:4](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/userGetters.ts#L4)

___

##### getUserFullName

▸ `Const`**getUserFullName**(`user`: [*Customer*](#customer)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`user` | [*Customer*](#customer) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/userGetters.ts:8](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/userGetters.ts#L8)

___

##### getUserLastName

▸ `Const`**getUserLastName**(`user`: [*Customer*](#customer)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`user` | [*Customer*](#customer) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/userGetters.ts:6](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/userGetters.ts#L6)


<a name="modulesgetters_usershippinggettersmd"></a>

### Module: getters/userShippingGetters

#### Variables

##### default

• `Const` **default**: *UserShippingGetters*<*any*, *any*\>

Defined in: [packages/commercetools/composables/src/getters/userShippingGetters.ts:3](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/userShippingGetters.ts#L3)

Defined in: [packages/commercetools/composables/src/getters/index.ts:21](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L21)

Defined in: [packages/commercetools/composables/src/getters/index.ts:21](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L21)


<a name="modulesgetters_wishlistgettersmd"></a>

### Module: getters/wishlistGetters

#### Variables

##### default

• `Const` **default**: *WishlistGetters*<Wishlist, [*LineItem*](#lineitem)\>

Defined in: [packages/commercetools/composables/src/getters/wishlistGetters.ts:45](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/wishlistGetters.ts#L45)

Defined in: [packages/commercetools/composables/src/getters/index.ts:24](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L24)

Defined in: [packages/commercetools/composables/src/getters/index.ts:24](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/index.ts#L24)

#### Functions

##### getFormattedPrice

▸ `Const`**getFormattedPrice**(`price`: *number*): *string*

###### Parameters:

Name | Type |
------ | ------ |
`price` | *number* |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/wishlistGetters.ts:43](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/wishlistGetters.ts#L43)

___

##### getWishlistItemAttributes

▸ `Const`**getWishlistItemAttributes**(`product`: [*LineItem*](#lineitem), `filterByAttributeName?`: *string*[]): *object*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*LineItem*](#lineitem) |
`filterByAttributeName?` | *string*[] |

**Returns:** *object*

Name | Type |
------ | ------ |
`` | *string* |

Defined in: [packages/commercetools/composables/src/getters/wishlistGetters.ts:28](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/wishlistGetters.ts#L28)

___

##### getWishlistItemImage

▸ `Const`**getWishlistItemImage**(`product`: [*LineItem*](#lineitem)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*LineItem*](#lineitem) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/wishlistGetters.ts:19](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/wishlistGetters.ts#L19)

___

##### getWishlistItemName

▸ `Const`**getWishlistItemName**(`product`: [*LineItem*](#lineitem)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*LineItem*](#lineitem) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/wishlistGetters.ts:16](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/wishlistGetters.ts#L16)

___

##### getWishlistItemPrice

▸ `Const`**getWishlistItemPrice**(`product`: [*LineItem*](#lineitem)): AgnosticPrice

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*LineItem*](#lineitem) |

**Returns:** AgnosticPrice

Defined in: [packages/commercetools/composables/src/getters/wishlistGetters.ts:22](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/wishlistGetters.ts#L22)

___

##### getWishlistItemQty

▸ `Const`**getWishlistItemQty**(`product`: [*LineItem*](#lineitem)): *number*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*LineItem*](#lineitem) |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/wishlistGetters.ts:25](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/wishlistGetters.ts#L25)

___

##### getWishlistItemSku

▸ `Const`**getWishlistItemSku**(`product`: [*LineItem*](#lineitem)): *string*

###### Parameters:

Name | Type |
------ | ------ |
`product` | [*LineItem*](#lineitem) |

**Returns:** *string*

Defined in: [packages/commercetools/composables/src/getters/wishlistGetters.ts:31](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/wishlistGetters.ts#L31)

___

##### getWishlistItems

▸ `Const`**getWishlistItems**(`wishlist`: Wishlist): [*LineItem*](#lineitem)[]

###### Parameters:

Name | Type |
------ | ------ |
`wishlist` | Wishlist |

**Returns:** [*LineItem*](#lineitem)[]

Defined in: [packages/commercetools/composables/src/getters/wishlistGetters.ts:13](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/wishlistGetters.ts#L13)

___

##### getWishlistShippingPrice

▸ `Const`**getWishlistShippingPrice**(`wishlist`: Wishlist): *number*

###### Parameters:

Name | Type |
------ | ------ |
`wishlist` | Wishlist |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/wishlistGetters.ts:37](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/wishlistGetters.ts#L37)

___

##### getWishlistTotalItems

▸ `Const`**getWishlistTotalItems**(`wishlist`: Wishlist): *number*

###### Parameters:

Name | Type |
------ | ------ |
`wishlist` | Wishlist |

**Returns:** *number*

Defined in: [packages/commercetools/composables/src/getters/wishlistGetters.ts:40](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/wishlistGetters.ts#L40)

___

##### getWishlistTotals

▸ `Const`**getWishlistTotals**(`wishlist`: Wishlist): AgnosticTotals

###### Parameters:

Name | Type |
------ | ------ |
`wishlist` | Wishlist |

**Returns:** AgnosticTotals

Defined in: [packages/commercetools/composables/src/getters/wishlistGetters.ts:34](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/getters/wishlistGetters.ts#L34)


<a name="moduleshelpers_internalsmd"></a>

### Module: helpers/internals

#### References

##### enhanceProduct

Renames and exports: [default](#default)

___

##### getCouponsFromCart

Renames and exports: [default](#default)

___

##### getFiltersFromProductsAttributes

Renames and exports: [default](#default)

___

##### mapPaginationParams

Renames and exports: [default](#default)


<a name="moduleshelpers_internals_enhanceproductmd"></a>

### Module: helpers/internals/enhanceProduct

#### Functions

##### default

▸ `Const`**default**(`productResponse`: *ApolloQueryResult*<ProductData\>): *ApolloQueryResult*<ProductData\>

###### Parameters:

Name | Type |
------ | ------ |
`productResponse` | *ApolloQueryResult*<ProductData\> |

**Returns:** *ApolloQueryResult*<ProductData\>

Defined in: [packages/commercetools/composables/src/helpers/internals/enhanceProduct.ts:8](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/helpers/internals/enhanceProduct.ts#L8)


<a name="moduleshelpers_internals_getcouponsfromcartmd"></a>

### Module: helpers/internals/getCouponsFromCart

#### Properties

##### default

• **default**: (`cart`: [*Cart*](#cart)) => AgnosticCoupon[]

Defined in: [packages/commercetools/composables/src/helpers/internals/index.ts:10](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/helpers/internals/index.ts#L10)


<a name="moduleshelpers_internals_getfiltersfromproductsattributesmd"></a>

### Module: helpers/internals/getFiltersFromProductsAttributes

#### Properties

##### default

• **default**: (`products`: [*ProductVariant*](#productvariant)[]) => *Record*<*string*, Filter\>

Defined in: [packages/commercetools/composables/src/helpers/internals/index.ts:9](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/helpers/internals/index.ts#L9)


<a name="moduleshelpers_internals_mappaginationparamsmd"></a>

### Module: helpers/internals/mapPaginationParams

#### Properties

##### default

• **default**: (`\_\_namedParameters`: { [x: string]: *any*; `filters?`: *any* ; `page?`: *number* ; `perPage?`: *number* ; `sort?`: *any* ; `term?`: *any*  }) => *Pick*<BaseSearch, *limit* | *offset*\>

Defined in: [packages/commercetools/composables/src/helpers/internals/index.ts:8](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/helpers/internals/index.ts#L8)


<a name="modulesindexmd"></a>

### Module: index

#### References

##### cartGetters

Renames and exports: [default](#default)

___

##### categoryGetters

Renames and exports: [default](#default)

___

##### checkoutGetters

Renames and exports: [default](#default)

___

##### facetGetters

Renames and exports: [default](#default)

___

##### orderGetters

Renames and exports: [default](#default)

___

##### productGetters

Renames and exports: [default](#default)

___

##### reviewGetters

Renames and exports: [default](#default)

___

##### useCart

Renames and exports: [default](#default)

___

##### useCategory

Renames and exports: [default](#default)

___

##### useCheckout

Renames and exports: [default](#default)

___

##### useFacet

Renames and exports: [default](#default)

___

##### useProduct

Renames and exports: [default](#default)

___

##### useReview

Re-exports: [useReview](#usereview)

___

##### useUser

Renames and exports: [default](#default)

___

##### useUserBilling

Renames and exports: [default](#default)

___

##### useUserOrders

Renames and exports: [default](#default)

___

##### useUserShipping

Renames and exports: [default](#default)

___

##### useWishlist

Renames and exports: [default](#default)

___

##### userBillingGetters

Renames and exports: [default](#default)

___

##### userGetters

Renames and exports: [default](#default)

___

##### userShippingGetters

Renames and exports: [default](#default)

___

##### wishlistGetters

Renames and exports: [default](#default)

#### Functions

##### integrationPlugin

▸ `Const`**integrationPlugin**(`pluginFn`: *any*): *function*

###### Parameters:

Name | Type |
------ | ------ |
`pluginFn` | *any* |

**Returns:** *function*

Defined in: [packages/commercetools/composables/src/index.ts:19](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/index.ts#L19)


<a name="modulestypesmd"></a>

### Module: types

#### Table of contents

##### Interfaces

- [FacetResultsData](#interfacestypesfacetresultsdatamd)
- [ProductsSearchParams](#interfacestypesproductssearchparamsmd)

#### Type aliases

##### OrderSearchParams

Ƭ **OrderSearchParams**: { `id?`: *string* ; `page?`: *number* ; `perPage?`: *number*  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | *string* |
`page?` | *number* |
`perPage?` | *number* |

Defined in: [packages/commercetools/composables/src/types/index.ts:4](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L4)

___

##### SearchData

Ƭ **SearchData**: *FacetSearchResult*<[*FacetResultsData*](#interfacestypesfacetresultsdatamd)\>

Defined in: [packages/commercetools/composables/src/types/index.ts:31](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/index.ts#L31)


<a name="modulestypes_graphqlmd"></a>

### Module: types/GraphQL

#### Table of contents

##### Enumerations

- [AnonymousCartSignInMode](#enumstypes_graphqlanonymouscartsigninmodemd)
- [AttributeConstraint](#enumstypes_graphqlattributeconstraintmd)
- [CartOrigin](#enumstypes_graphqlcartoriginmd)
- [CartState](#enumstypes_graphqlcartstatemd)
- [ChannelRole](#enumstypes_graphqlchannelrolemd)
- [DiscountCodeState](#enumstypes_graphqldiscountcodestatemd)
- [InventoryMode](#enumstypes_graphqlinventorymodemd)
- [LineItemMode](#enumstypes_graphqllineitemmodemd)
- [LineItemPriceMode](#enumstypes_graphqllineitempricemodemd)
- [OrderState](#enumstypes_graphqlorderstatemd)
- [PaymentState](#enumstypes_graphqlpaymentstatemd)
- [PublishScope](#enumstypes_graphqlpublishscopemd)
- [ReturnPaymentState](#enumstypes_graphqlreturnpaymentstatemd)
- [ReturnShipmentState](#enumstypes_graphqlreturnshipmentstatemd)
- [RoundingMode](#enumstypes_graphqlroundingmodemd)
- [SelectionMode](#enumstypes_graphqlselectionmodemd)
- [ShipmentState](#enumstypes_graphqlshipmentstatemd)
- [ShippingMethodState](#enumstypes_graphqlshippingmethodstatemd)
- [StackingMode](#enumstypes_graphqlstackingmodemd)
- [StateRole](#enumstypes_graphqlstaterolemd)
- [StateType](#enumstypes_graphqlstatetypemd)
- [TaxCalculationMode](#enumstypes_graphqltaxcalculationmodemd)
- [TaxMode](#enumstypes_graphqltaxmodemd)
- [TextInputHint](#enumstypes_graphqltextinputhintmd)
- [TransactionState](#enumstypes_graphqltransactionstatemd)
- [TransactionType](#enumstypes_graphqltransactiontypemd)

#### Type aliases

##### AbsoluteDiscountValue

Ƭ **AbsoluteDiscountValue**: [*CartDiscountValue*](#cartdiscountvalue) & [*ProductDiscountValue*](#productdiscountvalue) & { `__typename?`: *AbsoluteDiscountValue* ; `money`: [*Money*](#money)[] ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:43](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L43)

___

##### AbsoluteDiscountValueInput

Ƭ **AbsoluteDiscountValueInput**: { `money`: [*MoneyInput*](#moneyinput)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`money` | [*MoneyInput*](#moneyinput)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:50](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L50)

___

##### ActiveCartInterface

Ƭ **ActiveCartInterface**: { `activeCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\>  }

A field to access the active cart.

###### Type declaration:

Name | Type |
------ | ------ |
`activeCart?` | [*Maybe*](#maybe)<[*Cart*](#cart)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:55](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L55)

___

##### AddAttributeDefinition

Ƭ **AddAttributeDefinition**: { `attributeDefinition`: [*AttributeDefinitionDraft*](#attributedefinitiondraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeDefinition` | [*AttributeDefinitionDraft*](#attributedefinitiondraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:59](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L59)

___

##### AddCartCustomLineItem

Ƭ **AddCartCustomLineItem**: { `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `externalTaxRate?`: [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> ; `money`: [*BaseMoneyInput*](#basemoneyinput) ; `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `quantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `shippingDetails?`: [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> ; `slug`: [*Scalars*](#scalars)[*String*] ; `taxCategory?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`externalTaxRate?` | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`money` | [*BaseMoneyInput*](#basemoneyinput) |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`quantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetails?` | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |
`slug` | [*Scalars*](#scalars)[*String*] |
`taxCategory?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:63](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L63)

___

##### AddCartDiscountCode

Ƭ **AddCartDiscountCode**: { `code`: [*Scalars*](#scalars)[*String*] ; `validateDuplicates?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`code` | [*Scalars*](#scalars)[*String*] |
`validateDuplicates?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:74](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L74)

___

##### AddCartItemShippingAddress

Ƭ **AddCartItemShippingAddress**: { `address`: [*AddressInput*](#addressinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`address` | [*AddressInput*](#addressinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:79](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L79)

___

##### AddCartLineItem

Ƭ **AddCartLineItem**: { `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `distributionChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `externalPrice?`: [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> ; `externalTaxRate?`: [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> ; `externalTotalPrice?`: [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> ; `productId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `quantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `shippingDetails?`: [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `supplyChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`distributionChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`externalPrice?` | [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> |
`externalTaxRate?` | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`externalTotalPrice?` | [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> |
`productId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetails?` | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`supplyChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:83](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L83)

___

##### AddCartPayment

Ƭ **AddCartPayment**: { `payment`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`payment` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:98](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L98)

___

##### AddCartShoppingList

Ƭ **AddCartShoppingList**: { `distributionChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `shoppingList`: [*ResourceIdentifierInput*](#resourceidentifierinput) ; `supplyChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`distributionChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`shoppingList` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`supplyChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:102](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L102)

___

##### AddCategoryAsset

Ƭ **AddCategoryAsset**: { `asset`: [*AssetDraftInput*](#assetdraftinput) ; `position?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`asset` | [*AssetDraftInput*](#assetdraftinput) |
`position?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:108](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L108)

___

##### AddCustomerAddress

Ƭ **AddCustomerAddress**: { `address`: [*AddressInput*](#addressinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`address` | [*AddressInput*](#addressinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:113](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L113)

___

##### AddCustomerBillingAddressId

Ƭ **AddCustomerBillingAddressId**: { `addressId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`addressId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:117](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L117)

___

##### AddCustomerShippingAddressId

Ƭ **AddCustomerShippingAddressId**: { `addressId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`addressId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:121](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L121)

___

##### AddCustomerStore

Ƭ **AddCustomerStore**: { `store`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`store` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:125](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L125)

___

##### AddInventoryEntryQuantity

Ƭ **AddInventoryEntryQuantity**: { `quantity`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:129](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L129)

___

##### AddLocalizedEnumValue

Ƭ **AddLocalizedEnumValue**: { `attributeName`: [*Scalars*](#scalars)[*String*] ; `value`: [*LocalizedEnumValueDraft*](#localizedenumvaluedraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`value` | [*LocalizedEnumValueDraft*](#localizedenumvaluedraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:133](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L133)

___

##### AddMyCartLineItem

Ƭ **AddMyCartLineItem**: { `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `distributionChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `productId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `quantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `shippingDetails?`: [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `supplyChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`distributionChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`productId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetails?` | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`supplyChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:138](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L138)

___

##### AddOrderDelivery

Ƭ **AddOrderDelivery**: { `address?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> ; `items?`: [*Maybe*](#maybe)<[*DeliveryItemDraftType*](#deliveryitemdrafttype)[]\> ; `parcels?`: [*Maybe*](#maybe)<[*DeliveryItemDraftType*](#deliveryitemdrafttype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`address?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |
`items?` | [*Maybe*](#maybe)<[*DeliveryItemDraftType*](#deliveryitemdrafttype)[]\> |
`parcels?` | [*Maybe*](#maybe)<[*DeliveryItemDraftType*](#deliveryitemdrafttype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:150](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L150)

___

##### AddOrderItemShippingAddress

Ƭ **AddOrderItemShippingAddress**: { `address`: [*AddressInput*](#addressinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`address` | [*AddressInput*](#addressinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:156](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L156)

___

##### AddOrderParcelToDelivery

Ƭ **AddOrderParcelToDelivery**: { `deliveryId`: [*Scalars*](#scalars)[*String*] ; `items?`: [*Maybe*](#maybe)<[*DeliveryItemDraftType*](#deliveryitemdrafttype)[]\> ; `measurements?`: [*Maybe*](#maybe)<[*ParcelMeasurementsDraftType*](#parcelmeasurementsdrafttype)\> ; `trackingData?`: [*Maybe*](#maybe)<[*TrackingDataDraftType*](#trackingdatadrafttype)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`deliveryId` | [*Scalars*](#scalars)[*String*] |
`items?` | [*Maybe*](#maybe)<[*DeliveryItemDraftType*](#deliveryitemdrafttype)[]\> |
`measurements?` | [*Maybe*](#maybe)<[*ParcelMeasurementsDraftType*](#parcelmeasurementsdrafttype)\> |
`trackingData?` | [*Maybe*](#maybe)<[*TrackingDataDraftType*](#trackingdatadrafttype)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:160](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L160)

___

##### AddOrderPayment

Ƭ **AddOrderPayment**: { `payment`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`payment` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:167](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L167)

___

##### AddOrderReturnInfo

Ƭ **AddOrderReturnInfo**: { `items`: [*ReturnItemDraftType*](#returnitemdrafttype)[] ; `returnDate?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `returnTrackingId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`items` | [*ReturnItemDraftType*](#returnitemdrafttype)[] |
`returnDate?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`returnTrackingId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:171](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L171)

___

##### AddPlainEnumValue

Ƭ **AddPlainEnumValue**: { `attributeName`: [*Scalars*](#scalars)[*String*] ; `value`: [*PlainEnumValueDraft*](#plainenumvaluedraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`value` | [*PlainEnumValueDraft*](#plainenumvaluedraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:177](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L177)

___

##### AddProductAsset

Ƭ **AddProductAsset**: { `asset`: [*AssetDraftInput*](#assetdraftinput) ; `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `position?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`asset` | [*AssetDraftInput*](#assetdraftinput) |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`position?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:182](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L182)

___

##### AddProductExternalImage

Ƭ **AddProductExternalImage**: { `image`: [*ImageInput*](#imageinput) ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`image` | [*ImageInput*](#imageinput) |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:191](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L191)

___

##### AddProductPrice

Ƭ **AddProductPrice**: { `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `price`: [*ProductPriceDataInput*](#productpricedatainput) ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`price` | [*ProductPriceDataInput*](#productpricedatainput) |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:198](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L198)

___

##### AddProductToCategory

Ƭ **AddProductToCategory**: { `category`: [*ResourceIdentifierInput*](#resourceidentifierinput) ; `orderHint?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`category` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`orderHint?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:206](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L206)

___

##### AddProductVariant

Ƭ **AddProductVariant**: { `assets?`: [*Maybe*](#maybe)<[*AssetDraftInput*](#assetdraftinput)[]\> ; `attributes?`: [*Maybe*](#maybe)<[*ProductAttributeInput*](#productattributeinput)[]\> ; `images?`: [*Maybe*](#maybe)<[*ImageInput*](#imageinput)[]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `prices?`: [*Maybe*](#maybe)<[*ProductPriceDataInput*](#productpricedatainput)[]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assets?` | [*Maybe*](#maybe)<[*AssetDraftInput*](#assetdraftinput)[]\> |
`attributes?` | [*Maybe*](#maybe)<[*ProductAttributeInput*](#productattributeinput)[]\> |
`images?` | [*Maybe*](#maybe)<[*ImageInput*](#imageinput)[]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`prices?` | [*Maybe*](#maybe)<[*ProductPriceDataInput*](#productpricedatainput)[]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:212](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L212)

___

##### AddShippingMethodShippingRate

Ƭ **AddShippingMethodShippingRate**: { `shippingRate`: [*ShippingRateDraft*](#shippingratedraft) ; `zone`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`shippingRate` | [*ShippingRateDraft*](#shippingratedraft) |
`zone` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:285](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L285)

___

##### AddShippingMethodZone

Ƭ **AddShippingMethodZone**: { `zone`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`zone` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:290](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L290)

___

##### AddShoppingListLineItem

Ƭ **AddShoppingListLineItem**: { `addedAt?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `productId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `quantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addedAt?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`productId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:294](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L294)

___

##### AddShoppingListTextLineItem

Ƭ **AddShoppingListTextLineItem**: { `addedAt?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `quantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addedAt?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`quantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:303](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L303)

___

##### AddZoneLocation

Ƭ **AddZoneLocation**: { `location`: [*ZoneLocation*](#zonelocation)  }

###### Type declaration:

Name | Type |
------ | ------ |
`location` | [*ZoneLocation*](#zonelocation) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:311](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L311)

___

##### Address

Ƭ **Address**: { `__typename?`: *Address* ; `additionalAddressInfo?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `additionalStreetInfo?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `apartment?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `building?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `city?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `company?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `contactInfo`: [*AddressContactInfo*](#addresscontactinfo) ; `country`: [*Scalars*](#scalars)[*Country*] ; `department?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `externalId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `firstName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `pOBox?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `postalCode?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `region?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `salutation?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `state?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `streetName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `streetNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `title?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

An address represents a postal address.

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *Address* |
`additionalAddressInfo?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`additionalStreetInfo?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`apartment?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`building?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`city?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`company?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`contactInfo` | [*AddressContactInfo*](#addresscontactinfo) |
`country` | [*Scalars*](#scalars)[*Country*] |
`department?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`externalId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`firstName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`lastName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`pOBox?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`postalCode?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`region?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`salutation?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`state?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`streetName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`streetNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`title?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:223](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L223)

___

##### AddressContactInfo

Ƭ **AddressContactInfo**: { `__typename?`: *AddressContactInfo* ; `email?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `fax?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `mobile?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `phone?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *AddressContactInfo* |
`email?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`fax?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`mobile?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`phone?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:249](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L249)

___

##### AddressInput

Ƭ **AddressInput**: { `additionalAddressInfo?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `additionalStreetInfo?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `apartment?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `building?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `city?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `company?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `country`: [*Scalars*](#scalars)[*Country*] ; `department?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `email?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `externalId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `fax?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `firstName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `mobile?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `pOBox?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `phone?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `postalCode?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `region?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `salutation?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `state?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `streetName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `streetNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `title?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`additionalAddressInfo?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`additionalStreetInfo?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`apartment?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`building?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`city?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`company?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`country` | [*Scalars*](#scalars)[*Country*] |
`department?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`email?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`externalId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`fax?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`firstName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`lastName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`mobile?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`pOBox?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`phone?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`postalCode?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`region?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`salutation?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`state?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`streetName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`streetNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`title?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:257](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L257)

___

##### ApiClientWithSecret

Ƭ **ApiClientWithSecret**: { `__typename?`: *APIClientWithSecret* ; `createdAt?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `lastUsedAt?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> ; `name`: [*Scalars*](#scalars)[*String*] ; `scope`: [*Scalars*](#scalars)[*String*] ; `secret`: [*Scalars*](#scalars)[*String*]  }

API Clients can be used to obtain OAuth 2 access tokens. The secret is only
shown once in the response of creating the API Client.

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *APIClientWithSecret* |
`createdAt?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`id` | [*Scalars*](#scalars)[*String*] |
`lastUsedAt?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> |
`name` | [*Scalars*](#scalars)[*String*] |
`scope` | [*Scalars*](#scalars)[*String*] |
`secret` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:354](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L354)

___

##### ApiClientWithoutSecret

Ƭ **ApiClientWithoutSecret**: { `__typename?`: *APIClientWithoutSecret* ; `createdAt?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `lastUsedAt?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> ; `name`: [*Scalars*](#scalars)[*String*] ; `scope`: [*Scalars*](#scalars)[*String*]  }

API Clients can be used to obtain OAuth 2 access tokens

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *APIClientWithoutSecret* |
`createdAt?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`id` | [*Scalars*](#scalars)[*String*] |
`lastUsedAt?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> |
`name` | [*Scalars*](#scalars)[*String*] |
`scope` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:334](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L334)

___

##### ApiClientWithoutSecretQueryResult

Ƭ **ApiClientWithoutSecretQueryResult**: { `__typename?`: *APIClientWithoutSecretQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*ApiClientWithoutSecret*](#apiclientwithoutsecret)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *APIClientWithoutSecretQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*ApiClientWithoutSecret*](#apiclientwithoutsecret)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:343](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L343)

___

##### ApplyCartDeltaToCustomLineItemShippingDetailsTargets

Ƭ **ApplyCartDeltaToCustomLineItemShippingDetailsTargets**: { `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `targetsDelta`: [*ShippingTargetDraft*](#shippingtargetdraft)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`targetsDelta` | [*ShippingTargetDraft*](#shippingtargetdraft)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:364](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L364)

___

##### ApplyCartDeltaToLineItemShippingDetailsTargets

Ƭ **ApplyCartDeltaToLineItemShippingDetailsTargets**: { `lineItemId`: [*Scalars*](#scalars)[*String*] ; `targetsDelta`: [*ShippingTargetDraft*](#shippingtargetdraft)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`targetsDelta` | [*ShippingTargetDraft*](#shippingtargetdraft)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:369](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L369)

___

##### Asset

Ƭ **Asset**: { `__typename?`: *Asset* ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `descriptionAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales`: [*LocalizedString*](#localizedstring)[] ; `sources`: [*AssetSource*](#assetsource)[] ; `tags`: [*Scalars*](#scalars)[*String*][]  }

###### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`__typename?` | *Asset* | - |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> | - |
`customFieldList?` | [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> | Custom fields are returned as a list instead of an object structure.   |
`customFields?` | [*Maybe*](#maybe)<[*Type*](#type)\> | This field would contain type data   |
`customFieldsRaw?` | [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> | This field contains non-typed data. Consider using `customFields` as a typed alternative.   |
`description?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`descriptionAllLocales?` | [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> | - |
`id` | [*Scalars*](#scalars)[*String*] | - |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`name?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] | - |
`sources` | [*AssetSource*](#assetsource)[] | - |
`tags` | [*Scalars*](#scalars)[*String*][] | - |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:374](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L374)

___

##### AssetCustomFieldListArgs

Ƭ **AssetCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:408](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L408)

___

##### AssetCustomFieldsRawArgs

Ƭ **AssetCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:403](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L403)

___

##### AssetDescriptionArgs

Ƭ **AssetDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:398](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L398)

___

##### AssetDimensions

Ƭ **AssetDimensions**: { `__typename?`: *AssetDimensions* ; `height`: [*Scalars*](#scalars)[*Int*] ; `width`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *AssetDimensions* |
`height` | [*Scalars*](#scalars)[*Int*] |
`width` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:413](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L413)

___

##### AssetDimensionsInput

Ƭ **AssetDimensionsInput**: { `height`: [*Scalars*](#scalars)[*Int*] ; `width`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`height` | [*Scalars*](#scalars)[*Int*] |
`width` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:419](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L419)

___

##### AssetDraftInput

Ƭ **AssetDraftInput**: { `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `sources?`: [*Maybe*](#maybe)<[*AssetSourceInput*](#assetsourceinput)[]\> ; `tags?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`sources?` | [*Maybe*](#maybe)<[*AssetSourceInput*](#assetsourceinput)[]\> |
`tags?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:424](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L424)

___

##### AssetNameArgs

Ƭ **AssetNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:393](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L393)

___

##### AssetSource

Ƭ **AssetSource**: { `__typename?`: *AssetSource* ; `contentType?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `dimensions?`: [*Maybe*](#maybe)<[*AssetDimensions*](#assetdimensions)\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `uri`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *AssetSource* |
`contentType?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`dimensions?` | [*Maybe*](#maybe)<[*AssetDimensions*](#assetdimensions)\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`uri` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:434](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L434)

___

##### AssetSourceInput

Ƭ **AssetSourceInput**: { `contentType?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `dimensions?`: [*Maybe*](#maybe)<[*AssetDimensionsInput*](#assetdimensionsinput)\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `uri`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`contentType?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`dimensions?` | [*Maybe*](#maybe)<[*AssetDimensionsInput*](#assetdimensionsinput)\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`uri` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:442](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L442)

___

##### Attribute

Ƭ **Attribute**: { `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:449](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L449)

___

##### AttributeDefinition

Ƭ **AttributeDefinition**: { `__typename?`: *AttributeDefinition* ; `attributeConstraint`: [*AttributeConstraint*](#enumstypes_graphqlattributeconstraintmd) ; `inputHint`: [*TextInputHint*](#enumstypes_graphqltextinputhintmd) ; `inputTip?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `inputTipAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `isRequired`: [*Scalars*](#scalars)[*Boolean*] ; `isSearchable`: [*Scalars*](#scalars)[*Boolean*] ; `label?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `labelAllLocales`: [*LocalizedString*](#localizedstring)[] ; `name`: [*Scalars*](#scalars)[*String*] ; `type`: [*AttributeDefinitionType*](#attributedefinitiontype)  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *AttributeDefinition* |
`attributeConstraint` | [*AttributeConstraint*](#enumstypes_graphqlattributeconstraintmd) |
`inputHint` | [*TextInputHint*](#enumstypes_graphqltextinputhintmd) |
`inputTip?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`inputTipAllLocales?` | [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> |
`isRequired` | [*Scalars*](#scalars)[*Boolean*] |
`isSearchable` | [*Scalars*](#scalars)[*Boolean*] |
`label?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`labelAllLocales` | [*LocalizedString*](#localizedstring)[] |
`name` | [*Scalars*](#scalars)[*String*] |
`type` | [*AttributeDefinitionType*](#attributedefinitiontype) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:464](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L464)

___

##### AttributeDefinitionDraft

Ƭ **AttributeDefinitionDraft**: { `attributeConstraint?`: [*Maybe*](#maybe)<[*AttributeConstraint*](#enumstypes_graphqlattributeconstraintmd)\> ; `inputHint?`: [*Maybe*](#maybe)<[*TextInputHint*](#enumstypes_graphqltextinputhintmd)\> ; `inputTip?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `isRequired`: [*Scalars*](#scalars)[*Boolean*] ; `isSearchable`: [*Scalars*](#scalars)[*Boolean*] ; `label`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `name`: [*Scalars*](#scalars)[*String*] ; `type`: [*AttributeTypeDraft*](#attributetypedraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeConstraint?` | [*Maybe*](#maybe)<[*AttributeConstraint*](#enumstypes_graphqlattributeconstraintmd)\> |
`inputHint?` | [*Maybe*](#maybe)<[*TextInputHint*](#enumstypes_graphqltextinputhintmd)\> |
`inputTip?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`isRequired` | [*Scalars*](#scalars)[*Boolean*] |
`isSearchable` | [*Scalars*](#scalars)[*Boolean*] |
`label` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`name` | [*Scalars*](#scalars)[*String*] |
`type` | [*AttributeTypeDraft*](#attributetypedraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:488](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L488)

___

##### AttributeDefinitionInputTipArgs

Ƭ **AttributeDefinitionInputTipArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:483](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L483)

___

##### AttributeDefinitionLabelArgs

Ƭ **AttributeDefinitionLabelArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:478](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L478)

___

##### AttributeDefinitionResult

Ƭ **AttributeDefinitionResult**: { `__typename?`: *AttributeDefinitionResult* ; `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `results`: [*AttributeDefinition*](#attributedefinition)[] ; `total`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *AttributeDefinitionResult* |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`results` | [*AttributeDefinition*](#attributedefinition)[] |
`total` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:499](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L499)

___

##### AttributeDefinitionType

Ƭ **AttributeDefinitionType**: { `name`: [*Scalars*](#scalars)[*String*]  }

(https://dev.commercetools.com/http-api-projects-productTypes.html#attributetype)[https://dev.commercetools.com/http-api-projects-productTypes.html#attributetype]

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:508](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L508)

___

##### AttributeSetElementTypeDraft

Ƭ **AttributeSetElementTypeDraft**: { `boolean?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `date?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `datetime?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `enum?`: [*Maybe*](#maybe)<[*EnumTypeDraft*](#enumtypedraft)\> ; `lenum?`: [*Maybe*](#maybe)<[*LocalizableEnumTypeDraft*](#localizableenumtypedraft)\> ; `ltext?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `money?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `number?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `reference?`: [*Maybe*](#maybe)<[*ReferenceTypeDefinitionDraft*](#referencetypedefinitiondraft)\> ; `text?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `time?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`boolean?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`date?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`datetime?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`enum?` | [*Maybe*](#maybe)<[*EnumTypeDraft*](#enumtypedraft)\> |
`lenum?` | [*Maybe*](#maybe)<[*LocalizableEnumTypeDraft*](#localizableenumtypedraft)\> |
`ltext?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`money?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`number?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`reference?` | [*Maybe*](#maybe)<[*ReferenceTypeDefinitionDraft*](#referencetypedefinitiondraft)\> |
`text?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`time?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:512](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L512)

___

##### AttributeSetTypeDraft

Ƭ **AttributeSetTypeDraft**: { `elementType`: [*AttributeSetElementTypeDraft*](#attributesetelementtypedraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`elementType` | [*AttributeSetElementTypeDraft*](#attributesetelementtypedraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:526](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L526)

___

##### AttributeTypeDraft

Ƭ **AttributeTypeDraft**: { `boolean?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `date?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `datetime?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `enum?`: [*Maybe*](#maybe)<[*EnumTypeDraft*](#enumtypedraft)\> ; `lenum?`: [*Maybe*](#maybe)<[*LocalizableEnumTypeDraft*](#localizableenumtypedraft)\> ; `ltext?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `money?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `number?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `reference?`: [*Maybe*](#maybe)<[*ReferenceTypeDefinitionDraft*](#referencetypedefinitiondraft)\> ; `set?`: [*Maybe*](#maybe)<[*AttributeSetTypeDraft*](#attributesettypedraft)\> ; `text?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> ; `time?`: [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`boolean?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`date?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`datetime?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`enum?` | [*Maybe*](#maybe)<[*EnumTypeDraft*](#enumtypedraft)\> |
`lenum?` | [*Maybe*](#maybe)<[*LocalizableEnumTypeDraft*](#localizableenumtypedraft)\> |
`ltext?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`money?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`number?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`reference?` | [*Maybe*](#maybe)<[*ReferenceTypeDefinitionDraft*](#referencetypedefinitiondraft)\> |
`set?` | [*Maybe*](#maybe)<[*AttributeSetTypeDraft*](#attributesettypedraft)\> |
`text?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |
`time?` | [*Maybe*](#maybe)<[*SimpleAttributeTypeDraft*](#simpleattributetypedraft)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:530](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L530)

___

##### BaseMoney

Ƭ **BaseMoney**: { `centAmount`: [*Scalars*](#scalars)[*Long*] ; `currencyCode`: [*Scalars*](#scalars)[*Currency*] ; `fractionDigits`: [*Scalars*](#scalars)[*Int*] ; `type`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`centAmount` | [*Scalars*](#scalars)[*Long*] |
`currencyCode` | [*Scalars*](#scalars)[*Currency*] |
`fractionDigits` | [*Scalars*](#scalars)[*Int*] |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:545](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L545)

___

##### BaseMoneyInput

Ƭ **BaseMoneyInput**: { `centPrecision?`: [*Maybe*](#maybe)<[*MoneyInput*](#moneyinput)\> ; `highPrecision?`: [*Maybe*](#maybe)<[*HighPrecisionMoneyInput*](#highprecisionmoneyinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`centPrecision?` | [*Maybe*](#maybe)<[*MoneyInput*](#moneyinput)\> |
`highPrecision?` | [*Maybe*](#maybe)<[*HighPrecisionMoneyInput*](#highprecisionmoneyinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:552](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L552)

___

##### BaseSearchKeywordInput

Ƭ **BaseSearchKeywordInput**: { `custom?`: [*Maybe*](#maybe)<[*CustomSuggestTokenizerInput*](#customsuggesttokenizerinput)\> ; `whitespace?`: [*Maybe*](#maybe)<[*WhitespaceSuggestTokenizerInput*](#whitespacesuggesttokenizerinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`custom?` | [*Maybe*](#maybe)<[*CustomSuggestTokenizerInput*](#customsuggesttokenizerinput)\> |
`whitespace?` | [*Maybe*](#maybe)<[*WhitespaceSuggestTokenizerInput*](#whitespacesuggesttokenizerinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:557](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L557)

___

##### BooleanAttribute

Ƭ **BooleanAttribute**: [*Attribute*](#attribute) & { `__typename?`: *BooleanAttribute* ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*Boolean*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:562](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L562)

___

##### BooleanAttributeDefinitionType

Ƭ **BooleanAttributeDefinitionType**: [*AttributeDefinitionType*](#attributedefinitiontype) & { `__typename?`: *BooleanAttributeDefinitionType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:568](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L568)

___

##### BooleanField

Ƭ **BooleanField**: [*CustomField*](#customfield) & { `__typename?`: *BooleanField* ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*Boolean*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:573](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L573)

___

##### BooleanType

Ƭ **BooleanType**: [*FieldType*](#fieldtype) & { `__typename?`: *BooleanType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:579](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L579)

___

##### Cart

Ƭ **Cart**: [*Versioned*](#versioned) & { `__typename?`: *Cart* ; `anonymousId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `billingAddress?`: [*Maybe*](#maybe)<[*Address*](#address)\> ; `cartState`: [*CartState*](#enumstypes_graphqlcartstatemd) ; `country?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `customLineItems`: [*CustomLineItem*](#customlineitem)[] ; `customer?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `customerEmail?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `customerGroup?`: [*Maybe*](#maybe)<[*CustomerGroup*](#customergroup)\> ; `customerGroupRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `customerId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `deleteDaysAfterLastModification?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `discountCodes`: [*DiscountCodeInfo*](#discountcodeinfo)[] ; `id`: [*Scalars*](#scalars)[*String*] ; `inventoryMode`: [*InventoryMode*](#enumstypes_graphqlinventorymodemd) ; `itemShippingAddresses`: [*Address*](#address)[] ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `lineItems`: [*LineItem*](#lineitem)[] ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> ; `origin`: [*CartOrigin*](#enumstypes_graphqlcartoriginmd) ; `paymentInfo?`: [*Maybe*](#maybe)<[*PaymentInfo*](#paymentinfo)\> ; `refusedGifts`: [*CartDiscount*](#cartdiscount)[] ; `refusedGiftsRefs`: [*Reference*](#reference)[] ; `shippingAddress?`: [*Maybe*](#maybe)<[*Address*](#address)\> ; `shippingInfo?`: [*Maybe*](#maybe)<[*ShippingInfo*](#shippinginfo)\> ; `shippingRateInput?`: [*Maybe*](#maybe)<[*ShippingRateInput*](#shippingrateinput)\> ; `store?`: [*Maybe*](#maybe)<[*Store*](#store)\> ; `storeRef?`: [*Maybe*](#maybe)<[*KeyReference*](#keyreference)\> ; `taxCalculationMode`: [*TaxCalculationMode*](#enumstypes_graphqltaxcalculationmodemd) ; `taxMode`: [*TaxMode*](#enumstypes_graphqltaxmodemd) ; `taxRoundingMode`: [*RoundingMode*](#enumstypes_graphqlroundingmodemd) ; `taxedPrice?`: [*Maybe*](#maybe)<[*TaxedPrice*](#taxedprice)\> ; `totalPrice`: [*Money*](#money) ; `version`: [*Scalars*](#scalars)[*Long*]  }

A shopping cart holds product variants and can be ordered. Each cart either
belongs to a registered customer or is an anonymous cart.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:587](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L587)

___

##### CartClassificationInput

Ƭ **CartClassificationInput**: { `values`: [*LocalizedEnumValueInput*](#localizedenumvalueinput)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`values` | [*LocalizedEnumValueInput*](#localizedenumvalueinput)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:650](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L650)

___

##### CartClassificationType

Ƭ **CartClassificationType**: [*ShippingRateInputType*](#shippingrateinputtype) & { `__typename?`: *CartClassificationType* ; `type`: [*Scalars*](#scalars)[*String*] ; `values`: [*ShippingRateInputLocalizedEnumValue*](#shippingrateinputlocalizedenumvalue)[]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:654](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L654)

___

##### CartCustomFieldListArgs

Ƭ **CartCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

A shopping cart holds product variants and can be ordered. Each cart either
belongs to a registered customer or is an anonymous cart.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:645](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L645)

___

##### CartCustomFieldsRawArgs

Ƭ **CartCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

A shopping cart holds product variants and can be ordered. Each cart either
belongs to a registered customer or is an anonymous cart.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:637](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L637)

___

##### CartDiscount

Ƭ **CartDiscount**: [*Versioned*](#versioned) & { `__typename?`: *CartDiscount* ; `cartPredicate`: [*Scalars*](#scalars)[*String*] ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `descriptionAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `isActive`: [*Scalars*](#scalars)[*Boolean*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales`: [*LocalizedString*](#localizedstring)[] ; `requiresDiscountCode`: [*Scalars*](#scalars)[*Boolean*] ; `sortOrder`: [*Scalars*](#scalars)[*String*] ; `stackingMode`: [*StackingMode*](#enumstypes_graphqlstackingmodemd) ; `target?`: [*Maybe*](#maybe)<[*CartDiscountTarget*](#cartdiscounttarget)\> ; `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `value`: [*CartDiscountValue*](#cartdiscountvalue) ; `version`: [*Scalars*](#scalars)[*Long*]  }

Cart discounts are recalculated every time LineItems or CustomLineItems are
added or removed from the Cart or an order is created from the cart.

The number of active cart discounts that do not require a discount code
(isActive=true and requiresDiscountCode=false) is limited to 100.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:666](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L666)

___

##### CartDiscountCustomFieldListArgs

Ƭ **CartDiscountCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

Cart discounts are recalculated every time LineItems or CustomLineItems are
added or removed from the Cart or an order is created from the cart.

The number of active cart discounts that do not require a discount code
(isActive=true and requiresDiscountCode=false) is limited to 100.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:736](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L736)

___

##### CartDiscountCustomFieldsRawArgs

Ƭ **CartDiscountCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

Cart discounts are recalculated every time LineItems or CustomLineItems are
added or removed from the Cart or an order is created from the cart.

The number of active cart discounts that do not require a discount code
(isActive=true and requiresDiscountCode=false) is limited to 100.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:725](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L725)

___

##### CartDiscountDescriptionArgs

Ƭ **CartDiscountDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

Cart discounts are recalculated every time LineItems or CustomLineItems are
added or removed from the Cart or an order is created from the cart.

The number of active cart discounts that do not require a discount code
(isActive=true and requiresDiscountCode=false) is limited to 100.

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:714](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L714)

___

##### CartDiscountDraft

Ƭ **CartDiscountDraft**: { `cartPredicate`: [*Scalars*](#scalars)[*String*] ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `isActive?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `requiresDiscountCode?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `sortOrder`: [*Scalars*](#scalars)[*String*] ; `stackingMode?`: [*Maybe*](#maybe)<[*StackingMode*](#enumstypes_graphqlstackingmodemd)\> ; `target?`: [*Maybe*](#maybe)<[*CartDiscountTargetInput*](#cartdiscounttargetinput)\> ; `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `value`: [*CartDiscountValueInput*](#cartdiscountvalueinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`cartPredicate` | [*Scalars*](#scalars)[*String*] |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`isActive?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`requiresDiscountCode?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`sortOrder` | [*Scalars*](#scalars)[*String*] |
`stackingMode?` | [*Maybe*](#maybe)<[*StackingMode*](#enumstypes_graphqlstackingmodemd)\> |
`target?` | [*Maybe*](#maybe)<[*CartDiscountTargetInput*](#cartdiscounttargetinput)\> |
`validFrom?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`value` | [*CartDiscountValueInput*](#cartdiscountvalueinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:741](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L741)

___

##### CartDiscountNameArgs

Ƭ **CartDiscountNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

Cart discounts are recalculated every time LineItems or CustomLineItems are
added or removed from the Cart or an order is created from the cart.

The number of active cart discounts that do not require a discount code
(isActive=true and requiresDiscountCode=false) is limited to 100.

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:703](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L703)

___

##### CartDiscountQueryResult

Ƭ **CartDiscountQueryResult**: { `__typename?`: *CartDiscountQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*CartDiscount*](#cartdiscount)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *CartDiscountQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*CartDiscount*](#cartdiscount)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:757](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L757)

___

##### CartDiscountTarget

Ƭ **CartDiscountTarget**: { `type`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:765](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L765)

___

##### CartDiscountTargetInput

Ƭ **CartDiscountTargetInput**: { `customLineItems?`: [*Maybe*](#maybe)<[*CustomLineItemsTargetInput*](#customlineitemstargetinput)\> ; `lineItems?`: [*Maybe*](#maybe)<[*LineItemsTargetInput*](#lineitemstargetinput)\> ; `multiBuyCustomLineItems?`: [*Maybe*](#maybe)<[*MultiBuyCustomLineItemsTargetInput*](#multibuycustomlineitemstargetinput)\> ; `multiBuyLineItems?`: [*Maybe*](#maybe)<[*MultiBuyLineItemsTargetInput*](#multibuylineitemstargetinput)\> ; `shipping?`: [*Maybe*](#maybe)<[*ShippingTargetInput*](#shippingtargetinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItems?` | [*Maybe*](#maybe)<[*CustomLineItemsTargetInput*](#customlineitemstargetinput)\> |
`lineItems?` | [*Maybe*](#maybe)<[*LineItemsTargetInput*](#lineitemstargetinput)\> |
`multiBuyCustomLineItems?` | [*Maybe*](#maybe)<[*MultiBuyCustomLineItemsTargetInput*](#multibuycustomlineitemstargetinput)\> |
`multiBuyLineItems?` | [*Maybe*](#maybe)<[*MultiBuyLineItemsTargetInput*](#multibuylineitemstargetinput)\> |
`shipping?` | [*Maybe*](#maybe)<[*ShippingTargetInput*](#shippingtargetinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:769](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L769)

___

##### CartDiscountUpdateAction

Ƭ **CartDiscountUpdateAction**: { `changeCartPredicate?`: [*Maybe*](#maybe)<[*ChangeCartDiscountCartPredicate*](#changecartdiscountcartpredicate)\> ; `changeIsActive?`: [*Maybe*](#maybe)<[*ChangeCartDiscountIsActive*](#changecartdiscountisactive)\> ; `changeName?`: [*Maybe*](#maybe)<[*ChangeCartDiscountName*](#changecartdiscountname)\> ; `changeRequiresDiscountCode?`: [*Maybe*](#maybe)<[*ChangeCartDiscountRequiresDiscountCode*](#changecartdiscountrequiresdiscountcode)\> ; `changeSortOrder?`: [*Maybe*](#maybe)<[*ChangeCartDiscountSortOrder*](#changecartdiscountsortorder)\> ; `changeStackingMode?`: [*Maybe*](#maybe)<[*ChangeCartDiscountStackingMode*](#changecartdiscountstackingmode)\> ; `changeTarget?`: [*Maybe*](#maybe)<[*ChangeCartDiscountTarget*](#changecartdiscounttarget)\> ; `changeValue?`: [*Maybe*](#maybe)<[*ChangeCartDiscountValue*](#changecartdiscountvalue)\> ; `setCustomField?`: [*Maybe*](#maybe)<[*SetCartDiscountCustomField*](#setcartdiscountcustomfield)\> ; `setCustomType?`: [*Maybe*](#maybe)<[*SetCartDiscountCustomType*](#setcartdiscountcustomtype)\> ; `setDescription?`: [*Maybe*](#maybe)<[*SetCartDiscountDescription*](#setcartdiscountdescription)\> ; `setKey?`: [*Maybe*](#maybe)<[*SetCartDiscountKey*](#setcartdiscountkey)\> ; `setValidFrom?`: [*Maybe*](#maybe)<[*SetCartDiscountValidFrom*](#setcartdiscountvalidfrom)\> ; `setValidFromAndUntil?`: [*Maybe*](#maybe)<[*SetCartDiscountValidFromAndUntil*](#setcartdiscountvalidfromanduntil)\> ; `setValidUntil?`: [*Maybe*](#maybe)<[*SetCartDiscountValidUntil*](#setcartdiscountvaliduntil)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`changeCartPredicate?` | [*Maybe*](#maybe)<[*ChangeCartDiscountCartPredicate*](#changecartdiscountcartpredicate)\> |
`changeIsActive?` | [*Maybe*](#maybe)<[*ChangeCartDiscountIsActive*](#changecartdiscountisactive)\> |
`changeName?` | [*Maybe*](#maybe)<[*ChangeCartDiscountName*](#changecartdiscountname)\> |
`changeRequiresDiscountCode?` | [*Maybe*](#maybe)<[*ChangeCartDiscountRequiresDiscountCode*](#changecartdiscountrequiresdiscountcode)\> |
`changeSortOrder?` | [*Maybe*](#maybe)<[*ChangeCartDiscountSortOrder*](#changecartdiscountsortorder)\> |
`changeStackingMode?` | [*Maybe*](#maybe)<[*ChangeCartDiscountStackingMode*](#changecartdiscountstackingmode)\> |
`changeTarget?` | [*Maybe*](#maybe)<[*ChangeCartDiscountTarget*](#changecartdiscounttarget)\> |
`changeValue?` | [*Maybe*](#maybe)<[*ChangeCartDiscountValue*](#changecartdiscountvalue)\> |
`setCustomField?` | [*Maybe*](#maybe)<[*SetCartDiscountCustomField*](#setcartdiscountcustomfield)\> |
`setCustomType?` | [*Maybe*](#maybe)<[*SetCartDiscountCustomType*](#setcartdiscountcustomtype)\> |
`setDescription?` | [*Maybe*](#maybe)<[*SetCartDiscountDescription*](#setcartdiscountdescription)\> |
`setKey?` | [*Maybe*](#maybe)<[*SetCartDiscountKey*](#setcartdiscountkey)\> |
`setValidFrom?` | [*Maybe*](#maybe)<[*SetCartDiscountValidFrom*](#setcartdiscountvalidfrom)\> |
`setValidFromAndUntil?` | [*Maybe*](#maybe)<[*SetCartDiscountValidFromAndUntil*](#setcartdiscountvalidfromanduntil)\> |
`setValidUntil?` | [*Maybe*](#maybe)<[*SetCartDiscountValidUntil*](#setcartdiscountvaliduntil)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:777](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L777)

___

##### CartDiscountValue

Ƭ **CartDiscountValue**: { `type`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:795](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L795)

___

##### CartDiscountValueInput

Ƭ **CartDiscountValueInput**: { `absolute?`: [*Maybe*](#maybe)<[*AbsoluteDiscountValueInput*](#absolutediscountvalueinput)\> ; `giftLineItem?`: [*Maybe*](#maybe)<[*GiftLineItemValueInput*](#giftlineitemvalueinput)\> ; `relative?`: [*Maybe*](#maybe)<[*RelativeDiscountValueInput*](#relativediscountvalueinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`absolute?` | [*Maybe*](#maybe)<[*AbsoluteDiscountValueInput*](#absolutediscountvalueinput)\> |
`giftLineItem?` | [*Maybe*](#maybe)<[*GiftLineItemValueInput*](#giftlineitemvalueinput)\> |
`relative?` | [*Maybe*](#maybe)<[*RelativeDiscountValueInput*](#relativediscountvalueinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:799](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L799)

___

##### CartDraft

Ƭ **CartDraft**: { `anonymousId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `billingAddress?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> ; `country?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> ; `currency`: [*Scalars*](#scalars)[*Currency*] ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `customLineItems?`: [*Maybe*](#maybe)<[*CustomLineItemDraft*](#customlineitemdraft)[]\> ; `customerEmail?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `customerGroup?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `customerId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `deleteDaysAfterLastModification?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `discountCodes?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `externalTaxRateForShippingMethod?`: [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> ; `inventoryMode?`: [*Maybe*](#maybe)<[*InventoryMode*](#enumstypes_graphqlinventorymodemd)\> ; `itemShippingAddresses?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)[]\> ; `lineItems?`: [*Maybe*](#maybe)<[*LineItemDraft*](#lineitemdraft)[]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> ; `origin?`: [*Maybe*](#maybe)<[*CartOrigin*](#enumstypes_graphqlcartoriginmd)\> ; `shippingAddress?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> ; `shippingMethod?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `shippingRateInput?`: [*Maybe*](#maybe)<[*ShippingRateInputDraft*](#shippingrateinputdraft)\> ; `store?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `taxCalculationMode?`: [*Maybe*](#maybe)<[*TaxCalculationMode*](#enumstypes_graphqltaxcalculationmodemd)\> ; `taxMode?`: [*Maybe*](#maybe)<[*TaxMode*](#enumstypes_graphqltaxmodemd)\> ; `taxRoundingMode?`: [*Maybe*](#maybe)<[*RoundingMode*](#enumstypes_graphqlroundingmodemd)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`anonymousId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`billingAddress?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |
`country?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> |
`currency` | [*Scalars*](#scalars)[*Currency*] |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`customLineItems?` | [*Maybe*](#maybe)<[*CustomLineItemDraft*](#customlineitemdraft)[]\> |
`customerEmail?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`customerGroup?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`customerId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`deleteDaysAfterLastModification?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`discountCodes?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`externalTaxRateForShippingMethod?` | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`inventoryMode?` | [*Maybe*](#maybe)<[*InventoryMode*](#enumstypes_graphqlinventorymodemd)\> |
`itemShippingAddresses?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)[]\> |
`lineItems?` | [*Maybe*](#maybe)<[*LineItemDraft*](#lineitemdraft)[]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |
`origin?` | [*Maybe*](#maybe)<[*CartOrigin*](#enumstypes_graphqlcartoriginmd)\> |
`shippingAddress?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |
`shippingMethod?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`shippingRateInput?` | [*Maybe*](#maybe)<[*ShippingRateInputDraft*](#shippingrateinputdraft)\> |
`store?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`taxCalculationMode?` | [*Maybe*](#maybe)<[*TaxCalculationMode*](#enumstypes_graphqltaxcalculationmodemd)\> |
`taxMode?` | [*Maybe*](#maybe)<[*TaxMode*](#enumstypes_graphqltaxmodemd)\> |
`taxRoundingMode?` | [*Maybe*](#maybe)<[*RoundingMode*](#enumstypes_graphqlroundingmodemd)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:805](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L805)

___

##### CartQueryInterface

Ƭ **CartQueryInterface**: { `cart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `carts`: [*CartQueryResult*](#cartqueryresult)  }

Fields to access carts. Includes direct access to a single cart and searching for carts.

###### Type declaration:

Name | Type |
------ | ------ |
`cart?` | [*Maybe*](#maybe)<[*Cart*](#cart)\> |
`carts` | [*CartQueryResult*](#cartqueryresult) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:840](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L840)

___

##### CartQueryInterfaceCartArgs

Ƭ **CartQueryInterfaceCartArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

Fields to access carts. Includes direct access to a single cart and searching for carts.

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:846](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L846)

___

##### CartQueryInterfaceCartsArgs

Ƭ **CartQueryInterfaceCartsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

Fields to access carts. Includes direct access to a single cart and searching for carts.

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:851](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L851)

___

##### CartQueryResult

Ƭ **CartQueryResult**: { `__typename?`: *CartQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*Cart*](#cart)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *CartQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Cart*](#cart)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:858](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L858)

___

##### CartScoreInput

Ƭ **CartScoreInput**: { `dummy?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`dummy?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:866](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L866)

___

##### CartScoreType

Ƭ **CartScoreType**: [*ShippingRateInputType*](#shippingrateinputtype) & { `__typename?`: *CartScoreType* ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:870](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L870)

___

##### CartUpdateAction

Ƭ **CartUpdateAction**: { `addCustomLineItem?`: [*Maybe*](#maybe)<[*AddCartCustomLineItem*](#addcartcustomlineitem)\> ; `addDiscountCode?`: [*Maybe*](#maybe)<[*AddCartDiscountCode*](#addcartdiscountcode)\> ; `addItemShippingAddress?`: [*Maybe*](#maybe)<[*AddCartItemShippingAddress*](#addcartitemshippingaddress)\> ; `addLineItem?`: [*Maybe*](#maybe)<[*AddCartLineItem*](#addcartlineitem)\> ; `addPayment?`: [*Maybe*](#maybe)<[*AddCartPayment*](#addcartpayment)\> ; `addShoppingList?`: [*Maybe*](#maybe)<[*AddCartShoppingList*](#addcartshoppinglist)\> ; `applyDeltaToCustomLineItemShippingDetailsTargets?`: [*Maybe*](#maybe)<[*ApplyCartDeltaToCustomLineItemShippingDetailsTargets*](#applycartdeltatocustomlineitemshippingdetailstargets)\> ; `applyDeltaToLineItemShippingDetailsTargets?`: [*Maybe*](#maybe)<[*ApplyCartDeltaToLineItemShippingDetailsTargets*](#applycartdeltatolineitemshippingdetailstargets)\> ; `changeCustomLineItemMoney?`: [*Maybe*](#maybe)<[*ChangeCartCustomLineItemMoney*](#changecartcustomlineitemmoney)\> ; `changeCustomLineItemQuantity?`: [*Maybe*](#maybe)<[*ChangeCartCustomLineItemQuantity*](#changecartcustomlineitemquantity)\> ; `changeLineItemQuantity?`: [*Maybe*](#maybe)<[*ChangeCartLineItemQuantity*](#changecartlineitemquantity)\> ; `changeTaxCalculationMode?`: [*Maybe*](#maybe)<[*ChangeCartTaxCalculationMode*](#changecarttaxcalculationmode)\> ; `changeTaxMode?`: [*Maybe*](#maybe)<[*ChangeCartTaxMode*](#changecarttaxmode)\> ; `changeTaxRoundingMode?`: [*Maybe*](#maybe)<[*ChangeCartTaxRoundingMode*](#changecarttaxroundingmode)\> ; `recalculate?`: [*Maybe*](#maybe)<[*RecalculateCart*](#recalculatecart)\> ; `removeCustomLineItem?`: [*Maybe*](#maybe)<[*RemoveCartCustomLineItem*](#removecartcustomlineitem)\> ; `removeDiscountCode?`: [*Maybe*](#maybe)<[*RemoveCartDiscountCode*](#removecartdiscountcode)\> ; `removeItemShippingAddress?`: [*Maybe*](#maybe)<[*RemoveCartItemShippingAddress*](#removecartitemshippingaddress)\> ; `removeLineItem?`: [*Maybe*](#maybe)<[*RemoveCartLineItem*](#removecartlineitem)\> ; `removePayment?`: [*Maybe*](#maybe)<[*RemoveCartPayment*](#removecartpayment)\> ; `setAnonymousId?`: [*Maybe*](#maybe)<[*SetCartAnonymousId*](#setcartanonymousid)\> ; `setBillingAddress?`: [*Maybe*](#maybe)<[*SetCartBillingAddress*](#setcartbillingaddress)\> ; `setCartTotalTax?`: [*Maybe*](#maybe)<[*SetCartTotalTax*](#setcarttotaltax)\> ; `setCountry?`: [*Maybe*](#maybe)<[*SetCartCountry*](#setcartcountry)\> ; `setCustomField?`: [*Maybe*](#maybe)<[*SetCartCustomField*](#setcartcustomfield)\> ; `setCustomLineItemCustomField?`: [*Maybe*](#maybe)<[*SetCartCustomLineItemCustomField*](#setcartcustomlineitemcustomfield)\> ; `setCustomLineItemCustomType?`: [*Maybe*](#maybe)<[*SetCartCustomLineItemCustomType*](#setcartcustomlineitemcustomtype)\> ; `setCustomLineItemShippingDetails?`: [*Maybe*](#maybe)<[*SetCartCustomLineItemShippingDetails*](#setcartcustomlineitemshippingdetails)\> ; `setCustomLineItemTaxAmount?`: [*Maybe*](#maybe)<[*SetCartCustomLineItemTaxAmount*](#setcartcustomlineitemtaxamount)\> ; `setCustomLineItemTaxRate?`: [*Maybe*](#maybe)<[*SetCartCustomLineItemTaxRate*](#setcartcustomlineitemtaxrate)\> ; `setCustomShippingMethod?`: [*Maybe*](#maybe)<[*SetCartCustomShippingMethod*](#setcartcustomshippingmethod)\> ; `setCustomType?`: [*Maybe*](#maybe)<[*SetCartCustomType*](#setcartcustomtype)\> ; `setCustomerEmail?`: [*Maybe*](#maybe)<[*SetCartCustomerEmail*](#setcartcustomeremail)\> ; `setCustomerGroup?`: [*Maybe*](#maybe)<[*SetCartCustomerGroup*](#setcartcustomergroup)\> ; `setCustomerId?`: [*Maybe*](#maybe)<[*SetCartCustomerId*](#setcartcustomerid)\> ; `setDeleteDaysAfterLastModification?`: [*Maybe*](#maybe)<[*SetCartDeleteDaysAfterLastModification*](#setcartdeletedaysafterlastmodification)\> ; `setLineItemCustomField?`: [*Maybe*](#maybe)<[*SetCartLineItemCustomField*](#setcartlineitemcustomfield)\> ; `setLineItemCustomType?`: [*Maybe*](#maybe)<[*SetCartLineItemCustomType*](#setcartlineitemcustomtype)\> ; `setLineItemPrice?`: [*Maybe*](#maybe)<[*SetCartLineItemPrice*](#setcartlineitemprice)\> ; `setLineItemShippingDetails?`: [*Maybe*](#maybe)<[*SetCartLineItemShippingDetails*](#setcartlineitemshippingdetails)\> ; `setLineItemTaxAmount?`: [*Maybe*](#maybe)<[*SetCartLineItemTaxAmount*](#setcartlineitemtaxamount)\> ; `setLineItemTaxRate?`: [*Maybe*](#maybe)<[*SetCartLineItemTaxRate*](#setcartlineitemtaxrate)\> ; `setLineItemTotalPrice?`: [*Maybe*](#maybe)<[*SetCartLineItemTotalPrice*](#setcartlineitemtotalprice)\> ; `setLocale?`: [*Maybe*](#maybe)<[*SetCartLocale*](#setcartlocale)\> ; `setShippingAddress?`: [*Maybe*](#maybe)<[*SetCartShippingAddress*](#setcartshippingaddress)\> ; `setShippingMethod?`: [*Maybe*](#maybe)<[*SetCartShippingMethod*](#setcartshippingmethod)\> ; `setShippingMethodTaxAmount?`: [*Maybe*](#maybe)<[*SetCartShippingMethodTaxAmount*](#setcartshippingmethodtaxamount)\> ; `setShippingMethodTaxRate?`: [*Maybe*](#maybe)<[*SetCartShippingMethodTaxRate*](#setcartshippingmethodtaxrate)\> ; `setShippingRateInput?`: [*Maybe*](#maybe)<[*SetCartShippingRateInput*](#setcartshippingrateinput)\> ; `updateItemShippingAddress?`: [*Maybe*](#maybe)<[*UpdateCartItemShippingAddress*](#updatecartitemshippingaddress)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addCustomLineItem?` | [*Maybe*](#maybe)<[*AddCartCustomLineItem*](#addcartcustomlineitem)\> |
`addDiscountCode?` | [*Maybe*](#maybe)<[*AddCartDiscountCode*](#addcartdiscountcode)\> |
`addItemShippingAddress?` | [*Maybe*](#maybe)<[*AddCartItemShippingAddress*](#addcartitemshippingaddress)\> |
`addLineItem?` | [*Maybe*](#maybe)<[*AddCartLineItem*](#addcartlineitem)\> |
`addPayment?` | [*Maybe*](#maybe)<[*AddCartPayment*](#addcartpayment)\> |
`addShoppingList?` | [*Maybe*](#maybe)<[*AddCartShoppingList*](#addcartshoppinglist)\> |
`applyDeltaToCustomLineItemShippingDetailsTargets?` | [*Maybe*](#maybe)<[*ApplyCartDeltaToCustomLineItemShippingDetailsTargets*](#applycartdeltatocustomlineitemshippingdetailstargets)\> |
`applyDeltaToLineItemShippingDetailsTargets?` | [*Maybe*](#maybe)<[*ApplyCartDeltaToLineItemShippingDetailsTargets*](#applycartdeltatolineitemshippingdetailstargets)\> |
`changeCustomLineItemMoney?` | [*Maybe*](#maybe)<[*ChangeCartCustomLineItemMoney*](#changecartcustomlineitemmoney)\> |
`changeCustomLineItemQuantity?` | [*Maybe*](#maybe)<[*ChangeCartCustomLineItemQuantity*](#changecartcustomlineitemquantity)\> |
`changeLineItemQuantity?` | [*Maybe*](#maybe)<[*ChangeCartLineItemQuantity*](#changecartlineitemquantity)\> |
`changeTaxCalculationMode?` | [*Maybe*](#maybe)<[*ChangeCartTaxCalculationMode*](#changecarttaxcalculationmode)\> |
`changeTaxMode?` | [*Maybe*](#maybe)<[*ChangeCartTaxMode*](#changecarttaxmode)\> |
`changeTaxRoundingMode?` | [*Maybe*](#maybe)<[*ChangeCartTaxRoundingMode*](#changecarttaxroundingmode)\> |
`recalculate?` | [*Maybe*](#maybe)<[*RecalculateCart*](#recalculatecart)\> |
`removeCustomLineItem?` | [*Maybe*](#maybe)<[*RemoveCartCustomLineItem*](#removecartcustomlineitem)\> |
`removeDiscountCode?` | [*Maybe*](#maybe)<[*RemoveCartDiscountCode*](#removecartdiscountcode)\> |
`removeItemShippingAddress?` | [*Maybe*](#maybe)<[*RemoveCartItemShippingAddress*](#removecartitemshippingaddress)\> |
`removeLineItem?` | [*Maybe*](#maybe)<[*RemoveCartLineItem*](#removecartlineitem)\> |
`removePayment?` | [*Maybe*](#maybe)<[*RemoveCartPayment*](#removecartpayment)\> |
`setAnonymousId?` | [*Maybe*](#maybe)<[*SetCartAnonymousId*](#setcartanonymousid)\> |
`setBillingAddress?` | [*Maybe*](#maybe)<[*SetCartBillingAddress*](#setcartbillingaddress)\> |
`setCartTotalTax?` | [*Maybe*](#maybe)<[*SetCartTotalTax*](#setcarttotaltax)\> |
`setCountry?` | [*Maybe*](#maybe)<[*SetCartCountry*](#setcartcountry)\> |
`setCustomField?` | [*Maybe*](#maybe)<[*SetCartCustomField*](#setcartcustomfield)\> |
`setCustomLineItemCustomField?` | [*Maybe*](#maybe)<[*SetCartCustomLineItemCustomField*](#setcartcustomlineitemcustomfield)\> |
`setCustomLineItemCustomType?` | [*Maybe*](#maybe)<[*SetCartCustomLineItemCustomType*](#setcartcustomlineitemcustomtype)\> |
`setCustomLineItemShippingDetails?` | [*Maybe*](#maybe)<[*SetCartCustomLineItemShippingDetails*](#setcartcustomlineitemshippingdetails)\> |
`setCustomLineItemTaxAmount?` | [*Maybe*](#maybe)<[*SetCartCustomLineItemTaxAmount*](#setcartcustomlineitemtaxamount)\> |
`setCustomLineItemTaxRate?` | [*Maybe*](#maybe)<[*SetCartCustomLineItemTaxRate*](#setcartcustomlineitemtaxrate)\> |
`setCustomShippingMethod?` | [*Maybe*](#maybe)<[*SetCartCustomShippingMethod*](#setcartcustomshippingmethod)\> |
`setCustomType?` | [*Maybe*](#maybe)<[*SetCartCustomType*](#setcartcustomtype)\> |
`setCustomerEmail?` | [*Maybe*](#maybe)<[*SetCartCustomerEmail*](#setcartcustomeremail)\> |
`setCustomerGroup?` | [*Maybe*](#maybe)<[*SetCartCustomerGroup*](#setcartcustomergroup)\> |
`setCustomerId?` | [*Maybe*](#maybe)<[*SetCartCustomerId*](#setcartcustomerid)\> |
`setDeleteDaysAfterLastModification?` | [*Maybe*](#maybe)<[*SetCartDeleteDaysAfterLastModification*](#setcartdeletedaysafterlastmodification)\> |
`setLineItemCustomField?` | [*Maybe*](#maybe)<[*SetCartLineItemCustomField*](#setcartlineitemcustomfield)\> |
`setLineItemCustomType?` | [*Maybe*](#maybe)<[*SetCartLineItemCustomType*](#setcartlineitemcustomtype)\> |
`setLineItemPrice?` | [*Maybe*](#maybe)<[*SetCartLineItemPrice*](#setcartlineitemprice)\> |
`setLineItemShippingDetails?` | [*Maybe*](#maybe)<[*SetCartLineItemShippingDetails*](#setcartlineitemshippingdetails)\> |
`setLineItemTaxAmount?` | [*Maybe*](#maybe)<[*SetCartLineItemTaxAmount*](#setcartlineitemtaxamount)\> |
`setLineItemTaxRate?` | [*Maybe*](#maybe)<[*SetCartLineItemTaxRate*](#setcartlineitemtaxrate)\> |
`setLineItemTotalPrice?` | [*Maybe*](#maybe)<[*SetCartLineItemTotalPrice*](#setcartlineitemtotalprice)\> |
`setLocale?` | [*Maybe*](#maybe)<[*SetCartLocale*](#setcartlocale)\> |
`setShippingAddress?` | [*Maybe*](#maybe)<[*SetCartShippingAddress*](#setcartshippingaddress)\> |
`setShippingMethod?` | [*Maybe*](#maybe)<[*SetCartShippingMethod*](#setcartshippingmethod)\> |
`setShippingMethodTaxAmount?` | [*Maybe*](#maybe)<[*SetCartShippingMethodTaxAmount*](#setcartshippingmethodtaxamount)\> |
`setShippingMethodTaxRate?` | [*Maybe*](#maybe)<[*SetCartShippingMethodTaxRate*](#setcartshippingmethodtaxrate)\> |
`setShippingRateInput?` | [*Maybe*](#maybe)<[*SetCartShippingRateInput*](#setcartshippingrateinput)\> |
`updateItemShippingAddress?` | [*Maybe*](#maybe)<[*UpdateCartItemShippingAddress*](#updatecartitemshippingaddress)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:884](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L884)

___

##### CartValueInput

Ƭ **CartValueInput**: { `dummy?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`dummy?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:945](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L945)

___

##### CartValueType

Ƭ **CartValueType**: [*ShippingRateInputType*](#shippingrateinputtype) & { `__typename?`: *CartValueType* ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:949](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L949)

___

##### Category

Ƭ **Category**: [*Versioned*](#versioned) & { `__typename?`: *Category* ; `ancestors`: [*Category*](#category)[] ; `ancestorsRef`: [*Reference*](#reference)[] ; `assets`: [*Asset*](#asset)[] ; `childCount`: [*Scalars*](#scalars)[*Int*] ; `children?`: [*Maybe*](#maybe)<[*Category*](#category)[]\> ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `descriptionAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `externalId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `metaDescription?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `metaKeywords?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `metaTitle?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales`: [*LocalizedString*](#localizedstring)[] ; `orderHint`: [*Scalars*](#scalars)[*String*] ; `parent?`: [*Maybe*](#maybe)<[*Category*](#category)\> ; `parentRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `productCount`: [*Scalars*](#scalars)[*Int*] ; `slug?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `slugAllLocales`: [*LocalizedString*](#localizedstring)[] ; `stagedProductCount`: [*Scalars*](#scalars)[*Int*] ; `version`: [*Scalars*](#scalars)[*Long*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:954](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L954)

___

##### CategoryCustomFieldListArgs

Ƭ **CategoryCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1031](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1031)

___

##### CategoryCustomFieldsRawArgs

Ƭ **CategoryCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1026](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1026)

___

##### CategoryDescriptionArgs

Ƭ **CategoryDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1001](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1001)

___

##### CategoryDraft

Ƭ **CategoryDraft**: { `assets?`: [*Maybe*](#maybe)<[*AssetDraftInput*](#assetdraftinput)[]\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `externalId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `metaDescription?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `metaKeywords?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `metaTitle?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `orderHint?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `parent?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `slug`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`assets?` | [*Maybe*](#maybe)<[*AssetDraftInput*](#assetdraftinput)[]\> |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`externalId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`metaDescription?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`metaKeywords?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`metaTitle?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`orderHint?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`parent?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`slug` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1036](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1036)

___

##### CategoryMetaDescriptionArgs

Ƭ **CategoryMetaDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1021](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1021)

___

##### CategoryMetaKeywordsArgs

Ƭ **CategoryMetaKeywordsArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1016](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1016)

___

##### CategoryMetaTitleArgs

Ƭ **CategoryMetaTitleArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1011](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1011)

___

##### CategoryNameArgs

Ƭ **CategoryNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:996](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L996)

___

##### CategoryOrderHint

Ƭ **CategoryOrderHint**: { `__typename?`: *CategoryOrderHint* ; `categoryId`: [*Scalars*](#scalars)[*String*] ; `orderHint`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *CategoryOrderHint* |
`categoryId` | [*Scalars*](#scalars)[*String*] |
`orderHint` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1051](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1051)

___

##### CategoryOrderHintInput

Ƭ **CategoryOrderHintInput**: { `orderHint`: [*Scalars*](#scalars)[*String*] ; `uuid`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`orderHint` | [*Scalars*](#scalars)[*String*] |
`uuid` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1057](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1057)

___

##### CategoryQueryResult

Ƭ **CategoryQueryResult**: { `__typename?`: *CategoryQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*Category*](#category)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *CategoryQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Category*](#category)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1062](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1062)

___

##### CategorySearch

Ƭ **CategorySearch**: { `__typename?`: *CategorySearch* ; `ancestors`: [*CategorySearch*](#categorysearch)[] ; `ancestorsRef`: [*Reference*](#reference)[] ; `assets`: [*Asset*](#asset)[] ; `childCount`: [*Scalars*](#scalars)[*Int*] ; `children`: [*CategorySearch*](#categorysearch)[] ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `descriptionAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `externalId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales`: [*LocalizedString*](#localizedstring)[] ; `orderHint`: [*Scalars*](#scalars)[*String*] ; `parent?`: [*Maybe*](#maybe)<[*CategorySearch*](#categorysearch)\> ; `parentRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `productCount`: [*Scalars*](#scalars)[*Int*] ; `productTypeNames`: [*Scalars*](#scalars)[*String*][] ; `slug?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `slugAllLocales`: [*LocalizedString*](#localizedstring)[] ; `stagedProductCount`: [*Scalars*](#scalars)[*Int*] ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`__typename?` | *CategorySearch* | - |
`ancestors` | [*CategorySearch*](#categorysearch)[] | - |
`ancestorsRef` | [*Reference*](#reference)[] | - |
`assets` | [*Asset*](#asset)[] | - |
`childCount` | [*Scalars*](#scalars)[*Int*] | - |
`children` | [*CategorySearch*](#categorysearch)[] | Direct child categories.   |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] | - |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> | - |
`customFieldList?` | [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> | Custom fields are returned as a list instead of an object structure.   |
`customFields?` | [*Maybe*](#maybe)<[*Type*](#type)\> | This field would contain type data   |
`customFieldsRaw?` | [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> | This field contains non-typed data. Consider using `customFields` as a typed alternative.   |
`description?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`descriptionAllLocales?` | [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> | - |
`externalId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`id` | [*Scalars*](#scalars)[*String*] | - |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`lastModifiedAt` | [*Scalars*](#scalars)[*DateTime*] | - |
`name?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] | - |
`orderHint` | [*Scalars*](#scalars)[*String*] | - |
`parent?` | [*Maybe*](#maybe)<[*CategorySearch*](#categorysearch)\> | - |
`parentRef?` | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`productCount` | [*Scalars*](#scalars)[*Int*] | - |
`productTypeNames` | [*Scalars*](#scalars)[*String*][] | - |
`slug?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`slugAllLocales` | [*LocalizedString*](#localizedstring)[] | - |
`stagedProductCount` | [*Scalars*](#scalars)[*Int*] | - |
`version` | [*Scalars*](#scalars)[*Long*] | - |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1070](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1070)

___

##### CategorySearchCustomFieldListArgs

Ƭ **CategorySearchCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1125](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1125)

___

##### CategorySearchCustomFieldsRawArgs

Ƭ **CategorySearchCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1120](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1120)

___

##### CategorySearchDescriptionArgs

Ƭ **CategorySearchDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1110](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1110)

___

##### CategorySearchNameArgs

Ƭ **CategorySearchNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1105](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1105)

___

##### CategorySearchResult

Ƭ **CategorySearchResult**: { `__typename?`: *CategorySearchResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*CategorySearch*](#categorysearch)[] ; `total`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *CategorySearchResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*CategorySearch*](#categorysearch)[] |
`total` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1130](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1130)

___

##### CategorySearchSlugArgs

Ƭ **CategorySearchSlugArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1115](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1115)

___

##### CategorySlugArgs

Ƭ **CategorySlugArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1006](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1006)

___

##### CategoryUpdateAction

Ƭ **CategoryUpdateAction**: { `addAsset?`: [*Maybe*](#maybe)<[*AddCategoryAsset*](#addcategoryasset)\> ; `changeAssetName?`: [*Maybe*](#maybe)<[*ChangeCategoryAssetName*](#changecategoryassetname)\> ; `changeAssetOrder?`: [*Maybe*](#maybe)<[*ChangeCategoryAssetOrder*](#changecategoryassetorder)\> ; `changeName?`: [*Maybe*](#maybe)<[*ChangeCategoryName*](#changecategoryname)\> ; `changeOrderHint?`: [*Maybe*](#maybe)<[*ChangeCategoryOrderHint*](#changecategoryorderhint)\> ; `changeParent?`: [*Maybe*](#maybe)<[*ChangeCategoryParent*](#changecategoryparent)\> ; `changeSlug?`: [*Maybe*](#maybe)<[*ChangeCategorySlug*](#changecategoryslug)\> ; `removeAsset?`: [*Maybe*](#maybe)<[*RemoveCategoryAsset*](#removecategoryasset)\> ; `setAssetCustomField?`: [*Maybe*](#maybe)<[*SetCategoryAssetCustomField*](#setcategoryassetcustomfield)\> ; `setAssetCustomType?`: [*Maybe*](#maybe)<[*SetCategoryAssetCustomType*](#setcategoryassetcustomtype)\> ; `setAssetDescription?`: [*Maybe*](#maybe)<[*SetCategoryAssetDescription*](#setcategoryassetdescription)\> ; `setAssetKey?`: [*Maybe*](#maybe)<[*SetCategoryAssetKey*](#setcategoryassetkey)\> ; `setAssetSources?`: [*Maybe*](#maybe)<[*SetCategoryAssetSources*](#setcategoryassetsources)\> ; `setAssetTags?`: [*Maybe*](#maybe)<[*SetCategoryAssetTags*](#setcategoryassettags)\> ; `setCustomField?`: [*Maybe*](#maybe)<[*SetCategoryCustomField*](#setcategorycustomfield)\> ; `setCustomType?`: [*Maybe*](#maybe)<[*SetCategoryCustomType*](#setcategorycustomtype)\> ; `setDescription?`: [*Maybe*](#maybe)<[*SetCategoryDescription*](#setcategorydescription)\> ; `setExternalId?`: [*Maybe*](#maybe)<[*SetCategoryExternalId*](#setcategoryexternalid)\> ; `setKey?`: [*Maybe*](#maybe)<[*SetCategoryKey*](#setcategorykey)\> ; `setMetaDescription?`: [*Maybe*](#maybe)<[*SetCategoryMetaDescription*](#setcategorymetadescription)\> ; `setMetaKeywords?`: [*Maybe*](#maybe)<[*SetCategoryMetaKeywords*](#setcategorymetakeywords)\> ; `setMetaTitle?`: [*Maybe*](#maybe)<[*SetCategoryMetaTitle*](#setcategorymetatitle)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addAsset?` | [*Maybe*](#maybe)<[*AddCategoryAsset*](#addcategoryasset)\> |
`changeAssetName?` | [*Maybe*](#maybe)<[*ChangeCategoryAssetName*](#changecategoryassetname)\> |
`changeAssetOrder?` | [*Maybe*](#maybe)<[*ChangeCategoryAssetOrder*](#changecategoryassetorder)\> |
`changeName?` | [*Maybe*](#maybe)<[*ChangeCategoryName*](#changecategoryname)\> |
`changeOrderHint?` | [*Maybe*](#maybe)<[*ChangeCategoryOrderHint*](#changecategoryorderhint)\> |
`changeParent?` | [*Maybe*](#maybe)<[*ChangeCategoryParent*](#changecategoryparent)\> |
`changeSlug?` | [*Maybe*](#maybe)<[*ChangeCategorySlug*](#changecategoryslug)\> |
`removeAsset?` | [*Maybe*](#maybe)<[*RemoveCategoryAsset*](#removecategoryasset)\> |
`setAssetCustomField?` | [*Maybe*](#maybe)<[*SetCategoryAssetCustomField*](#setcategoryassetcustomfield)\> |
`setAssetCustomType?` | [*Maybe*](#maybe)<[*SetCategoryAssetCustomType*](#setcategoryassetcustomtype)\> |
`setAssetDescription?` | [*Maybe*](#maybe)<[*SetCategoryAssetDescription*](#setcategoryassetdescription)\> |
`setAssetKey?` | [*Maybe*](#maybe)<[*SetCategoryAssetKey*](#setcategoryassetkey)\> |
`setAssetSources?` | [*Maybe*](#maybe)<[*SetCategoryAssetSources*](#setcategoryassetsources)\> |
`setAssetTags?` | [*Maybe*](#maybe)<[*SetCategoryAssetTags*](#setcategoryassettags)\> |
`setCustomField?` | [*Maybe*](#maybe)<[*SetCategoryCustomField*](#setcategorycustomfield)\> |
`setCustomType?` | [*Maybe*](#maybe)<[*SetCategoryCustomType*](#setcategorycustomtype)\> |
`setDescription?` | [*Maybe*](#maybe)<[*SetCategoryDescription*](#setcategorydescription)\> |
`setExternalId?` | [*Maybe*](#maybe)<[*SetCategoryExternalId*](#setcategoryexternalid)\> |
`setKey?` | [*Maybe*](#maybe)<[*SetCategoryKey*](#setcategorykey)\> |
`setMetaDescription?` | [*Maybe*](#maybe)<[*SetCategoryMetaDescription*](#setcategorymetadescription)\> |
`setMetaKeywords?` | [*Maybe*](#maybe)<[*SetCategoryMetaKeywords*](#setcategorymetakeywords)\> |
`setMetaTitle?` | [*Maybe*](#maybe)<[*SetCategoryMetaTitle*](#setcategorymetatitle)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1138](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1138)

___

##### ChangeAttributeName

Ƭ **ChangeAttributeName**: { `attributeName`: [*Scalars*](#scalars)[*String*] ; `newAttributeName`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`newAttributeName` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1163](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1163)

___

##### ChangeAttributeOrder

Ƭ **ChangeAttributeOrder**: { `attributeDefinitions`: [*AttributeDefinitionDraft*](#attributedefinitiondraft)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeDefinitions` | [*AttributeDefinitionDraft*](#attributedefinitiondraft)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1168](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1168)

___

##### ChangeAttributeOrderByName

Ƭ **ChangeAttributeOrderByName**: { `attributeNames`: [*Scalars*](#scalars)[*String*][]  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeNames` | [*Scalars*](#scalars)[*String*][] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1172](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1172)

___

##### ChangeCartCustomLineItemMoney

Ƭ **ChangeCartCustomLineItemMoney**: { `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `money`: [*BaseMoneyInput*](#basemoneyinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`money` | [*BaseMoneyInput*](#basemoneyinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1176](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1176)

___

##### ChangeCartCustomLineItemQuantity

Ƭ **ChangeCartCustomLineItemQuantity**: { `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `quantity`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1181](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1181)

___

##### ChangeCartDiscountCartPredicate

Ƭ **ChangeCartDiscountCartPredicate**: { `cartPredicate`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`cartPredicate` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1186](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1186)

___

##### ChangeCartDiscountIsActive

Ƭ **ChangeCartDiscountIsActive**: { `isActive`: [*Scalars*](#scalars)[*Boolean*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`isActive` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1190](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1190)

___

##### ChangeCartDiscountName

Ƭ **ChangeCartDiscountName**: { `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1194](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1194)

___

##### ChangeCartDiscountRequiresDiscountCode

Ƭ **ChangeCartDiscountRequiresDiscountCode**: { `requiresDiscountCode`: [*Scalars*](#scalars)[*Boolean*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`requiresDiscountCode` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1198](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1198)

___

##### ChangeCartDiscountSortOrder

Ƭ **ChangeCartDiscountSortOrder**: { `sortOrder`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`sortOrder` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1202](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1202)

___

##### ChangeCartDiscountStackingMode

Ƭ **ChangeCartDiscountStackingMode**: { `stackingMode`: [*StackingMode*](#enumstypes_graphqlstackingmodemd)  }

###### Type declaration:

Name | Type |
------ | ------ |
`stackingMode` | [*StackingMode*](#enumstypes_graphqlstackingmodemd) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1206](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1206)

___

##### ChangeCartDiscountTarget

Ƭ **ChangeCartDiscountTarget**: { `target`: [*CartDiscountTargetInput*](#cartdiscounttargetinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`target` | [*CartDiscountTargetInput*](#cartdiscounttargetinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1210](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1210)

___

##### ChangeCartDiscountValue

Ƭ **ChangeCartDiscountValue**: { `value`: [*CartDiscountValueInput*](#cartdiscountvalueinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`value` | [*CartDiscountValueInput*](#cartdiscountvalueinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1214](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1214)

___

##### ChangeCartLineItemQuantity

Ƭ **ChangeCartLineItemQuantity**: { `externalPrice?`: [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> ; `externalTotalPrice?`: [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> ; `lineItemId`: [*Scalars*](#scalars)[*String*] ; `quantity`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalPrice?` | [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> |
`externalTotalPrice?` | [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1218](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1218)

___

##### ChangeCartTaxCalculationMode

Ƭ **ChangeCartTaxCalculationMode**: { `taxCalculationMode`: [*TaxCalculationMode*](#enumstypes_graphqltaxcalculationmodemd)  }

###### Type declaration:

Name | Type |
------ | ------ |
`taxCalculationMode` | [*TaxCalculationMode*](#enumstypes_graphqltaxcalculationmodemd) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1225](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1225)

___

##### ChangeCartTaxMode

Ƭ **ChangeCartTaxMode**: { `taxMode`: [*TaxMode*](#enumstypes_graphqltaxmodemd)  }

###### Type declaration:

Name | Type |
------ | ------ |
`taxMode` | [*TaxMode*](#enumstypes_graphqltaxmodemd) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1229](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1229)

___

##### ChangeCartTaxRoundingMode

Ƭ **ChangeCartTaxRoundingMode**: { `taxRoundingMode`: [*RoundingMode*](#enumstypes_graphqlroundingmodemd)  }

###### Type declaration:

Name | Type |
------ | ------ |
`taxRoundingMode` | [*RoundingMode*](#enumstypes_graphqlroundingmodemd) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1233](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1233)

___

##### ChangeCategoryAssetName

Ƭ **ChangeCategoryAssetName**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1237](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1237)

___

##### ChangeCategoryAssetOrder

Ƭ **ChangeCategoryAssetOrder**: { `assetOrder`: [*Scalars*](#scalars)[*String*][]  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetOrder` | [*Scalars*](#scalars)[*String*][] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1243](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1243)

___

##### ChangeCategoryName

Ƭ **ChangeCategoryName**: { `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1247](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1247)

___

##### ChangeCategoryOrderHint

Ƭ **ChangeCategoryOrderHint**: { `orderHint`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`orderHint` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1251](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1251)

___

##### ChangeCategoryParent

Ƭ **ChangeCategoryParent**: { `parent`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`parent` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1255](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1255)

___

##### ChangeCategorySlug

Ƭ **ChangeCategorySlug**: { `slug`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`slug` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1259](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1259)

___

##### ChangeCustomerAddress

Ƭ **ChangeCustomerAddress**: { `address`: [*AddressInput*](#addressinput) ; `addressId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`address` | [*AddressInput*](#addressinput) |
`addressId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1263](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1263)

___

##### ChangeCustomerEmail

Ƭ **ChangeCustomerEmail**: { `email`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`email` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1268](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1268)

___

##### ChangeCustomerGroupName

Ƭ **ChangeCustomerGroupName**: { `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1272](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1272)

___

##### ChangeDescription

Ƭ **ChangeDescription**: { `description`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`description` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1276](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1276)

___

##### ChangeDiscountCodeCartDiscounts

Ƭ **ChangeDiscountCodeCartDiscounts**: { `cartDiscounts`: [*ReferenceInput*](#referenceinput)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`cartDiscounts` | [*ReferenceInput*](#referenceinput)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1280](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1280)

___

##### ChangeDiscountCodeGroups

Ƭ **ChangeDiscountCodeGroups**: { `groups`: [*Scalars*](#scalars)[*String*][]  }

###### Type declaration:

Name | Type |
------ | ------ |
`groups` | [*Scalars*](#scalars)[*String*][] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1284](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1284)

___

##### ChangeDiscountCodeIsActive

Ƭ **ChangeDiscountCodeIsActive**: { `isActive`: [*Scalars*](#scalars)[*Boolean*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`isActive` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1288](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1288)

___

##### ChangeEnumKey

Ƭ **ChangeEnumKey**: { `attributeName`: [*Scalars*](#scalars)[*String*] ; `key`: [*Scalars*](#scalars)[*String*] ; `newKey`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`key` | [*Scalars*](#scalars)[*String*] |
`newKey` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1292](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1292)

___

##### ChangeInputHint

Ƭ **ChangeInputHint**: { `attributeName`: [*Scalars*](#scalars)[*String*] ; `newValue`: [*TextInputHint*](#enumstypes_graphqltextinputhintmd)  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`newValue` | [*TextInputHint*](#enumstypes_graphqltextinputhintmd) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1298](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1298)

___

##### ChangeInventoryEntryQuantity

Ƭ **ChangeInventoryEntryQuantity**: { `quantity`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1303](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1303)

___

##### ChangeIsSearchable

Ƭ **ChangeIsSearchable**: { `attributeName`: [*Scalars*](#scalars)[*String*] ; `isSearchable`: [*Scalars*](#scalars)[*Boolean*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`isSearchable` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1307](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1307)

___

##### ChangeLabel

Ƭ **ChangeLabel**: { `attributeName`: [*Scalars*](#scalars)[*String*] ; `label`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`label` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1312](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1312)

___

##### ChangeLocalizedEnumValueLabel

Ƭ **ChangeLocalizedEnumValueLabel**: { `attributeName`: [*Scalars*](#scalars)[*String*] ; `newValue`: [*LocalizedEnumValueDraft*](#localizedenumvaluedraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`newValue` | [*LocalizedEnumValueDraft*](#localizedenumvaluedraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1317](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1317)

___

##### ChangeLocalizedEnumValueOrder

Ƭ **ChangeLocalizedEnumValueOrder**: { `attributeName`: [*Scalars*](#scalars)[*String*] ; `values`: [*LocalizedEnumValueDraft*](#localizedenumvaluedraft)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`values` | [*LocalizedEnumValueDraft*](#localizedenumvaluedraft)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1322](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1322)

___

##### ChangeMyCartTaxMode

Ƭ **ChangeMyCartTaxMode**: { `taxMode`: [*TaxMode*](#enumstypes_graphqltaxmodemd)  }

###### Type declaration:

Name | Type |
------ | ------ |
`taxMode` | [*TaxMode*](#enumstypes_graphqltaxmodemd) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1327](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1327)

___

##### ChangeName

Ƭ **ChangeName**: { `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1331](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1331)

___

##### ChangeOrderPaymentState

Ƭ **ChangeOrderPaymentState**: { `paymentState`: [*PaymentState*](#enumstypes_graphqlpaymentstatemd)  }

###### Type declaration:

Name | Type |
------ | ------ |
`paymentState` | [*PaymentState*](#enumstypes_graphqlpaymentstatemd) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1335](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1335)

___

##### ChangeOrderShipmentState

Ƭ **ChangeOrderShipmentState**: { `shipmentState`: [*ShipmentState*](#enumstypes_graphqlshipmentstatemd)  }

###### Type declaration:

Name | Type |
------ | ------ |
`shipmentState` | [*ShipmentState*](#enumstypes_graphqlshipmentstatemd) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1339](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1339)

___

##### ChangeOrderState

Ƭ **ChangeOrderState**: { `orderState`: [*OrderState*](#enumstypes_graphqlorderstatemd)  }

###### Type declaration:

Name | Type |
------ | ------ |
`orderState` | [*OrderState*](#enumstypes_graphqlorderstatemd) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1343](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1343)

___

##### ChangePlainEnumValueLabel

Ƭ **ChangePlainEnumValueLabel**: { `attributeName`: [*Scalars*](#scalars)[*String*] ; `newValue`: [*PlainEnumValueDraft*](#plainenumvaluedraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`newValue` | [*PlainEnumValueDraft*](#plainenumvaluedraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1347](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1347)

___

##### ChangePlainEnumValueOrder

Ƭ **ChangePlainEnumValueOrder**: { `attributeName`: [*Scalars*](#scalars)[*String*] ; `values`: [*PlainEnumValueDraft*](#plainenumvaluedraft)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`values` | [*PlainEnumValueDraft*](#plainenumvaluedraft)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1352](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1352)

___

##### ChangeProductAssetName

Ƭ **ChangeProductAssetName**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1357](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1357)

___

##### ChangeProductAssetOrder

Ƭ **ChangeProductAssetOrder**: { `assetOrder`: [*Scalars*](#scalars)[*String*][] ; `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetOrder` | [*Scalars*](#scalars)[*String*][] |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1367](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1367)

___

##### ChangeProductDiscountIsActive

Ƭ **ChangeProductDiscountIsActive**: { `isActive`: [*Scalars*](#scalars)[*Boolean*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`isActive` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1375](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1375)

___

##### ChangeProductDiscountName

Ƭ **ChangeProductDiscountName**: { `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1379](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1379)

___

##### ChangeProductDiscountPredicate

Ƭ **ChangeProductDiscountPredicate**: { `predicate`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`predicate` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1383](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1383)

___

##### ChangeProductDiscountSortOrder

Ƭ **ChangeProductDiscountSortOrder**: { `sortOrder`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`sortOrder` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1387](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1387)

___

##### ChangeProductDiscountValue

Ƭ **ChangeProductDiscountValue**: { `value`: [*ProductDiscountValueInput*](#productdiscountvalueinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`value` | [*ProductDiscountValueInput*](#productdiscountvalueinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1391](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1391)

___

##### ChangeProductImageLabel

Ƭ **ChangeProductImageLabel**: { `imageUrl`: [*Scalars*](#scalars)[*String*] ; `label?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`imageUrl` | [*Scalars*](#scalars)[*String*] |
`label?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1395](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1395)

___

##### ChangeProductMasterVariant

Ƭ **ChangeProductMasterVariant**: { `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1403](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1403)

___

##### ChangeProductName

Ƭ **ChangeProductName**: { `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1409](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1409)

___

##### ChangeProductPrice

Ƭ **ChangeProductPrice**: { `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `price`: [*ProductPriceDataInput*](#productpricedatainput) ; `priceId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`price` | [*ProductPriceDataInput*](#productpricedatainput) |
`priceId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1414](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1414)

___

##### ChangeProductSlug

Ƭ **ChangeProductSlug**: { `slug`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`slug` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1423](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1423)

___

##### ChangeProjectSettingsCountries

Ƭ **ChangeProjectSettingsCountries**: { `countries`: [*Scalars*](#scalars)[*Country*][]  }

###### Type declaration:

Name | Type |
------ | ------ |
`countries` | [*Scalars*](#scalars)[*Country*][] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1428](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1428)

___

##### ChangeProjectSettingsCurrencies

Ƭ **ChangeProjectSettingsCurrencies**: { `currencies`: [*Scalars*](#scalars)[*Currency*][]  }

###### Type declaration:

Name | Type |
------ | ------ |
`currencies` | [*Scalars*](#scalars)[*Currency*][] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1432](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1432)

___

##### ChangeProjectSettingsLanguages

Ƭ **ChangeProjectSettingsLanguages**: { `languages`: [*Scalars*](#scalars)[*Locale*][]  }

###### Type declaration:

Name | Type |
------ | ------ |
`languages` | [*Scalars*](#scalars)[*Locale*][] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1436](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1436)

___

##### ChangeProjectSettingsMessagesConfiguration

Ƭ **ChangeProjectSettingsMessagesConfiguration**: { `messagesConfiguration`: [*MessagesConfigurationDraft*](#messagesconfigurationdraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`messagesConfiguration` | [*MessagesConfigurationDraft*](#messagesconfigurationdraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1440](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1440)

___

##### ChangeProjectSettingsMessagesEnabled

Ƭ **ChangeProjectSettingsMessagesEnabled**: { `messagesEnabled`: [*Scalars*](#scalars)[*Boolean*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`messagesEnabled` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1444](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1444)

___

##### ChangeProjectSettingsName

Ƭ **ChangeProjectSettingsName**: { `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1448](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1448)

___

##### ChangeShippingMethodIsDefault

Ƭ **ChangeShippingMethodIsDefault**: { `isDefault`: [*Scalars*](#scalars)[*Boolean*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`isDefault` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1452](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1452)

___

##### ChangeShippingMethodName

Ƭ **ChangeShippingMethodName**: { `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1456](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1456)

___

##### ChangeShippingMethodTaxCategory

Ƭ **ChangeShippingMethodTaxCategory**: { `taxCategory`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`taxCategory` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1460](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1460)

___

##### ChangeShoppingListLineItemQuantity

Ƭ **ChangeShoppingListLineItemQuantity**: { `lineItemId`: [*Scalars*](#scalars)[*String*] ; `quantity`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1464](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1464)

___

##### ChangeShoppingListLineItemsOrder

Ƭ **ChangeShoppingListLineItemsOrder**: { `lineItemOrder`: [*Scalars*](#scalars)[*String*][]  }

###### Type declaration:

Name | Type |
------ | ------ |
`lineItemOrder` | [*Scalars*](#scalars)[*String*][] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1469](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1469)

___

##### ChangeShoppingListName

Ƭ **ChangeShoppingListName**: { `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1473](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1473)

___

##### ChangeShoppingListTextLineItemName

Ƭ **ChangeShoppingListTextLineItemName**: { `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `textLineItemId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`textLineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1477](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1477)

___

##### ChangeShoppingListTextLineItemQuantity

Ƭ **ChangeShoppingListTextLineItemQuantity**: { `quantity`: [*Scalars*](#scalars)[*Int*] ; `textLineItemId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`quantity` | [*Scalars*](#scalars)[*Int*] |
`textLineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1482](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1482)

___

##### ChangeShoppingListTextLineItemsOrder

Ƭ **ChangeShoppingListTextLineItemsOrder**: { `textLineItemOrder`: [*Scalars*](#scalars)[*String*][]  }

###### Type declaration:

Name | Type |
------ | ------ |
`textLineItemOrder` | [*Scalars*](#scalars)[*String*][] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1487](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1487)

___

##### ChangeZoneName

Ƭ **ChangeZoneName**: { `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1491](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1491)

___

##### Channel

Ƭ **Channel**: [*Versioned*](#versioned) & { `__typename?`: *Channel* ; `address?`: [*Maybe*](#maybe)<[*Address*](#address)\> ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `descriptionAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `geoLocation?`: [*Maybe*](#maybe)<[*Geometry*](#geometry)\> ; `id`: [*Scalars*](#scalars)[*String*] ; `key`: [*Scalars*](#scalars)[*String*] ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `roles`: [*ChannelRole*](#enumstypes_graphqlchannelrolemd)[] ; `version`: [*Scalars*](#scalars)[*Long*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1495](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1495)

___

##### ChannelCustomFieldsRawArgs

Ƭ **ChannelCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1528](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1528)

___

##### ChannelDescriptionArgs

Ƭ **ChannelDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1523](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1523)

___

##### ChannelNameArgs

Ƭ **ChannelNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1518](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1518)

___

##### ChannelQueryResult

Ƭ **ChannelQueryResult**: { `__typename?`: *ChannelQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*Channel*](#channel)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ChannelQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Channel*](#channel)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1533](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1533)

___

##### ChannelReferenceIdentifier

Ƭ **ChannelReferenceIdentifier**: { `__typename?`: *ChannelReferenceIdentifier* ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ChannelReferenceIdentifier* |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1541](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1541)

___

##### ClassificationShippingRateInput

Ƭ **ClassificationShippingRateInput**: [*ShippingRateInput*](#shippingrateinput) & { `__typename?`: *ClassificationShippingRateInput* ; `key`: [*Scalars*](#scalars)[*String*] ; `label?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `labelAllLocales`: [*LocalizedString*](#localizedstring)[] ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1566](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1566)

___

##### ClassificationShippingRateInputDraft

Ƭ **ClassificationShippingRateInputDraft**: { `key`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`key` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1579](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1579)

___

##### ClassificationShippingRateInputLabelArgs

Ƭ **ClassificationShippingRateInputLabelArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1574](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1574)

___

##### CreateApiClient

Ƭ **CreateApiClient**: { `name`: [*Scalars*](#scalars)[*String*] ; `scope`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`scope` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1583](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1583)

___

##### CreateStore

Ƭ **CreateStore**: { `key`: [*Scalars*](#scalars)[*String*] ; `languages?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `name?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key` | [*Scalars*](#scalars)[*String*] |
`languages?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`name?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1588](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1588)

___

##### CreateZone

Ƭ **CreateZone**: { `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `locations?`: [*Maybe*](#maybe)<[*ZoneLocation*](#zonelocation)[]\> ; `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`locations?` | [*Maybe*](#maybe)<[*ZoneLocation*](#zonelocation)[]\> |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1594](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1594)

___

##### CustomField

Ƭ **CustomField**: { `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1897](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1897)

___

##### CustomFieldInput

Ƭ **CustomFieldInput**: { `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*String*]  }

A key-value pair representing the field name and value of one single custom field.

The value of this custom field consists of escaped JSON based on the FieldDefinition of the Type.

Examples for `value`:

* FieldType `String`: `"\"This is a string\""`
* FieldType `DateTimeType`: `"\"2001-09-11T14:00:00.000Z\""`
* FieldType `Number`: `"4"`
* FieldType `Set` with an elementType of `String`: `"[\"This is a string\", \"This is another string\"]"`
* FieldType `Reference`: `"{\"id\", \"b911b62d-353a-4388-93ee-8d488d9af962\", \"typeId\", \"product\"}"`

###### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] | - |
`value` | [*Scalars*](#scalars)[*String*] | The value of this custom field consists of escaped JSON based on the FieldDefinition of the Type.  Examples for `value`:  * FieldType `String`: `"\"This is a string\""` * FieldType `DateTimeType`: `"\"2001-09-11T14:00:00.000Z\""` * FieldType `Number`: `"4"` * FieldType `Set` with an elementType of `String`: `"[\"This is a string\", \"This is another string\"]"` * FieldType `Reference`: `"{\"id\", \"b911b62d-353a-4388-93ee-8d488d9af962\", \"typeId\", \"product\"}"`    |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1913](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1913)

___

##### CustomFieldsDraft

Ƭ **CustomFieldsDraft**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1928](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1928)

___

##### CustomFieldsType

Ƭ **CustomFieldsType**: { `__typename?`: *CustomFieldsType* ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields`: [*Type*](#type) ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `type?`: [*Maybe*](#maybe)<[*TypeDefinition*](#typedefinition)\> ; `typeRef`: [*Reference*](#reference)  }

###### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`__typename?` | *CustomFieldsType* | - |
`customFieldList?` | [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> | Custom fields are returned as a list instead of an object structure.   |
`customFields` | [*Type*](#type) | This field would contain type data   |
`customFieldsRaw?` | [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> | This field contains non-typed data. For a typed alternative, have a look at `customFields`.   |
`type?` | [*Maybe*](#maybe)<[*TypeDefinition*](#typedefinition)\> | - |
`typeRef` | [*Reference*](#reference) | - |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1935](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1935)

___

##### CustomFieldsTypeCustomFieldListArgs

Ƭ **CustomFieldsTypeCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1952](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1952)

___

##### CustomFieldsTypeCustomFieldsRawArgs

Ƭ **CustomFieldsTypeCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1947](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1947)

___

##### CustomLineItem

Ƭ **CustomLineItem**: { `__typename?`: *CustomLineItem* ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `discountedPricePerQuantity`: [*DiscountedLineItemPriceForQuantity*](#discountedlineitempriceforquantity)[] ; `id`: [*Scalars*](#scalars)[*String*] ; `money`: [*BaseMoney*](#basemoney) ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales`: [*LocalizedString*](#localizedstring)[] ; `quantity`: [*Scalars*](#scalars)[*Long*] ; `shippingDetails?`: [*Maybe*](#maybe)<[*ItemShippingDetails*](#itemshippingdetails)\> ; `slug`: [*Scalars*](#scalars)[*String*] ; `state`: [*ItemState*](#itemstate)[] ; `taxCategory?`: [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> ; `taxCategoryRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `taxRate?`: [*Maybe*](#maybe)<[*TaxRate*](#taxrate)\> ; `totalPrice`: [*Money*](#money)  }

A custom line item is a generic item that can be added to the cart but is not
bound to a product. You can use it for discounts (negative money), vouchers,
complex cart rules, additional services or fees. You control the lifecycle of this item.

###### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`__typename?` | *CustomLineItem* | - |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> | - |
`customFieldList?` | [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> | Custom fields are returned as a list instead of an object structure.   |
`customFields?` | [*Maybe*](#maybe)<[*Type*](#type)\> | This field would contain type data   |
`customFieldsRaw?` | [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> | This field contains non-typed data. Consider using `customFields` as a typed alternative.   |
`discountedPricePerQuantity` | [*DiscountedLineItemPriceForQuantity*](#discountedlineitempriceforquantity)[] | - |
`id` | [*Scalars*](#scalars)[*String*] | - |
`money` | [*BaseMoney*](#basemoney) | - |
`name?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] | - |
`quantity` | [*Scalars*](#scalars)[*Long*] | - |
`shippingDetails?` | [*Maybe*](#maybe)<[*ItemShippingDetails*](#itemshippingdetails)\> | - |
`slug` | [*Scalars*](#scalars)[*String*] | - |
`state` | [*ItemState*](#itemstate)[] | - |
`taxCategory?` | [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> | - |
`taxCategoryRef?` | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`taxRate?` | [*Maybe*](#maybe)<[*TaxRate*](#taxrate)\> | - |
`totalPrice` | [*Money*](#money) | - |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1961](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1961)

___

##### CustomLineItemCustomFieldListArgs

Ƭ **CustomLineItemCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

A custom line item is a generic item that can be added to the cart but is not
bound to a product. You can use it for discounts (negative money), vouchers,
complex cart rules, additional services or fees. You control the lifecycle of this item.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2007](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2007)

___

##### CustomLineItemCustomFieldsRawArgs

Ƭ **CustomLineItemCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

A custom line item is a generic item that can be added to the cart but is not
bound to a product. You can use it for discounts (negative money), vouchers,
complex cart rules, additional services or fees. You control the lifecycle of this item.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1998](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1998)

___

##### CustomLineItemDraft

Ƭ **CustomLineItemDraft**: { `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `externalTaxRate?`: [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> ; `money`: [*BaseMoneyInput*](#basemoneyinput) ; `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `quantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `shippingDetails?`: [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> ; `slug`: [*Scalars*](#scalars)[*String*] ; `taxCategory?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`externalTaxRate?` | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`money` | [*BaseMoneyInput*](#basemoneyinput) |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`quantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetails?` | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |
`slug` | [*Scalars*](#scalars)[*String*] |
`taxCategory?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2012](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2012)

___

##### CustomLineItemNameArgs

Ƭ **CustomLineItemNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

A custom line item is a generic item that can be added to the cart but is not
bound to a product. You can use it for discounts (negative money), vouchers,
complex cart rules, additional services or fees. You control the lifecycle of this item.

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1989](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1989)

___

##### CustomLineItemReturnItem

Ƭ **CustomLineItemReturnItem**: [*ReturnItem*](#returnitem) & { `__typename?`: *CustomLineItemReturnItem* ; `comment?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `id`: [*Scalars*](#scalars)[*String*] ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `paymentState`: [*ReturnPaymentState*](#enumstypes_graphqlreturnpaymentstatemd) ; `quantity`: [*Scalars*](#scalars)[*Long*] ; `shipmentState`: [*ReturnShipmentState*](#enumstypes_graphqlreturnshipmentstatemd) ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2023](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2023)

___

##### CustomLineItemsTarget

Ƭ **CustomLineItemsTarget**: [*CartDiscountTarget*](#cartdiscounttarget) & { `__typename?`: *CustomLineItemsTarget* ; `predicate`: [*Scalars*](#scalars)[*String*] ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2036](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2036)

___

##### CustomLineItemsTargetInput

Ƭ **CustomLineItemsTargetInput**: { `predicate`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`predicate` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2042](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2042)

___

##### CustomSuggestTokenizerInput

Ƭ **CustomSuggestTokenizerInput**: { `suggestTokenizer?`: [*Maybe*](#maybe)<[*BaseSearchKeywordInput*](#basesearchkeywordinput)\> ; `text`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`suggestTokenizer?` | [*Maybe*](#maybe)<[*BaseSearchKeywordInput*](#basesearchkeywordinput)\> |
`text` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2046](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2046)

___

##### Customer

Ƭ **Customer**: [*Versioned*](#versioned) & { `__typename?`: *Customer* ; `addresses`: [*Address*](#address)[] ; `billingAddressIds`: [*Scalars*](#scalars)[*String*][] ; `billingAddresses`: [*Address*](#address)[] ; `companyName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `customerGroup?`: [*Maybe*](#maybe)<[*CustomerGroup*](#customergroup)\> ; `customerGroupRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `customerNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `dateOfBirth?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> ; `defaultBillingAddress?`: [*Maybe*](#maybe)<[*Address*](#address)\> ; `defaultBillingAddressId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `defaultShippingAddress?`: [*Maybe*](#maybe)<[*Address*](#address)\> ; `defaultShippingAddressId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `email`: [*Scalars*](#scalars)[*String*] ; `externalId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `firstName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `isEmailVerified`: [*Scalars*](#scalars)[*Boolean*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `lastName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> ; `middleName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `password`: [*Scalars*](#scalars)[*String*] ; `salutation?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `shippingAddressIds`: [*Scalars*](#scalars)[*String*][] ; `shippingAddresses`: [*Address*](#address)[] ; `stores`: [*Store*](#store)[] ; `storesRef`: [*KeyReference*](#keyreference)[] ; `title?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `vatId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

A customer is a person purchasing products. Carts, Orders and Reviews can be associated to a customer.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1602](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1602)

___

##### CustomerActiveCartInterface

Ƭ **CustomerActiveCartInterface**: { `customerActiveCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\>  }

A field to access a customer's active cart.

###### Type declaration:

Name | Type |
------ | ------ |
`customerActiveCart?` | [*Maybe*](#maybe)<[*Cart*](#cart)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1660](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1660)

___

##### CustomerActiveCartInterfaceCustomerActiveCartArgs

Ƭ **CustomerActiveCartInterfaceCustomerActiveCartArgs**: { `customerId`: [*Scalars*](#scalars)[*String*]  }

A field to access a customer's active cart.

###### Type declaration:

Name | Type |
------ | ------ |
`customerId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1665](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1665)

___

##### CustomerCustomFieldListArgs

Ƭ **CustomerCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

A customer is a person purchasing products. Carts, Orders and Reviews can be associated to a customer.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1654](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1654)

___

##### CustomerCustomFieldsRawArgs

Ƭ **CustomerCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

A customer is a person purchasing products. Carts, Orders and Reviews can be associated to a customer.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1648](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1648)

___

##### CustomerGroup

Ƭ **CustomerGroup**: [*Versioned*](#versioned) & { `__typename?`: *CustomerGroup* ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `name`: [*Scalars*](#scalars)[*String*] ; `version`: [*Scalars*](#scalars)[*Long*]  }

A customer can be a member in a customer group (e.g. reseller, gold member). A
customer group can be used in price calculations with special prices being
assigned to certain customer groups.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1673](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1673)

___

##### CustomerGroupCustomFieldListArgs

Ƭ **CustomerGroupCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

A customer can be a member in a customer group (e.g. reseller, gold member). A
customer group can be used in price calculations with special prices being
assigned to certain customer groups.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1705](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1705)

___

##### CustomerGroupCustomFieldsRawArgs

Ƭ **CustomerGroupCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

A customer can be a member in a customer group (e.g. reseller, gold member). A
customer group can be used in price calculations with special prices being
assigned to certain customer groups.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1696](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1696)

___

##### CustomerGroupDraft

Ƭ **CustomerGroupDraft**: { `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `groupName`: [*Scalars*](#scalars)[*String*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`groupName` | [*Scalars*](#scalars)[*String*] |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1710](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1710)

___

##### CustomerGroupQueryResult

Ƭ **CustomerGroupQueryResult**: { `__typename?`: *CustomerGroupQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*CustomerGroup*](#customergroup)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *CustomerGroupQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*CustomerGroup*](#customergroup)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1716](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1716)

___

##### CustomerGroupUpdateAction

Ƭ **CustomerGroupUpdateAction**: { `changeName?`: [*Maybe*](#maybe)<[*ChangeCustomerGroupName*](#changecustomergroupname)\> ; `setCustomField?`: [*Maybe*](#maybe)<[*SetCustomerGroupCustomField*](#setcustomergroupcustomfield)\> ; `setCustomType?`: [*Maybe*](#maybe)<[*SetCustomerGroupCustomType*](#setcustomergroupcustomtype)\> ; `setKey?`: [*Maybe*](#maybe)<[*SetCustomerGroupKey*](#setcustomergroupkey)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`changeName?` | [*Maybe*](#maybe)<[*ChangeCustomerGroupName*](#changecustomergroupname)\> |
`setCustomField?` | [*Maybe*](#maybe)<[*SetCustomerGroupCustomField*](#setcustomergroupcustomfield)\> |
`setCustomType?` | [*Maybe*](#maybe)<[*SetCustomerGroupCustomType*](#setcustomergroupcustomtype)\> |
`setKey?` | [*Maybe*](#maybe)<[*SetCustomerGroupKey*](#setcustomergroupkey)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1724](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1724)

___

##### CustomerQueryInterface

Ƭ **CustomerQueryInterface**: { `customer?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `customers`: [*CustomerQueryResult*](#customerqueryresult)  }

Fields to access customer accounts. Includes direct access to a single customer and searching for customers.

###### Type declaration:

Name | Type |
------ | ------ |
`customer?` | [*Maybe*](#maybe)<[*Customer*](#customer)\> |
`customers` | [*CustomerQueryResult*](#customerqueryresult) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1732](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1732)

___

##### CustomerQueryInterfaceCustomerArgs

Ƭ **CustomerQueryInterfaceCustomerArgs**: { `emailToken?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `passwordToken?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

Fields to access customer accounts. Includes direct access to a single customer and searching for customers.

###### Type declaration:

Name | Type |
------ | ------ |
`emailToken?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`passwordToken?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1738](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1738)

___

##### CustomerQueryInterfaceCustomersArgs

Ƭ **CustomerQueryInterfaceCustomersArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

Fields to access customer accounts. Includes direct access to a single customer and searching for customers.

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1746](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1746)

___

##### CustomerQueryResult

Ƭ **CustomerQueryResult**: { `__typename?`: *CustomerQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*Customer*](#customer)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *CustomerQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Customer*](#customer)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1753](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1753)

___

##### CustomerSignInDraft

Ƭ **CustomerSignInDraft**: { `anonymousCartId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `anonymousCartSignInMode?`: [*Maybe*](#maybe)<[*AnonymousCartSignInMode*](#enumstypes_graphqlanonymouscartsigninmodemd)\> ; `anonymousId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `email`: [*Scalars*](#scalars)[*String*] ; `password`: [*Scalars*](#scalars)[*String*] ; `updateProductData?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`anonymousCartId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`anonymousCartSignInMode?` | [*Maybe*](#maybe)<[*AnonymousCartSignInMode*](#enumstypes_graphqlanonymouscartsigninmodemd)\> |
`anonymousId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`email` | [*Scalars*](#scalars)[*String*] |
`password` | [*Scalars*](#scalars)[*String*] |
`updateProductData?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1761](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1761)

___

##### CustomerSignInResult

Ƭ **CustomerSignInResult**: { `__typename?`: *CustomerSignInResult* ; `cart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `customer`: [*Customer*](#customer)  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *CustomerSignInResult* |
`cart?` | [*Maybe*](#maybe)<[*Cart*](#cart)\> |
`customer` | [*Customer*](#customer) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1770](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1770)

___

##### CustomerSignMeInDraft

Ƭ **CustomerSignMeInDraft**: { `activeCartSignInMode?`: [*Maybe*](#maybe)<[*AnonymousCartSignInMode*](#enumstypes_graphqlanonymouscartsigninmodemd)\> ; `email`: [*Scalars*](#scalars)[*String*] ; `password`: [*Scalars*](#scalars)[*String*] ; `updateProductData?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`activeCartSignInMode?` | [*Maybe*](#maybe)<[*AnonymousCartSignInMode*](#enumstypes_graphqlanonymouscartsigninmodemd)\> |
`email` | [*Scalars*](#scalars)[*String*] |
`password` | [*Scalars*](#scalars)[*String*] |
`updateProductData?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1776](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1776)

___

##### CustomerSignMeUpDraft

Ƭ **CustomerSignMeUpDraft**: { `addresses?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)[]\> ; `billingAddresses?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*][]\> ; `companyName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `dateOfBirth?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> ; `defaultBillingAddress?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `defaultShippingAddress?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `email`: [*Scalars*](#scalars)[*String*] ; `firstName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> ; `middleName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `password`: [*Scalars*](#scalars)[*String*] ; `salutation?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `shippingAddresses?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*][]\> ; `stores?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)[]\> ; `title?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `vatId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`addresses?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)[]\> | - |
`billingAddresses?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*][]\> | The indices of the billing addresses in the `addresses` list. The `billingAddressIds` of the customer will be set to the IDs of that addresses.   |
`companyName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> | - |
`dateOfBirth?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> | - |
`defaultBillingAddress?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> | The index of the address in the `addresses` list. The `defaultBillingAddressId` of the customer will be set to the ID of that address.   |
`defaultShippingAddress?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> | The index of the address in the `addresses` list. The `defaultShippingAddressId` of the customer will be set to the ID of that address.   |
`email` | [*Scalars*](#scalars)[*String*] | - |
`firstName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`lastName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> | - |
`middleName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`password` | [*Scalars*](#scalars)[*String*] | - |
`salutation?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`shippingAddresses?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*][]\> | The indices of the shipping addresses in the `addresses` list. The `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses.   |
`stores?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)[]\> | - |
`title?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`vatId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1783](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1783)

___

##### CustomerSignUpDraft

Ƭ **CustomerSignUpDraft**: { `addresses?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)[]\> ; `anonymousCartId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `anonymousId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `billingAddresses?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*][]\> ; `companyName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `customerGroup?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `customerNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `dateOfBirth?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> ; `defaultBillingAddress?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `defaultShippingAddress?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `email`: [*Scalars*](#scalars)[*String*] ; `externalId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `firstName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `isEmailVerified?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> ; `middleName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `password`: [*Scalars*](#scalars)[*String*] ; `salutation?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `shippingAddresses?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*][]\> ; `stores?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)[]\> ; `title?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `vatId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`addresses?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)[]\> | - |
`anonymousCartId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`anonymousId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`billingAddresses?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*][]\> | The indices of the billing addresses in the `addresses` list. The `billingAddressIds` of the customer will be set to the IDs of that addresses.   |
`companyName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> | - |
`customerGroup?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> | - |
`customerNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`dateOfBirth?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> | - |
`defaultBillingAddress?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> | The index of the address in the `addresses` list. The `defaultBillingAddressId` of the customer will be set to the ID of that address.   |
`defaultShippingAddress?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> | The index of the address in the `addresses` list. The `defaultShippingAddressId` of the customer will be set to the ID of that address.   |
`email` | [*Scalars*](#scalars)[*String*] | - |
`externalId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`firstName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`isEmailVerified?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> | - |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`lastName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> | - |
`middleName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`password` | [*Scalars*](#scalars)[*String*] | - |
`salutation?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`shippingAddresses?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*][]\> | The indices of the shipping addresses in the `addresses` list. The `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses.   |
`stores?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)[]\> | - |
`title?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`vatId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1817](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1817)

___

##### CustomerToken

Ƭ **CustomerToken**: { `__typename?`: *CustomerToken* ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `customerId`: [*Scalars*](#scalars)[*String*] ; `expiresAt`: [*Scalars*](#scalars)[*DateTime*] ; `id`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *CustomerToken* |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] |
`customerId` | [*Scalars*](#scalars)[*String*] |
`expiresAt` | [*Scalars*](#scalars)[*DateTime*] |
`id` | [*Scalars*](#scalars)[*String*] |
`value` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1857](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1857)

___

##### CustomerUpdateAction

Ƭ **CustomerUpdateAction**: { `addAddress?`: [*Maybe*](#maybe)<[*AddCustomerAddress*](#addcustomeraddress)\> ; `addBillingAddressId?`: [*Maybe*](#maybe)<[*AddCustomerBillingAddressId*](#addcustomerbillingaddressid)\> ; `addShippingAddressId?`: [*Maybe*](#maybe)<[*AddCustomerShippingAddressId*](#addcustomershippingaddressid)\> ; `addStore?`: [*Maybe*](#maybe)<[*AddCustomerStore*](#addcustomerstore)\> ; `changeAddress?`: [*Maybe*](#maybe)<[*ChangeCustomerAddress*](#changecustomeraddress)\> ; `changeEmail?`: [*Maybe*](#maybe)<[*ChangeCustomerEmail*](#changecustomeremail)\> ; `removeAddress?`: [*Maybe*](#maybe)<[*RemoveCustomerAddress*](#removecustomeraddress)\> ; `removeBillingAddressId?`: [*Maybe*](#maybe)<[*RemoveCustomerBillingAddressId*](#removecustomerbillingaddressid)\> ; `removeShippingAddressId?`: [*Maybe*](#maybe)<[*RemoveCustomerShippingAddressId*](#removecustomershippingaddressid)\> ; `removeStore?`: [*Maybe*](#maybe)<[*RemoveCustomerStore*](#removecustomerstore)\> ; `setCompanyName?`: [*Maybe*](#maybe)<[*SetCustomerCompanyName*](#setcustomercompanyname)\> ; `setCustomField?`: [*Maybe*](#maybe)<[*SetCustomerCustomField*](#setcustomercustomfield)\> ; `setCustomType?`: [*Maybe*](#maybe)<[*SetCustomerCustomType*](#setcustomercustomtype)\> ; `setCustomerGroup?`: [*Maybe*](#maybe)<[*SetCustomerGroup*](#setcustomergroup)\> ; `setCustomerNumber?`: [*Maybe*](#maybe)<[*SetCustomerNumber*](#setcustomernumber)\> ; `setDateOfBirth?`: [*Maybe*](#maybe)<[*SetCustomerDateOfBirth*](#setcustomerdateofbirth)\> ; `setDefaultBillingAddress?`: [*Maybe*](#maybe)<[*SetCustomerDefaultBillingAddress*](#setcustomerdefaultbillingaddress)\> ; `setDefaultShippingAddress?`: [*Maybe*](#maybe)<[*SetCustomerDefaultShippingAddress*](#setcustomerdefaultshippingaddress)\> ; `setExternalId?`: [*Maybe*](#maybe)<[*SetCustomerExternalId*](#setcustomerexternalid)\> ; `setFirstName?`: [*Maybe*](#maybe)<[*SetCustomerFirstName*](#setcustomerfirstname)\> ; `setKey?`: [*Maybe*](#maybe)<[*SetCustomerKey*](#setcustomerkey)\> ; `setLastName?`: [*Maybe*](#maybe)<[*SetCustomerLastName*](#setcustomerlastname)\> ; `setLocale?`: [*Maybe*](#maybe)<[*SetCustomerLocale*](#setcustomerlocale)\> ; `setMiddleName?`: [*Maybe*](#maybe)<[*SetCustomerMiddleName*](#setcustomermiddlename)\> ; `setSalutation?`: [*Maybe*](#maybe)<[*SetCustomerSalutation*](#setcustomersalutation)\> ; `setStores?`: [*Maybe*](#maybe)<[*SetCustomerStores*](#setcustomerstores)\> ; `setTitle?`: [*Maybe*](#maybe)<[*SetCustomerTitle*](#setcustomertitle)\> ; `setVatId?`: [*Maybe*](#maybe)<[*SetCustomerVatId*](#setcustomervatid)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addAddress?` | [*Maybe*](#maybe)<[*AddCustomerAddress*](#addcustomeraddress)\> |
`addBillingAddressId?` | [*Maybe*](#maybe)<[*AddCustomerBillingAddressId*](#addcustomerbillingaddressid)\> |
`addShippingAddressId?` | [*Maybe*](#maybe)<[*AddCustomerShippingAddressId*](#addcustomershippingaddressid)\> |
`addStore?` | [*Maybe*](#maybe)<[*AddCustomerStore*](#addcustomerstore)\> |
`changeAddress?` | [*Maybe*](#maybe)<[*ChangeCustomerAddress*](#changecustomeraddress)\> |
`changeEmail?` | [*Maybe*](#maybe)<[*ChangeCustomerEmail*](#changecustomeremail)\> |
`removeAddress?` | [*Maybe*](#maybe)<[*RemoveCustomerAddress*](#removecustomeraddress)\> |
`removeBillingAddressId?` | [*Maybe*](#maybe)<[*RemoveCustomerBillingAddressId*](#removecustomerbillingaddressid)\> |
`removeShippingAddressId?` | [*Maybe*](#maybe)<[*RemoveCustomerShippingAddressId*](#removecustomershippingaddressid)\> |
`removeStore?` | [*Maybe*](#maybe)<[*RemoveCustomerStore*](#removecustomerstore)\> |
`setCompanyName?` | [*Maybe*](#maybe)<[*SetCustomerCompanyName*](#setcustomercompanyname)\> |
`setCustomField?` | [*Maybe*](#maybe)<[*SetCustomerCustomField*](#setcustomercustomfield)\> |
`setCustomType?` | [*Maybe*](#maybe)<[*SetCustomerCustomType*](#setcustomercustomtype)\> |
`setCustomerGroup?` | [*Maybe*](#maybe)<[*SetCustomerGroup*](#setcustomergroup)\> |
`setCustomerNumber?` | [*Maybe*](#maybe)<[*SetCustomerNumber*](#setcustomernumber)\> |
`setDateOfBirth?` | [*Maybe*](#maybe)<[*SetCustomerDateOfBirth*](#setcustomerdateofbirth)\> |
`setDefaultBillingAddress?` | [*Maybe*](#maybe)<[*SetCustomerDefaultBillingAddress*](#setcustomerdefaultbillingaddress)\> |
`setDefaultShippingAddress?` | [*Maybe*](#maybe)<[*SetCustomerDefaultShippingAddress*](#setcustomerdefaultshippingaddress)\> |
`setExternalId?` | [*Maybe*](#maybe)<[*SetCustomerExternalId*](#setcustomerexternalid)\> |
`setFirstName?` | [*Maybe*](#maybe)<[*SetCustomerFirstName*](#setcustomerfirstname)\> |
`setKey?` | [*Maybe*](#maybe)<[*SetCustomerKey*](#setcustomerkey)\> |
`setLastName?` | [*Maybe*](#maybe)<[*SetCustomerLastName*](#setcustomerlastname)\> |
`setLocale?` | [*Maybe*](#maybe)<[*SetCustomerLocale*](#setcustomerlocale)\> |
`setMiddleName?` | [*Maybe*](#maybe)<[*SetCustomerMiddleName*](#setcustomermiddlename)\> |
`setSalutation?` | [*Maybe*](#maybe)<[*SetCustomerSalutation*](#setcustomersalutation)\> |
`setStores?` | [*Maybe*](#maybe)<[*SetCustomerStores*](#setcustomerstores)\> |
`setTitle?` | [*Maybe*](#maybe)<[*SetCustomerTitle*](#setcustomertitle)\> |
`setVatId?` | [*Maybe*](#maybe)<[*SetCustomerVatId*](#setcustomervatid)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:1866](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L1866)

___

##### DateAttribute

Ƭ **DateAttribute**: [*Attribute*](#attribute) & { `__typename?`: *DateAttribute* ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*Date*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2051](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2051)

___

##### DateAttributeDefinitionType

Ƭ **DateAttributeDefinitionType**: [*AttributeDefinitionType*](#attributedefinitiontype) & { `__typename?`: *DateAttributeDefinitionType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2057](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2057)

___

##### DateField

Ƭ **DateField**: [*CustomField*](#customfield) & { `__typename?`: *DateField* ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*Date*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2062](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2062)

___

##### DateTimeAttribute

Ƭ **DateTimeAttribute**: [*Attribute*](#attribute) & { `__typename?`: *DateTimeAttribute* ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*DateTime*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2068](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2068)

___

##### DateTimeAttributeDefinitionType

Ƭ **DateTimeAttributeDefinitionType**: [*AttributeDefinitionType*](#attributedefinitiontype) & { `__typename?`: *DateTimeAttributeDefinitionType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2074](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2074)

___

##### DateTimeField

Ƭ **DateTimeField**: [*CustomField*](#customfield) & { `__typename?`: *DateTimeField* ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*DateTime*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2079](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2079)

___

##### DateTimeType

Ƭ **DateTimeType**: [*FieldType*](#fieldtype) & { `__typename?`: *DateTimeType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2085](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2085)

___

##### DateType

Ƭ **DateType**: [*FieldType*](#fieldtype) & { `__typename?`: *DateType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2090](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2090)

___

##### Delivery

Ƭ **Delivery**: { `__typename?`: *Delivery* ; `address?`: [*Maybe*](#maybe)<[*Address*](#address)\> ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `id`: [*Scalars*](#scalars)[*String*] ; `items`: [*DeliveryItem*](#deliveryitem)[] ; `parcels`: [*Parcel*](#parcel)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *Delivery* |
`address?` | [*Maybe*](#maybe)<[*Address*](#address)\> |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] |
`id` | [*Scalars*](#scalars)[*String*] |
`items` | [*DeliveryItem*](#deliveryitem)[] |
`parcels` | [*Parcel*](#parcel)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2095](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2095)

___

##### DeliveryItem

Ƭ **DeliveryItem**: { `__typename?`: *DeliveryItem* ; `id`: [*Scalars*](#scalars)[*String*] ; `quantity`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *DeliveryItem* |
`id` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2104](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2104)

___

##### DeliveryItemDraftType

Ƭ **DeliveryItemDraftType**: { `id`: [*Scalars*](#scalars)[*String*] ; `quantity`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2110](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2110)

___

##### Dimensions

Ƭ **Dimensions**: { `__typename?`: *Dimensions* ; `height`: [*Scalars*](#scalars)[*Int*] ; `width`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *Dimensions* |
`height` | [*Scalars*](#scalars)[*Int*] |
`width` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2115](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2115)

___

##### DimensionsInput

Ƭ **DimensionsInput**: { `height`: [*Scalars*](#scalars)[*Int*] ; `width`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`height` | [*Scalars*](#scalars)[*Int*] |
`width` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2121](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2121)

___

##### DiscountCode

Ƭ **DiscountCode**: [*Versioned*](#versioned) & { `__typename?`: *DiscountCode* ; `applicationCount`: [*Scalars*](#scalars)[*Long*] ; `applicationVersion?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `cartDiscountRefs`: [*Reference*](#reference)[] ; `cartDiscounts`: [*CartDiscount*](#cartdiscount)[] ; `cartPredicate?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `code`: [*Scalars*](#scalars)[*String*] ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `descriptionAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `groups`: [*Scalars*](#scalars)[*String*][] ; `id`: [*Scalars*](#scalars)[*String*] ; `isActive`: [*Scalars*](#scalars)[*Boolean*] ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `maxApplications?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `maxApplicationsPerCustomer?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

With discount codes it is possible to give specific cart discounts to an
eligible amount of users. They are defined by a string value which can be added
to a cart so that specific cart discounts can be applied to the cart.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2130](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2130)

___

##### DiscountCodeCustomFieldListArgs

Ƭ **DiscountCodeCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

With discount codes it is possible to give specific cart discounts to an
eligible amount of users. They are defined by a string value which can be added
to a cart so that specific cart discounts can be applied to the cart.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2195](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2195)

___

##### DiscountCodeCustomFieldsRawArgs

Ƭ **DiscountCodeCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

With discount codes it is possible to give specific cart discounts to an
eligible amount of users. They are defined by a string value which can be added
to a cart so that specific cart discounts can be applied to the cart.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2186](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2186)

___

##### DiscountCodeDescriptionArgs

Ƭ **DiscountCodeDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

With discount codes it is possible to give specific cart discounts to an
eligible amount of users. They are defined by a string value which can be added
to a cart so that specific cart discounts can be applied to the cart.

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2177](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2177)

___

##### DiscountCodeDraft

Ƭ **DiscountCodeDraft**: { `cartDiscounts`: [*ReferenceInput*](#referenceinput)[] ; `cartPredicate?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `code`: [*Scalars*](#scalars)[*String*] ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `groups?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `isActive?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `maxApplications?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `maxApplicationsPerCustomer?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `name?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`cartDiscounts` | [*ReferenceInput*](#referenceinput)[] |
`cartPredicate?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`code` | [*Scalars*](#scalars)[*String*] |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`groups?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`isActive?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`maxApplications?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`maxApplicationsPerCustomer?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`name?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`validFrom?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2200](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2200)

___

##### DiscountCodeInfo

Ƭ **DiscountCodeInfo**: { `__typename?`: *DiscountCodeInfo* ; `discountCode?`: [*Maybe*](#maybe)<[*DiscountCode*](#discountcode)\> ; `discountCodeRef`: [*Reference*](#reference) ; `state?`: [*Maybe*](#maybe)<[*DiscountCodeState*](#enumstypes_graphqldiscountcodestatemd)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *DiscountCodeInfo* |
`discountCode?` | [*Maybe*](#maybe)<[*DiscountCode*](#discountcode)\> |
`discountCodeRef` | [*Reference*](#reference) |
`state?` | [*Maybe*](#maybe)<[*DiscountCodeState*](#enumstypes_graphqldiscountcodestatemd)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2215](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2215)

___

##### DiscountCodeNameArgs

Ƭ **DiscountCodeNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

With discount codes it is possible to give specific cart discounts to an
eligible amount of users. They are defined by a string value which can be added
to a cart so that specific cart discounts can be applied to the cart.

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2168](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2168)

___

##### DiscountCodeQueryResult

Ƭ **DiscountCodeQueryResult**: { `__typename?`: *DiscountCodeQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*DiscountCode*](#discountcode)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *DiscountCodeQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*DiscountCode*](#discountcode)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2222](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2222)

___

##### DiscountCodeUpdateAction

Ƭ **DiscountCodeUpdateAction**: { `changeCartDiscounts?`: [*Maybe*](#maybe)<[*ChangeDiscountCodeCartDiscounts*](#changediscountcodecartdiscounts)\> ; `changeGroups?`: [*Maybe*](#maybe)<[*ChangeDiscountCodeGroups*](#changediscountcodegroups)\> ; `changeIsActive?`: [*Maybe*](#maybe)<[*ChangeDiscountCodeIsActive*](#changediscountcodeisactive)\> ; `setCartPredicate?`: [*Maybe*](#maybe)<[*SetDiscountCodeCartPredicate*](#setdiscountcodecartpredicate)\> ; `setCustomField?`: [*Maybe*](#maybe)<[*SetDiscountCodeCustomField*](#setdiscountcodecustomfield)\> ; `setCustomType?`: [*Maybe*](#maybe)<[*SetDiscountCodeCustomType*](#setdiscountcodecustomtype)\> ; `setDescription?`: [*Maybe*](#maybe)<[*SetDiscountCodeDescription*](#setdiscountcodedescription)\> ; `setMaxApplications?`: [*Maybe*](#maybe)<[*SetDiscountCodeMaxApplications*](#setdiscountcodemaxapplications)\> ; `setMaxApplicationsPerCustomer?`: [*Maybe*](#maybe)<[*SetDiscountCodeMaxApplicationsPerCustomer*](#setdiscountcodemaxapplicationspercustomer)\> ; `setName?`: [*Maybe*](#maybe)<[*SetDiscountCodeName*](#setdiscountcodename)\> ; `setValidFrom?`: [*Maybe*](#maybe)<[*SetDiscountCodeValidFrom*](#setdiscountcodevalidfrom)\> ; `setValidFromAndUntil?`: [*Maybe*](#maybe)<[*SetDiscountCodeValidFromAndUntil*](#setdiscountcodevalidfromanduntil)\> ; `setValidUntil?`: [*Maybe*](#maybe)<[*SetDiscountCodeValidUntil*](#setdiscountcodevaliduntil)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`changeCartDiscounts?` | [*Maybe*](#maybe)<[*ChangeDiscountCodeCartDiscounts*](#changediscountcodecartdiscounts)\> |
`changeGroups?` | [*Maybe*](#maybe)<[*ChangeDiscountCodeGroups*](#changediscountcodegroups)\> |
`changeIsActive?` | [*Maybe*](#maybe)<[*ChangeDiscountCodeIsActive*](#changediscountcodeisactive)\> |
`setCartPredicate?` | [*Maybe*](#maybe)<[*SetDiscountCodeCartPredicate*](#setdiscountcodecartpredicate)\> |
`setCustomField?` | [*Maybe*](#maybe)<[*SetDiscountCodeCustomField*](#setdiscountcodecustomfield)\> |
`setCustomType?` | [*Maybe*](#maybe)<[*SetDiscountCodeCustomType*](#setdiscountcodecustomtype)\> |
`setDescription?` | [*Maybe*](#maybe)<[*SetDiscountCodeDescription*](#setdiscountcodedescription)\> |
`setMaxApplications?` | [*Maybe*](#maybe)<[*SetDiscountCodeMaxApplications*](#setdiscountcodemaxapplications)\> |
`setMaxApplicationsPerCustomer?` | [*Maybe*](#maybe)<[*SetDiscountCodeMaxApplicationsPerCustomer*](#setdiscountcodemaxapplicationspercustomer)\> |
`setName?` | [*Maybe*](#maybe)<[*SetDiscountCodeName*](#setdiscountcodename)\> |
`setValidFrom?` | [*Maybe*](#maybe)<[*SetDiscountCodeValidFrom*](#setdiscountcodevalidfrom)\> |
`setValidFromAndUntil?` | [*Maybe*](#maybe)<[*SetDiscountCodeValidFromAndUntil*](#setdiscountcodevalidfromanduntil)\> |
`setValidUntil?` | [*Maybe*](#maybe)<[*SetDiscountCodeValidUntil*](#setdiscountcodevaliduntil)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2256](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2256)

___

##### DiscountedLineItemPortion

Ƭ **DiscountedLineItemPortion**: { `__typename?`: *DiscountedLineItemPortion* ; `discount?`: [*Maybe*](#maybe)<[*CartDiscount*](#cartdiscount)\> ; `discountRef`: [*Reference*](#reference) ; `discountedAmount`: [*BaseMoney*](#basemoney)  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *DiscountedLineItemPortion* |
`discount?` | [*Maybe*](#maybe)<[*CartDiscount*](#cartdiscount)\> |
`discountRef` | [*Reference*](#reference) |
`discountedAmount` | [*BaseMoney*](#basemoney) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2274](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2274)

___

##### DiscountedLineItemPrice

Ƭ **DiscountedLineItemPrice**: { `__typename?`: *DiscountedLineItemPrice* ; `includedDiscounts`: [*DiscountedLineItemPortion*](#discountedlineitemportion)[] ; `value`: [*BaseMoney*](#basemoney)  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *DiscountedLineItemPrice* |
`includedDiscounts` | [*DiscountedLineItemPortion*](#discountedlineitemportion)[] |
`value` | [*BaseMoney*](#basemoney) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2281](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2281)

___

##### DiscountedLineItemPriceForQuantity

Ƭ **DiscountedLineItemPriceForQuantity**: { `__typename?`: *DiscountedLineItemPriceForQuantity* ; `discountedPrice`: [*DiscountedLineItemPrice*](#discountedlineitemprice) ; `quantity`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *DiscountedLineItemPriceForQuantity* |
`discountedPrice` | [*DiscountedLineItemPrice*](#discountedlineitemprice) |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2287](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2287)

___

##### DiscountedProductPriceValue

Ƭ **DiscountedProductPriceValue**: { `__typename?`: *DiscountedProductPriceValue* ; `discount?`: [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> ; `discountRef`: [*Reference*](#reference) ; `discountRel?`: [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> ; `value`: [*BaseMoney*](#basemoney)  }

###### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`__typename?` | *DiscountedProductPriceValue* | - |
`discount?` | [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> | - |
`discountRef` | [*Reference*](#reference) | - |
`discountRel?` | [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> | Temporal. Will be renamed some time in the future. Please use 'discount'.   |
`value` | [*BaseMoney*](#basemoney) | - |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2293](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2293)

___

##### DiscountedProductPriceValueInput

Ƭ **DiscountedProductPriceValueInput**: { `discount`: [*ReferenceInput*](#referenceinput) ; `value`: [*BaseMoneyInput*](#basemoneyinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`discount` | [*ReferenceInput*](#referenceinput) |
`value` | [*BaseMoneyInput*](#basemoneyinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2302](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2302)

___

##### EnumAttribute

Ƭ **EnumAttribute**: [*Attribute*](#attribute) & { `__typename?`: *EnumAttribute* ; `key`: [*Scalars*](#scalars)[*String*] ; `label`: [*Scalars*](#scalars)[*String*] ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2307](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2307)

___

##### EnumAttributeDefinitionType

Ƭ **EnumAttributeDefinitionType**: [*AttributeDefinitionType*](#attributedefinitiontype) & { `__typename?`: *EnumAttributeDefinitionType* ; `name`: [*Scalars*](#scalars)[*String*] ; `values`: [*PlainEnumValueResult*](#plainenumvalueresult)  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2314](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2314)

___

##### EnumAttributeDefinitionTypeValuesArgs

Ƭ **EnumAttributeDefinitionTypeValuesArgs**: { `excludeKeys?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeKeys?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeKeys?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeKeys?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2320](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2320)

___

##### EnumField

Ƭ **EnumField**: [*CustomField*](#customfield) & { `__typename?`: *EnumField* ; `key`: [*Scalars*](#scalars)[*String*] ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2328](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2328)

___

##### EnumType

Ƭ **EnumType**: [*FieldType*](#fieldtype) & { `__typename?`: *EnumType* ; `name`: [*Scalars*](#scalars)[*String*] ; `values`: [*EnumValue*](#enumvalue)[]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2334](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2334)

___

##### EnumTypeDraft

Ƭ **EnumTypeDraft**: { `values`: [*PlainEnumValueDraft*](#plainenumvaluedraft)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`values` | [*PlainEnumValueDraft*](#plainenumvaluedraft)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2340](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2340)

___

##### EnumValue

Ƭ **EnumValue**: { `__typename?`: *EnumValue* ; `key`: [*Scalars*](#scalars)[*String*] ; `label`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *EnumValue* |
`key` | [*Scalars*](#scalars)[*String*] |
`label` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2344](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2344)

___

##### ExternalDiscountValue

Ƭ **ExternalDiscountValue**: [*ProductDiscountValue*](#productdiscountvalue) & { `__typename?`: *ExternalDiscountValue* ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2350](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2350)

___

##### ExternalDiscountValueInput

Ƭ **ExternalDiscountValueInput**: { `dummy?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`dummy?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2355](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2355)

___

##### ExternalLineItemTotalPriceDraft

Ƭ **ExternalLineItemTotalPriceDraft**: { `price`: [*BaseMoneyInput*](#basemoneyinput) ; `totalPrice`: [*MoneyInput*](#moneyinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`price` | [*BaseMoneyInput*](#basemoneyinput) |
`totalPrice` | [*MoneyInput*](#moneyinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2359](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2359)

___

##### ExternalOAuth

Ƭ **ExternalOAuth**: { `__typename?`: *ExternalOAuth* ; `authorizationHeader`: [*Scalars*](#scalars)[*String*] ; `url`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ExternalOAuth* |
`authorizationHeader` | [*Scalars*](#scalars)[*String*] |
`url` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2364](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2364)

___

##### ExternalOAuthDraft

Ƭ **ExternalOAuthDraft**: { `authorizationHeader`: [*Scalars*](#scalars)[*String*] ; `url`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`authorizationHeader` | [*Scalars*](#scalars)[*String*] |
`url` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2370](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2370)

___

##### ExternalTaxAmountDraft

Ƭ **ExternalTaxAmountDraft**: { `taxRate`: [*ExternalTaxRateDraft*](#externaltaxratedraft) ; `totalGross`: [*MoneyInput*](#moneyinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`taxRate` | [*ExternalTaxRateDraft*](#externaltaxratedraft) |
`totalGross` | [*MoneyInput*](#moneyinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2375](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2375)

___

##### ExternalTaxRateDraft

Ƭ **ExternalTaxRateDraft**: { `amount`: [*Scalars*](#scalars)[*Float*] ; `country`: [*Scalars*](#scalars)[*Country*] ; `includedInPrice?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `name`: [*Scalars*](#scalars)[*String*] ; `state?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `subRates?`: [*Maybe*](#maybe)<[*SubRateDraft*](#subratedraft)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`amount` | [*Scalars*](#scalars)[*Float*] |
`country` | [*Scalars*](#scalars)[*Country*] |
`includedInPrice?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`name` | [*Scalars*](#scalars)[*String*] |
`state?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`subRates?` | [*Maybe*](#maybe)<[*SubRateDraft*](#subratedraft)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2380](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2380)

___

##### FieldDefinition

Ƭ **FieldDefinition**: { `__typename?`: *FieldDefinition* ; `inputHint`: [*TextInputHint*](#enumstypes_graphqltextinputhintmd) ; `label?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `labelAllLocales`: [*LocalizedString*](#localizedstring)[] ; `name`: [*Scalars*](#scalars)[*String*] ; `required`: [*Scalars*](#scalars)[*Boolean*] ; `type`: [*FieldType*](#fieldtype)  }

Field definitions describe custom fields and allow you to define some meta-information associated with the field.

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *FieldDefinition* |
`inputHint` | [*TextInputHint*](#enumstypes_graphqltextinputhintmd) |
`label?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`labelAllLocales` | [*LocalizedString*](#localizedstring)[] |
`name` | [*Scalars*](#scalars)[*String*] |
`required` | [*Scalars*](#scalars)[*Boolean*] |
`type` | [*FieldType*](#fieldtype) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2390](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2390)

___

##### FieldDefinitionLabelArgs

Ƭ **FieldDefinitionLabelArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

Field definitions describe custom fields and allow you to define some meta-information associated with the field.

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2401](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2401)

___

##### FieldType

Ƭ **FieldType**: { `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2406](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2406)

___

##### Geometry

Ƭ **Geometry**: { `type`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2410](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2410)

___

##### GiftLineItemValue

Ƭ **GiftLineItemValue**: [*CartDiscountValue*](#cartdiscountvalue) & { `__typename?`: *GiftLineItemValue* ; `distributionChannelRef?`: [*Maybe*](#maybe)<[*ChannelReferenceIdentifier*](#channelreferenceidentifier)\> ; `productRef`: [*ProductReferenceIdentifier*](#productreferenceidentifier) ; `supplyChannelRef?`: [*Maybe*](#maybe)<[*ChannelReferenceIdentifier*](#channelreferenceidentifier)\> ; `type`: [*Scalars*](#scalars)[*String*] ; `variantId`: [*Scalars*](#scalars)[*Int*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2414](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2414)

___

##### GiftLineItemValueInput

Ƭ **GiftLineItemValueInput**: { `distributionChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `product`: [*ResourceIdentifierInput*](#resourceidentifierinput) ; `supplyChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `variantId`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`distributionChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`product` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`supplyChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`variantId` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2423](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2423)

___

##### HighPrecisionMoney

Ƭ **HighPrecisionMoney**: [*BaseMoney*](#basemoney) & { `__typename?`: *HighPrecisionMoney* ; `centAmount`: [*Scalars*](#scalars)[*Long*] ; `currencyCode`: [*Scalars*](#scalars)[*Currency*] ; `fractionDigits`: [*Scalars*](#scalars)[*Int*] ; `preciseAmount`: [*Scalars*](#scalars)[*Long*] ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2430](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2430)

___

##### HighPrecisionMoneyInput

Ƭ **HighPrecisionMoneyInput**: { `centAmount?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `currencyCode`: [*Scalars*](#scalars)[*Currency*] ; `fractionDigits`: [*Scalars*](#scalars)[*Int*] ; `preciseAmount`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`centAmount?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`currencyCode` | [*Scalars*](#scalars)[*Currency*] |
`fractionDigits` | [*Scalars*](#scalars)[*Int*] |
`preciseAmount` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2439](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2439)

___

##### IOsUserType

Ƭ **IOsUserType**: [*Type*](#type) & { `__typename?`: *iOSUserType* ; `apnsToken?`: [*Maybe*](#maybe)<[*StringField*](#stringfield)\> ; `myStore?`: [*Maybe*](#maybe)<[*ReferenceField*](#referencefield)\> ; `type`: [*TypeDefinition*](#typedefinition) ; `typeRef`: [*Reference*](#reference)  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2694](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2694)

___

##### Image

Ƭ **Image**: { `__typename?`: *Image* ; `dimensions`: [*Dimensions*](#dimensions) ; `label?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `url`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *Image* |
`dimensions` | [*Dimensions*](#dimensions) |
`label?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`url` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2446](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2446)

___

##### ImageInput

Ƭ **ImageInput**: { `dimensions`: [*DimensionsInput*](#dimensionsinput) ; `label?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `url`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`dimensions` | [*DimensionsInput*](#dimensionsinput) |
`label?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`url` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2453](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2453)

___

##### ImportOrderCustomLineItemState

Ƭ **ImportOrderCustomLineItemState**: { `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `state`: [*ItemStateDraftType*](#itemstatedrafttype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`state` | [*ItemStateDraftType*](#itemstatedrafttype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2459](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2459)

___

##### ImportOrderLineItemState

Ƭ **ImportOrderLineItemState**: { `lineItemId`: [*Scalars*](#scalars)[*String*] ; `state`: [*ItemStateDraftType*](#itemstatedrafttype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`state` | [*ItemStateDraftType*](#itemstatedrafttype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2464](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2464)

___

##### InStore

Ƭ **InStore**: [*CartQueryInterface*](#cartqueryinterface) & [*CustomerActiveCartInterface*](#customeractivecartinterface) & [*OrderQueryInterface*](#orderqueryinterface) & [*CustomerQueryInterface*](#customerqueryinterface) & [*ShippingMethodsByCartInterface*](#shippingmethodsbycartinterface) & [*MeFieldInterface*](#mefieldinterface) & { `__typename?`: *InStore* ; `cart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `carts`: [*CartQueryResult*](#cartqueryresult) ; `customer?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `customerActiveCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `customers`: [*CustomerQueryResult*](#customerqueryresult) ; `me`: [*InStoreMe*](#instoreme) ; `order?`: [*Maybe*](#maybe)<[*Order*](#order)\> ; `orders`: [*OrderQueryResult*](#orderqueryresult) ; `shippingMethodsByCart`: [*ShippingMethod*](#shippingmethod)[]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2479](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2479)

___

##### InStoreCartArgs

Ƭ **InStoreCartArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2519](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2519)

___

##### InStoreCartsArgs

Ƭ **InStoreCartsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2523](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2523)

___

##### InStoreCustomerActiveCartArgs

Ƭ **InStoreCustomerActiveCartArgs**: { `customerId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`customerId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2530](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2530)

___

##### InStoreCustomerArgs

Ƭ **InStoreCustomerArgs**: { `emailToken?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `passwordToken?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`emailToken?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`passwordToken?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2505](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2505)

___

##### InStoreCustomersArgs

Ƭ **InStoreCustomersArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2512](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2512)

___

##### InStoreMe

Ƭ **InStoreMe**: [*MeQueryInterface*](#mequeryinterface) & { `__typename?`: *InStoreMe* ; `activeCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `cart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `carts`: [*CartQueryResult*](#cartqueryresult) ; `customer?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `order?`: [*Maybe*](#maybe)<[*Order*](#order)\> ; `orders`: [*OrderQueryResult*](#orderqueryresult) ; `shoppingList?`: [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> ; `shoppingLists`: [*ShoppingListQueryResult*](#shoppinglistqueryresult)  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2546](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2546)

___

##### InStoreMeCartArgs

Ƭ **InStoreMeCartArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2558](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2558)

___

##### InStoreMeCartsArgs

Ƭ **InStoreMeCartsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2562](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2562)

___

##### InStoreMeOrderArgs

Ƭ **InStoreMeOrderArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `orderNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2569](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2569)

___

##### InStoreMeOrdersArgs

Ƭ **InStoreMeOrdersArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2574](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2574)

___

##### InStoreMeShoppingListArgs

Ƭ **InStoreMeShoppingListArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2581](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2581)

___

##### InStoreMeShoppingListsArgs

Ƭ **InStoreMeShoppingListsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2586](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2586)

___

##### InStoreOrderArgs

Ƭ **InStoreOrderArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `orderNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2534](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2534)

___

##### InStoreOrdersArgs

Ƭ **InStoreOrdersArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2539](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2539)

___

##### InStoreShippingMethodsByCartArgs

Ƭ **InStoreShippingMethodsByCartArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2501](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2501)

___

##### Initiator

Ƭ **Initiator**: { `__typename?`: *Initiator* ; `anonymousId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `clientId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `customer?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `externalUserId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `isPlatformClient?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `user?`: [*Maybe*](#maybe)<[*Reference*](#reference)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *Initiator* |
`anonymousId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`clientId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`customer?` | [*Maybe*](#maybe)<[*Reference*](#reference)\> |
`externalUserId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`isPlatformClient?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`user?` | [*Maybe*](#maybe)<[*Reference*](#reference)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2469](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2469)

___

##### InterfaceInteractionsRaw

Ƭ **InterfaceInteractionsRaw**: { `__typename?`: *InterfaceInteractionsRaw* ; `fields`: [*RawCustomField*](#rawcustomfield)[] ; `type?`: [*Maybe*](#maybe)<[*TypeDefinition*](#typedefinition)\> ; `typeRef`: [*Reference*](#reference)  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *InterfaceInteractionsRaw* |
`fields` | [*RawCustomField*](#rawcustomfield)[] |
`type?` | [*Maybe*](#maybe)<[*TypeDefinition*](#typedefinition)\> |
`typeRef` | [*Reference*](#reference) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2593](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2593)

___

##### InterfaceInteractionsRawFieldsArgs

Ƭ **InterfaceInteractionsRawFieldsArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2600](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2600)

___

##### InterfaceInteractionsRawResult

Ƭ **InterfaceInteractionsRawResult**: { `__typename?`: *InterfaceInteractionsRawResult* ; `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `results`: [*InterfaceInteractionsRaw*](#interfaceinteractionsraw)[] ; `total`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *InterfaceInteractionsRawResult* |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`results` | [*InterfaceInteractionsRaw*](#interfaceinteractionsraw)[] |
`total` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2605](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2605)

___

##### InventoryEntry

Ƭ **InventoryEntry**: [*Versioned*](#versioned) & { `__typename?`: *InventoryEntry* ; `availableQuantity`: [*Scalars*](#scalars)[*Long*] ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `expectedDelivery?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `quantityOnStock`: [*Scalars*](#scalars)[*Long*] ; `restockableInDays?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sku`: [*Scalars*](#scalars)[*String*] ; `supplyChannel?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

Inventory allows you to track stock quantity per SKU and optionally per supply channel

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2614](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2614)

___

##### InventoryEntryCustomFieldListArgs

Ƭ **InventoryEntryCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

Inventory allows you to track stock quantity per SKU and optionally per supply channel

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2644](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2644)

___

##### InventoryEntryCustomFieldsRawArgs

Ƭ **InventoryEntryCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

Inventory allows you to track stock quantity per SKU and optionally per supply channel

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2638](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2638)

___

##### InventoryEntryDraft

Ƭ **InventoryEntryDraft**: { `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `expectedDelivery?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `quantityOnStock?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `restockableInDays?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sku`: [*Scalars*](#scalars)[*String*] ; `supplyChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`expectedDelivery?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`quantityOnStock?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`restockableInDays?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sku` | [*Scalars*](#scalars)[*String*] |
`supplyChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2649](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2649)

___

##### InventoryEntryQueryResult

Ƭ **InventoryEntryQueryResult**: { `__typename?`: *InventoryEntryQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*InventoryEntry*](#inventoryentry)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *InventoryEntryQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*InventoryEntry*](#inventoryentry)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2658](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2658)

___

##### InventoryEntryUpdateAction

Ƭ **InventoryEntryUpdateAction**: { `addQuantity?`: [*Maybe*](#maybe)<[*AddInventoryEntryQuantity*](#addinventoryentryquantity)\> ; `changeQuantity?`: [*Maybe*](#maybe)<[*ChangeInventoryEntryQuantity*](#changeinventoryentryquantity)\> ; `removeQuantity?`: [*Maybe*](#maybe)<[*RemoveInventoryEntryQuantity*](#removeinventoryentryquantity)\> ; `setCustomField?`: [*Maybe*](#maybe)<[*SetInventoryEntryCustomField*](#setinventoryentrycustomfield)\> ; `setCustomType?`: [*Maybe*](#maybe)<[*SetInventoryEntryCustomType*](#setinventoryentrycustomtype)\> ; `setExpectedDelivery?`: [*Maybe*](#maybe)<[*SetInventoryEntryExpectedDelivery*](#setinventoryentryexpecteddelivery)\> ; `setRestockableInDays?`: [*Maybe*](#maybe)<[*SetInventoryEntryRestockableInDays*](#setinventoryentryrestockableindays)\> ; `setSupplyChannel?`: [*Maybe*](#maybe)<[*SetInventoryEntrySupplyChannel*](#setinventoryentrysupplychannel)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addQuantity?` | [*Maybe*](#maybe)<[*AddInventoryEntryQuantity*](#addinventoryentryquantity)\> |
`changeQuantity?` | [*Maybe*](#maybe)<[*ChangeInventoryEntryQuantity*](#changeinventoryentryquantity)\> |
`removeQuantity?` | [*Maybe*](#maybe)<[*RemoveInventoryEntryQuantity*](#removeinventoryentryquantity)\> |
`setCustomField?` | [*Maybe*](#maybe)<[*SetInventoryEntryCustomField*](#setinventoryentrycustomfield)\> |
`setCustomType?` | [*Maybe*](#maybe)<[*SetInventoryEntryCustomType*](#setinventoryentrycustomtype)\> |
`setExpectedDelivery?` | [*Maybe*](#maybe)<[*SetInventoryEntryExpectedDelivery*](#setinventoryentryexpecteddelivery)\> |
`setRestockableInDays?` | [*Maybe*](#maybe)<[*SetInventoryEntryRestockableInDays*](#setinventoryentryrestockableindays)\> |
`setSupplyChannel?` | [*Maybe*](#maybe)<[*SetInventoryEntrySupplyChannel*](#setinventoryentrysupplychannel)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2666](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2666)

___

##### ItemShippingDetails

Ƭ **ItemShippingDetails**: { `__typename?`: *ItemShippingDetails* ; `targets`: [*ItemShippingTarget*](#itemshippingtarget)[] ; `valid`: [*Scalars*](#scalars)[*Boolean*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ItemShippingDetails* |
`targets` | [*ItemShippingTarget*](#itemshippingtarget)[] |
`valid` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2702](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2702)

___

##### ItemShippingDetailsDraft

Ƭ **ItemShippingDetailsDraft**: { `targets`: [*ShippingTargetDraft*](#shippingtargetdraft)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`targets` | [*ShippingTargetDraft*](#shippingtargetdraft)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2708](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2708)

___

##### ItemShippingDetailsDraftType

Ƭ **ItemShippingDetailsDraftType**: { `targets`: [*ShippingTargetDraftType*](#shippingtargetdrafttype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`targets` | [*ShippingTargetDraftType*](#shippingtargetdrafttype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2712](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2712)

___

##### ItemShippingTarget

Ƭ **ItemShippingTarget**: { `__typename?`: *ItemShippingTarget* ; `addressKey`: [*Scalars*](#scalars)[*String*] ; `quantity`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ItemShippingTarget* |
`addressKey` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2716](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2716)

___

##### ItemState

Ƭ **ItemState**: { `__typename?`: *ItemState* ; `quantity`: [*Scalars*](#scalars)[*Long*] ; `state?`: [*Maybe*](#maybe)<[*State*](#state)\> ; `stateRef`: [*Reference*](#reference)  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ItemState* |
`quantity` | [*Scalars*](#scalars)[*Long*] |
`state?` | [*Maybe*](#maybe)<[*State*](#state)\> |
`stateRef` | [*Reference*](#reference) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2722](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2722)

___

##### ItemStateDraftType

Ƭ **ItemStateDraftType**: { `quantity`: [*Scalars*](#scalars)[*Long*] ; `state`: [*ReferenceInput*](#referenceinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`quantity` | [*Scalars*](#scalars)[*Long*] |
`state` | [*ReferenceInput*](#referenceinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2729](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2729)

___

##### KeyReference

Ƭ **KeyReference**: { `__typename?`: *KeyReference* ; `key`: [*Scalars*](#scalars)[*String*] ; `typeId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *KeyReference* |
`key` | [*Scalars*](#scalars)[*String*] |
`typeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2734](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2734)

___

##### LineItem

Ƭ **LineItem**: { `__typename?`: *LineItem* ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `discountedPricePerQuantity`: [*DiscountedLineItemPriceForQuantity*](#discountedlineitempriceforquantity)[] ; `distributionChannel?`: [*Maybe*](#maybe)<[*Channel*](#channel)\> ; `distributionChannelRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `id`: [*Scalars*](#scalars)[*String*] ; `inventoryMode?`: [*Maybe*](#maybe)<[*ItemShippingDetails*](#itemshippingdetails)\> ; `lineItemMode`: [*LineItemMode*](#enumstypes_graphqllineitemmodemd) ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales`: [*LocalizedString*](#localizedstring)[] ; `price`: [*ProductPrice*](#productprice) ; `priceMode`: [*LineItemPriceMode*](#enumstypes_graphqllineitempricemodemd) ; `productId`: [*Scalars*](#scalars)[*String*] ; `productSlug?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `productType?`: [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> ; `productTypeRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `quantity`: [*Scalars*](#scalars)[*Long*] ; `shippingDetails?`: [*Maybe*](#maybe)<[*ItemShippingDetails*](#itemshippingdetails)\> ; `state`: [*ItemState*](#itemstate)[] ; `supplyChannel?`: [*Maybe*](#maybe)<[*Channel*](#channel)\> ; `supplyChannelRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `taxRate?`: [*Maybe*](#maybe)<[*TaxRate*](#taxrate)\> ; `taxedPrice?`: [*Maybe*](#maybe)<[*TaxedItemPrice*](#taxeditemprice)\> ; `totalPrice?`: [*Maybe*](#maybe)<[*Money*](#money)\> ; `variant?`: [*Maybe*](#maybe)<[*ProductVariant*](#productvariant)\>  }

A line item is a snapshot of a product variant at the time it was added to the cart.

Since a product variant may change at any time, the ProductVariant data is copied into the field variant.
The relation to the Product is kept but the line item will not automatically update if the product variant changes.
On the cart, the line item can be updated manually. The productSlug refers to the current version of the product.
It can be used to link to the product. If the product has been deleted, the line item remains but refers to a
non-existent product and the productSlug is left empty.

Please also note that creating an order is impossible if the product or product
variant a line item relates to has been deleted.

###### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`__typename?` | *LineItem* | - |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> | - |
`customFieldList?` | [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> | Custom fields are returned as a list instead of an object structure.   |
`customFields?` | [*Maybe*](#maybe)<[*Type*](#type)\> | This field would contain type data   |
`customFieldsRaw?` | [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> | This field contains non-typed data. Consider using `customFields` as a typed alternative.   |
`discountedPricePerQuantity` | [*DiscountedLineItemPriceForQuantity*](#discountedlineitempriceforquantity)[] | - |
`distributionChannel?` | [*Maybe*](#maybe)<[*Channel*](#channel)\> | - |
`distributionChannelRef?` | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`id` | [*Scalars*](#scalars)[*String*] | - |
`inventoryMode?` | [*Maybe*](#maybe)<[*ItemShippingDetails*](#itemshippingdetails)\> | - |
`lineItemMode` | [*LineItemMode*](#enumstypes_graphqllineitemmodemd) | - |
`name?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] | - |
`price` | [*ProductPrice*](#productprice) | - |
`priceMode` | [*LineItemPriceMode*](#enumstypes_graphqllineitempricemodemd) | - |
`productId` | [*Scalars*](#scalars)[*String*] | - |
`productSlug?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`productType?` | [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> | - |
`productTypeRef?` | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`quantity` | [*Scalars*](#scalars)[*Long*] | - |
`shippingDetails?` | [*Maybe*](#maybe)<[*ItemShippingDetails*](#itemshippingdetails)\> | - |
`state` | [*ItemState*](#itemstate)[] | - |
`supplyChannel?` | [*Maybe*](#maybe)<[*Channel*](#channel)\> | - |
`supplyChannelRef?` | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`taxRate?` | [*Maybe*](#maybe)<[*TaxRate*](#taxrate)\> | - |
`taxedPrice?` | [*Maybe*](#maybe)<[*TaxedItemPrice*](#taxeditemprice)\> | - |
`totalPrice?` | [*Maybe*](#maybe)<[*Money*](#money)\> | - |
`variant?` | [*Maybe*](#maybe)<[*ProductVariant*](#productvariant)\> | - |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2751](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2751)

___

##### LineItemCustomFieldListArgs

Ƭ **LineItemCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

A line item is a snapshot of a product variant at the time it was added to the cart.

Since a product variant may change at any time, the ProductVariant data is copied into the field variant.
The relation to the Product is kept but the line item will not automatically update if the product variant changes.
On the cart, the line item can be updated manually. The productSlug refers to the current version of the product.
It can be used to link to the product. If the product has been deleted, the line item remains but refers to a
non-existent product and the productSlug is left empty.

Please also note that creating an order is impossible if the product or product
variant a line item relates to has been deleted.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2844](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2844)

___

##### LineItemCustomFieldsRawArgs

Ƭ **LineItemCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

A line item is a snapshot of a product variant at the time it was added to the cart.

Since a product variant may change at any time, the ProductVariant data is copied into the field variant.
The relation to the Product is kept but the line item will not automatically update if the product variant changes.
On the cart, the line item can be updated manually. The productSlug refers to the current version of the product.
It can be used to link to the product. If the product has been deleted, the line item remains but refers to a
non-existent product and the productSlug is left empty.

Please also note that creating an order is impossible if the product or product
variant a line item relates to has been deleted.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2828](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2828)

___

##### LineItemDraft

Ƭ **LineItemDraft**: { `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `distributionChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `externalPrice?`: [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> ; `externalTaxRate?`: [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> ; `externalTotalPrice?`: [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> ; `productId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `quantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `shippingDetails?`: [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `supplyChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`distributionChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`externalPrice?` | [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> |
`externalTaxRate?` | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`externalTotalPrice?` | [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> |
`productId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetails?` | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`supplyChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2849](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2849)

___

##### LineItemNameArgs

Ƭ **LineItemNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

A line item is a snapshot of a product variant at the time it was added to the cart.

Since a product variant may change at any time, the ProductVariant data is copied into the field variant.
The relation to the Product is kept but the line item will not automatically update if the product variant changes.
On the cart, the line item can be updated manually. The productSlug refers to the current version of the product.
It can be used to link to the product. If the product has been deleted, the line item remains but refers to a
non-existent product and the productSlug is left empty.

Please also note that creating an order is impossible if the product or product
variant a line item relates to has been deleted.

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2796](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2796)

___

##### LineItemProductSlugArgs

Ƭ **LineItemProductSlugArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

A line item is a snapshot of a product variant at the time it was added to the cart.

Since a product variant may change at any time, the ProductVariant data is copied into the field variant.
The relation to the Product is kept but the line item will not automatically update if the product variant changes.
On the cart, the line item can be updated manually. The productSlug refers to the current version of the product.
It can be used to link to the product. If the product has been deleted, the line item remains but refers to a
non-existent product and the productSlug is left empty.

Please also note that creating an order is impossible if the product or product
variant a line item relates to has been deleted.

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2812](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2812)

___

##### LineItemReturnItem

Ƭ **LineItemReturnItem**: [*ReturnItem*](#returnitem) & { `__typename?`: *LineItemReturnItem* ; `comment?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `id`: [*Scalars*](#scalars)[*String*] ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lineItemId`: [*Scalars*](#scalars)[*String*] ; `paymentState`: [*ReturnPaymentState*](#enumstypes_graphqlreturnpaymentstatemd) ; `quantity`: [*Scalars*](#scalars)[*Long*] ; `shipmentState`: [*ReturnShipmentState*](#enumstypes_graphqlreturnshipmentstatemd) ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2889](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2889)

___

##### LineItemsTarget

Ƭ **LineItemsTarget**: [*CartDiscountTarget*](#cartdiscounttarget) & { `__typename?`: *LineItemsTarget* ; `predicate`: [*Scalars*](#scalars)[*String*] ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2902](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2902)

___

##### LineItemsTargetInput

Ƭ **LineItemsTargetInput**: { `predicate`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`predicate` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2908](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2908)

___

##### LocalizableEnumAttributeDefinitionType

Ƭ **LocalizableEnumAttributeDefinitionType**: [*AttributeDefinitionType*](#attributedefinitiontype) & { `__typename?`: *LocalizableEnumAttributeDefinitionType* ; `name`: [*Scalars*](#scalars)[*String*] ; `values`: [*LocalizableEnumValueTypeResult*](#localizableenumvaluetyperesult)  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2912](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2912)

___

##### LocalizableEnumAttributeDefinitionTypeValuesArgs

Ƭ **LocalizableEnumAttributeDefinitionTypeValuesArgs**: { `excludeKeys?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeKeys?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeKeys?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeKeys?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2918](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2918)

___

##### LocalizableEnumTypeDraft

Ƭ **LocalizableEnumTypeDraft**: { `values`: [*LocalizedEnumValueDraft*](#localizedenumvaluedraft)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`values` | [*LocalizedEnumValueDraft*](#localizedenumvaluedraft)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2926](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2926)

___

##### LocalizableEnumValueType

Ƭ **LocalizableEnumValueType**: { `__typename?`: *LocalizableEnumValueType* ; `key`: [*Scalars*](#scalars)[*String*] ; `label?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `labelAllLocales`: [*LocalizedString*](#localizedstring)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *LocalizableEnumValueType* |
`key` | [*Scalars*](#scalars)[*String*] |
`label?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`labelAllLocales` | [*LocalizedString*](#localizedstring)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2930](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2930)

___

##### LocalizableEnumValueTypeLabelArgs

Ƭ **LocalizableEnumValueTypeLabelArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2937](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2937)

___

##### LocalizableEnumValueTypeResult

Ƭ **LocalizableEnumValueTypeResult**: { `__typename?`: *LocalizableEnumValueTypeResult* ; `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `results`: [*LocalizableEnumValueType*](#localizableenumvaluetype)[] ; `total`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *LocalizableEnumValueTypeResult* |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`results` | [*LocalizableEnumValueType*](#localizableenumvaluetype)[] |
`total` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2942](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2942)

___

##### LocalizableTextAttributeDefinitionType

Ƭ **LocalizableTextAttributeDefinitionType**: [*AttributeDefinitionType*](#attributedefinitiontype) & { `__typename?`: *LocalizableTextAttributeDefinitionType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2950](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2950)

___

##### LocalizedEnumAttribute

Ƭ **LocalizedEnumAttribute**: [*Attribute*](#attribute) & { `__typename?`: *LocalizedEnumAttribute* ; `key`: [*Scalars*](#scalars)[*String*] ; `label?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2955](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2955)

___

##### LocalizedEnumAttributeLabelArgs

Ƭ **LocalizedEnumAttributeLabelArgs**: { `locale`: [*Scalars*](#scalars)[*Locale*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2962](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2962)

___

##### LocalizedEnumField

Ƭ **LocalizedEnumField**: [*CustomField*](#customfield) & { `__typename?`: *LocalizedEnumField* ; `key`: [*Scalars*](#scalars)[*String*] ; `label?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2966](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2966)

___

##### LocalizedEnumFieldLabelArgs

Ƭ **LocalizedEnumFieldLabelArgs**: { `locale`: [*Scalars*](#scalars)[*Locale*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2973](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2973)

___

##### LocalizedEnumType

Ƭ **LocalizedEnumType**: [*FieldType*](#fieldtype) & { `__typename?`: *LocalizedEnumType* ; `name`: [*Scalars*](#scalars)[*String*] ; `values`: [*LocalizedEnumValue*](#localizedenumvalue)[]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2977](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2977)

___

##### LocalizedEnumValue

Ƭ **LocalizedEnumValue**: { `__typename?`: *LocalizedEnumValue* ; `key`: [*Scalars*](#scalars)[*String*] ; `label?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `labelAllLocales`: [*LocalizedString*](#localizedstring)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *LocalizedEnumValue* |
`key` | [*Scalars*](#scalars)[*String*] |
`label?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`labelAllLocales` | [*LocalizedString*](#localizedstring)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2983](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2983)

___

##### LocalizedEnumValueDraft

Ƭ **LocalizedEnumValueDraft**: { `key`: [*Scalars*](#scalars)[*String*] ; `label`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`key` | [*Scalars*](#scalars)[*String*] |
`label` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2995](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2995)

___

##### LocalizedEnumValueInput

Ƭ **LocalizedEnumValueInput**: { `key`: [*Scalars*](#scalars)[*String*] ; `label`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`key` | [*Scalars*](#scalars)[*String*] |
`label` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3000](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3000)

___

##### LocalizedEnumValueLabelArgs

Ƭ **LocalizedEnumValueLabelArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:2990](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L2990)

___

##### LocalizedString

Ƭ **LocalizedString**: { `__typename?`: *LocalizedString* ; `locale`: [*Scalars*](#scalars)[*Locale*] ; `value`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *LocalizedString* |
`locale` | [*Scalars*](#scalars)[*Locale*] |
`value` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3005](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3005)

___

##### LocalizedStringAttribute

Ƭ **LocalizedStringAttribute**: [*Attribute*](#attribute) & { `__typename?`: *LocalizedStringAttribute* ; `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3011](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3011)

___

##### LocalizedStringAttributeValueArgs

Ƭ **LocalizedStringAttributeValueArgs**: { `locale`: [*Scalars*](#scalars)[*Locale*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3017](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3017)

___

##### LocalizedStringField

Ƭ **LocalizedStringField**: [*CustomField*](#customfield) & { `__typename?`: *LocalizedStringField* ; `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3021](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3021)

___

##### LocalizedStringFieldValueArgs

Ƭ **LocalizedStringFieldValueArgs**: { `locale`: [*Scalars*](#scalars)[*Locale*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3027](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3027)

___

##### LocalizedStringItemInputType

Ƭ **LocalizedStringItemInputType**: { `locale`: [*Scalars*](#scalars)[*Locale*] ; `value`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |
`value` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3031](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3031)

___

##### LocalizedStringType

Ƭ **LocalizedStringType**: [*FieldType*](#fieldtype) & { `__typename?`: *LocalizedStringType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3036](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3036)

___

##### LocalizedText

Ƭ **LocalizedText**: { `locale`: [*Scalars*](#scalars)[*Locale*] ; `text`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |
`text` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3041](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3041)

___

##### Location

Ƭ **Location**: { `__typename?`: *Location* ; `country`: [*Scalars*](#scalars)[*Country*] ; `state?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *Location* |
`country` | [*Scalars*](#scalars)[*Country*] |
`state?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3046](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3046)

___

##### MainProductType

Ƭ **MainProductType**: [*ProductType*](#producttype) & { `__typename?`: *mainProductType* ; `articleNumberManufacturer?`: [*Maybe*](#maybe)<[*StringAttribute*](#stringattribute)\> ; `articleNumberMax?`: [*Maybe*](#maybe)<[*StringAttribute*](#stringattribute)\> ; `baseId?`: [*Maybe*](#maybe)<[*StringAttribute*](#stringattribute)\> ; `color?`: [*Maybe*](#maybe)<[*LocalizedEnumAttribute*](#localizedenumattribute)\> ; `colorFreeDefinition?`: [*Maybe*](#maybe)<[*LocalizedStringAttribute*](#localizedstringattribute)\> ; `commonSize?`: [*Maybe*](#maybe)<[*EnumAttribute*](#enumattribute)\> ; `completeTheLook?`: [*Maybe*](#maybe)<[*StringAttribute*](#stringattribute)[]\> ; `creationDate?`: [*Maybe*](#maybe)<[*DateTimeAttribute*](#datetimeattribute)\> ; `designer?`: [*Maybe*](#maybe)<[*EnumAttribute*](#enumattribute)\> ; `details?`: [*Maybe*](#maybe)<[*LocalizedStringAttribute*](#localizedstringattribute)[]\> ; `gender?`: [*Maybe*](#maybe)<[*EnumAttribute*](#enumattribute)\> ; `isLook?`: [*Maybe*](#maybe)<[*BooleanAttribute*](#booleanattribute)\> ; `isOnStock?`: [*Maybe*](#maybe)<[*BooleanAttribute*](#booleanattribute)\> ; `lookProducts?`: [*Maybe*](#maybe)<[*StringAttribute*](#stringattribute)[]\> ; `madeInItaly?`: [*Maybe*](#maybe)<[*EnumAttribute*](#enumattribute)\> ; `matrixId?`: [*Maybe*](#maybe)<[*StringAttribute*](#stringattribute)\> ; `productTypeId`: [*Scalars*](#scalars)[*String*] ; `sapExternalId?`: [*Maybe*](#maybe)<[*StringAttribute*](#stringattribute)\> ; `season?`: [*Maybe*](#maybe)<[*StringAttribute*](#stringattribute)\> ; `seasonNew?`: [*Maybe*](#maybe)<[*StringAttribute*](#stringattribute)\> ; `size?`: [*Maybe*](#maybe)<[*StringAttribute*](#stringattribute)\> ; `style?`: [*Maybe*](#maybe)<[*EnumAttribute*](#enumattribute)\>  }

Sunrise Product Data Set Structure

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3053](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3053)

___

##### Maybe

Ƭ **Maybe**<T\>: T | *null*

###### Type parameters:

Name |
------ |
`T` |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3)

___

##### Me

Ƭ **Me**: [*MeQueryInterface*](#mequeryinterface) & { `__typename?`: *Me* ; `activeCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `cart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `carts`: [*CartQueryResult*](#cartqueryresult) ; `customer?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `order?`: [*Maybe*](#maybe)<[*Order*](#order)\> ; `orders`: [*OrderQueryResult*](#orderqueryresult) ; `shoppingList?`: [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> ; `shoppingLists`: [*ShoppingListQueryResult*](#shoppinglistqueryresult)  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3079](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3079)

___

##### MeCartArgs

Ƭ **MeCartArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3091](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3091)

___

##### MeCartsArgs

Ƭ **MeCartsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3095](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3095)

___

##### MeFieldInterface

Ƭ **MeFieldInterface**: { `me`: [*MeQueryInterface*](#mequeryinterface)  }

The me field gives access to the data that is specific to the customer or anonymous session linked to the access token.

###### Type declaration:

Name | Type |
------ | ------ |
`me` | [*MeQueryInterface*](#mequeryinterface) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3127](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3127)

___

##### MeOrderArgs

Ƭ **MeOrderArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `orderNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3102](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3102)

___

##### MeOrdersArgs

Ƭ **MeOrdersArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3107](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3107)

___

##### MeQueryInterface

Ƭ **MeQueryInterface**: { `activeCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `cart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `carts`: [*CartQueryResult*](#cartqueryresult) ; `order?`: [*Maybe*](#maybe)<[*Order*](#order)\> ; `orders`: [*OrderQueryResult*](#orderqueryresult) ; `shoppingList?`: [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> ; `shoppingLists`: [*ShoppingListQueryResult*](#shoppinglistqueryresult)  }

###### Type declaration:

Name | Type |
------ | ------ |
`activeCart?` | [*Maybe*](#maybe)<[*Cart*](#cart)\> |
`cart?` | [*Maybe*](#maybe)<[*Cart*](#cart)\> |
`carts` | [*CartQueryResult*](#cartqueryresult) |
`order?` | [*Maybe*](#maybe)<[*Order*](#order)\> |
`orders` | [*OrderQueryResult*](#orderqueryresult) |
`shoppingList?` | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> |
`shoppingLists` | [*ShoppingListQueryResult*](#shoppinglistqueryresult) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3131](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3131)

___

##### MeQueryInterfaceCartArgs

Ƭ **MeQueryInterfaceCartArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3141](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3141)

___

##### MeQueryInterfaceCartsArgs

Ƭ **MeQueryInterfaceCartsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3145](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3145)

___

##### MeQueryInterfaceOrderArgs

Ƭ **MeQueryInterfaceOrderArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `orderNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3152](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3152)

___

##### MeQueryInterfaceOrdersArgs

Ƭ **MeQueryInterfaceOrdersArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3157](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3157)

___

##### MeQueryInterfaceShoppingListArgs

Ƭ **MeQueryInterfaceShoppingListArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3164](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3164)

___

##### MeQueryInterfaceShoppingListsArgs

Ƭ **MeQueryInterfaceShoppingListsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3169](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3169)

___

##### MeShoppingListArgs

Ƭ **MeShoppingListArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3114](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3114)

___

##### MeShoppingListsArgs

Ƭ **MeShoppingListsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3119](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3119)

___

##### MessagesConfiguration

Ƭ **MessagesConfiguration**: { `__typename?`: *MessagesConfiguration* ; `deleteDaysAfterCreation?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `enabled`: [*Scalars*](#scalars)[*Boolean*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *MessagesConfiguration* |
`deleteDaysAfterCreation?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`enabled` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3176](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3176)

___

##### MessagesConfigurationDraft

Ƭ **MessagesConfigurationDraft**: { `deleteDaysAfterCreation`: [*Scalars*](#scalars)[*Int*] ; `enabled`: [*Scalars*](#scalars)[*Boolean*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`deleteDaysAfterCreation` | [*Scalars*](#scalars)[*Int*] |
`enabled` | [*Scalars*](#scalars)[*Boolean*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3182](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3182)

___

##### Money

Ƭ **Money**: [*BaseMoney*](#basemoney) & { `__typename?`: *Money* ; `centAmount`: [*Scalars*](#scalars)[*Long*] ; `currencyCode`: [*Scalars*](#scalars)[*Currency*] ; `fractionDigits`: [*Scalars*](#scalars)[*Int*] ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3187](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3187)

___

##### MoneyAttribute

Ƭ **MoneyAttribute**: [*Attribute*](#attribute) & { `__typename?`: *MoneyAttribute* ; `centAmount`: [*Scalars*](#scalars)[*Long*] ; `currencyCode`: [*Scalars*](#scalars)[*Currency*] ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3196](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3196)

___

##### MoneyAttributeDefinitionType

Ƭ **MoneyAttributeDefinitionType**: [*AttributeDefinitionType*](#attributedefinitiontype) & { `__typename?`: *MoneyAttributeDefinitionType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3203](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3203)

___

##### MoneyDraft

Ƭ **MoneyDraft**: { `centAmount`: [*Scalars*](#scalars)[*Long*] ; `currencyCode`: [*Scalars*](#scalars)[*Currency*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`centAmount` | [*Scalars*](#scalars)[*Long*] |
`currencyCode` | [*Scalars*](#scalars)[*Currency*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3208](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3208)

___

##### MoneyField

Ƭ **MoneyField**: [*CustomField*](#customfield) & { `__typename?`: *MoneyField* ; `centAmount`: [*Scalars*](#scalars)[*Long*] ; `currencyCode`: [*Scalars*](#scalars)[*Currency*] ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3213](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3213)

___

##### MoneyInput

Ƭ **MoneyInput**: { `centAmount`: [*Scalars*](#scalars)[*Long*] ; `currencyCode`: [*Scalars*](#scalars)[*Currency*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`centAmount` | [*Scalars*](#scalars)[*Long*] |
`currencyCode` | [*Scalars*](#scalars)[*Currency*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3220](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3220)

___

##### MoneyType

Ƭ **MoneyType**: [*FieldType*](#fieldtype) & { `__typename?`: *MoneyType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3225](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3225)

___

##### MoveProductImageToPosition

Ƭ **MoveProductImageToPosition**: { `imageUrl`: [*Scalars*](#scalars)[*String*] ; `position`: [*Scalars*](#scalars)[*Int*] ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`imageUrl` | [*Scalars*](#scalars)[*String*] |
`position` | [*Scalars*](#scalars)[*Int*] |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3230](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3230)

___

##### MultiBuyCustomLineItemsTarget

Ƭ **MultiBuyCustomLineItemsTarget**: [*CartDiscountTarget*](#cartdiscounttarget) & { `__typename?`: *MultiBuyCustomLineItemsTarget* ; `discountedQuantity`: [*Scalars*](#scalars)[*Long*] ; `maxOccurrence?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `predicate`: [*Scalars*](#scalars)[*String*] ; `selectionMode`: [*SelectionMode*](#enumstypes_graphqlselectionmodemd) ; `triggerQuantity`: [*Scalars*](#scalars)[*Long*] ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3238](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3238)

___

##### MultiBuyCustomLineItemsTargetInput

Ƭ **MultiBuyCustomLineItemsTargetInput**: { `discountedQuantity`: [*Scalars*](#scalars)[*Long*] ; `maxOccurrence?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `predicate`: [*Scalars*](#scalars)[*String*] ; `selectionMode?`: [*Maybe*](#maybe)<[*SelectionMode*](#enumstypes_graphqlselectionmodemd)\> ; `triggerQuantity`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`discountedQuantity` | [*Scalars*](#scalars)[*Long*] |
`maxOccurrence?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`predicate` | [*Scalars*](#scalars)[*String*] |
`selectionMode?` | [*Maybe*](#maybe)<[*SelectionMode*](#enumstypes_graphqlselectionmodemd)\> |
`triggerQuantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3248](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3248)

___

##### MultiBuyLineItemsTarget

Ƭ **MultiBuyLineItemsTarget**: [*CartDiscountTarget*](#cartdiscounttarget) & { `__typename?`: *MultiBuyLineItemsTarget* ; `discountedQuantity`: [*Scalars*](#scalars)[*Long*] ; `maxOccurrence?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `predicate`: [*Scalars*](#scalars)[*String*] ; `selectionMode`: [*SelectionMode*](#enumstypes_graphqlselectionmodemd) ; `triggerQuantity`: [*Scalars*](#scalars)[*Long*] ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3256](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3256)

___

##### MultiBuyLineItemsTargetInput

Ƭ **MultiBuyLineItemsTargetInput**: { `discountedQuantity`: [*Scalars*](#scalars)[*Long*] ; `maxOccurrence?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `predicate`: [*Scalars*](#scalars)[*String*] ; `selectionMode?`: [*Maybe*](#maybe)<[*SelectionMode*](#enumstypes_graphqlselectionmodemd)\> ; `triggerQuantity`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`discountedQuantity` | [*Scalars*](#scalars)[*Long*] |
`maxOccurrence?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`predicate` | [*Scalars*](#scalars)[*String*] |
`selectionMode?` | [*Maybe*](#maybe)<[*SelectionMode*](#enumstypes_graphqlselectionmodemd)\> |
`triggerQuantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3266](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3266)

___

##### Mutation

Ƭ **Mutation**: { `__typename?`: *Mutation* ; `createApiClient?`: [*Maybe*](#maybe)<[*ApiClientWithSecret*](#apiclientwithsecret)\> ; `createCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `createCartDiscount?`: [*Maybe*](#maybe)<[*CartDiscount*](#cartdiscount)\> ; `createCategory?`: [*Maybe*](#maybe)<[*Category*](#category)\> ; `createCustomerGroup?`: [*Maybe*](#maybe)<[*CustomerGroup*](#customergroup)\> ; `createDiscountCode?`: [*Maybe*](#maybe)<[*DiscountCode*](#discountcode)\> ; `createInventoryEntry?`: [*Maybe*](#maybe)<[*InventoryEntry*](#inventoryentry)\> ; `createMyCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `createMyOrderFromCart?`: [*Maybe*](#maybe)<[*Order*](#order)\> ; `createMyShoppingList?`: [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> ; `createOrderFromCart?`: [*Maybe*](#maybe)<[*Order*](#order)\> ; `createProduct?`: [*Maybe*](#maybe)<[*Product*](#product)\> ; `createProductDiscount?`: [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> ; `createProductType?`: [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> ; `createShippingMethod?`: [*Maybe*](#maybe)<[*ShippingMethod*](#shippingmethod)\> ; `createShoppingList?`: [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> ; `createStore?`: [*Maybe*](#maybe)<[*Store*](#store)\> ; `createTaxCategory?`: [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> ; `createZone?`: [*Maybe*](#maybe)<[*Zone*](#zone)\> ; `customerChangeMyPassword?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `customerChangePassword?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `customerConfirmEmail?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `customerConfirmMyEmail?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `customerCreateEmailVerificationToken`: [*CustomerToken*](#customertoken) ; `customerCreatePasswordResetToken?`: [*Maybe*](#maybe)<[*CustomerToken*](#customertoken)\> ; `customerResetMyPassword?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `customerResetPassword?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `customerSignIn`: [*CustomerSignInResult*](#customersigninresult) ; `customerSignMeIn`: [*CustomerSignInResult*](#customersigninresult) ; `customerSignMeUp`: [*CustomerSignInResult*](#customersigninresult) ; `customerSignUp`: [*CustomerSignInResult*](#customersigninresult) ; `deleteApiClient?`: [*Maybe*](#maybe)<[*ApiClientWithoutSecret*](#apiclientwithoutsecret)\> ; `deleteCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `deleteCartDiscount?`: [*Maybe*](#maybe)<[*CartDiscount*](#cartdiscount)\> ; `deleteCategory?`: [*Maybe*](#maybe)<[*Category*](#category)\> ; `deleteCustomer?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `deleteCustomerGroup?`: [*Maybe*](#maybe)<[*CustomerGroup*](#customergroup)\> ; `deleteDiscountCode?`: [*Maybe*](#maybe)<[*DiscountCode*](#discountcode)\> ; `deleteInventoryEntry?`: [*Maybe*](#maybe)<[*InventoryEntry*](#inventoryentry)\> ; `deleteMyCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `deleteMyCustomer?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `deleteMyShoppingList?`: [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> ; `deleteOrder?`: [*Maybe*](#maybe)<[*Order*](#order)\> ; `deleteProduct?`: [*Maybe*](#maybe)<[*Product*](#product)\> ; `deleteProductDiscount?`: [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> ; `deleteProductType?`: [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> ; `deleteShippingMethod?`: [*Maybe*](#maybe)<[*ShippingMethod*](#shippingmethod)\> ; `deleteShoppingList?`: [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> ; `deleteStore?`: [*Maybe*](#maybe)<[*Store*](#store)\> ; `deleteTaxCategory?`: [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> ; `deleteZone?`: [*Maybe*](#maybe)<[*Zone*](#zone)\> ; `replicateCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `updateCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `updateCartDiscount?`: [*Maybe*](#maybe)<[*CartDiscount*](#cartdiscount)\> ; `updateCategory?`: [*Maybe*](#maybe)<[*Category*](#category)\> ; `updateCustomer?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `updateCustomerGroup?`: [*Maybe*](#maybe)<[*CustomerGroup*](#customergroup)\> ; `updateDiscountCode?`: [*Maybe*](#maybe)<[*DiscountCode*](#discountcode)\> ; `updateInventoryEntry?`: [*Maybe*](#maybe)<[*InventoryEntry*](#inventoryentry)\> ; `updateMyCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `updateMyCustomer?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `updateMyShoppingList?`: [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> ; `updateOrder?`: [*Maybe*](#maybe)<[*Order*](#order)\> ; `updateProduct?`: [*Maybe*](#maybe)<[*Product*](#product)\> ; `updateProductDiscount?`: [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> ; `updateProductType?`: [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> ; `updateProject?`: [*Maybe*](#maybe)<[*ProjectProjection*](#projectprojection)\> ; `updateShippingMethod?`: [*Maybe*](#maybe)<[*ShippingMethod*](#shippingmethod)\> ; `updateShoppingList?`: [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> ; `updateStore?`: [*Maybe*](#maybe)<[*Store*](#store)\> ; `updateTaxCategory?`: [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> ; `updateZone?`: [*Maybe*](#maybe)<[*Zone*](#zone)\>  }

###### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`__typename?` | *Mutation* | - |
`createApiClient?` | [*Maybe*](#maybe)<[*ApiClientWithSecret*](#apiclientwithsecret)\> | - |
`createCart?` | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`createCartDiscount?` | [*Maybe*](#maybe)<[*CartDiscount*](#cartdiscount)\> | - |
`createCategory?` | [*Maybe*](#maybe)<[*Category*](#category)\> | - |
`createCustomerGroup?` | [*Maybe*](#maybe)<[*CustomerGroup*](#customergroup)\> | - |
`createDiscountCode?` | [*Maybe*](#maybe)<[*DiscountCode*](#discountcode)\> | - |
`createInventoryEntry?` | [*Maybe*](#maybe)<[*InventoryEntry*](#inventoryentry)\> | - |
`createMyCart?` | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`createMyOrderFromCart?` | [*Maybe*](#maybe)<[*Order*](#order)\> | - |
`createMyShoppingList?` | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> | - |
`createOrderFromCart?` | [*Maybe*](#maybe)<[*Order*](#order)\> | - |
`createProduct?` | [*Maybe*](#maybe)<[*Product*](#product)\> | - |
`createProductDiscount?` | [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> | - |
`createProductType?` | [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> | - |
`createShippingMethod?` | [*Maybe*](#maybe)<[*ShippingMethod*](#shippingmethod)\> | - |
`createShoppingList?` | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> | - |
`createStore?` | [*Maybe*](#maybe)<[*Store*](#store)\> | - |
`createTaxCategory?` | [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> | - |
`createZone?` | [*Maybe*](#maybe)<[*Zone*](#zone)\> | - |
`customerChangeMyPassword?` | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`customerChangePassword?` | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`customerConfirmEmail?` | [*Maybe*](#maybe)<[*Customer*](#customer)\> | Verifies customer's email using a token.   |
`customerConfirmMyEmail?` | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`customerCreateEmailVerificationToken` | [*CustomerToken*](#customertoken) | - |
`customerCreatePasswordResetToken?` | [*Maybe*](#maybe)<[*CustomerToken*](#customertoken)\> | The token value is used to reset the password of the customer with the given email. The token is valid only for 10 minutes.   |
`customerResetMyPassword?` | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`customerResetPassword?` | [*Maybe*](#maybe)<[*Customer*](#customer)\> | The following workflow can be used to reset the customer’s password:  1. Create a password reset token and send it embedded in a link to the customer. 2. When the customer clicks on the link, you may optionally retrieve customer by password token. 3. When the customer entered new password, use reset customer’s password to reset the password.    |
`customerSignIn` | [*CustomerSignInResult*](#customersigninresult) | Retrieves the authenticated customer (a customer that matches the given email/password pair).  There may be carts and orders created before the sign in that should be assigned to the customer account. With the `anonymousCartId`, a single anonymous cart can be assigned. With the `anonymousId`, all orders and carts that have this `anonymousId` set will be assigned to the customer. If both `anonymousCartId` and `anonymousId` are given, the anonymous cart must have the `anonymousId`.  Additionally, there might also exist one or more active customer carts from an earlier session. On customer sign in there are several ways how to proceed with this cart and the cart referenced by the `anonymousCartId`.  * If the customer does not have a cart yet, the anonymous cart becomes the customer's cart. * If the customer already has one or more carts, the content of the anonymous cart will be copied to the customer's active cart that has been modified most recently.    In this case the `CartState` of the anonymous cart gets changed to `Merged` while the customer's cart remains the `Active` cart.    If a `LineItem` in the anonymous cart matches an existing line item, or a `CustomLineItem` matches an existing custom line item in the customer's cart, the maximum quantity of both line items is used as the new quantity.    `ItemShippingDetails` are copied from the item with the highest quantity.    If `itemShippingAddresses` are different in the two carts, the resulting cart contains the addresses of both the customer cart and the anonymous cart.    Note, that it is not possible to merge carts that differ in their currency (set during creation of the cart).  If a cart is is returned as part of the `CustomerSignInResult`, it has been recalculated (it will have up-to-date prices, taxes and discounts, and invalid line items have been removed).    |
`customerSignMeIn` | [*CustomerSignInResult*](#customersigninresult) | Retrieves the authenticated customer (a customer that matches the given email/password pair).  If used with an access token for Anonymous Sessions, all orders and carts belonging to the `anonymousId` will be assigned to the newly created customer.  * If the customer does not have a cart yet, the anonymous cart that was modified most recently becomes the customer's cart. * If the customer already has a cart, the most recently modified anonymous cart will be handled according to the `AnonymousCartSignInMode`.  If a cart is is returned as part of the `CustomerSignInResult`, it has been recalculated (it will have up-to-date prices, taxes and discounts, and invalid line items have been removed).    |
`customerSignMeUp` | [*CustomerSignInResult*](#customersigninresult) | If used with an access token for Anonymous Sessions, all orders and carts belonging to the anonymousId will be assigned to the newly created customer.   |
`customerSignUp` | [*CustomerSignInResult*](#customersigninresult) | Creates a customer. If an anonymous cart is given then the cart is assigned to the created customer and the version number of the Cart will increase. If the id of an anonymous session is given, all carts and orders will be assigned to the created customer.   |
`deleteApiClient?` | [*Maybe*](#maybe)<[*ApiClientWithoutSecret*](#apiclientwithoutsecret)\> | - |
`deleteCart?` | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`deleteCartDiscount?` | [*Maybe*](#maybe)<[*CartDiscount*](#cartdiscount)\> | - |
`deleteCategory?` | [*Maybe*](#maybe)<[*Category*](#category)\> | - |
`deleteCustomer?` | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`deleteCustomerGroup?` | [*Maybe*](#maybe)<[*CustomerGroup*](#customergroup)\> | - |
`deleteDiscountCode?` | [*Maybe*](#maybe)<[*DiscountCode*](#discountcode)\> | - |
`deleteInventoryEntry?` | [*Maybe*](#maybe)<[*InventoryEntry*](#inventoryentry)\> | - |
`deleteMyCart?` | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`deleteMyCustomer?` | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`deleteMyShoppingList?` | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> | - |
`deleteOrder?` | [*Maybe*](#maybe)<[*Order*](#order)\> | - |
`deleteProduct?` | [*Maybe*](#maybe)<[*Product*](#product)\> | - |
`deleteProductDiscount?` | [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> | - |
`deleteProductType?` | [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> | - |
`deleteShippingMethod?` | [*Maybe*](#maybe)<[*ShippingMethod*](#shippingmethod)\> | - |
`deleteShoppingList?` | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> | - |
`deleteStore?` | [*Maybe*](#maybe)<[*Store*](#store)\> | - |
`deleteTaxCategory?` | [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> | - |
`deleteZone?` | [*Maybe*](#maybe)<[*Zone*](#zone)\> | - |
`replicateCart?` | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`updateCart?` | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`updateCartDiscount?` | [*Maybe*](#maybe)<[*CartDiscount*](#cartdiscount)\> | - |
`updateCategory?` | [*Maybe*](#maybe)<[*Category*](#category)\> | - |
`updateCustomer?` | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`updateCustomerGroup?` | [*Maybe*](#maybe)<[*CustomerGroup*](#customergroup)\> | - |
`updateDiscountCode?` | [*Maybe*](#maybe)<[*DiscountCode*](#discountcode)\> | - |
`updateInventoryEntry?` | [*Maybe*](#maybe)<[*InventoryEntry*](#inventoryentry)\> | - |
`updateMyCart?` | [*Maybe*](#maybe)<[*Cart*](#cart)\> | - |
`updateMyCustomer?` | [*Maybe*](#maybe)<[*Customer*](#customer)\> | - |
`updateMyShoppingList?` | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> | - |
`updateOrder?` | [*Maybe*](#maybe)<[*Order*](#order)\> | - |
`updateProduct?` | [*Maybe*](#maybe)<[*Product*](#product)\> | - |
`updateProductDiscount?` | [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> | - |
`updateProductType?` | [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> | - |
`updateProject?` | [*Maybe*](#maybe)<[*ProjectProjection*](#projectprojection)\> | - |
`updateShippingMethod?` | [*Maybe*](#maybe)<[*ShippingMethod*](#shippingmethod)\> | - |
`updateShoppingList?` | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> | - |
`updateStore?` | [*Maybe*](#maybe)<[*Store*](#store)\> | - |
`updateTaxCategory?` | [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> | - |
`updateZone?` | [*Maybe*](#maybe)<[*Zone*](#zone)\> | - |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3274](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3274)

___

##### MutationCreateApiClientArgs

Ƭ **MutationCreateApiClientArgs**: { `draft`: [*CreateApiClient*](#createapiclient)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*CreateApiClient*](#createapiclient) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3821](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3821)

___

##### MutationCreateCartArgs

Ƭ **MutationCreateCartArgs**: { `draft`: [*CartDraft*](#cartdraft) ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*CartDraft*](#cartdraft) |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3699](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3699)

___

##### MutationCreateCartDiscountArgs

Ƭ **MutationCreateCartDiscountArgs**: { `draft`: [*CartDiscountDraft*](#cartdiscountdraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*CartDiscountDraft*](#cartdiscountdraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3533](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3533)

___

##### MutationCreateCategoryArgs

Ƭ **MutationCreateCategoryArgs**: { `draft`: [*CategoryDraft*](#categorydraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*CategoryDraft*](#categorydraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3433](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3433)

___

##### MutationCreateCustomerGroupArgs

Ƭ **MutationCreateCustomerGroupArgs**: { `draft`: [*CustomerGroupDraft*](#customergroupdraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*CustomerGroupDraft*](#customergroupdraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3416](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3416)

___

##### MutationCreateDiscountCodeArgs

Ƭ **MutationCreateDiscountCodeArgs**: { `draft`: [*DiscountCodeDraft*](#discountcodedraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*DiscountCodeDraft*](#discountcodedraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3518](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3518)

___

##### MutationCreateInventoryEntryArgs

Ƭ **MutationCreateInventoryEntryArgs**: { `draft`: [*InventoryEntryDraft*](#inventoryentrydraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*InventoryEntryDraft*](#inventoryentrydraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3684](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3684)

___

##### MutationCreateMyCartArgs

Ƭ **MutationCreateMyCartArgs**: { `draft`: [*MyCartDraft*](#mycartdraft) ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*MyCartDraft*](#mycartdraft) |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3722](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3722)

___

##### MutationCreateMyOrderFromCartArgs

Ƭ **MutationCreateMyOrderFromCartArgs**: { `draft`: [*OrderMyCartCommand*](#ordermycartcommand) ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*OrderMyCartCommand*](#ordermycartcommand) |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3761](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3761)

___

##### MutationCreateMyShoppingListArgs

Ƭ **MutationCreateMyShoppingListArgs**: { `draft`: [*MyShoppingListDraft*](#myshoppinglistdraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*MyShoppingListDraft*](#myshoppinglistdraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3784](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3784)

___

##### MutationCreateOrderFromCartArgs

Ƭ **MutationCreateOrderFromCartArgs**: { `draft`: [*OrderCartCommand*](#ordercartcommand) ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*OrderCartCommand*](#ordercartcommand) |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3740](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3740)

___

##### MutationCreateProductArgs

Ƭ **MutationCreateProductArgs**: { `draft`: [*ProductDraft*](#productdraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*ProductDraft*](#productdraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3567](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3567)

___

##### MutationCreateProductDiscountArgs

Ƭ **MutationCreateProductDiscountArgs**: { `draft`: [*ProductDiscountDraft*](#productdiscountdraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*ProductDiscountDraft*](#productdiscountdraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3550](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3550)

___

##### MutationCreateProductTypeArgs

Ƭ **MutationCreateProductTypeArgs**: { `draft`: [*ProductTypeDraft*](#producttypedraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*ProductTypeDraft*](#producttypedraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3450](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3450)

___

##### MutationCreateShippingMethodArgs

Ƭ **MutationCreateShippingMethodArgs**: { `draft`: [*ShippingMethodDraft*](#shippingmethoddraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*ShippingMethodDraft*](#shippingmethoddraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3467](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3467)

___

##### MutationCreateShoppingListArgs

Ƭ **MutationCreateShoppingListArgs**: { `draft`: [*ShoppingListDraft*](#shoppinglistdraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*ShoppingListDraft*](#shoppinglistdraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3766](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3766)

___

##### MutationCreateStoreArgs

Ƭ **MutationCreateStoreArgs**: { `draft`: [*CreateStore*](#createstore)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*CreateStore*](#createstore) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3804](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3804)

___

##### MutationCreateTaxCategoryArgs

Ƭ **MutationCreateTaxCategoryArgs**: { `draft`: [*TaxCategoryDraft*](#taxcategorydraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*TaxCategoryDraft*](#taxcategorydraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3501](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3501)

___

##### MutationCreateZoneArgs

Ƭ **MutationCreateZoneArgs**: { `draft`: [*CreateZone*](#createzone)  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*CreateZone*](#createzone) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3484](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3484)

___

##### MutationCustomerChangeMyPasswordArgs

Ƭ **MutationCustomerChangeMyPasswordArgs**: { `currentPassword`: [*Scalars*](#scalars)[*String*] ; `newPassword`: [*Scalars*](#scalars)[*String*] ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`currentPassword` | [*Scalars*](#scalars)[*String*] |
`newPassword` | [*Scalars*](#scalars)[*String*] |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3666](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3666)

___

##### MutationCustomerChangePasswordArgs

Ƭ **MutationCustomerChangePasswordArgs**: { `currentPassword`: [*Scalars*](#scalars)[*String*] ; `id`: [*Scalars*](#scalars)[*String*] ; `newPassword`: [*Scalars*](#scalars)[*String*] ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`currentPassword` | [*Scalars*](#scalars)[*String*] |
`id` | [*Scalars*](#scalars)[*String*] |
`newPassword` | [*Scalars*](#scalars)[*String*] |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3610](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3610)

___

##### MutationCustomerConfirmEmailArgs

Ƭ **MutationCustomerConfirmEmailArgs**: { `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `tokenValue`: [*Scalars*](#scalars)[*String*] ; `version?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`tokenValue` | [*Scalars*](#scalars)[*String*] |
`version?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3625](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3625)

___

##### MutationCustomerConfirmMyEmailArgs

Ƭ **MutationCustomerConfirmMyEmailArgs**: { `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `tokenValue`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`tokenValue` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3673](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3673)

___

##### MutationCustomerCreateEmailVerificationTokenArgs

Ƭ **MutationCustomerCreateEmailVerificationTokenArgs**: { `id`: [*Scalars*](#scalars)[*String*] ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `ttlMinutes`: [*Scalars*](#scalars)[*Int*] ; `version?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`ttlMinutes` | [*Scalars*](#scalars)[*Int*] |
`version?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3637](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3637)

___

##### MutationCustomerCreatePasswordResetTokenArgs

Ƭ **MutationCustomerCreatePasswordResetTokenArgs**: { `email`: [*Scalars*](#scalars)[*String*] ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `ttlMinutes?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`email` | [*Scalars*](#scalars)[*String*] |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`ttlMinutes?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3631](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3631)

___

##### MutationCustomerResetMyPasswordArgs

Ƭ **MutationCustomerResetMyPasswordArgs**: { `newPassword`: [*Scalars*](#scalars)[*String*] ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `tokenValue`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`newPassword` | [*Scalars*](#scalars)[*String*] |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`tokenValue` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3678](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3678)

___

##### MutationCustomerResetPasswordArgs

Ƭ **MutationCustomerResetPasswordArgs**: { `newPassword`: [*Scalars*](#scalars)[*String*] ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `tokenValue`: [*Scalars*](#scalars)[*String*] ; `version?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`newPassword` | [*Scalars*](#scalars)[*String*] |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`tokenValue` | [*Scalars*](#scalars)[*String*] |
`version?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3618](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3618)

___

##### MutationCustomerSignInArgs

Ƭ **MutationCustomerSignInArgs**: { `draft`: [*CustomerSignInDraft*](#customersignindraft) ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*CustomerSignInDraft*](#customersignindraft) |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3589](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3589)

___

##### MutationCustomerSignMeInArgs

Ƭ **MutationCustomerSignMeInArgs**: { `draft`: [*CustomerSignMeInDraft*](#customersignmeindraft) ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*CustomerSignMeInDraft*](#customersignmeindraft) |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3649](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3649)

___

##### MutationCustomerSignMeUpArgs

Ƭ **MutationCustomerSignMeUpArgs**: { `draft`: [*CustomerSignMeUpDraft*](#customersignmeupdraft) ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*CustomerSignMeUpDraft*](#customersignmeupdraft) |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3644](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3644)

___

##### MutationCustomerSignUpArgs

Ƭ **MutationCustomerSignUpArgs**: { `draft`: [*CustomerSignUpDraft*](#customersignupdraft) ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`draft` | [*CustomerSignUpDraft*](#customersignupdraft) |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3584](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3584)

___

##### MutationDeleteApiClientArgs

Ƭ **MutationDeleteApiClientArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3825](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3825)

___

##### MutationDeleteCartArgs

Ƭ **MutationDeleteCartArgs**: { `id`: [*Scalars*](#scalars)[*String*] ; `personalDataErasure?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |
`personalDataErasure?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3711](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3711)

___

##### MutationDeleteCartDiscountArgs

Ƭ **MutationDeleteCartDiscountArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3544](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3544)

___

##### MutationDeleteCategoryArgs

Ƭ **MutationDeleteCategoryArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3444](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3444)

___

##### MutationDeleteCustomerArgs

Ƭ **MutationDeleteCustomerArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `personalDataErasure?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`personalDataErasure?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3602](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3602)

___

##### MutationDeleteCustomerGroupArgs

Ƭ **MutationDeleteCustomerGroupArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3427](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3427)

___

##### MutationDeleteDiscountCodeArgs

Ƭ **MutationDeleteDiscountCodeArgs**: { `id`: [*Scalars*](#scalars)[*String*] ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3528](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3528)

___

##### MutationDeleteInventoryEntryArgs

Ƭ **MutationDeleteInventoryEntryArgs**: { `id`: [*Scalars*](#scalars)[*String*] ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3694](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3694)

___

##### MutationDeleteMyCartArgs

Ƭ **MutationDeleteMyCartArgs**: { `id`: [*Scalars*](#scalars)[*String*] ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3734](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3734)

___

##### MutationDeleteMyCustomerArgs

Ƭ **MutationDeleteMyCustomerArgs**: { `personalDataErasure?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`personalDataErasure?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3660](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3660)

___

##### MutationDeleteMyShoppingListArgs

Ƭ **MutationDeleteMyShoppingListArgs**: { `id`: [*Scalars*](#scalars)[*String*] ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3794](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3794)

___

##### MutationDeleteOrderArgs

Ƭ **MutationDeleteOrderArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `orderNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `personalDataErasure?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`personalDataErasure?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3753](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3753)

___

##### MutationDeleteProductArgs

Ƭ **MutationDeleteProductArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3578](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3578)

___

##### MutationDeleteProductDiscountArgs

Ƭ **MutationDeleteProductDiscountArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3561](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3561)

___

##### MutationDeleteProductTypeArgs

Ƭ **MutationDeleteProductTypeArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3461](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3461)

___

##### MutationDeleteShippingMethodArgs

Ƭ **MutationDeleteShippingMethodArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3478](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3478)

___

##### MutationDeleteShoppingListArgs

Ƭ **MutationDeleteShoppingListArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `personalDataErasure?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`personalDataErasure?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3777](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3777)

___

##### MutationDeleteStoreArgs

Ƭ **MutationDeleteStoreArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3815](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3815)

___

##### MutationDeleteTaxCategoryArgs

Ƭ **MutationDeleteTaxCategoryArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3512](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3512)

___

##### MutationDeleteZoneArgs

Ƭ **MutationDeleteZoneArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3495](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3495)

___

##### MutationReplicateCartArgs

Ƭ **MutationReplicateCartArgs**: { `reference`: [*ReferenceInput*](#referenceinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`reference` | [*ReferenceInput*](#referenceinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3718](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3718)

___

##### MutationUpdateCartArgs

Ƭ **MutationUpdateCartArgs**: { `actions`: [*CartUpdateAction*](#cartupdateaction)[] ; `id`: [*Scalars*](#scalars)[*String*] ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*CartUpdateAction*](#cartupdateaction)[] |
`id` | [*Scalars*](#scalars)[*String*] |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3704](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3704)

___

##### MutationUpdateCartDiscountArgs

Ƭ **MutationUpdateCartDiscountArgs**: { `actions`: [*CartDiscountUpdateAction*](#cartdiscountupdateaction)[] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*CartDiscountUpdateAction*](#cartdiscountupdateaction)[] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3537](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3537)

___

##### MutationUpdateCategoryArgs

Ƭ **MutationUpdateCategoryArgs**: { `actions`: [*CategoryUpdateAction*](#categoryupdateaction)[] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*CategoryUpdateAction*](#categoryupdateaction)[] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3437](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3437)

___

##### MutationUpdateCustomerArgs

Ƭ **MutationUpdateCustomerArgs**: { `actions`: [*CustomerUpdateAction*](#customerupdateaction)[] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*CustomerUpdateAction*](#customerupdateaction)[] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3594](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3594)

___

##### MutationUpdateCustomerGroupArgs

Ƭ **MutationUpdateCustomerGroupArgs**: { `actions`: [*CustomerGroupUpdateAction*](#customergroupupdateaction)[] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*CustomerGroupUpdateAction*](#customergroupupdateaction)[] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3420](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3420)

___

##### MutationUpdateDiscountCodeArgs

Ƭ **MutationUpdateDiscountCodeArgs**: { `actions`: [*DiscountCodeUpdateAction*](#discountcodeupdateaction)[] ; `id`: [*Scalars*](#scalars)[*String*] ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*DiscountCodeUpdateAction*](#discountcodeupdateaction)[] |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3522](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3522)

___

##### MutationUpdateInventoryEntryArgs

Ƭ **MutationUpdateInventoryEntryArgs**: { `actions`: [*InventoryEntryUpdateAction*](#inventoryentryupdateaction)[] ; `id`: [*Scalars*](#scalars)[*String*] ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*InventoryEntryUpdateAction*](#inventoryentryupdateaction)[] |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3688](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3688)

___

##### MutationUpdateMyCartArgs

Ƭ **MutationUpdateMyCartArgs**: { `actions`: [*MyCartUpdateAction*](#mycartupdateaction)[] ; `id`: [*Scalars*](#scalars)[*String*] ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*MyCartUpdateAction*](#mycartupdateaction)[] |
`id` | [*Scalars*](#scalars)[*String*] |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3727](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3727)

___

##### MutationUpdateMyCustomerArgs

Ƭ **MutationUpdateMyCustomerArgs**: { `actions`: [*MyCustomerUpdateAction*](#mycustomerupdateaction)[] ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*MyCustomerUpdateAction*](#mycustomerupdateaction)[] |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3654](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3654)

___

##### MutationUpdateMyShoppingListArgs

Ƭ **MutationUpdateMyShoppingListArgs**: { `actions`: [*MyShoppingListUpdateAction*](#myshoppinglistupdateaction)[] ; `id`: [*Scalars*](#scalars)[*String*] ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*MyShoppingListUpdateAction*](#myshoppinglistupdateaction)[] |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3788](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3788)

___

##### MutationUpdateOrderArgs

Ƭ **MutationUpdateOrderArgs**: { `actions`: [*OrderUpdateAction*](#orderupdateaction)[] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `orderNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `storeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*OrderUpdateAction*](#orderupdateaction)[] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`storeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*KeyReferenceInput*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3745](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3745)

___

##### MutationUpdateProductArgs

Ƭ **MutationUpdateProductArgs**: { `actions`: [*ProductUpdateAction*](#productupdateaction)[] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*ProductUpdateAction*](#productupdateaction)[] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3571](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3571)

___

##### MutationUpdateProductDiscountArgs

Ƭ **MutationUpdateProductDiscountArgs**: { `actions`: [*ProductDiscountUpdateAction*](#productdiscountupdateaction)[] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*ProductDiscountUpdateAction*](#productdiscountupdateaction)[] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3554](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3554)

___

##### MutationUpdateProductTypeArgs

Ƭ **MutationUpdateProductTypeArgs**: { `actions`: [*ProductTypeUpdateAction*](#producttypeupdateaction)[] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*ProductTypeUpdateAction*](#producttypeupdateaction)[] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3454](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3454)

___

##### MutationUpdateProjectArgs

Ƭ **MutationUpdateProjectArgs**: { `actions`: [*ProjectSettingsUpdateAction*](#projectsettingsupdateaction)[] ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*ProjectSettingsUpdateAction*](#projectsettingsupdateaction)[] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3799](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3799)

___

##### MutationUpdateShippingMethodArgs

Ƭ **MutationUpdateShippingMethodArgs**: { `actions`: [*ShippingMethodUpdateAction*](#shippingmethodupdateaction)[] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*ShippingMethodUpdateAction*](#shippingmethodupdateaction)[] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3471](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3471)

___

##### MutationUpdateShoppingListArgs

Ƭ **MutationUpdateShoppingListArgs**: { `actions`: [*ShoppingListUpdateAction*](#shoppinglistupdateaction)[] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*ShoppingListUpdateAction*](#shoppinglistupdateaction)[] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3770](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3770)

___

##### MutationUpdateStoreArgs

Ƭ **MutationUpdateStoreArgs**: { `actions`: [*StoreUpdateAction*](#storeupdateaction)[] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*StoreUpdateAction*](#storeupdateaction)[] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3808](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3808)

___

##### MutationUpdateTaxCategoryArgs

Ƭ **MutationUpdateTaxCategoryArgs**: { `actions`: [*TaxCategoryUpdateAction*](#taxcategoryupdateaction)[] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*TaxCategoryUpdateAction*](#taxcategoryupdateaction)[] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3505](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3505)

___

##### MutationUpdateZoneArgs

Ƭ **MutationUpdateZoneArgs**: { `actions`: [*ZoneUpdateAction*](#zoneupdateaction)[] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`actions` | [*ZoneUpdateAction*](#zoneupdateaction)[] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3488](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3488)

___

##### MyCartDraft

Ƭ **MyCartDraft**: { `billingAddress?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> ; `country?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> ; `currency`: [*Scalars*](#scalars)[*Currency*] ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `customerEmail?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `deleteDaysAfterLastModification?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `discountCodes?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `inventoryMode?`: [*Maybe*](#maybe)<[*InventoryMode*](#enumstypes_graphqlinventorymodemd)\> ; `itemShippingAddresses?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)[]\> ; `lineItems?`: [*Maybe*](#maybe)<[*MyLineItemDraft*](#mylineitemdraft)[]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> ; `shippingAddress?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> ; `shippingMethod?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `taxMode?`: [*Maybe*](#maybe)<[*TaxMode*](#enumstypes_graphqltaxmodemd)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`billingAddress?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |
`country?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> |
`currency` | [*Scalars*](#scalars)[*Currency*] |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`customerEmail?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`deleteDaysAfterLastModification?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`discountCodes?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`inventoryMode?` | [*Maybe*](#maybe)<[*InventoryMode*](#enumstypes_graphqlinventorymodemd)\> |
`itemShippingAddresses?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)[]\> |
`lineItems?` | [*Maybe*](#maybe)<[*MyLineItemDraft*](#mylineitemdraft)[]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |
`shippingAddress?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |
`shippingMethod?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`taxMode?` | [*Maybe*](#maybe)<[*TaxMode*](#enumstypes_graphqltaxmodemd)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3829](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3829)

___

##### MyCartUpdateAction

Ƭ **MyCartUpdateAction**: { `addDiscountCode?`: [*Maybe*](#maybe)<[*AddCartDiscountCode*](#addcartdiscountcode)\> ; `addItemShippingAddress?`: [*Maybe*](#maybe)<[*AddCartItemShippingAddress*](#addcartitemshippingaddress)\> ; `addLineItem?`: [*Maybe*](#maybe)<[*AddMyCartLineItem*](#addmycartlineitem)\> ; `addPayment?`: [*Maybe*](#maybe)<[*AddCartPayment*](#addcartpayment)\> ; `addShoppingList?`: [*Maybe*](#maybe)<[*AddCartShoppingList*](#addcartshoppinglist)\> ; `applyDeltaToLineItemShippingDetailsTargets?`: [*Maybe*](#maybe)<[*ApplyCartDeltaToLineItemShippingDetailsTargets*](#applycartdeltatolineitemshippingdetailstargets)\> ; `changeLineItemQuantity?`: [*Maybe*](#maybe)<[*ChangeCartLineItemQuantity*](#changecartlineitemquantity)\> ; `changeTaxMode?`: [*Maybe*](#maybe)<[*ChangeMyCartTaxMode*](#changemycarttaxmode)\> ; `recalculate?`: [*Maybe*](#maybe)<[*RecalculateCart*](#recalculatecart)\> ; `removeDiscountCode?`: [*Maybe*](#maybe)<[*RemoveCartDiscountCode*](#removecartdiscountcode)\> ; `removeItemShippingAddress?`: [*Maybe*](#maybe)<[*RemoveCartItemShippingAddress*](#removecartitemshippingaddress)\> ; `removeLineItem?`: [*Maybe*](#maybe)<[*RemoveCartLineItem*](#removecartlineitem)\> ; `removePayment?`: [*Maybe*](#maybe)<[*RemoveCartPayment*](#removecartpayment)\> ; `setBillingAddress?`: [*Maybe*](#maybe)<[*SetCartBillingAddress*](#setcartbillingaddress)\> ; `setCountry?`: [*Maybe*](#maybe)<[*SetCartCountry*](#setcartcountry)\> ; `setCustomField?`: [*Maybe*](#maybe)<[*SetCartCustomField*](#setcartcustomfield)\> ; `setCustomType?`: [*Maybe*](#maybe)<[*SetCartCustomType*](#setcartcustomtype)\> ; `setCustomerEmail?`: [*Maybe*](#maybe)<[*SetCartCustomerEmail*](#setcartcustomeremail)\> ; `setDeleteDaysAfterLastModification?`: [*Maybe*](#maybe)<[*SetCartDeleteDaysAfterLastModification*](#setcartdeletedaysafterlastmodification)\> ; `setLineItemCustomField?`: [*Maybe*](#maybe)<[*SetCartLineItemCustomField*](#setcartlineitemcustomfield)\> ; `setLineItemCustomType?`: [*Maybe*](#maybe)<[*SetCartLineItemCustomType*](#setcartlineitemcustomtype)\> ; `setLineItemShippingDetails?`: [*Maybe*](#maybe)<[*SetCartLineItemShippingDetails*](#setcartlineitemshippingdetails)\> ; `setLocale?`: [*Maybe*](#maybe)<[*SetCartLocale*](#setcartlocale)\> ; `setShippingAddress?`: [*Maybe*](#maybe)<[*SetCartShippingAddress*](#setcartshippingaddress)\> ; `setShippingMethod?`: [*Maybe*](#maybe)<[*SetMyCartShippingMethod*](#setmycartshippingmethod)\> ; `updateItemShippingAddress?`: [*Maybe*](#maybe)<[*UpdateCartItemShippingAddress*](#updatecartitemshippingaddress)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addDiscountCode?` | [*Maybe*](#maybe)<[*AddCartDiscountCode*](#addcartdiscountcode)\> |
`addItemShippingAddress?` | [*Maybe*](#maybe)<[*AddCartItemShippingAddress*](#addcartitemshippingaddress)\> |
`addLineItem?` | [*Maybe*](#maybe)<[*AddMyCartLineItem*](#addmycartlineitem)\> |
`addPayment?` | [*Maybe*](#maybe)<[*AddCartPayment*](#addcartpayment)\> |
`addShoppingList?` | [*Maybe*](#maybe)<[*AddCartShoppingList*](#addcartshoppinglist)\> |
`applyDeltaToLineItemShippingDetailsTargets?` | [*Maybe*](#maybe)<[*ApplyCartDeltaToLineItemShippingDetailsTargets*](#applycartdeltatolineitemshippingdetailstargets)\> |
`changeLineItemQuantity?` | [*Maybe*](#maybe)<[*ChangeCartLineItemQuantity*](#changecartlineitemquantity)\> |
`changeTaxMode?` | [*Maybe*](#maybe)<[*ChangeMyCartTaxMode*](#changemycarttaxmode)\> |
`recalculate?` | [*Maybe*](#maybe)<[*RecalculateCart*](#recalculatecart)\> |
`removeDiscountCode?` | [*Maybe*](#maybe)<[*RemoveCartDiscountCode*](#removecartdiscountcode)\> |
`removeItemShippingAddress?` | [*Maybe*](#maybe)<[*RemoveCartItemShippingAddress*](#removecartitemshippingaddress)\> |
`removeLineItem?` | [*Maybe*](#maybe)<[*RemoveCartLineItem*](#removecartlineitem)\> |
`removePayment?` | [*Maybe*](#maybe)<[*RemoveCartPayment*](#removecartpayment)\> |
`setBillingAddress?` | [*Maybe*](#maybe)<[*SetCartBillingAddress*](#setcartbillingaddress)\> |
`setCountry?` | [*Maybe*](#maybe)<[*SetCartCountry*](#setcartcountry)\> |
`setCustomField?` | [*Maybe*](#maybe)<[*SetCartCustomField*](#setcartcustomfield)\> |
`setCustomType?` | [*Maybe*](#maybe)<[*SetCartCustomType*](#setcartcustomtype)\> |
`setCustomerEmail?` | [*Maybe*](#maybe)<[*SetCartCustomerEmail*](#setcartcustomeremail)\> |
`setDeleteDaysAfterLastModification?` | [*Maybe*](#maybe)<[*SetCartDeleteDaysAfterLastModification*](#setcartdeletedaysafterlastmodification)\> |
`setLineItemCustomField?` | [*Maybe*](#maybe)<[*SetCartLineItemCustomField*](#setcartlineitemcustomfield)\> |
`setLineItemCustomType?` | [*Maybe*](#maybe)<[*SetCartLineItemCustomType*](#setcartlineitemcustomtype)\> |
`setLineItemShippingDetails?` | [*Maybe*](#maybe)<[*SetCartLineItemShippingDetails*](#setcartlineitemshippingdetails)\> |
`setLocale?` | [*Maybe*](#maybe)<[*SetCartLocale*](#setcartlocale)\> |
`setShippingAddress?` | [*Maybe*](#maybe)<[*SetCartShippingAddress*](#setcartshippingaddress)\> |
`setShippingMethod?` | [*Maybe*](#maybe)<[*SetMyCartShippingMethod*](#setmycartshippingmethod)\> |
`updateItemShippingAddress?` | [*Maybe*](#maybe)<[*UpdateCartItemShippingAddress*](#updatecartitemshippingaddress)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3846](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3846)

___

##### MyCustomerUpdateAction

Ƭ **MyCustomerUpdateAction**: { `addAddress?`: [*Maybe*](#maybe)<[*AddCustomerAddress*](#addcustomeraddress)\> ; `addBillingAddressId?`: [*Maybe*](#maybe)<[*AddCustomerBillingAddressId*](#addcustomerbillingaddressid)\> ; `addShippingAddressId?`: [*Maybe*](#maybe)<[*AddCustomerShippingAddressId*](#addcustomershippingaddressid)\> ; `changeAddress?`: [*Maybe*](#maybe)<[*ChangeCustomerAddress*](#changecustomeraddress)\> ; `changeEmail?`: [*Maybe*](#maybe)<[*ChangeCustomerEmail*](#changecustomeremail)\> ; `removeAddress?`: [*Maybe*](#maybe)<[*RemoveCustomerAddress*](#removecustomeraddress)\> ; `removeBillingAddressId?`: [*Maybe*](#maybe)<[*RemoveCustomerBillingAddressId*](#removecustomerbillingaddressid)\> ; `removeShippingAddressId?`: [*Maybe*](#maybe)<[*RemoveCustomerShippingAddressId*](#removecustomershippingaddressid)\> ; `setCompanyName?`: [*Maybe*](#maybe)<[*SetCustomerCompanyName*](#setcustomercompanyname)\> ; `setCustomField?`: [*Maybe*](#maybe)<[*SetCustomerCustomField*](#setcustomercustomfield)\> ; `setCustomType?`: [*Maybe*](#maybe)<[*SetCustomerCustomType*](#setcustomercustomtype)\> ; `setDateOfBirth?`: [*Maybe*](#maybe)<[*SetCustomerDateOfBirth*](#setcustomerdateofbirth)\> ; `setDefaultBillingAddress?`: [*Maybe*](#maybe)<[*SetCustomerDefaultBillingAddress*](#setcustomerdefaultbillingaddress)\> ; `setDefaultShippingAddress?`: [*Maybe*](#maybe)<[*SetCustomerDefaultShippingAddress*](#setcustomerdefaultshippingaddress)\> ; `setFirstName?`: [*Maybe*](#maybe)<[*SetCustomerFirstName*](#setcustomerfirstname)\> ; `setLastName?`: [*Maybe*](#maybe)<[*SetCustomerLastName*](#setcustomerlastname)\> ; `setLocale?`: [*Maybe*](#maybe)<[*SetCustomerLocale*](#setcustomerlocale)\> ; `setMiddleName?`: [*Maybe*](#maybe)<[*SetCustomerMiddleName*](#setcustomermiddlename)\> ; `setSalutation?`: [*Maybe*](#maybe)<[*SetCustomerSalutation*](#setcustomersalutation)\> ; `setTitle?`: [*Maybe*](#maybe)<[*SetCustomerTitle*](#setcustomertitle)\> ; `setVatId?`: [*Maybe*](#maybe)<[*SetCustomerVatId*](#setcustomervatid)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addAddress?` | [*Maybe*](#maybe)<[*AddCustomerAddress*](#addcustomeraddress)\> |
`addBillingAddressId?` | [*Maybe*](#maybe)<[*AddCustomerBillingAddressId*](#addcustomerbillingaddressid)\> |
`addShippingAddressId?` | [*Maybe*](#maybe)<[*AddCustomerShippingAddressId*](#addcustomershippingaddressid)\> |
`changeAddress?` | [*Maybe*](#maybe)<[*ChangeCustomerAddress*](#changecustomeraddress)\> |
`changeEmail?` | [*Maybe*](#maybe)<[*ChangeCustomerEmail*](#changecustomeremail)\> |
`removeAddress?` | [*Maybe*](#maybe)<[*RemoveCustomerAddress*](#removecustomeraddress)\> |
`removeBillingAddressId?` | [*Maybe*](#maybe)<[*RemoveCustomerBillingAddressId*](#removecustomerbillingaddressid)\> |
`removeShippingAddressId?` | [*Maybe*](#maybe)<[*RemoveCustomerShippingAddressId*](#removecustomershippingaddressid)\> |
`setCompanyName?` | [*Maybe*](#maybe)<[*SetCustomerCompanyName*](#setcustomercompanyname)\> |
`setCustomField?` | [*Maybe*](#maybe)<[*SetCustomerCustomField*](#setcustomercustomfield)\> |
`setCustomType?` | [*Maybe*](#maybe)<[*SetCustomerCustomType*](#setcustomercustomtype)\> |
`setDateOfBirth?` | [*Maybe*](#maybe)<[*SetCustomerDateOfBirth*](#setcustomerdateofbirth)\> |
`setDefaultBillingAddress?` | [*Maybe*](#maybe)<[*SetCustomerDefaultBillingAddress*](#setcustomerdefaultbillingaddress)\> |
`setDefaultShippingAddress?` | [*Maybe*](#maybe)<[*SetCustomerDefaultShippingAddress*](#setcustomerdefaultshippingaddress)\> |
`setFirstName?` | [*Maybe*](#maybe)<[*SetCustomerFirstName*](#setcustomerfirstname)\> |
`setLastName?` | [*Maybe*](#maybe)<[*SetCustomerLastName*](#setcustomerlastname)\> |
`setLocale?` | [*Maybe*](#maybe)<[*SetCustomerLocale*](#setcustomerlocale)\> |
`setMiddleName?` | [*Maybe*](#maybe)<[*SetCustomerMiddleName*](#setcustomermiddlename)\> |
`setSalutation?` | [*Maybe*](#maybe)<[*SetCustomerSalutation*](#setcustomersalutation)\> |
`setTitle?` | [*Maybe*](#maybe)<[*SetCustomerTitle*](#setcustomertitle)\> |
`setVatId?` | [*Maybe*](#maybe)<[*SetCustomerVatId*](#setcustomervatid)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3879](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3879)

___

##### MyLineItemDraft

Ƭ **MyLineItemDraft**: { `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `distributionChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `productId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `quantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `shippingDetails?`: [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `supplyChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`distributionChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`productId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetails?` | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`supplyChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3903](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3903)

___

##### MyShoppingListDraft

Ƭ **MyShoppingListDraft**: { `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `deleteDaysAfterLastModification?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `lineItems?`: [*Maybe*](#maybe)<[*ShoppingListLineItemDraft*](#shoppinglistlineitemdraft)[]\> ; `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `textLineItems?`: [*Maybe*](#maybe)<[*TextLineItemDraft*](#textlineitemdraft)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`deleteDaysAfterLastModification?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`lineItems?` | [*Maybe*](#maybe)<[*ShoppingListLineItemDraft*](#shoppinglistlineitemdraft)[]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`textLineItems?` | [*Maybe*](#maybe)<[*TextLineItemDraft*](#textlineitemdraft)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3914](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3914)

___

##### MyShoppingListUpdateAction

Ƭ **MyShoppingListUpdateAction**: { `addLineItem?`: [*Maybe*](#maybe)<[*AddShoppingListLineItem*](#addshoppinglistlineitem)\> ; `addTextLineItem?`: [*Maybe*](#maybe)<[*AddShoppingListTextLineItem*](#addshoppinglisttextlineitem)\> ; `changeLineItemQuantity?`: [*Maybe*](#maybe)<[*ChangeShoppingListLineItemQuantity*](#changeshoppinglistlineitemquantity)\> ; `changeLineItemsOrder?`: [*Maybe*](#maybe)<[*ChangeShoppingListLineItemsOrder*](#changeshoppinglistlineitemsorder)\> ; `changeName?`: [*Maybe*](#maybe)<[*ChangeShoppingListName*](#changeshoppinglistname)\> ; `changeTextLineItemName?`: [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemName*](#changeshoppinglisttextlineitemname)\> ; `changeTextLineItemQuantity?`: [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemQuantity*](#changeshoppinglisttextlineitemquantity)\> ; `changeTextLineItemsOrder?`: [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemsOrder*](#changeshoppinglisttextlineitemsorder)\> ; `removeLineItem?`: [*Maybe*](#maybe)<[*RemoveShoppingListLineItem*](#removeshoppinglistlineitem)\> ; `removeTextLineItem?`: [*Maybe*](#maybe)<[*RemoveShoppingListTextLineItem*](#removeshoppinglisttextlineitem)\> ; `setCustomField?`: [*Maybe*](#maybe)<[*SetShoppingListCustomField*](#setshoppinglistcustomfield)\> ; `setCustomType?`: [*Maybe*](#maybe)<[*SetShoppingListCustomType*](#setshoppinglistcustomtype)\> ; `setDeleteDaysAfterLastModification?`: [*Maybe*](#maybe)<[*SetShoppingListDeleteDaysAfterLastModification*](#setshoppinglistdeletedaysafterlastmodification)\> ; `setDescription?`: [*Maybe*](#maybe)<[*SetShoppingListDescription*](#setshoppinglistdescription)\> ; `setLineItemCustomField?`: [*Maybe*](#maybe)<[*SetShoppingListLineItemCustomField*](#setshoppinglistlineitemcustomfield)\> ; `setLineItemCustomType?`: [*Maybe*](#maybe)<[*SetShoppingListLineItemCustomType*](#setshoppinglistlineitemcustomtype)\> ; `setTextLineItemCustomField?`: [*Maybe*](#maybe)<[*SetShoppingListTextLineItemCustomField*](#setshoppinglisttextlineitemcustomfield)\> ; `setTextLineItemCustomType?`: [*Maybe*](#maybe)<[*SetShoppingListTextLineItemCustomType*](#setshoppinglisttextlineitemcustomtype)\> ; `setTextLineItemDescription?`: [*Maybe*](#maybe)<[*SetShoppingListTextLineItemDescription*](#setshoppinglisttextlineitemdescription)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addLineItem?` | [*Maybe*](#maybe)<[*AddShoppingListLineItem*](#addshoppinglistlineitem)\> |
`addTextLineItem?` | [*Maybe*](#maybe)<[*AddShoppingListTextLineItem*](#addshoppinglisttextlineitem)\> |
`changeLineItemQuantity?` | [*Maybe*](#maybe)<[*ChangeShoppingListLineItemQuantity*](#changeshoppinglistlineitemquantity)\> |
`changeLineItemsOrder?` | [*Maybe*](#maybe)<[*ChangeShoppingListLineItemsOrder*](#changeshoppinglistlineitemsorder)\> |
`changeName?` | [*Maybe*](#maybe)<[*ChangeShoppingListName*](#changeshoppinglistname)\> |
`changeTextLineItemName?` | [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemName*](#changeshoppinglisttextlineitemname)\> |
`changeTextLineItemQuantity?` | [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemQuantity*](#changeshoppinglisttextlineitemquantity)\> |
`changeTextLineItemsOrder?` | [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemsOrder*](#changeshoppinglisttextlineitemsorder)\> |
`removeLineItem?` | [*Maybe*](#maybe)<[*RemoveShoppingListLineItem*](#removeshoppinglistlineitem)\> |
`removeTextLineItem?` | [*Maybe*](#maybe)<[*RemoveShoppingListTextLineItem*](#removeshoppinglisttextlineitem)\> |
`setCustomField?` | [*Maybe*](#maybe)<[*SetShoppingListCustomField*](#setshoppinglistcustomfield)\> |
`setCustomType?` | [*Maybe*](#maybe)<[*SetShoppingListCustomType*](#setshoppinglistcustomtype)\> |
`setDeleteDaysAfterLastModification?` | [*Maybe*](#maybe)<[*SetShoppingListDeleteDaysAfterLastModification*](#setshoppinglistdeletedaysafterlastmodification)\> |
`setDescription?` | [*Maybe*](#maybe)<[*SetShoppingListDescription*](#setshoppinglistdescription)\> |
`setLineItemCustomField?` | [*Maybe*](#maybe)<[*SetShoppingListLineItemCustomField*](#setshoppinglistlineitemcustomfield)\> |
`setLineItemCustomType?` | [*Maybe*](#maybe)<[*SetShoppingListLineItemCustomType*](#setshoppinglistlineitemcustomtype)\> |
`setTextLineItemCustomField?` | [*Maybe*](#maybe)<[*SetShoppingListTextLineItemCustomField*](#setshoppinglisttextlineitemcustomfield)\> |
`setTextLineItemCustomType?` | [*Maybe*](#maybe)<[*SetShoppingListTextLineItemCustomType*](#setshoppinglisttextlineitemcustomtype)\> |
`setTextLineItemDescription?` | [*Maybe*](#maybe)<[*SetShoppingListTextLineItemDescription*](#setshoppinglisttextlineitemdescription)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3923](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3923)

___

##### NestedAttributeDefinitionType

Ƭ **NestedAttributeDefinitionType**: [*AttributeDefinitionType*](#attributedefinitiontype) & { `__typename?`: *NestedAttributeDefinitionType* ; `name`: [*Scalars*](#scalars)[*String*] ; `typeReference`: [*Reference*](#reference)  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3947](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3947)

___

##### NumberAttribute

Ƭ **NumberAttribute**: [*Attribute*](#attribute) & { `__typename?`: *NumberAttribute* ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*BigDecimal*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3953](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3953)

___

##### NumberAttributeDefinitionType

Ƭ **NumberAttributeDefinitionType**: [*AttributeDefinitionType*](#attributedefinitiontype) & { `__typename?`: *NumberAttributeDefinitionType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3959](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3959)

___

##### NumberField

Ƭ **NumberField**: [*CustomField*](#customfield) & { `__typename?`: *NumberField* ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*BigDecimal*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3964](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3964)

___

##### NumberType

Ƭ **NumberType**: [*FieldType*](#fieldtype) & { `__typename?`: *NumberType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3970](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3970)

___

##### Order

Ƭ **Order**: [*Versioned*](#versioned) & { `__typename?`: *Order* ; `anonymousId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `billingAddress?`: [*Maybe*](#maybe)<[*Address*](#address)\> ; `cart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `cartRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `completedAt?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `country?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `customLineItems`: [*CustomLineItem*](#customlineitem)[] ; `customer?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `customerEmail?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `customerGroup?`: [*Maybe*](#maybe)<[*CustomerGroup*](#customergroup)\> ; `customerGroupRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `customerId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `discountCodes`: [*DiscountCodeInfo*](#discountcodeinfo)[] ; `id`: [*Scalars*](#scalars)[*String*] ; `inventoryMode`: [*InventoryMode*](#enumstypes_graphqlinventorymodemd) ; `itemShippingAddresses`: [*Address*](#address)[] ; `lastMessageSequenceNumber`: [*Scalars*](#scalars)[*Long*] ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `lineItems`: [*LineItem*](#lineitem)[] ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> ; `orderNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `orderState`: [*OrderState*](#enumstypes_graphqlorderstatemd) ; `origin`: [*CartOrigin*](#enumstypes_graphqlcartoriginmd) ; `paymentInfo?`: [*Maybe*](#maybe)<[*PaymentInfo*](#paymentinfo)\> ; `paymentState?`: [*Maybe*](#maybe)<[*PaymentState*](#enumstypes_graphqlpaymentstatemd)\> ; `refusedGifts`: [*CartDiscount*](#cartdiscount)[] ; `refusedGiftsRefs`: [*Reference*](#reference)[] ; `returnInfo`: [*ReturnInfo*](#returninfo)[] ; `shipmentState?`: [*Maybe*](#maybe)<[*ShipmentState*](#enumstypes_graphqlshipmentstatemd)\> ; `shippingAddress?`: [*Maybe*](#maybe)<[*Address*](#address)\> ; `shippingInfo?`: [*Maybe*](#maybe)<[*ShippingInfo*](#shippinginfo)\> ; `shippingRateInput?`: [*Maybe*](#maybe)<[*ShippingRateInput*](#shippingrateinput)\> ; `state?`: [*Maybe*](#maybe)<[*State*](#state)\> ; `stateRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `store?`: [*Maybe*](#maybe)<[*Store*](#store)\> ; `storeRef?`: [*Maybe*](#maybe)<[*KeyReference*](#keyreference)\> ; `syncInfo`: [*SyncInfo*](#syncinfo)[] ; `taxCalculationMode`: [*TaxCalculationMode*](#enumstypes_graphqltaxcalculationmodemd) ; `taxMode`: [*TaxMode*](#enumstypes_graphqltaxmodemd) ; `taxRoundingMode`: [*RoundingMode*](#enumstypes_graphqlroundingmodemd) ; `taxedPrice?`: [*Maybe*](#maybe)<[*TaxedPrice*](#taxedprice)\> ; `totalPrice`: [*Money*](#money) ; `version`: [*Scalars*](#scalars)[*Long*]  }

An order can be created from a cart, usually after a checkout process has been completed.
[documentation](https://docs.commercetools.com/http-api-projects-orders.html)

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:3978](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L3978)

___

##### OrderCartCommand

Ƭ **OrderCartCommand**: { `id`: [*Scalars*](#scalars)[*String*] ; `orderNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `orderState?`: [*Maybe*](#maybe)<[*OrderState*](#enumstypes_graphqlorderstatemd)\> ; `paymentState?`: [*Maybe*](#maybe)<[*PaymentState*](#enumstypes_graphqlpaymentstatemd)\> ; `shipmentState?`: [*Maybe*](#maybe)<[*ShipmentState*](#enumstypes_graphqlshipmentstatemd)\> ; `state?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |
`orderNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderState?` | [*Maybe*](#maybe)<[*OrderState*](#enumstypes_graphqlorderstatemd)\> |
`paymentState?` | [*Maybe*](#maybe)<[*PaymentState*](#enumstypes_graphqlpaymentstatemd)\> |
`shipmentState?` | [*Maybe*](#maybe)<[*ShipmentState*](#enumstypes_graphqlshipmentstatemd)\> |
`state?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4051](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4051)

___

##### OrderCustomFieldListArgs

Ƭ **OrderCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

An order can be created from a cart, usually after a checkout process has been completed.
[documentation](https://docs.commercetools.com/http-api-projects-orders.html)

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4046](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4046)

___

##### OrderCustomFieldsRawArgs

Ƭ **OrderCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

An order can be created from a cart, usually after a checkout process has been completed.
[documentation](https://docs.commercetools.com/http-api-projects-orders.html)

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4038](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4038)

___

##### OrderMyCartCommand

Ƭ **OrderMyCartCommand**: { `id`: [*Scalars*](#scalars)[*String*] ; `version`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4061](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4061)

___

##### OrderQueryInterface

Ƭ **OrderQueryInterface**: { `order?`: [*Maybe*](#maybe)<[*Order*](#order)\> ; `orders`: [*OrderQueryResult*](#orderqueryresult)  }

Fields to access orders. Includes direct access to a single order and searching for orders.

###### Type declaration:

Name | Type |
------ | ------ |
`order?` | [*Maybe*](#maybe)<[*Order*](#order)\> |
`orders` | [*OrderQueryResult*](#orderqueryresult) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4067](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4067)

___

##### OrderQueryInterfaceOrderArgs

Ƭ **OrderQueryInterfaceOrderArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `orderNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

Fields to access orders. Includes direct access to a single order and searching for orders.

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4073](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4073)

___

##### OrderQueryInterfaceOrdersArgs

Ƭ **OrderQueryInterfaceOrdersArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

Fields to access orders. Includes direct access to a single order and searching for orders.

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4079](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4079)

___

##### OrderQueryResult

Ƭ **OrderQueryResult**: { `__typename?`: *OrderQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*Order*](#order)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *OrderQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Order*](#order)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4086](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4086)

___

##### OrderUpdateAction

Ƭ **OrderUpdateAction**: { `addDelivery?`: [*Maybe*](#maybe)<[*AddOrderDelivery*](#addorderdelivery)\> ; `addItemShippingAddress?`: [*Maybe*](#maybe)<[*AddOrderItemShippingAddress*](#addorderitemshippingaddress)\> ; `addParcelToDelivery?`: [*Maybe*](#maybe)<[*AddOrderParcelToDelivery*](#addorderparceltodelivery)\> ; `addPayment?`: [*Maybe*](#maybe)<[*AddOrderPayment*](#addorderpayment)\> ; `addReturnInfo?`: [*Maybe*](#maybe)<[*AddOrderReturnInfo*](#addorderreturninfo)\> ; `changeOrderState?`: [*Maybe*](#maybe)<[*ChangeOrderState*](#changeorderstate)\> ; `changePaymentState?`: [*Maybe*](#maybe)<[*ChangeOrderPaymentState*](#changeorderpaymentstate)\> ; `changeShipmentState?`: [*Maybe*](#maybe)<[*ChangeOrderShipmentState*](#changeordershipmentstate)\> ; `importCustomLineItemState?`: [*Maybe*](#maybe)<[*ImportOrderCustomLineItemState*](#importordercustomlineitemstate)\> ; `importLineItemState?`: [*Maybe*](#maybe)<[*ImportOrderLineItemState*](#importorderlineitemstate)\> ; `removeDelivery?`: [*Maybe*](#maybe)<[*RemoveOrderDelivery*](#removeorderdelivery)\> ; `removeItemShippingAddress?`: [*Maybe*](#maybe)<[*RemoveOrderItemShippingAddress*](#removeorderitemshippingaddress)\> ; `removeParcelFromDelivery?`: [*Maybe*](#maybe)<[*RemoveOrderParcelFromDelivery*](#removeorderparcelfromdelivery)\> ; `removePayment?`: [*Maybe*](#maybe)<[*RemoveOrderPayment*](#removeorderpayment)\> ; `setBillingAddress?`: [*Maybe*](#maybe)<[*SetOrderBillingAddress*](#setorderbillingaddress)\> ; `setCustomField?`: [*Maybe*](#maybe)<[*SetOrderCustomField*](#setordercustomfield)\> ; `setCustomLineItemCustomField?`: [*Maybe*](#maybe)<[*SetOrderCustomLineItemCustomField*](#setordercustomlineitemcustomfield)\> ; `setCustomLineItemCustomType?`: [*Maybe*](#maybe)<[*SetOrderCustomLineItemCustomType*](#setordercustomlineitemcustomtype)\> ; `setCustomLineItemShippingDetails?`: [*Maybe*](#maybe)<[*SetOrderCustomLineItemShippingDetails*](#setordercustomlineitemshippingdetails)\> ; `setCustomType?`: [*Maybe*](#maybe)<[*SetOrderCustomType*](#setordercustomtype)\> ; `setCustomerEmail?`: [*Maybe*](#maybe)<[*SetOrderCustomerEmail*](#setordercustomeremail)\> ; `setCustomerId?`: [*Maybe*](#maybe)<[*SetOrderCustomerId*](#setordercustomerid)\> ; `setDeliveryAddress?`: [*Maybe*](#maybe)<[*SetOrderDeliveryAddress*](#setorderdeliveryaddress)\> ; `setDeliveryItems?`: [*Maybe*](#maybe)<[*SetOrderDeliveryItems*](#setorderdeliveryitems)\> ; `setLineItemCustomField?`: [*Maybe*](#maybe)<[*SetOrderLineItemCustomField*](#setorderlineitemcustomfield)\> ; `setLineItemCustomType?`: [*Maybe*](#maybe)<[*SetOrderLineItemCustomType*](#setorderlineitemcustomtype)\> ; `setLineItemShippingDetails?`: [*Maybe*](#maybe)<[*SetOrderLineItemShippingDetails*](#setorderlineitemshippingdetails)\> ; `setLocale?`: [*Maybe*](#maybe)<[*SetOrderLocale*](#setorderlocale)\> ; `setOrderNumber?`: [*Maybe*](#maybe)<[*SetOrderNumber*](#setordernumber)\> ; `setParcelItems?`: [*Maybe*](#maybe)<[*SetOrderParcelItems*](#setorderparcelitems)\> ; `setParcelMeasurements?`: [*Maybe*](#maybe)<[*SetOrderParcelMeasurements*](#setorderparcelmeasurements)\> ; `setParcelTrackingData?`: [*Maybe*](#maybe)<[*SetOrderParcelTrackingData*](#setorderparceltrackingdata)\> ; `setReturnPaymentState?`: [*Maybe*](#maybe)<[*SetOrderReturnPaymentState*](#setorderreturnpaymentstate)\> ; `setReturnShipmentState?`: [*Maybe*](#maybe)<[*SetOrderReturnShipmentState*](#setorderreturnshipmentstate)\> ; `setShippingAddress?`: [*Maybe*](#maybe)<[*SetOrderShippingAddress*](#setordershippingaddress)\> ; `transitionCustomLineItemState?`: [*Maybe*](#maybe)<[*TransitionOrderCustomLineItemState*](#transitionordercustomlineitemstate)\> ; `transitionLineItemState?`: [*Maybe*](#maybe)<[*TransitionOrderLineItemState*](#transitionorderlineitemstate)\> ; `transitionState?`: [*Maybe*](#maybe)<[*TransitionOrderState*](#transitionorderstate)\> ; `updateItemShippingAddress?`: [*Maybe*](#maybe)<[*UpdateOrderItemShippingAddress*](#updateorderitemshippingaddress)\> ; `updateSyncInfo?`: [*Maybe*](#maybe)<[*UpdateOrderSyncInfo*](#updateordersyncinfo)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addDelivery?` | [*Maybe*](#maybe)<[*AddOrderDelivery*](#addorderdelivery)\> |
`addItemShippingAddress?` | [*Maybe*](#maybe)<[*AddOrderItemShippingAddress*](#addorderitemshippingaddress)\> |
`addParcelToDelivery?` | [*Maybe*](#maybe)<[*AddOrderParcelToDelivery*](#addorderparceltodelivery)\> |
`addPayment?` | [*Maybe*](#maybe)<[*AddOrderPayment*](#addorderpayment)\> |
`addReturnInfo?` | [*Maybe*](#maybe)<[*AddOrderReturnInfo*](#addorderreturninfo)\> |
`changeOrderState?` | [*Maybe*](#maybe)<[*ChangeOrderState*](#changeorderstate)\> |
`changePaymentState?` | [*Maybe*](#maybe)<[*ChangeOrderPaymentState*](#changeorderpaymentstate)\> |
`changeShipmentState?` | [*Maybe*](#maybe)<[*ChangeOrderShipmentState*](#changeordershipmentstate)\> |
`importCustomLineItemState?` | [*Maybe*](#maybe)<[*ImportOrderCustomLineItemState*](#importordercustomlineitemstate)\> |
`importLineItemState?` | [*Maybe*](#maybe)<[*ImportOrderLineItemState*](#importorderlineitemstate)\> |
`removeDelivery?` | [*Maybe*](#maybe)<[*RemoveOrderDelivery*](#removeorderdelivery)\> |
`removeItemShippingAddress?` | [*Maybe*](#maybe)<[*RemoveOrderItemShippingAddress*](#removeorderitemshippingaddress)\> |
`removeParcelFromDelivery?` | [*Maybe*](#maybe)<[*RemoveOrderParcelFromDelivery*](#removeorderparcelfromdelivery)\> |
`removePayment?` | [*Maybe*](#maybe)<[*RemoveOrderPayment*](#removeorderpayment)\> |
`setBillingAddress?` | [*Maybe*](#maybe)<[*SetOrderBillingAddress*](#setorderbillingaddress)\> |
`setCustomField?` | [*Maybe*](#maybe)<[*SetOrderCustomField*](#setordercustomfield)\> |
`setCustomLineItemCustomField?` | [*Maybe*](#maybe)<[*SetOrderCustomLineItemCustomField*](#setordercustomlineitemcustomfield)\> |
`setCustomLineItemCustomType?` | [*Maybe*](#maybe)<[*SetOrderCustomLineItemCustomType*](#setordercustomlineitemcustomtype)\> |
`setCustomLineItemShippingDetails?` | [*Maybe*](#maybe)<[*SetOrderCustomLineItemShippingDetails*](#setordercustomlineitemshippingdetails)\> |
`setCustomType?` | [*Maybe*](#maybe)<[*SetOrderCustomType*](#setordercustomtype)\> |
`setCustomerEmail?` | [*Maybe*](#maybe)<[*SetOrderCustomerEmail*](#setordercustomeremail)\> |
`setCustomerId?` | [*Maybe*](#maybe)<[*SetOrderCustomerId*](#setordercustomerid)\> |
`setDeliveryAddress?` | [*Maybe*](#maybe)<[*SetOrderDeliveryAddress*](#setorderdeliveryaddress)\> |
`setDeliveryItems?` | [*Maybe*](#maybe)<[*SetOrderDeliveryItems*](#setorderdeliveryitems)\> |
`setLineItemCustomField?` | [*Maybe*](#maybe)<[*SetOrderLineItemCustomField*](#setorderlineitemcustomfield)\> |
`setLineItemCustomType?` | [*Maybe*](#maybe)<[*SetOrderLineItemCustomType*](#setorderlineitemcustomtype)\> |
`setLineItemShippingDetails?` | [*Maybe*](#maybe)<[*SetOrderLineItemShippingDetails*](#setorderlineitemshippingdetails)\> |
`setLocale?` | [*Maybe*](#maybe)<[*SetOrderLocale*](#setorderlocale)\> |
`setOrderNumber?` | [*Maybe*](#maybe)<[*SetOrderNumber*](#setordernumber)\> |
`setParcelItems?` | [*Maybe*](#maybe)<[*SetOrderParcelItems*](#setorderparcelitems)\> |
`setParcelMeasurements?` | [*Maybe*](#maybe)<[*SetOrderParcelMeasurements*](#setorderparcelmeasurements)\> |
`setParcelTrackingData?` | [*Maybe*](#maybe)<[*SetOrderParcelTrackingData*](#setorderparceltrackingdata)\> |
`setReturnPaymentState?` | [*Maybe*](#maybe)<[*SetOrderReturnPaymentState*](#setorderreturnpaymentstate)\> |
`setReturnShipmentState?` | [*Maybe*](#maybe)<[*SetOrderReturnShipmentState*](#setorderreturnshipmentstate)\> |
`setShippingAddress?` | [*Maybe*](#maybe)<[*SetOrderShippingAddress*](#setordershippingaddress)\> |
`transitionCustomLineItemState?` | [*Maybe*](#maybe)<[*TransitionOrderCustomLineItemState*](#transitionordercustomlineitemstate)\> |
`transitionLineItemState?` | [*Maybe*](#maybe)<[*TransitionOrderLineItemState*](#transitionorderlineitemstate)\> |
`transitionState?` | [*Maybe*](#maybe)<[*TransitionOrderState*](#transitionorderstate)\> |
`updateItemShippingAddress?` | [*Maybe*](#maybe)<[*UpdateOrderItemShippingAddress*](#updateorderitemshippingaddress)\> |
`updateSyncInfo?` | [*Maybe*](#maybe)<[*UpdateOrderSyncInfo*](#updateordersyncinfo)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4101](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4101)

___

##### Parcel

Ƭ **Parcel**: { `__typename?`: *Parcel* ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `id`: [*Scalars*](#scalars)[*String*] ; `items`: [*DeliveryItem*](#deliveryitem)[] ; `measurements?`: [*Maybe*](#maybe)<[*ParcelMeasurements*](#parcelmeasurements)\> ; `trackingData?`: [*Maybe*](#maybe)<[*TrackingData*](#trackingdata)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *Parcel* |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] |
`id` | [*Scalars*](#scalars)[*String*] |
`items` | [*DeliveryItem*](#deliveryitem)[] |
`measurements?` | [*Maybe*](#maybe)<[*ParcelMeasurements*](#parcelmeasurements)\> |
`trackingData?` | [*Maybe*](#maybe)<[*TrackingData*](#trackingdata)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4146](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4146)

___

##### ParcelMeasurements

Ƭ **ParcelMeasurements**: { `__typename?`: *ParcelMeasurements* ; `heightInMillimeter?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `lengthInMillimeter?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `weightInGram?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `widthInMillimeter?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ParcelMeasurements* |
`heightInMillimeter?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`lengthInMillimeter?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`weightInGram?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`widthInMillimeter?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4155](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4155)

___

##### ParcelMeasurementsDraftType

Ƭ **ParcelMeasurementsDraftType**: { `heightInMillimeter?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `lengthInMillimeter?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `weightInGram?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `widthInMillimeter?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`heightInMillimeter?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`lengthInMillimeter?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`weightInGram?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`widthInMillimeter?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4163](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4163)

___

##### Payment

Ƭ **Payment**: [*Versioned*](#versioned) & { `__typename?`: *Payment* ; `amountAuthorized?`: [*Maybe*](#maybe)<[*Money*](#money)\> ; `amountPaid?`: [*Maybe*](#maybe)<[*Money*](#money)\> ; `amountPlanned`: [*Money*](#money) ; `amountRefunded?`: [*Maybe*](#maybe)<[*Money*](#money)\> ; `anonymousId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `authorizedUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `customer?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `customerRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `id`: [*Scalars*](#scalars)[*String*] ; `interfaceId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `interfaceInteractionsRaw`: [*InterfaceInteractionsRawResult*](#interfaceinteractionsrawresult) ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `paymentMethodInfo`: [*PaymentMethodInfo*](#paymentmethodinfo) ; `paymentStatus`: [*PaymentStatus*](#paymentstatus) ; `transactions`: [*Transaction*](#transaction)[] ; `version`: [*Scalars*](#scalars)[*Long*]  }

Payments hold information about the current state of receiving and/or refunding money.
[documentation](https://docs.commercetools.com/http-api-projects-payments)

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4173](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4173)

___

##### PaymentCustomFieldListArgs

Ƭ **PaymentCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

Payments hold information about the current state of receiving and/or refunding money.
[documentation](https://docs.commercetools.com/http-api-projects-payments)

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4223](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4223)

___

##### PaymentCustomFieldsRawArgs

Ƭ **PaymentCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

Payments hold information about the current state of receiving and/or refunding money.
[documentation](https://docs.commercetools.com/http-api-projects-payments)

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4215](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4215)

___

##### PaymentInfo

Ƭ **PaymentInfo**: { `__typename?`: *PaymentInfo* ; `paymentRefs`: [*Reference*](#reference)[] ; `payments`: [*Payment*](#payment)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *PaymentInfo* |
`paymentRefs` | [*Reference*](#reference)[] |
`payments` | [*Payment*](#payment)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4228](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4228)

___

##### PaymentInterfaceInteractionsRawArgs

Ƭ **PaymentInterfaceInteractionsRawArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

Payments hold information about the current state of receiving and/or refunding money.
[documentation](https://docs.commercetools.com/http-api-projects-payments)

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4207](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4207)

___

##### PaymentMethodInfo

Ƭ **PaymentMethodInfo**: { `__typename?`: *PaymentMethodInfo* ; `method?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `paymentInterface?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *PaymentMethodInfo* |
`method?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`nameAllLocales?` | [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> |
`paymentInterface?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4234](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4234)

___

##### PaymentMethodInfoNameArgs

Ƭ **PaymentMethodInfoNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4242](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4242)

___

##### PaymentQueryResult

Ƭ **PaymentQueryResult**: { `__typename?`: *PaymentQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*Payment*](#payment)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *PaymentQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Payment*](#payment)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4247](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4247)

___

##### PaymentStatus

Ƭ **PaymentStatus**: { `__typename?`: *PaymentStatus* ; `interfaceCode?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `interfaceText?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `state?`: [*Maybe*](#maybe)<[*State*](#state)\> ; `stateRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *PaymentStatus* |
`interfaceCode?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`interfaceText?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`state?` | [*Maybe*](#maybe)<[*State*](#state)\> |
`stateRef?` | [*Maybe*](#maybe)<[*Reference*](#reference)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4263](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4263)

___

##### PlainEnumValue

Ƭ **PlainEnumValue**: { `__typename?`: *PlainEnumValue* ; `key`: [*Scalars*](#scalars)[*String*] ; `label`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *PlainEnumValue* |
`key` | [*Scalars*](#scalars)[*String*] |
`label` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4271](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4271)

___

##### PlainEnumValueDraft

Ƭ **PlainEnumValueDraft**: { `key`: [*Scalars*](#scalars)[*String*] ; `label`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`key` | [*Scalars*](#scalars)[*String*] |
`label` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4277](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4277)

___

##### PlainEnumValueResult

Ƭ **PlainEnumValueResult**: { `__typename?`: *PlainEnumValueResult* ; `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `results`: [*PlainEnumValue*](#plainenumvalue)[] ; `total`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *PlainEnumValueResult* |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`results` | [*PlainEnumValue*](#plainenumvalue)[] |
`total` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4282](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4282)

___

##### Point

Ƭ **Point**: [*Geometry*](#geometry) & { `__typename?`: *Point* ; `coordinates`: [*Scalars*](#scalars)[*Float*][] ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4290](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4290)

___

##### PriceFunction

Ƭ **PriceFunction**: { `__typename?`: *PriceFunction* ; `currencyCode`: [*Scalars*](#scalars)[*Currency*] ; `function`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *PriceFunction* |
`currencyCode` | [*Scalars*](#scalars)[*Currency*] |
`function` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4296](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4296)

___

##### PriceFunctionDraft

Ƭ **PriceFunctionDraft**: { `currencyCode`: [*Scalars*](#scalars)[*Currency*] ; `function`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`currencyCode` | [*Scalars*](#scalars)[*Currency*] |
`function` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4302](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4302)

___

##### Product

Ƭ **Product**: [*Versioned*](#versioned) & { `__typename?`: *Product* ; `catalogData?`: [*Maybe*](#maybe)<[*ProductCatalogData*](#productcatalogdata)\> ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `id`: [*Scalars*](#scalars)[*String*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `masterData`: [*ProductCatalogData*](#productcatalogdata) ; `productType?`: [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> ; `productTypeRef`: [*Reference*](#reference) ; `skus`: [*Scalars*](#scalars)[*String*][] ; `state?`: [*Maybe*](#maybe)<[*State*](#state)\> ; `stateRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `taxCategory?`: [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> ; `taxCategoryRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4307](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4307)

___

##### ProductAttributeInput

Ƭ **ProductAttributeInput**: { `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4331](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4331)

___

##### ProductCatalogData

Ƭ **ProductCatalogData**: { `__typename?`: *ProductCatalogData* ; `current?`: [*Maybe*](#maybe)<[*ProductData*](#productdata)\> ; `hasStagedChanges`: [*Scalars*](#scalars)[*Boolean*] ; `published`: [*Scalars*](#scalars)[*Boolean*] ; `staged?`: [*Maybe*](#maybe)<[*ProductData*](#productdata)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ProductCatalogData* |
`current?` | [*Maybe*](#maybe)<[*ProductData*](#productdata)\> |
`hasStagedChanges` | [*Scalars*](#scalars)[*Boolean*] |
`published` | [*Scalars*](#scalars)[*Boolean*] |
`staged?` | [*Maybe*](#maybe)<[*ProductData*](#productdata)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4336](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4336)

___

##### ProductCatalogDataArgs

Ƭ **ProductCatalogDataArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4327](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4327)

___

##### ProductData

Ƭ **ProductData**: { `__typename?`: *ProductData* ; `allVariants`: [*ProductVariant*](#productvariant)[] ; `categories`: [*Category*](#category)[] ; `categoriesRef`: [*Reference*](#reference)[] ; `categoryOrderHint?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `categoryOrderHints`: [*CategoryOrderHint*](#categoryorderhint)[] ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `descriptionAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `masterVariant`: [*ProductVariant*](#productvariant) ; `metaDescription?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `metaKeywords?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `metaTitle?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales`: [*LocalizedString*](#localizedstring)[] ; `searchKeyword?`: [*Maybe*](#maybe)<[*SearchKeyword*](#searchkeyword)[]\> ; `searchKeywords`: [*SearchKeywords*](#searchkeywords)[] ; `skus`: [*Scalars*](#scalars)[*String*][] ; `slug?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `variant?`: [*Maybe*](#maybe)<[*ProductVariant*](#productvariant)\> ; `variants`: [*ProductVariant*](#productvariant)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ProductData* |
`allVariants` | [*ProductVariant*](#productvariant)[] |
`categories` | [*Category*](#category)[] |
`categoriesRef` | [*Reference*](#reference)[] |
`categoryOrderHint?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`categoryOrderHints` | [*CategoryOrderHint*](#categoryorderhint)[] |
`description?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`descriptionAllLocales?` | [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> |
`masterVariant` | [*ProductVariant*](#productvariant) |
`metaDescription?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`metaKeywords?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`metaTitle?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] |
`searchKeyword?` | [*Maybe*](#maybe)<[*SearchKeyword*](#searchkeyword)[]\> |
`searchKeywords` | [*SearchKeywords*](#searchkeywords)[] |
`skus` | [*Scalars*](#scalars)[*String*][] |
`slug?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variant?` | [*Maybe*](#maybe)<[*ProductVariant*](#productvariant)\> |
`variants` | [*ProductVariant*](#productvariant)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4344](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4344)

___

##### ProductDataAllVariantsArgs

Ƭ **ProductDataAllVariantsArgs**: { `hasImages?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `isOnStock?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `skus?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `stockChannelIds?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`hasImages?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`isOnStock?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`skus?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`stockChannelIds?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4412](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4412)

___

##### ProductDataCategoryOrderHintArgs

Ƭ **ProductDataCategoryOrderHintArgs**: { `categoryId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`categoryId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4382](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4382)

___

##### ProductDataDescriptionArgs

Ƭ **ProductDataDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4372](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4372)

___

##### ProductDataMetaDescriptionArgs

Ƭ **ProductDataMetaDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4400](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4400)

___

##### ProductDataMetaKeywordsArgs

Ƭ **ProductDataMetaKeywordsArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4395](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4395)

___

##### ProductDataMetaTitleArgs

Ƭ **ProductDataMetaTitleArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4390](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4390)

___

##### ProductDataNameArgs

Ƭ **ProductDataNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4367](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4367)

___

##### ProductDataSearchKeywordArgs

Ƭ **ProductDataSearchKeywordArgs**: { `locale`: [*Scalars*](#scalars)[*Locale*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`locale` | [*Scalars*](#scalars)[*Locale*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4386](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4386)

___

##### ProductDataSlugArgs

Ƭ **ProductDataSlugArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4377](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4377)

___

##### ProductDataVariantArgs

Ƭ **ProductDataVariantArgs**: { `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4419](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4419)

___

##### ProductDataVariantsArgs

Ƭ **ProductDataVariantsArgs**: { `hasImages?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `isOnStock?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `skus?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `stockChannelIds?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`hasImages?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`isOnStock?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`skus?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`stockChannelIds?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4405](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4405)

___

##### ProductDiscount

Ƭ **ProductDiscount**: [*Versioned*](#versioned) & { `__typename?`: *ProductDiscount* ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `descriptionAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `isActive`: [*Scalars*](#scalars)[*Boolean*] ; `isValid`: [*Scalars*](#scalars)[*Boolean*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales`: [*LocalizedString*](#localizedstring)[] ; `predicate`: [*Scalars*](#scalars)[*String*] ; `sortOrder`: [*Scalars*](#scalars)[*String*] ; `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `value`: [*ProductDiscountValue*](#productdiscountvalue) ; `version`: [*Scalars*](#scalars)[*Long*]  }

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

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4442](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4442)

___

##### ProductDiscountDescriptionArgs

Ƭ **ProductDiscountDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

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

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4505](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4505)

___

##### ProductDiscountDraft

Ƭ **ProductDiscountDraft**: { `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `isActive?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `predicate`: [*Scalars*](#scalars)[*String*] ; `sortOrder`: [*Scalars*](#scalars)[*String*] ; `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `value`: [*ProductDiscountValueInput*](#productdiscountvalueinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`isActive?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`predicate` | [*Scalars*](#scalars)[*String*] |
`sortOrder` | [*Scalars*](#scalars)[*String*] |
`validFrom?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`value` | [*ProductDiscountValueInput*](#productdiscountvalueinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4510](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4510)

___

##### ProductDiscountNameArgs

Ƭ **ProductDiscountNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

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

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4482](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4482)

___

##### ProductDiscountQueryResult

Ƭ **ProductDiscountQueryResult**: { `__typename?`: *ProductDiscountQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*ProductDiscount*](#productdiscount)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ProductDiscountQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*ProductDiscount*](#productdiscount)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4522](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4522)

___

##### ProductDiscountUpdateAction

Ƭ **ProductDiscountUpdateAction**: { `changeIsActive?`: [*Maybe*](#maybe)<[*ChangeProductDiscountIsActive*](#changeproductdiscountisactive)\> ; `changeName?`: [*Maybe*](#maybe)<[*ChangeProductDiscountName*](#changeproductdiscountname)\> ; `changePredicate?`: [*Maybe*](#maybe)<[*ChangeProductDiscountPredicate*](#changeproductdiscountpredicate)\> ; `changeSortOrder?`: [*Maybe*](#maybe)<[*ChangeProductDiscountSortOrder*](#changeproductdiscountsortorder)\> ; `changeValue?`: [*Maybe*](#maybe)<[*ChangeProductDiscountValue*](#changeproductdiscountvalue)\> ; `setDescription?`: [*Maybe*](#maybe)<[*SetProductDiscountDescription*](#setproductdiscountdescription)\> ; `setKey?`: [*Maybe*](#maybe)<[*SetProductDiscountKey*](#setproductdiscountkey)\> ; `setValidFrom?`: [*Maybe*](#maybe)<[*SetProductDiscountValidFrom*](#setproductdiscountvalidfrom)\> ; `setValidFromAndUntil?`: [*Maybe*](#maybe)<[*SetProductDiscountValidFromAndUntil*](#setproductdiscountvalidfromanduntil)\> ; `setValidUntil?`: [*Maybe*](#maybe)<[*SetProductDiscountValidUntil*](#setproductdiscountvaliduntil)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`changeIsActive?` | [*Maybe*](#maybe)<[*ChangeProductDiscountIsActive*](#changeproductdiscountisactive)\> |
`changeName?` | [*Maybe*](#maybe)<[*ChangeProductDiscountName*](#changeproductdiscountname)\> |
`changePredicate?` | [*Maybe*](#maybe)<[*ChangeProductDiscountPredicate*](#changeproductdiscountpredicate)\> |
`changeSortOrder?` | [*Maybe*](#maybe)<[*ChangeProductDiscountSortOrder*](#changeproductdiscountsortorder)\> |
`changeValue?` | [*Maybe*](#maybe)<[*ChangeProductDiscountValue*](#changeproductdiscountvalue)\> |
`setDescription?` | [*Maybe*](#maybe)<[*SetProductDiscountDescription*](#setproductdiscountdescription)\> |
`setKey?` | [*Maybe*](#maybe)<[*SetProductDiscountKey*](#setproductdiscountkey)\> |
`setValidFrom?` | [*Maybe*](#maybe)<[*SetProductDiscountValidFrom*](#setproductdiscountvalidfrom)\> |
`setValidFromAndUntil?` | [*Maybe*](#maybe)<[*SetProductDiscountValidFromAndUntil*](#setproductdiscountvalidfromanduntil)\> |
`setValidUntil?` | [*Maybe*](#maybe)<[*SetProductDiscountValidUntil*](#setproductdiscountvaliduntil)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4530](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4530)

___

##### ProductDiscountValue

Ƭ **ProductDiscountValue**: { `type`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4543](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4543)

___

##### ProductDiscountValueInput

Ƭ **ProductDiscountValueInput**: { `absolute?`: [*Maybe*](#maybe)<[*AbsoluteDiscountValueInput*](#absolutediscountvalueinput)\> ; `external?`: [*Maybe*](#maybe)<[*ExternalDiscountValueInput*](#externaldiscountvalueinput)\> ; `relative?`: [*Maybe*](#maybe)<[*RelativeDiscountValueInput*](#relativediscountvalueinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`absolute?` | [*Maybe*](#maybe)<[*AbsoluteDiscountValueInput*](#absolutediscountvalueinput)\> |
`external?` | [*Maybe*](#maybe)<[*ExternalDiscountValueInput*](#externaldiscountvalueinput)\> |
`relative?` | [*Maybe*](#maybe)<[*RelativeDiscountValueInput*](#relativediscountvalueinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4547](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4547)

___

##### ProductDraft

Ƭ **ProductDraft**: { `categories?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)[]\> ; `categoryOrderHints?`: [*Maybe*](#maybe)<[*CategoryOrderHintInput*](#categoryorderhintinput)[]\> ; `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `masterVariant?`: [*Maybe*](#maybe)<[*ProductVariantInput*](#productvariantinput)\> ; `metaDescription?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `metaKeywords?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `metaTitle?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `productType`: [*ResourceIdentifierInput*](#resourceidentifierinput) ; `publish?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `searchKeywords?`: [*Maybe*](#maybe)<[*SearchKeywordInput*](#searchkeywordinput)[]\> ; `slug`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `state?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `taxCategory?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `variants?`: [*Maybe*](#maybe)<[*ProductVariantInput*](#productvariantinput)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`categories?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)[]\> |
`categoryOrderHints?` | [*Maybe*](#maybe)<[*CategoryOrderHintInput*](#categoryorderhintinput)[]\> |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`masterVariant?` | [*Maybe*](#maybe)<[*ProductVariantInput*](#productvariantinput)\> |
`metaDescription?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`metaKeywords?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`metaTitle?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`productType` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`publish?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`searchKeywords?` | [*Maybe*](#maybe)<[*SearchKeywordInput*](#searchkeywordinput)[]\> |
`slug` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`state?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`taxCategory?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`variants?` | [*Maybe*](#maybe)<[*ProductVariantInput*](#productvariantinput)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4553](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4553)

___

##### ProductPrice

Ƭ **ProductPrice**: { `__typename?`: *ProductPrice* ; `channel?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `country?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customFieldList?`: [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> ; `customFields?`: [*Maybe*](#maybe)<[*Type*](#type)\> ; `customFieldsRaw?`: [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> ; `customerGroup?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `discounted?`: [*Maybe*](#maybe)<[*DiscountedProductPriceValue*](#discountedproductpricevalue)\> ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `tiers?`: [*Maybe*](#maybe)<[*ProductPriceTier*](#productpricetier)[]\> ; `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `value`: [*BaseMoney*](#basemoney)  }

###### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`__typename?` | *ProductPrice* | - |
`channel?` | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`country?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> | - |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> | - |
`customFieldList?` | [*Maybe*](#maybe)<[*CustomField*](#customfield)[]\> | Custom fields are returned as a list instead of an object structure.   |
`customFields?` | [*Maybe*](#maybe)<[*Type*](#type)\> | This field would contain type data   |
`customFieldsRaw?` | [*Maybe*](#maybe)<[*RawCustomField*](#rawcustomfield)[]\> | This field contains non-typed data. Consider using `customFields` as a typed alternative.   |
`customerGroup?` | [*Maybe*](#maybe)<[*Reference*](#reference)\> | - |
`discounted?` | [*Maybe*](#maybe)<[*DiscountedProductPriceValue*](#discountedproductpricevalue)\> | - |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`tiers?` | [*Maybe*](#maybe)<[*ProductPriceTier*](#productpricetier)[]\> | - |
`validFrom?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> | - |
`validUntil?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> | - |
`value` | [*BaseMoney*](#basemoney) | - |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4572](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4572)

___

##### ProductPriceCustomFieldListArgs

Ƭ **ProductPriceCustomFieldListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4597](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4597)

___

##### ProductPriceCustomFieldsRawArgs

Ƭ **ProductPriceCustomFieldsRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4592](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4592)

___

##### ProductPriceDataInput

Ƭ **ProductPriceDataInput**: { `channel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `country?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `customerGroup?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `tiers?`: [*Maybe*](#maybe)<[*ProductPriceTierInput*](#productpricetierinput)[]\> ; `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `value`: [*BaseMoneyInput*](#basemoneyinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`channel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`country?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`customerGroup?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`tiers?` | [*Maybe*](#maybe)<[*ProductPriceTierInput*](#productpricetierinput)[]\> |
`validFrom?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`value` | [*BaseMoneyInput*](#basemoneyinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4602](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4602)

___

##### ProductPriceTier

Ƭ **ProductPriceTier**: { `__typename?`: *ProductPriceTier* ; `minimumQuantity`: [*Scalars*](#scalars)[*Int*] ; `value`: [*BaseMoney*](#basemoney)  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ProductPriceTier* |
`minimumQuantity` | [*Scalars*](#scalars)[*Int*] |
`value` | [*BaseMoney*](#basemoney) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4613](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4613)

___

##### ProductPriceTierInput

Ƭ **ProductPriceTierInput**: { `minimumQuantity`: [*Scalars*](#scalars)[*Int*] ; `value`: [*BaseMoneyInput*](#basemoneyinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`minimumQuantity` | [*Scalars*](#scalars)[*Int*] |
`value` | [*BaseMoneyInput*](#basemoneyinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4619](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4619)

___

##### ProductQueryResult

Ƭ **ProductQueryResult**: { `__typename?`: *ProductQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*Product*](#product)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ProductQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Product*](#product)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4624](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4624)

___

##### ProductReferenceIdentifier

Ƭ **ProductReferenceIdentifier**: { `__typename?`: *ProductReferenceIdentifier* ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ProductReferenceIdentifier* |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4632](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4632)

___

##### ProductType

Ƭ **ProductType**: { `productTypeId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`productTypeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4639](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4639)

___

##### ProductTypeDefinition

Ƭ **ProductTypeDefinition**: [*Versioned*](#versioned) & { `__typename?`: *ProductTypeDefinition* ; `attributeDefinitions`: [*AttributeDefinitionResult*](#attributedefinitionresult) ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `description`: [*Scalars*](#scalars)[*String*] ; `id`: [*Scalars*](#scalars)[*String*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `name`: [*Scalars*](#scalars)[*String*] ; `version`: [*Scalars*](#scalars)[*Long*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4643](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4643)

___

##### ProductTypeDefinitionAttributeDefinitionsArgs

Ƭ **ProductTypeDefinitionAttributeDefinitionsArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4657](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4657)

___

##### ProductTypeDefinitionQueryResult

Ƭ **ProductTypeDefinitionQueryResult**: { `__typename?`: *ProductTypeDefinitionQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*ProductTypeDefinition*](#producttypedefinition)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ProductTypeDefinitionQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*ProductTypeDefinition*](#producttypedefinition)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4665](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4665)

___

##### ProductTypeDraft

Ƭ **ProductTypeDraft**: { `attributeDefinitions?`: [*Maybe*](#maybe)<[*AttributeDefinitionDraft*](#attributedefinitiondraft)[]\> ; `description`: [*Scalars*](#scalars)[*String*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeDefinitions?` | [*Maybe*](#maybe)<[*AttributeDefinitionDraft*](#attributedefinitiondraft)[]\> |
`description` | [*Scalars*](#scalars)[*String*] |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4673](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4673)

___

##### ProductTypeUpdateAction

Ƭ **ProductTypeUpdateAction**: { `addAttributeDefinition?`: [*Maybe*](#maybe)<[*AddAttributeDefinition*](#addattributedefinition)\> ; `addLocalizedEnumValue?`: [*Maybe*](#maybe)<[*AddLocalizedEnumValue*](#addlocalizedenumvalue)\> ; `addPlainEnumValue?`: [*Maybe*](#maybe)<[*AddPlainEnumValue*](#addplainenumvalue)\> ; `changeAttributeName?`: [*Maybe*](#maybe)<[*ChangeAttributeName*](#changeattributename)\> ; `changeAttributeOrder?`: [*Maybe*](#maybe)<[*ChangeAttributeOrder*](#changeattributeorder)\> ; `changeAttributeOrderByName?`: [*Maybe*](#maybe)<[*ChangeAttributeOrderByName*](#changeattributeorderbyname)\> ; `changeDescription?`: [*Maybe*](#maybe)<[*ChangeDescription*](#changedescription)\> ; `changeEnumKey?`: [*Maybe*](#maybe)<[*ChangeEnumKey*](#changeenumkey)\> ; `changeInputHint?`: [*Maybe*](#maybe)<[*ChangeInputHint*](#changeinputhint)\> ; `changeIsSearchable?`: [*Maybe*](#maybe)<[*ChangeIsSearchable*](#changeissearchable)\> ; `changeLabel?`: [*Maybe*](#maybe)<[*ChangeLabel*](#changelabel)\> ; `changeLocalizedEnumValueLabel?`: [*Maybe*](#maybe)<[*ChangeLocalizedEnumValueLabel*](#changelocalizedenumvaluelabel)\> ; `changeLocalizedEnumValueOrder?`: [*Maybe*](#maybe)<[*ChangeLocalizedEnumValueOrder*](#changelocalizedenumvalueorder)\> ; `changeName?`: [*Maybe*](#maybe)<[*ChangeName*](#changename)\> ; `changePlainEnumValueLabel?`: [*Maybe*](#maybe)<[*ChangePlainEnumValueLabel*](#changeplainenumvaluelabel)\> ; `changePlainEnumValueOrder?`: [*Maybe*](#maybe)<[*ChangePlainEnumValueOrder*](#changeplainenumvalueorder)\> ; `removeAttributeDefinition?`: [*Maybe*](#maybe)<[*RemoveAttributeDefinition*](#removeattributedefinition)\> ; `removeEnumValues?`: [*Maybe*](#maybe)<[*RemoveEnumValues*](#removeenumvalues)\> ; `setInputTip?`: [*Maybe*](#maybe)<[*SetInputTip*](#setinputtip)\> ; `setKey?`: [*Maybe*](#maybe)<[*SetKey*](#setkey)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addAttributeDefinition?` | [*Maybe*](#maybe)<[*AddAttributeDefinition*](#addattributedefinition)\> |
`addLocalizedEnumValue?` | [*Maybe*](#maybe)<[*AddLocalizedEnumValue*](#addlocalizedenumvalue)\> |
`addPlainEnumValue?` | [*Maybe*](#maybe)<[*AddPlainEnumValue*](#addplainenumvalue)\> |
`changeAttributeName?` | [*Maybe*](#maybe)<[*ChangeAttributeName*](#changeattributename)\> |
`changeAttributeOrder?` | [*Maybe*](#maybe)<[*ChangeAttributeOrder*](#changeattributeorder)\> |
`changeAttributeOrderByName?` | [*Maybe*](#maybe)<[*ChangeAttributeOrderByName*](#changeattributeorderbyname)\> |
`changeDescription?` | [*Maybe*](#maybe)<[*ChangeDescription*](#changedescription)\> |
`changeEnumKey?` | [*Maybe*](#maybe)<[*ChangeEnumKey*](#changeenumkey)\> |
`changeInputHint?` | [*Maybe*](#maybe)<[*ChangeInputHint*](#changeinputhint)\> |
`changeIsSearchable?` | [*Maybe*](#maybe)<[*ChangeIsSearchable*](#changeissearchable)\> |
`changeLabel?` | [*Maybe*](#maybe)<[*ChangeLabel*](#changelabel)\> |
`changeLocalizedEnumValueLabel?` | [*Maybe*](#maybe)<[*ChangeLocalizedEnumValueLabel*](#changelocalizedenumvaluelabel)\> |
`changeLocalizedEnumValueOrder?` | [*Maybe*](#maybe)<[*ChangeLocalizedEnumValueOrder*](#changelocalizedenumvalueorder)\> |
`changeName?` | [*Maybe*](#maybe)<[*ChangeName*](#changename)\> |
`changePlainEnumValueLabel?` | [*Maybe*](#maybe)<[*ChangePlainEnumValueLabel*](#changeplainenumvaluelabel)\> |
`changePlainEnumValueOrder?` | [*Maybe*](#maybe)<[*ChangePlainEnumValueOrder*](#changeplainenumvalueorder)\> |
`removeAttributeDefinition?` | [*Maybe*](#maybe)<[*RemoveAttributeDefinition*](#removeattributedefinition)\> |
`removeEnumValues?` | [*Maybe*](#maybe)<[*RemoveEnumValues*](#removeenumvalues)\> |
`setInputTip?` | [*Maybe*](#maybe)<[*SetInputTip*](#setinputtip)\> |
`setKey?` | [*Maybe*](#maybe)<[*SetKey*](#setkey)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4680](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4680)

___

##### ProductUpdateAction

Ƭ **ProductUpdateAction**: { `addAsset?`: [*Maybe*](#maybe)<[*AddProductAsset*](#addproductasset)\> ; `addExternalImage?`: [*Maybe*](#maybe)<[*AddProductExternalImage*](#addproductexternalimage)\> ; `addPrice?`: [*Maybe*](#maybe)<[*AddProductPrice*](#addproductprice)\> ; `addToCategory?`: [*Maybe*](#maybe)<[*AddProductToCategory*](#addproducttocategory)\> ; `addVariant?`: [*Maybe*](#maybe)<[*AddProductVariant*](#addproductvariant)\> ; `changeAssetName?`: [*Maybe*](#maybe)<[*ChangeProductAssetName*](#changeproductassetname)\> ; `changeAssetOrder?`: [*Maybe*](#maybe)<[*ChangeProductAssetOrder*](#changeproductassetorder)\> ; `changeImageLabel?`: [*Maybe*](#maybe)<[*ChangeProductImageLabel*](#changeproductimagelabel)\> ; `changeMasterVariant?`: [*Maybe*](#maybe)<[*ChangeProductMasterVariant*](#changeproductmastervariant)\> ; `changeName?`: [*Maybe*](#maybe)<[*ChangeProductName*](#changeproductname)\> ; `changePrice?`: [*Maybe*](#maybe)<[*ChangeProductPrice*](#changeproductprice)\> ; `changeSlug?`: [*Maybe*](#maybe)<[*ChangeProductSlug*](#changeproductslug)\> ; `moveImageToPosition?`: [*Maybe*](#maybe)<[*MoveProductImageToPosition*](#moveproductimagetoposition)\> ; `publish?`: [*Maybe*](#maybe)<[*PublishProduct*](#publishproduct)\> ; `removeAsset?`: [*Maybe*](#maybe)<[*RemoveProductAsset*](#removeproductasset)\> ; `removeFromCategory?`: [*Maybe*](#maybe)<[*RemoveProductFromCategory*](#removeproductfromcategory)\> ; `removeImage?`: [*Maybe*](#maybe)<[*RemoveProductImage*](#removeproductimage)\> ; `removePrice?`: [*Maybe*](#maybe)<[*RemoveProductPrice*](#removeproductprice)\> ; `removeVariant?`: [*Maybe*](#maybe)<[*RemoveProductVariant*](#removeproductvariant)\> ; `revertStagedChanges?`: [*Maybe*](#maybe)<[*RevertStagedChanges*](#revertstagedchanges)\> ; `revertStagedVariantChanges?`: [*Maybe*](#maybe)<[*RevertStagedVariantChanges*](#revertstagedvariantchanges)\> ; `setAssetCustomField?`: [*Maybe*](#maybe)<[*SetProductAssetCustomField*](#setproductassetcustomfield)\> ; `setAssetCustomType?`: [*Maybe*](#maybe)<[*SetProductAssetCustomType*](#setproductassetcustomtype)\> ; `setAssetDescription?`: [*Maybe*](#maybe)<[*SetProductAssetDescription*](#setproductassetdescription)\> ; `setAssetKey?`: [*Maybe*](#maybe)<[*SetProductAssetKey*](#setproductassetkey)\> ; `setAssetSources?`: [*Maybe*](#maybe)<[*SetProductAssetSources*](#setproductassetsources)\> ; `setAssetTags?`: [*Maybe*](#maybe)<[*SetProductAssetTags*](#setproductassettags)\> ; `setAttribute?`: [*Maybe*](#maybe)<[*SetProductAttribute*](#setproductattribute)\> ; `setAttributeInAllVariants?`: [*Maybe*](#maybe)<[*SetProductAttributeInAllVariants*](#setproductattributeinallvariants)\> ; `setCategoryOrderHint?`: [*Maybe*](#maybe)<[*SetProductCategoryOrderHint*](#setproductcategoryorderhint)\> ; `setDescription?`: [*Maybe*](#maybe)<[*SetProductDescription*](#setproductdescription)\> ; `setDiscountedPrice?`: [*Maybe*](#maybe)<[*SetProductDiscountedPrice*](#setproductdiscountedprice)\> ; `setImageLabel?`: [*Maybe*](#maybe)<[*SetProductImageLabel*](#setproductimagelabel)\> ; `setKey?`: [*Maybe*](#maybe)<[*SetProductKey*](#setproductkey)\> ; `setMetaAttributes?`: [*Maybe*](#maybe)<[*SetProductMetaAttributes*](#setproductmetaattributes)\> ; `setMetaDescription?`: [*Maybe*](#maybe)<[*SetProductMetaDescription*](#setproductmetadescription)\> ; `setMetaKeywords?`: [*Maybe*](#maybe)<[*SetProductMetaKeywords*](#setproductmetakeywords)\> ; `setMetaTitle?`: [*Maybe*](#maybe)<[*SetProductMetaTitle*](#setproductmetatitle)\> ; `setPrices?`: [*Maybe*](#maybe)<[*SetProductPrices*](#setproductprices)\> ; `setProductPriceCustomField?`: [*Maybe*](#maybe)<[*SetProductPriceCustomField*](#setproductpricecustomfield)\> ; `setProductPriceCustomType?`: [*Maybe*](#maybe)<[*SetProductPriceCustomType*](#setproductpricecustomtype)\> ; `setProductVariantKey?`: [*Maybe*](#maybe)<[*SetProductVariantKey*](#setproductvariantkey)\> ; `setSearchKeywords?`: [*Maybe*](#maybe)<[*SetSearchKeywords*](#setsearchkeywords)\> ; `setSku?`: [*Maybe*](#maybe)<[*SetProductSku*](#setproductsku)\> ; `setTaxCategory?`: [*Maybe*](#maybe)<[*SetProductTaxCategory*](#setproducttaxcategory)\> ; `transitionState?`: [*Maybe*](#maybe)<[*TransitionProductState*](#transitionproductstate)\> ; `unpublish?`: [*Maybe*](#maybe)<[*UnpublishProduct*](#unpublishproduct)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addAsset?` | [*Maybe*](#maybe)<[*AddProductAsset*](#addproductasset)\> |
`addExternalImage?` | [*Maybe*](#maybe)<[*AddProductExternalImage*](#addproductexternalimage)\> |
`addPrice?` | [*Maybe*](#maybe)<[*AddProductPrice*](#addproductprice)\> |
`addToCategory?` | [*Maybe*](#maybe)<[*AddProductToCategory*](#addproducttocategory)\> |
`addVariant?` | [*Maybe*](#maybe)<[*AddProductVariant*](#addproductvariant)\> |
`changeAssetName?` | [*Maybe*](#maybe)<[*ChangeProductAssetName*](#changeproductassetname)\> |
`changeAssetOrder?` | [*Maybe*](#maybe)<[*ChangeProductAssetOrder*](#changeproductassetorder)\> |
`changeImageLabel?` | [*Maybe*](#maybe)<[*ChangeProductImageLabel*](#changeproductimagelabel)\> |
`changeMasterVariant?` | [*Maybe*](#maybe)<[*ChangeProductMasterVariant*](#changeproductmastervariant)\> |
`changeName?` | [*Maybe*](#maybe)<[*ChangeProductName*](#changeproductname)\> |
`changePrice?` | [*Maybe*](#maybe)<[*ChangeProductPrice*](#changeproductprice)\> |
`changeSlug?` | [*Maybe*](#maybe)<[*ChangeProductSlug*](#changeproductslug)\> |
`moveImageToPosition?` | [*Maybe*](#maybe)<[*MoveProductImageToPosition*](#moveproductimagetoposition)\> |
`publish?` | [*Maybe*](#maybe)<[*PublishProduct*](#publishproduct)\> |
`removeAsset?` | [*Maybe*](#maybe)<[*RemoveProductAsset*](#removeproductasset)\> |
`removeFromCategory?` | [*Maybe*](#maybe)<[*RemoveProductFromCategory*](#removeproductfromcategory)\> |
`removeImage?` | [*Maybe*](#maybe)<[*RemoveProductImage*](#removeproductimage)\> |
`removePrice?` | [*Maybe*](#maybe)<[*RemoveProductPrice*](#removeproductprice)\> |
`removeVariant?` | [*Maybe*](#maybe)<[*RemoveProductVariant*](#removeproductvariant)\> |
`revertStagedChanges?` | [*Maybe*](#maybe)<[*RevertStagedChanges*](#revertstagedchanges)\> |
`revertStagedVariantChanges?` | [*Maybe*](#maybe)<[*RevertStagedVariantChanges*](#revertstagedvariantchanges)\> |
`setAssetCustomField?` | [*Maybe*](#maybe)<[*SetProductAssetCustomField*](#setproductassetcustomfield)\> |
`setAssetCustomType?` | [*Maybe*](#maybe)<[*SetProductAssetCustomType*](#setproductassetcustomtype)\> |
`setAssetDescription?` | [*Maybe*](#maybe)<[*SetProductAssetDescription*](#setproductassetdescription)\> |
`setAssetKey?` | [*Maybe*](#maybe)<[*SetProductAssetKey*](#setproductassetkey)\> |
`setAssetSources?` | [*Maybe*](#maybe)<[*SetProductAssetSources*](#setproductassetsources)\> |
`setAssetTags?` | [*Maybe*](#maybe)<[*SetProductAssetTags*](#setproductassettags)\> |
`setAttribute?` | [*Maybe*](#maybe)<[*SetProductAttribute*](#setproductattribute)\> |
`setAttributeInAllVariants?` | [*Maybe*](#maybe)<[*SetProductAttributeInAllVariants*](#setproductattributeinallvariants)\> |
`setCategoryOrderHint?` | [*Maybe*](#maybe)<[*SetProductCategoryOrderHint*](#setproductcategoryorderhint)\> |
`setDescription?` | [*Maybe*](#maybe)<[*SetProductDescription*](#setproductdescription)\> |
`setDiscountedPrice?` | [*Maybe*](#maybe)<[*SetProductDiscountedPrice*](#setproductdiscountedprice)\> |
`setImageLabel?` | [*Maybe*](#maybe)<[*SetProductImageLabel*](#setproductimagelabel)\> |
`setKey?` | [*Maybe*](#maybe)<[*SetProductKey*](#setproductkey)\> |
`setMetaAttributes?` | [*Maybe*](#maybe)<[*SetProductMetaAttributes*](#setproductmetaattributes)\> |
`setMetaDescription?` | [*Maybe*](#maybe)<[*SetProductMetaDescription*](#setproductmetadescription)\> |
`setMetaKeywords?` | [*Maybe*](#maybe)<[*SetProductMetaKeywords*](#setproductmetakeywords)\> |
`setMetaTitle?` | [*Maybe*](#maybe)<[*SetProductMetaTitle*](#setproductmetatitle)\> |
`setPrices?` | [*Maybe*](#maybe)<[*SetProductPrices*](#setproductprices)\> |
`setProductPriceCustomField?` | [*Maybe*](#maybe)<[*SetProductPriceCustomField*](#setproductpricecustomfield)\> |
`setProductPriceCustomType?` | [*Maybe*](#maybe)<[*SetProductPriceCustomType*](#setproductpricecustomtype)\> |
`setProductVariantKey?` | [*Maybe*](#maybe)<[*SetProductVariantKey*](#setproductvariantkey)\> |
`setSearchKeywords?` | [*Maybe*](#maybe)<[*SetSearchKeywords*](#setsearchkeywords)\> |
`setSku?` | [*Maybe*](#maybe)<[*SetProductSku*](#setproductsku)\> |
`setTaxCategory?` | [*Maybe*](#maybe)<[*SetProductTaxCategory*](#setproducttaxcategory)\> |
`transitionState?` | [*Maybe*](#maybe)<[*TransitionProductState*](#transitionproductstate)\> |
`unpublish?` | [*Maybe*](#maybe)<[*UnpublishProduct*](#unpublishproduct)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4703](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4703)

___

##### ProductVariant

Ƭ **ProductVariant**: { `__typename?`: *ProductVariant* ; `assets`: [*Asset*](#asset)[] ; `attributeList`: [*Attribute*](#attribute)[] ; `attributes`: [*ProductType*](#producttype) ; `attributesRaw`: [*RawProductAttribute*](#rawproductattribute)[] ; `availability?`: [*Maybe*](#maybe)<[*ProductVariantAvailabilityWithChannels*](#productvariantavailabilitywithchannels)\> ; `id`: [*Scalars*](#scalars)[*Int*] ; `images`: [*Image*](#image)[] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `price?`: [*Maybe*](#maybe)<[*ProductPrice*](#productprice)\> ; `prices?`: [*Maybe*](#maybe)<[*ProductPrice*](#productprice)[]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`__typename?` | *ProductVariant* | - |
`assets` | [*Asset*](#asset)[] | - |
`attributeList` | [*Attribute*](#attribute)[] | Product attributes are returned as a list instead of an object structure.   |
`attributes` | [*ProductType*](#producttype) | Product attributes   |
`attributesRaw` | [*RawProductAttribute*](#rawproductattribute)[] | This field contains non-typed data. Consider using `attributes` as a typed alternative.   |
`availability?` | [*Maybe*](#maybe)<[*ProductVariantAvailabilityWithChannels*](#productvariantavailabilitywithchannels)\> | - |
`id` | [*Scalars*](#scalars)[*Int*] | - |
`images` | [*Image*](#image)[] | - |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |
`price?` | [*Maybe*](#maybe)<[*ProductPrice*](#productprice)\> | Returns a single price based on the price selection rules.   |
`prices?` | [*Maybe*](#maybe)<[*ProductPrice*](#productprice)[]\> | - |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> | - |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4753](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4753)

___

##### ProductVariantAttributeListArgs

Ƭ **ProductVariantAttributeListArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4785](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4785)

___

##### ProductVariantAttributesRawArgs

Ƭ **ProductVariantAttributesRawArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4780](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4780)

___

##### ProductVariantAvailabilitiesResult

Ƭ **ProductVariantAvailabilitiesResult**: { `__typename?`: *ProductVariantAvailabilitiesResult* ; `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `results`: [*ProductVariantAvailabilityWithChannel*](#productvariantavailabilitywithchannel)[] ; `total`: [*Scalars*](#scalars)[*Int*]  }

Product variant availabilities

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ProductVariantAvailabilitiesResult* |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`results` | [*ProductVariantAvailabilityWithChannel*](#productvariantavailabilitywithchannel)[] |
`total` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4791](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4791)

___

##### ProductVariantAvailability

Ƭ **ProductVariantAvailability**: { `__typename?`: *ProductVariantAvailability* ; `availableQuantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `isOnStock`: [*Scalars*](#scalars)[*Boolean*] ; `restockableInDays?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

Product variant availability

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ProductVariantAvailability* |
`availableQuantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`isOnStock` | [*Scalars*](#scalars)[*Boolean*] |
`restockableInDays?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4800](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4800)

___

##### ProductVariantAvailabilityWithChannel

Ƭ **ProductVariantAvailabilityWithChannel**: { `__typename?`: *ProductVariantAvailabilityWithChannel* ; `availability`: [*ProductVariantAvailability*](#productvariantavailability) ; `channel?`: [*Maybe*](#maybe)<[*Channel*](#channel)\> ; `channelRef`: [*Reference*](#reference)  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ProductVariantAvailabilityWithChannel* |
`availability` | [*ProductVariantAvailability*](#productvariantavailability) |
`channel?` | [*Maybe*](#maybe)<[*Channel*](#channel)\> |
`channelRef` | [*Reference*](#reference) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4807](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4807)

___

##### ProductVariantAvailabilityWithChannels

Ƭ **ProductVariantAvailabilityWithChannels**: { `__typename?`: *ProductVariantAvailabilityWithChannels* ; `channels`: [*ProductVariantAvailabilitiesResult*](#productvariantavailabilitiesresult) ; `noChannel?`: [*Maybe*](#maybe)<[*ProductVariantAvailability*](#productvariantavailability)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ProductVariantAvailabilityWithChannels* |
`channels` | [*ProductVariantAvailabilitiesResult*](#productvariantavailabilitiesresult) |
`noChannel?` | [*Maybe*](#maybe)<[*ProductVariantAvailability*](#productvariantavailability)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4814](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4814)

___

##### ProductVariantAvailabilityWithChannelsChannelsArgs

Ƭ **ProductVariantAvailabilityWithChannelsChannelsArgs**: { `excludeChannelIds?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeChannelIds?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`excludeChannelIds?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeChannelIds?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4820](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4820)

___

##### ProductVariantInput

Ƭ **ProductVariantInput**: { `assets?`: [*Maybe*](#maybe)<[*AssetDraftInput*](#assetdraftinput)[]\> ; `attributes?`: [*Maybe*](#maybe)<[*ProductAttributeInput*](#productattributeinput)[]\> ; `images?`: [*Maybe*](#maybe)<[*ImageInput*](#imageinput)[]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `prices?`: [*Maybe*](#maybe)<[*ProductPriceDataInput*](#productpricedatainput)[]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assets?` | [*Maybe*](#maybe)<[*AssetDraftInput*](#assetdraftinput)[]\> |
`attributes?` | [*Maybe*](#maybe)<[*ProductAttributeInput*](#productattributeinput)[]\> |
`images?` | [*Maybe*](#maybe)<[*ImageInput*](#imageinput)[]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`prices?` | [*Maybe*](#maybe)<[*ProductPriceDataInput*](#productpricedatainput)[]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4827](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4827)

___

##### ProductVariantPriceArgs

Ƭ **ProductVariantPriceArgs**: { `channelId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `country?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> ; `currency`: [*Scalars*](#scalars)[*Currency*] ; `customerGroupId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `date?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`channelId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`country?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> |
`currency` | [*Scalars*](#scalars)[*Currency*] |
`customerGroupId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`date?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4772](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4772)

___

##### ProjectProjection

Ƭ **ProjectProjection**: { `__typename?`: *ProjectProjection* ; `countries`: [*Scalars*](#scalars)[*Country*][] ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `currencies`: [*Scalars*](#scalars)[*Currency*][] ; `externalOAuth?`: [*Maybe*](#maybe)<[*ExternalOAuth*](#externaloauth)\> ; `key`: [*Scalars*](#scalars)[*String*] ; `languages`: [*Scalars*](#scalars)[*Locale*][] ; `messages`: [*MessagesConfiguration*](#messagesconfiguration) ; `name`: [*Scalars*](#scalars)[*String*] ; `shippingRateInputType?`: [*Maybe*](#maybe)<[*ShippingRateInputType*](#shippingrateinputtype)\> ; `trialUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*YearMonth*]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

Project contains information about project.

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ProjectProjection* |
`countries` | [*Scalars*](#scalars)[*Country*][] |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] |
`currencies` | [*Scalars*](#scalars)[*Currency*][] |
`externalOAuth?` | [*Maybe*](#maybe)<[*ExternalOAuth*](#externaloauth)\> |
`key` | [*Scalars*](#scalars)[*String*] |
`languages` | [*Scalars*](#scalars)[*Locale*][] |
`messages` | [*MessagesConfiguration*](#messagesconfiguration) |
`name` | [*Scalars*](#scalars)[*String*] |
`shippingRateInputType?` | [*Maybe*](#maybe)<[*ShippingRateInputType*](#shippingrateinputtype)\> |
`trialUntil?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*YearMonth*]\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4837](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4837)

___

##### ProjectSettingsUpdateAction

Ƭ **ProjectSettingsUpdateAction**: { `changeCountries?`: [*Maybe*](#maybe)<[*ChangeProjectSettingsCountries*](#changeprojectsettingscountries)\> ; `changeCurrencies?`: [*Maybe*](#maybe)<[*ChangeProjectSettingsCurrencies*](#changeprojectsettingscurrencies)\> ; `changeLanguages?`: [*Maybe*](#maybe)<[*ChangeProjectSettingsLanguages*](#changeprojectsettingslanguages)\> ; `changeMessagesConfiguration?`: [*Maybe*](#maybe)<[*ChangeProjectSettingsMessagesConfiguration*](#changeprojectsettingsmessagesconfiguration)\> ; `changeMessagesEnabled?`: [*Maybe*](#maybe)<[*ChangeProjectSettingsMessagesEnabled*](#changeprojectsettingsmessagesenabled)\> ; `changeName?`: [*Maybe*](#maybe)<[*ChangeProjectSettingsName*](#changeprojectsettingsname)\> ; `setExternalOAuth?`: [*Maybe*](#maybe)<[*SetProjectSettingsExternalOAuth*](#setprojectsettingsexternaloauth)\> ; `setShippingRateInputType?`: [*Maybe*](#maybe)<[*SetProjectSettingsShippingRateInputType*](#setprojectsettingsshippingrateinputtype)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`changeCountries?` | [*Maybe*](#maybe)<[*ChangeProjectSettingsCountries*](#changeprojectsettingscountries)\> |
`changeCurrencies?` | [*Maybe*](#maybe)<[*ChangeProjectSettingsCurrencies*](#changeprojectsettingscurrencies)\> |
`changeLanguages?` | [*Maybe*](#maybe)<[*ChangeProjectSettingsLanguages*](#changeprojectsettingslanguages)\> |
`changeMessagesConfiguration?` | [*Maybe*](#maybe)<[*ChangeProjectSettingsMessagesConfiguration*](#changeprojectsettingsmessagesconfiguration)\> |
`changeMessagesEnabled?` | [*Maybe*](#maybe)<[*ChangeProjectSettingsMessagesEnabled*](#changeprojectsettingsmessagesenabled)\> |
`changeName?` | [*Maybe*](#maybe)<[*ChangeProjectSettingsName*](#changeprojectsettingsname)\> |
`setExternalOAuth?` | [*Maybe*](#maybe)<[*SetProjectSettingsExternalOAuth*](#setprojectsettingsexternaloauth)\> |
`setShippingRateInputType?` | [*Maybe*](#maybe)<[*SetProjectSettingsShippingRateInputType*](#setprojectsettingsshippingrateinputtype)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4852](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4852)

___

##### PublishProduct

Ƭ **PublishProduct**: { `scope?`: [*Maybe*](#maybe)<[*PublishScope*](#enumstypes_graphqlpublishscopemd)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`scope?` | [*Maybe*](#maybe)<[*PublishScope*](#enumstypes_graphqlpublishscopemd)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4865](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4865)

___

##### Query

Ƭ **Query**: [*CartQueryInterface*](#cartqueryinterface) & [*CustomerActiveCartInterface*](#customeractivecartinterface) & [*OrderQueryInterface*](#orderqueryinterface) & [*CustomerQueryInterface*](#customerqueryinterface) & [*ShoppingListQueryInterface*](#shoppinglistqueryinterface) & [*ShippingMethodsByCartInterface*](#shippingmethodsbycartinterface) & [*MeFieldInterface*](#mefieldinterface) & { `__typename?`: *Query* ; `apiClient?`: [*Maybe*](#maybe)<[*ApiClientWithoutSecret*](#apiclientwithoutsecret)\> ; `apiClients`: [*ApiClientWithoutSecretQueryResult*](#apiclientwithoutsecretqueryresult) ; `cart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `cartDiscount?`: [*Maybe*](#maybe)<[*CartDiscount*](#cartdiscount)\> ; `cartDiscounts`: [*CartDiscountQueryResult*](#cartdiscountqueryresult) ; `carts`: [*CartQueryResult*](#cartqueryresult) ; `categories`: [*CategoryQueryResult*](#categoryqueryresult) ; `category?`: [*Maybe*](#maybe)<[*Category*](#category)\> ; `categoryAutocomplete`: [*CategorySearchResult*](#categorysearchresult) ; `categorySearch`: [*CategorySearchResult*](#categorysearchresult) ; `channel?`: [*Maybe*](#maybe)<[*Channel*](#channel)\> ; `channels`: [*ChannelQueryResult*](#channelqueryresult) ; `customer?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `customerActiveCart?`: [*Maybe*](#maybe)<[*Cart*](#cart)\> ; `customerGroup?`: [*Maybe*](#maybe)<[*CustomerGroup*](#customergroup)\> ; `customerGroups`: [*CustomerGroupQueryResult*](#customergroupqueryresult) ; `customers`: [*CustomerQueryResult*](#customerqueryresult) ; `discountCode?`: [*Maybe*](#maybe)<[*DiscountCode*](#discountcode)\> ; `discountCodes`: [*DiscountCodeQueryResult*](#discountcodequeryresult) ; `inStore`: [*InStore*](#instore) ; `inStores`: [*InStore*](#instore) ; `inventoryEntries`: [*InventoryEntryQueryResult*](#inventoryentryqueryresult) ; `inventoryEntry?`: [*Maybe*](#maybe)<[*InventoryEntry*](#inventoryentry)\> ; `me`: [*Me*](#me) ; `order?`: [*Maybe*](#maybe)<[*Order*](#order)\> ; `orders`: [*OrderQueryResult*](#orderqueryresult) ; `payment?`: [*Maybe*](#maybe)<[*Payment*](#payment)\> ; `payments`: [*PaymentQueryResult*](#paymentqueryresult) ; `product?`: [*Maybe*](#maybe)<[*Product*](#product)\> ; `productDiscount?`: [*Maybe*](#maybe)<[*ProductDiscount*](#productdiscount)\> ; `productDiscounts`: [*ProductDiscountQueryResult*](#productdiscountqueryresult) ; `productType?`: [*Maybe*](#maybe)<[*ProductTypeDefinition*](#producttypedefinition)\> ; `productTypes`: [*ProductTypeDefinitionQueryResult*](#producttypedefinitionqueryresult) ; `products`: [*ProductQueryResult*](#productqueryresult) ; `project`: [*ProjectProjection*](#projectprojection) ; `shippingMethod?`: [*Maybe*](#maybe)<[*ShippingMethod*](#shippingmethod)\> ; `shippingMethods`: [*ShippingMethodQueryResult*](#shippingmethodqueryresult) ; `shippingMethodsByCart`: [*ShippingMethod*](#shippingmethod)[] ; `shippingMethodsByLocation`: [*ShippingMethod*](#shippingmethod)[] ; `shoppingList?`: [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> ; `shoppingLists`: [*ShoppingListQueryResult*](#shoppinglistqueryresult) ; `state?`: [*Maybe*](#maybe)<[*State*](#state)\> ; `states`: [*StateQueryResult*](#statequeryresult) ; `store?`: [*Maybe*](#maybe)<[*Store*](#store)\> ; `stores`: [*StoreQueryResult*](#storequeryresult) ; `taxCategories`: [*TaxCategoryQueryResult*](#taxcategoryqueryresult) ; `taxCategory?`: [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> ; `typeDefinition?`: [*Maybe*](#maybe)<[*TypeDefinition*](#typedefinition)\> ; `typeDefinitions`: [*TypeDefinitionQueryResult*](#typedefinitionqueryresult) ; `zone?`: [*Maybe*](#maybe)<[*Zone*](#zone)\> ; `zones`: [*ZoneQueryResult*](#zonequeryresult)  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4876](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4876)

___

##### QueryApiClientArgs

Ƭ **QueryApiClientArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5227](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5227)

___

##### QueryApiClientsArgs

Ƭ **QueryApiClientsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5231](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5231)

___

##### QueryCartArgs

Ƭ **QueryCartArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5164](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5164)

___

##### QueryCartDiscountArgs

Ƭ **QueryCartDiscountArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5089](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5089)

___

##### QueryCartDiscountsArgs

Ƭ **QueryCartDiscountsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5094](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5094)

___

##### QueryCartsArgs

Ƭ **QueryCartsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5168](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5168)

___

##### QueryCategoriesArgs

Ƭ **QueryCategoriesArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4970](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4970)

___

##### QueryCategoryArgs

Ƭ **QueryCategoryArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4965](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4965)

___

##### QueryCategoryAutocompleteArgs

Ƭ **QueryCategoryAutocompleteArgs**: { `experimental?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `filters?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*SearchFilter*][]\> ; `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `locale`: [*Scalars*](#scalars)[*Locale*] ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `text`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`experimental?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`filters?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*SearchFilter*][]\> |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`locale` | [*Scalars*](#scalars)[*Locale*] |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`text` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4977](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4977)

___

##### QueryCategorySearchArgs

Ƭ **QueryCategorySearchArgs**: { `experimental?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `filters?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*SearchFilter*][]\> ; `fulltext?`: [*Maybe*](#maybe)<[*LocalizedText*](#localizedtext)\> ; `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `queryFilters?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*SearchFilter*][]\> ; `sorts?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*SearchSort*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`experimental?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`filters?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*SearchFilter*][]\> |
`fulltext?` | [*Maybe*](#maybe)<[*LocalizedText*](#localizedtext)\> |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`queryFilters?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*SearchFilter*][]\> |
`sorts?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*SearchSort*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4986](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4986)

___

##### QueryChannelArgs

Ƭ **QueryChannelArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4996](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4996)

___

##### QueryChannelsArgs

Ƭ **QueryChannelsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5001](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5001)

___

##### QueryCustomerActiveCartArgs

Ƭ **QueryCustomerActiveCartArgs**: { `customerId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`customerId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5175](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5175)

___

##### QueryCustomerArgs

Ƭ **QueryCustomerArgs**: { `emailToken?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `passwordToken?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`emailToken?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`passwordToken?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5139](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5139)

___

##### QueryCustomerGroupArgs

Ƭ **QueryCustomerGroupArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4953](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4953)

___

##### QueryCustomerGroupsArgs

Ƭ **QueryCustomerGroupsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4958](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4958)

___

##### QueryCustomersArgs

Ƭ **QueryCustomersArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5146](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5146)

___

##### QueryDiscountCodeArgs

Ƭ **QueryDiscountCodeArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5078](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5078)

___

##### QueryDiscountCodesArgs

Ƭ **QueryDiscountCodesArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5082](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5082)

___

##### QueryInStoreArgs

Ƭ **QueryInStoreArgs**: { `key`: [*Scalars*](#scalars)[*KeyReferenceInput*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`key` | [*Scalars*](#scalars)[*KeyReferenceInput*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4945](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4945)

___

##### QueryInStoresArgs

Ƭ **QueryInStoresArgs**: { `keys`: [*Scalars*](#scalars)[*KeyReferenceInput*][]  }

###### Type declaration:

Name | Type |
------ | ------ |
`keys` | [*Scalars*](#scalars)[*KeyReferenceInput*][] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:4949](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L4949)

___

##### QueryInventoryEntriesArgs

Ƭ **QueryInventoryEntriesArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5157](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5157)

___

##### QueryInventoryEntryArgs

Ƭ **QueryInventoryEntryArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5153](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5153)

___

##### QueryOrderArgs

Ƭ **QueryOrderArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `orderNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`orderNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5179](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5179)

___

##### QueryOrdersArgs

Ƭ **QueryOrdersArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5184](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5184)

___

##### QueryPaymentArgs

Ƭ **QueryPaymentArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5203](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5203)

___

##### QueryPaymentsArgs

Ƭ **QueryPaymentsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5208](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5208)

___

##### QueryProductArgs

Ƭ **QueryProductArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `variantKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variantKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5112](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5112)

___

##### QueryProductDiscountArgs

Ƭ **QueryProductDiscountArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5101](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5101)

___

##### QueryProductDiscountsArgs

Ƭ **QueryProductDiscountsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5105](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5105)

___

##### QueryProductTypeArgs

Ƭ **QueryProductTypeArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5008](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5008)

___

##### QueryProductTypesArgs

Ƭ **QueryProductTypesArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5013](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5013)

___

##### QueryProductsArgs

Ƭ **QueryProductsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `skus?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`skus?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5119](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5119)

___

##### QueryShippingMethodArgs

Ƭ **QueryShippingMethodArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5032](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5032)

___

##### QueryShippingMethodsArgs

Ƭ **QueryShippingMethodsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5037](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5037)

___

##### QueryShippingMethodsByCartArgs

Ƭ **QueryShippingMethodsByCartArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5044](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5044)

___

##### QueryShippingMethodsByLocationArgs

Ƭ **QueryShippingMethodsByLocationArgs**: { `country`: [*Scalars*](#scalars)[*Country*] ; `currency?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Currency*]\> ; `state?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`country` | [*Scalars*](#scalars)[*Country*] |
`currency?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Currency*]\> |
`state?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5048](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5048)

___

##### QueryShoppingListArgs

Ƭ **QueryShoppingListArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5191](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5191)

___

##### QueryShoppingListsArgs

Ƭ **QueryShoppingListsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5196](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5196)

___

##### QueryStateArgs

Ƭ **QueryStateArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5127](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5127)

___

##### QueryStatesArgs

Ƭ **QueryStatesArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5132](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5132)

___

##### QueryStoreArgs

Ƭ **QueryStoreArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5215](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5215)

___

##### QueryStoresArgs

Ƭ **QueryStoresArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5220](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5220)

___

##### QueryTaxCategoriesArgs

Ƭ **QueryTaxCategoriesArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5071](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5071)

___

##### QueryTaxCategoryArgs

Ƭ **QueryTaxCategoryArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5066](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5066)

___

##### QueryTypeDefinitionArgs

Ƭ **QueryTypeDefinitionArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5020](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5020)

___

##### QueryTypeDefinitionsArgs

Ƭ **QueryTypeDefinitionsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5025](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5025)

___

##### QueryZoneArgs

Ƭ **QueryZoneArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5054](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5054)

___

##### QueryZonesArgs

Ƭ **QueryZonesArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5059](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5059)

___

##### RawCustomField

Ƭ **RawCustomField**: { `__typename?`: *RawCustomField* ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*Json*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *RawCustomField* |
`name` | [*Scalars*](#scalars)[*String*] |
`value` | [*Scalars*](#scalars)[*Json*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5238](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5238)

___

##### RawProductAttribute

Ƭ **RawProductAttribute**: { `__typename?`: *RawProductAttribute* ; `attributeDefinition?`: [*Maybe*](#maybe)<[*AttributeDefinition*](#attributedefinition)\> ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*Json*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *RawProductAttribute* |
`attributeDefinition?` | [*Maybe*](#maybe)<[*AttributeDefinition*](#attributedefinition)\> |
`name` | [*Scalars*](#scalars)[*String*] |
`value` | [*Scalars*](#scalars)[*Json*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5244](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5244)

___

##### RecalculateCart

Ƭ **RecalculateCart**: { `updateProductData?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`updateProductData?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5251](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5251)

___

##### Reference

Ƭ **Reference**: { `__typename?`: *Reference* ; `id`: [*Scalars*](#scalars)[*String*] ; `typeId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *Reference* |
`id` | [*Scalars*](#scalars)[*String*] |
`typeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5255](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5255)

___

##### ReferenceAttribute

Ƭ **ReferenceAttribute**: [*Attribute*](#attribute) & { `__typename?`: *ReferenceAttribute* ; `id`: [*Scalars*](#scalars)[*String*] ; `name`: [*Scalars*](#scalars)[*String*] ; `typeId`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5261](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5261)

___

##### ReferenceAttributeDefinitionType

Ƭ **ReferenceAttributeDefinitionType**: [*AttributeDefinitionType*](#attributedefinitiontype) & { `__typename?`: *ReferenceAttributeDefinitionType* ; `name`: [*Scalars*](#scalars)[*String*] ; `referenceTypeId`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5268](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5268)

___

##### ReferenceField

Ƭ **ReferenceField**: [*CustomField*](#customfield) & { `__typename?`: *ReferenceField* ; `id`: [*Scalars*](#scalars)[*String*] ; `name`: [*Scalars*](#scalars)[*String*] ; `typeId`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5274](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5274)

___

##### ReferenceInput

Ƭ **ReferenceInput**: { `id`: [*Scalars*](#scalars)[*String*] ; `typeId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |
`typeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5281](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5281)

___

##### ReferenceType

Ƭ **ReferenceType**: [*FieldType*](#fieldtype) & { `__typename?`: *ReferenceType* ; `name`: [*Scalars*](#scalars)[*String*] ; `referenceTypeId`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5286](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5286)

___

##### ReferenceTypeDefinitionDraft

Ƭ **ReferenceTypeDefinitionDraft**: { `referenceTypeId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`referenceTypeId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5292](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5292)

___

##### RelativeDiscountValue

Ƭ **RelativeDiscountValue**: [*CartDiscountValue*](#cartdiscountvalue) & [*ProductDiscountValue*](#productdiscountvalue) & { `__typename?`: *RelativeDiscountValue* ; `permyriad`: [*Scalars*](#scalars)[*Int*] ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5296](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5296)

___

##### RelativeDiscountValueInput

Ƭ **RelativeDiscountValueInput**: { `permyriad`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`permyriad` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5303](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5303)

___

##### RemoveAttributeDefinition

Ƭ **RemoveAttributeDefinition**: { `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5307](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5307)

___

##### RemoveCartCustomLineItem

Ƭ **RemoveCartCustomLineItem**: { `customLineItemId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5311](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5311)

___

##### RemoveCartDiscountCode

Ƭ **RemoveCartDiscountCode**: { `discountCode`: [*ReferenceInput*](#referenceinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`discountCode` | [*ReferenceInput*](#referenceinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5315](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5315)

___

##### RemoveCartItemShippingAddress

Ƭ **RemoveCartItemShippingAddress**: { `addressKey`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`addressKey` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5319](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5319)

___

##### RemoveCartLineItem

Ƭ **RemoveCartLineItem**: { `externalPrice?`: [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> ; `externalTotalPrice?`: [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> ; `lineItemId`: [*Scalars*](#scalars)[*String*] ; `quantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> ; `shippingDetailsToRemove?`: [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalPrice?` | [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> |
`externalTotalPrice?` | [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`quantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |
`shippingDetailsToRemove?` | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5323](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5323)

___

##### RemoveCartPayment

Ƭ **RemoveCartPayment**: { `payment`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`payment` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5331](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5331)

___

##### RemoveCategoryAsset

Ƭ **RemoveCategoryAsset**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5335](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5335)

___

##### RemoveCustomerAddress

Ƭ **RemoveCustomerAddress**: { `addressId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`addressId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5340](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5340)

___

##### RemoveCustomerBillingAddressId

Ƭ **RemoveCustomerBillingAddressId**: { `addressId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`addressId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5344](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5344)

___

##### RemoveCustomerShippingAddressId

Ƭ **RemoveCustomerShippingAddressId**: { `addressId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`addressId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5348](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5348)

___

##### RemoveCustomerStore

Ƭ **RemoveCustomerStore**: { `store`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`store` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5352](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5352)

___

##### RemoveEnumValues

Ƭ **RemoveEnumValues**: { `attributeName`: [*Scalars*](#scalars)[*String*] ; `keys`: [*Scalars*](#scalars)[*String*][]  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`keys` | [*Scalars*](#scalars)[*String*][] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5356](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5356)

___

##### RemoveInventoryEntryQuantity

Ƭ **RemoveInventoryEntryQuantity**: { `quantity`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5361](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5361)

___

##### RemoveOrderDelivery

Ƭ **RemoveOrderDelivery**: { `deliveryId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`deliveryId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5365](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5365)

___

##### RemoveOrderItemShippingAddress

Ƭ **RemoveOrderItemShippingAddress**: { `addressKey`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`addressKey` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5369](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5369)

___

##### RemoveOrderParcelFromDelivery

Ƭ **RemoveOrderParcelFromDelivery**: { `parcelId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`parcelId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5373](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5373)

___

##### RemoveOrderPayment

Ƭ **RemoveOrderPayment**: { `payment`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`payment` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5377](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5377)

___

##### RemoveProductAsset

Ƭ **RemoveProductAsset**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5381](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5381)

___

##### RemoveProductFromCategory

Ƭ **RemoveProductFromCategory**: { `category`: [*ResourceIdentifierInput*](#resourceidentifierinput) ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`category` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5390](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5390)

___

##### RemoveProductImage

Ƭ **RemoveProductImage**: { `imageUrl`: [*Scalars*](#scalars)[*String*] ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`imageUrl` | [*Scalars*](#scalars)[*String*] |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5395](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5395)

___

##### RemoveProductPrice

Ƭ **RemoveProductPrice**: { `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `price?`: [*Maybe*](#maybe)<[*ProductPriceDataInput*](#productpricedatainput)\> ; `priceId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`price?` | [*Maybe*](#maybe)<[*ProductPriceDataInput*](#productpricedatainput)\> |
`priceId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5402](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5402)

___

##### RemoveProductVariant

Ƭ **RemoveProductVariant**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5411](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5411)

___

##### RemoveShippingMethodShippingRate

Ƭ **RemoveShippingMethodShippingRate**: { `shippingRate`: [*ShippingRateDraft*](#shippingratedraft) ; `zone`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`shippingRate` | [*ShippingRateDraft*](#shippingratedraft) |
`zone` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5417](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5417)

___

##### RemoveShippingMethodZone

Ƭ **RemoveShippingMethodZone**: { `zone`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`zone` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5422](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5422)

___

##### RemoveShoppingListLineItem

Ƭ **RemoveShoppingListLineItem**: { `lineItemId`: [*Scalars*](#scalars)[*String*] ; `quantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`quantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5426](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5426)

___

##### RemoveShoppingListTextLineItem

Ƭ **RemoveShoppingListTextLineItem**: { `quantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `textLineItemId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`quantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`textLineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5431](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5431)

___

##### RemoveZoneLocation

Ƭ **RemoveZoneLocation**: { `location`: [*ZoneLocation*](#zonelocation)  }

###### Type declaration:

Name | Type |
------ | ------ |
`location` | [*ZoneLocation*](#zonelocation) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5436](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5436)

___

##### ReservationOrderType

Ƭ **ReservationOrderType**: [*Type*](#type) & { `__typename?`: *reservationOrderType* ; `isReservation?`: [*Maybe*](#maybe)<[*BooleanField*](#booleanfield)\> ; `type`: [*TypeDefinition*](#typedefinition) ; `typeRef`: [*Reference*](#reference)  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5440](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5440)

___

##### ResourceIdentifierInput

Ƭ **ResourceIdentifierInput**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5447](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5447)

___

##### ReturnInfo

Ƭ **ReturnInfo**: { `__typename?`: *ReturnInfo* ; `items`: [*ReturnItem*](#returnitem)[] ; `returnDate?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `returnTrackingId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

Stores information about returns connected to this order.

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ReturnInfo* |
`items` | [*ReturnItem*](#returnitem)[] |
`returnDate?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`returnTrackingId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5454](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5454)

___

##### ReturnItem

Ƭ **ReturnItem**: { `comment?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `id`: [*Scalars*](#scalars)[*String*] ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `paymentState`: [*ReturnPaymentState*](#enumstypes_graphqlreturnpaymentstatemd) ; `quantity`: [*Scalars*](#scalars)[*Long*] ; `shipmentState`: [*ReturnShipmentState*](#enumstypes_graphqlreturnshipmentstatemd) ; `type`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`comment?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] |
`id` | [*Scalars*](#scalars)[*String*] |
`lastModifiedAt` | [*Scalars*](#scalars)[*DateTime*] |
`paymentState` | [*ReturnPaymentState*](#enumstypes_graphqlreturnpaymentstatemd) |
`quantity` | [*Scalars*](#scalars)[*Long*] |
`shipmentState` | [*ReturnShipmentState*](#enumstypes_graphqlreturnshipmentstatemd) |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5461](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5461)

___

##### ReturnItemDraftType

Ƭ **ReturnItemDraftType**: { `comment?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `customLineItemId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lineItemId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `quantity`: [*Scalars*](#scalars)[*Long*] ; `shipmentState`: [*ReturnShipmentState*](#enumstypes_graphqlreturnshipmentstatemd)  }

###### Type declaration:

Name | Type |
------ | ------ |
`comment?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`customLineItemId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`lineItemId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity` | [*Scalars*](#scalars)[*Long*] |
`shipmentState` | [*ReturnShipmentState*](#enumstypes_graphqlreturnshipmentstatemd) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5472](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5472)

___

##### RevertStagedChanges

Ƭ **RevertStagedChanges**: { `dummy?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`dummy?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5494](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5494)

___

##### RevertStagedVariantChanges

Ƭ **RevertStagedVariantChanges**: { `variantId`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`variantId` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5498](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5498)

___

##### Scalars

Ƭ **Scalars**: { `BigDecimal`: *any* ; `Boolean`: *boolean* ; `Country`: *any* ; `Currency`: *any* ; `Date`: *any* ; `DateTime`: *any* ; `Float`: *number* ; `ID`: *string* ; `Int`: *number* ; `Json`: *any* ; `KeyReferenceInput`: *any* ; `Locale`: *any* ; `Long`: *any* ; `SearchFilter`: *any* ; `SearchSort`: *any* ; `String`: *string* ; `Time`: *any* ; `YearMonth`: *any*  }

All built-in and custom scalars, mapped to their actual values

###### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
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

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5)

___

##### ScoreShippingRateInput

Ƭ **ScoreShippingRateInput**: [*ShippingRateInput*](#shippingrateinput) & { `__typename?`: *ScoreShippingRateInput* ; `score`: [*Scalars*](#scalars)[*Int*] ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5515](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5515)

___

##### ScoreShippingRateInputDraft

Ƭ **ScoreShippingRateInputDraft**: { `score`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`score` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5521](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5521)

___

##### SearchKeyword

Ƭ **SearchKeyword**: { `__typename?`: *SearchKeyword* ; `text`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *SearchKeyword* |
`text` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5525](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5525)

___

##### SearchKeywordInput

Ƭ **SearchKeywordInput**: { `keywords`: [*CustomSuggestTokenizerInput*](#customsuggesttokenizerinput)[] ; `locale`: [*Scalars*](#scalars)[*Locale*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`keywords` | [*CustomSuggestTokenizerInput*](#customsuggesttokenizerinput)[] |
`locale` | [*Scalars*](#scalars)[*Locale*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5530](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5530)

___

##### SearchKeywords

Ƭ **SearchKeywords**: { `__typename?`: *SearchKeywords* ; `locale`: [*Scalars*](#scalars)[*Locale*] ; `searchKeywords`: [*SearchKeyword*](#searchkeyword)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *SearchKeywords* |
`locale` | [*Scalars*](#scalars)[*Locale*] |
`searchKeywords` | [*SearchKeyword*](#searchkeyword)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5535](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5535)

___

##### SetAttributeDefinitionType

Ƭ **SetAttributeDefinitionType**: [*AttributeDefinitionType*](#attributedefinitiontype) & { `__typename?`: *SetAttributeDefinitionType* ; `elementType`: [*AttributeDefinitionType*](#attributedefinitiontype) ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5547](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5547)

___

##### SetCartAnonymousId

Ƭ **SetCartAnonymousId**: { `anonymousId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`anonymousId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5553](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5553)

___

##### SetCartBillingAddress

Ƭ **SetCartBillingAddress**: { `address?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`address?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5557](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5557)

___

##### SetCartCountry

Ƭ **SetCartCountry**: { `country?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`country?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Country*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5561](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5561)

___

##### SetCartCustomField

Ƭ **SetCartCustomField**: { `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5577](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5577)

___

##### SetCartCustomLineItemCustomField

Ƭ **SetCartCustomLineItemCustomField**: { `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5582](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5582)

___

##### SetCartCustomLineItemCustomType

Ƭ **SetCartCustomLineItemCustomType**: { `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5588](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5588)

___

##### SetCartCustomLineItemShippingDetails

Ƭ **SetCartCustomLineItemShippingDetails**: { `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `shippingDetails?`: [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`shippingDetails?` | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5596](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5596)

___

##### SetCartCustomLineItemTaxAmount

Ƭ **SetCartCustomLineItemTaxAmount**: { `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `externalTaxAmount?`: [*Maybe*](#maybe)<[*ExternalTaxAmountDraft*](#externaltaxamountdraft)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`externalTaxAmount?` | [*Maybe*](#maybe)<[*ExternalTaxAmountDraft*](#externaltaxamountdraft)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5601](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5601)

___

##### SetCartCustomLineItemTaxRate

Ƭ **SetCartCustomLineItemTaxRate**: { `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `externalTaxRate?`: [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`externalTaxRate?` | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5606](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5606)

___

##### SetCartCustomShippingMethod

Ƭ **SetCartCustomShippingMethod**: { `externalTaxRate?`: [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> ; `shippingMethodName`: [*Scalars*](#scalars)[*String*] ; `shippingRate`: [*ShippingRateDraft*](#shippingratedraft) ; `taxCategory?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalTaxRate?` | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`shippingMethodName` | [*Scalars*](#scalars)[*String*] |
`shippingRate` | [*ShippingRateDraft*](#shippingratedraft) |
`taxCategory?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5611](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5611)

___

##### SetCartCustomType

Ƭ **SetCartCustomType**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5618](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5618)

___

##### SetCartCustomerEmail

Ƭ **SetCartCustomerEmail**: { `email?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`email?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5565](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5565)

___

##### SetCartCustomerGroup

Ƭ **SetCartCustomerGroup**: { `customerGroup?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customerGroup?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5569](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5569)

___

##### SetCartCustomerId

Ƭ **SetCartCustomerId**: { `customerId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customerId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5573](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5573)

___

##### SetCartDeleteDaysAfterLastModification

Ƭ **SetCartDeleteDaysAfterLastModification**: { `deleteDaysAfterLastModification?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`deleteDaysAfterLastModification?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5625](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5625)

___

##### SetCartDiscountCustomField

Ƭ **SetCartDiscountCustomField**: { `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5629](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5629)

___

##### SetCartDiscountCustomType

Ƭ **SetCartDiscountCustomType**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5634](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5634)

___

##### SetCartDiscountDescription

Ƭ **SetCartDiscountDescription**: { `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5641](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5641)

___

##### SetCartDiscountKey

Ƭ **SetCartDiscountKey**: { `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5645](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5645)

___

##### SetCartDiscountValidFrom

Ƭ **SetCartDiscountValidFrom**: { `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`validFrom?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5649](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5649)

___

##### SetCartDiscountValidFromAndUntil

Ƭ **SetCartDiscountValidFromAndUntil**: { `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`validFrom?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5653](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5653)

___

##### SetCartDiscountValidUntil

Ƭ **SetCartDiscountValidUntil**: { `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`validUntil?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5658](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5658)

___

##### SetCartLineItemCustomField

Ƭ **SetCartLineItemCustomField**: { `lineItemId`: [*Scalars*](#scalars)[*String*] ; `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5662](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5662)

___

##### SetCartLineItemCustomType

Ƭ **SetCartLineItemCustomType**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `lineItemId`: [*Scalars*](#scalars)[*String*] ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5668](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5668)

___

##### SetCartLineItemPrice

Ƭ **SetCartLineItemPrice**: { `externalPrice?`: [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> ; `lineItemId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalPrice?` | [*Maybe*](#maybe)<[*BaseMoneyInput*](#basemoneyinput)\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5676](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5676)

___

##### SetCartLineItemShippingDetails

Ƭ **SetCartLineItemShippingDetails**: { `lineItemId`: [*Scalars*](#scalars)[*String*] ; `shippingDetails?`: [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`shippingDetails?` | [*Maybe*](#maybe)<[*ItemShippingDetailsDraft*](#itemshippingdetailsdraft)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5681](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5681)

___

##### SetCartLineItemTaxAmount

Ƭ **SetCartLineItemTaxAmount**: { `externalTaxAmount?`: [*Maybe*](#maybe)<[*ExternalTaxAmountDraft*](#externaltaxamountdraft)\> ; `lineItemId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalTaxAmount?` | [*Maybe*](#maybe)<[*ExternalTaxAmountDraft*](#externaltaxamountdraft)\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5686](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5686)

___

##### SetCartLineItemTaxRate

Ƭ **SetCartLineItemTaxRate**: { `externalTaxRate?`: [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> ; `lineItemId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalTaxRate?` | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5691](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5691)

___

##### SetCartLineItemTotalPrice

Ƭ **SetCartLineItemTotalPrice**: { `externalTotalPrice?`: [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> ; `lineItemId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalTotalPrice?` | [*Maybe*](#maybe)<[*ExternalLineItemTotalPriceDraft*](#externallineitemtotalpricedraft)\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5696](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5696)

___

##### SetCartLocale

Ƭ **SetCartLocale**: { `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5701](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5701)

___

##### SetCartShippingAddress

Ƭ **SetCartShippingAddress**: { `address?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`address?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5705](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5705)

___

##### SetCartShippingMethod

Ƭ **SetCartShippingMethod**: { `externalTaxRate?`: [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> ; `shippingMethod?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalTaxRate?` | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |
`shippingMethod?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5709](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5709)

___

##### SetCartShippingMethodTaxAmount

Ƭ **SetCartShippingMethodTaxAmount**: { `externalTaxAmount?`: [*Maybe*](#maybe)<[*ExternalTaxAmountDraft*](#externaltaxamountdraft)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalTaxAmount?` | [*Maybe*](#maybe)<[*ExternalTaxAmountDraft*](#externaltaxamountdraft)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5714](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5714)

___

##### SetCartShippingMethodTaxRate

Ƭ **SetCartShippingMethodTaxRate**: { `externalTaxRate?`: [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalTaxRate?` | [*Maybe*](#maybe)<[*ExternalTaxRateDraft*](#externaltaxratedraft)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5718](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5718)

___

##### SetCartShippingRateInput

Ƭ **SetCartShippingRateInput**: { `shippingRateInput?`: [*Maybe*](#maybe)<[*ShippingRateInputDraft*](#shippingrateinputdraft)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`shippingRateInput?` | [*Maybe*](#maybe)<[*ShippingRateInputDraft*](#shippingrateinputdraft)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5722](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5722)

___

##### SetCartTotalTax

Ƭ **SetCartTotalTax**: { `externalTaxPortions?`: [*Maybe*](#maybe)<[*TaxPortionDraft*](#taxportiondraft)[]\> ; `externalTotalGross?`: [*Maybe*](#maybe)<[*MoneyInput*](#moneyinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalTaxPortions?` | [*Maybe*](#maybe)<[*TaxPortionDraft*](#taxportiondraft)[]\> |
`externalTotalGross?` | [*Maybe*](#maybe)<[*MoneyInput*](#moneyinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5726](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5726)

___

##### SetCategoryAssetCustomField

Ƭ **SetCategoryAssetCustomField**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5731](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5731)

___

##### SetCategoryAssetCustomType

Ƭ **SetCategoryAssetCustomType**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5738](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5738)

___

##### SetCategoryAssetDescription

Ƭ **SetCategoryAssetDescription**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5747](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5747)

___

##### SetCategoryAssetKey

Ƭ **SetCategoryAssetKey**: { `assetId`: [*Scalars*](#scalars)[*String*] ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId` | [*Scalars*](#scalars)[*String*] |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5753](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5753)

___

##### SetCategoryAssetSources

Ƭ **SetCategoryAssetSources**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `sources?`: [*Maybe*](#maybe)<[*AssetSourceInput*](#assetsourceinput)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sources?` | [*Maybe*](#maybe)<[*AssetSourceInput*](#assetsourceinput)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5758](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5758)

___

##### SetCategoryAssetTags

Ƭ **SetCategoryAssetTags**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `tags?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`tags?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5764](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5764)

___

##### SetCategoryCustomField

Ƭ **SetCategoryCustomField**: { `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5770](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5770)

___

##### SetCategoryCustomType

Ƭ **SetCategoryCustomType**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5775](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5775)

___

##### SetCategoryDescription

Ƭ **SetCategoryDescription**: { `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5782](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5782)

___

##### SetCategoryExternalId

Ƭ **SetCategoryExternalId**: { `externalId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5786](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5786)

___

##### SetCategoryKey

Ƭ **SetCategoryKey**: { `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5790](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5790)

___

##### SetCategoryMetaDescription

Ƭ **SetCategoryMetaDescription**: { `metaDescription?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`metaDescription?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5794](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5794)

___

##### SetCategoryMetaKeywords

Ƭ **SetCategoryMetaKeywords**: { `metaKeywords?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`metaKeywords?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5798](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5798)

___

##### SetCategoryMetaTitle

Ƭ **SetCategoryMetaTitle**: { `metaTitle?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`metaTitle?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5802](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5802)

___

##### SetCustomerCompanyName

Ƭ **SetCustomerCompanyName**: { `companyName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`companyName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5806](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5806)

___

##### SetCustomerCustomField

Ƭ **SetCustomerCustomField**: { `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5810](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5810)

___

##### SetCustomerCustomType

Ƭ **SetCustomerCustomType**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5815](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5815)

___

##### SetCustomerDateOfBirth

Ƭ **SetCustomerDateOfBirth**: { `dateOfBirth?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`dateOfBirth?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Date*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5822](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5822)

___

##### SetCustomerDefaultBillingAddress

Ƭ **SetCustomerDefaultBillingAddress**: { `addressId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addressId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5826](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5826)

___

##### SetCustomerDefaultShippingAddress

Ƭ **SetCustomerDefaultShippingAddress**: { `addressId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addressId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5830](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5830)

___

##### SetCustomerExternalId

Ƭ **SetCustomerExternalId**: { `externalId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5834](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5834)

___

##### SetCustomerFirstName

Ƭ **SetCustomerFirstName**: { `firstName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`firstName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5838](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5838)

___

##### SetCustomerGroup

Ƭ **SetCustomerGroup**: { `customerGroup?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customerGroup?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5842](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5842)

___

##### SetCustomerGroupCustomField

Ƭ **SetCustomerGroupCustomField**: { `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5846](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5846)

___

##### SetCustomerGroupCustomType

Ƭ **SetCustomerGroupCustomType**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5851](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5851)

___

##### SetCustomerGroupKey

Ƭ **SetCustomerGroupKey**: { `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5858](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5858)

___

##### SetCustomerKey

Ƭ **SetCustomerKey**: { `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5862](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5862)

___

##### SetCustomerLastName

Ƭ **SetCustomerLastName**: { `lastName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`lastName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5866](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5866)

___

##### SetCustomerLocale

Ƭ **SetCustomerLocale**: { `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5870](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5870)

___

##### SetCustomerMiddleName

Ƭ **SetCustomerMiddleName**: { `middleName?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`middleName?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5874](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5874)

___

##### SetCustomerNumber

Ƭ **SetCustomerNumber**: { `customerNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customerNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5878](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5878)

___

##### SetCustomerSalutation

Ƭ **SetCustomerSalutation**: { `salutation?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`salutation?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5882](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5882)

___

##### SetCustomerStores

Ƭ **SetCustomerStores**: { `stores`: [*ResourceIdentifierInput*](#resourceidentifierinput)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`stores` | [*ResourceIdentifierInput*](#resourceidentifierinput)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5886](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5886)

___

##### SetCustomerTitle

Ƭ **SetCustomerTitle**: { `title?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`title?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5890](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5890)

___

##### SetCustomerVatId

Ƭ **SetCustomerVatId**: { `vatId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`vatId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5894](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5894)

___

##### SetDiscountCodeCartPredicate

Ƭ **SetDiscountCodeCartPredicate**: { `cartPredicate?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`cartPredicate?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5898](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5898)

___

##### SetDiscountCodeCustomField

Ƭ **SetDiscountCodeCustomField**: { `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5902](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5902)

___

##### SetDiscountCodeCustomType

Ƭ **SetDiscountCodeCustomType**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5907](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5907)

___

##### SetDiscountCodeDescription

Ƭ **SetDiscountCodeDescription**: { `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5914](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5914)

___

##### SetDiscountCodeMaxApplications

Ƭ **SetDiscountCodeMaxApplications**: { `maxApplications?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`maxApplications?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5918](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5918)

___

##### SetDiscountCodeMaxApplicationsPerCustomer

Ƭ **SetDiscountCodeMaxApplicationsPerCustomer**: { `maxApplicationsPerCustomer?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`maxApplicationsPerCustomer?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Long*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5922](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5922)

___

##### SetDiscountCodeName

Ƭ **SetDiscountCodeName**: { `name?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5926](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5926)

___

##### SetDiscountCodeValidFrom

Ƭ **SetDiscountCodeValidFrom**: { `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`validFrom?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5930](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5930)

___

##### SetDiscountCodeValidFromAndUntil

Ƭ **SetDiscountCodeValidFromAndUntil**: { `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`validFrom?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5934](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5934)

___

##### SetDiscountCodeValidUntil

Ƭ **SetDiscountCodeValidUntil**: { `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`validUntil?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5939](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5939)

___

##### SetInputTip

Ƭ **SetInputTip**: { `attributeName`: [*Scalars*](#scalars)[*String*] ; `inputTip?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`attributeName` | [*Scalars*](#scalars)[*String*] |
`inputTip?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5943](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5943)

___

##### SetInventoryEntryCustomField

Ƭ **SetInventoryEntryCustomField**: { `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5948](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5948)

___

##### SetInventoryEntryCustomType

Ƭ **SetInventoryEntryCustomType**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5953](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5953)

___

##### SetInventoryEntryExpectedDelivery

Ƭ **SetInventoryEntryExpectedDelivery**: { `expectedDelivery?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`expectedDelivery?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5960](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5960)

___

##### SetInventoryEntryRestockableInDays

Ƭ **SetInventoryEntryRestockableInDays**: { `restockableInDays?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`restockableInDays?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5964](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5964)

___

##### SetInventoryEntrySupplyChannel

Ƭ **SetInventoryEntrySupplyChannel**: { `supplyChannel?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`supplyChannel?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5968](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5968)

___

##### SetKey

Ƭ **SetKey**: { `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5972](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5972)

___

##### SetMyCartShippingMethod

Ƭ **SetMyCartShippingMethod**: { `shippingMethod?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`shippingMethod?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5976](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5976)

___

##### SetOrderBillingAddress

Ƭ **SetOrderBillingAddress**: { `address?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`address?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5980](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5980)

___

##### SetOrderCustomField

Ƭ **SetOrderCustomField**: { `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5992](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5992)

___

##### SetOrderCustomLineItemCustomField

Ƭ **SetOrderCustomLineItemCustomField**: { `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5997](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5997)

___

##### SetOrderCustomLineItemCustomType

Ƭ **SetOrderCustomLineItemCustomType**: { `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6003](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6003)

___

##### SetOrderCustomLineItemShippingDetails

Ƭ **SetOrderCustomLineItemShippingDetails**: { `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `shippingDetails?`: [*Maybe*](#maybe)<[*ItemShippingDetailsDraftType*](#itemshippingdetailsdrafttype)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`shippingDetails?` | [*Maybe*](#maybe)<[*ItemShippingDetailsDraftType*](#itemshippingdetailsdrafttype)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6011](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6011)

___

##### SetOrderCustomType

Ƭ **SetOrderCustomType**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6016](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6016)

___

##### SetOrderCustomerEmail

Ƭ **SetOrderCustomerEmail**: { `email?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`email?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5984](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5984)

___

##### SetOrderCustomerId

Ƭ **SetOrderCustomerId**: { `customerId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customerId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:5988](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L5988)

___

##### SetOrderDeliveryAddress

Ƭ **SetOrderDeliveryAddress**: { `address?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> ; `deliveryId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`address?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |
`deliveryId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6023](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6023)

___

##### SetOrderDeliveryItems

Ƭ **SetOrderDeliveryItems**: { `deliveryId`: [*Scalars*](#scalars)[*String*] ; `items`: [*DeliveryItemDraftType*](#deliveryitemdrafttype)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`deliveryId` | [*Scalars*](#scalars)[*String*] |
`items` | [*DeliveryItemDraftType*](#deliveryitemdrafttype)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6028](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6028)

___

##### SetOrderLineItemCustomField

Ƭ **SetOrderLineItemCustomField**: { `lineItemId`: [*Scalars*](#scalars)[*String*] ; `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6033](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6033)

___

##### SetOrderLineItemCustomType

Ƭ **SetOrderLineItemCustomType**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `lineItemId`: [*Scalars*](#scalars)[*String*] ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6039](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6039)

___

##### SetOrderLineItemShippingDetails

Ƭ **SetOrderLineItemShippingDetails**: { `lineItemId`: [*Scalars*](#scalars)[*String*] ; `shippingDetails?`: [*Maybe*](#maybe)<[*ItemShippingDetailsDraftType*](#itemshippingdetailsdrafttype)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`shippingDetails?` | [*Maybe*](#maybe)<[*ItemShippingDetailsDraftType*](#itemshippingdetailsdrafttype)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6047](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6047)

___

##### SetOrderLocale

Ƭ **SetOrderLocale**: { `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6052](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6052)

___

##### SetOrderNumber

Ƭ **SetOrderNumber**: { `orderNumber?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`orderNumber?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6056](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6056)

___

##### SetOrderParcelItems

Ƭ **SetOrderParcelItems**: { `items`: [*DeliveryItemDraftType*](#deliveryitemdrafttype)[] ; `parcelId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`items` | [*DeliveryItemDraftType*](#deliveryitemdrafttype)[] |
`parcelId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6060](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6060)

___

##### SetOrderParcelMeasurements

Ƭ **SetOrderParcelMeasurements**: { `measurements?`: [*Maybe*](#maybe)<[*ParcelMeasurementsDraftType*](#parcelmeasurementsdrafttype)\> ; `parcelId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`measurements?` | [*Maybe*](#maybe)<[*ParcelMeasurementsDraftType*](#parcelmeasurementsdrafttype)\> |
`parcelId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6065](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6065)

___

##### SetOrderParcelTrackingData

Ƭ **SetOrderParcelTrackingData**: { `parcelId`: [*Scalars*](#scalars)[*String*] ; `trackingData?`: [*Maybe*](#maybe)<[*TrackingDataDraftType*](#trackingdatadrafttype)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`parcelId` | [*Scalars*](#scalars)[*String*] |
`trackingData?` | [*Maybe*](#maybe)<[*TrackingDataDraftType*](#trackingdatadrafttype)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6070](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6070)

___

##### SetOrderReturnPaymentState

Ƭ **SetOrderReturnPaymentState**: { `paymentState`: [*ReturnPaymentState*](#enumstypes_graphqlreturnpaymentstatemd) ; `returnItemId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`paymentState` | [*ReturnPaymentState*](#enumstypes_graphqlreturnpaymentstatemd) |
`returnItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6075](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6075)

___

##### SetOrderReturnShipmentState

Ƭ **SetOrderReturnShipmentState**: { `returnItemId`: [*Scalars*](#scalars)[*String*] ; `shipmentState`: [*ReturnShipmentState*](#enumstypes_graphqlreturnshipmentstatemd)  }

###### Type declaration:

Name | Type |
------ | ------ |
`returnItemId` | [*Scalars*](#scalars)[*String*] |
`shipmentState` | [*ReturnShipmentState*](#enumstypes_graphqlreturnshipmentstatemd) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6080](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6080)

___

##### SetOrderShippingAddress

Ƭ **SetOrderShippingAddress**: { `address?`: [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`address?` | [*Maybe*](#maybe)<[*AddressInput*](#addressinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6085](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6085)

___

##### SetProductAssetCustomField

Ƭ **SetProductAssetCustomField**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `name`: [*Scalars*](#scalars)[*String*] ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`name` | [*Scalars*](#scalars)[*String*] |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6089](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6089)

___

##### SetProductAssetCustomType

Ƭ **SetProductAssetCustomType**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6100](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6100)

___

##### SetProductAssetDescription

Ƭ **SetProductAssetDescription**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6113](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6113)

___

##### SetProductAssetKey

Ƭ **SetProductAssetKey**: { `assetId`: [*Scalars*](#scalars)[*String*] ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId` | [*Scalars*](#scalars)[*String*] |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6123](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6123)

___

##### SetProductAssetSources

Ƭ **SetProductAssetSources**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `sources?`: [*Maybe*](#maybe)<[*AssetSourceInput*](#assetsourceinput)[]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sources?` | [*Maybe*](#maybe)<[*AssetSourceInput*](#assetsourceinput)[]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6132](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6132)

___

##### SetProductAssetTags

Ƭ **SetProductAssetTags**: { `assetId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `assetKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `tags?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`assetId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`assetKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`tags?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6142](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6142)

___

##### SetProductAttribute

Ƭ **SetProductAttribute**: { `name`: [*Scalars*](#scalars)[*String*] ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6152](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6152)

___

##### SetProductAttributeInAllVariants

Ƭ **SetProductAttributeInAllVariants**: { `name`: [*Scalars*](#scalars)[*String*] ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6160](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6160)

___

##### SetProductCategoryOrderHint

Ƭ **SetProductCategoryOrderHint**: { `categoryId`: [*Scalars*](#scalars)[*String*] ; `orderHint?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`categoryId` | [*Scalars*](#scalars)[*String*] |
`orderHint?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6166](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6166)

___

##### SetProductDescription

Ƭ **SetProductDescription**: { `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6172](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6172)

___

##### SetProductDiscountDescription

Ƭ **SetProductDiscountDescription**: { `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6177](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6177)

___

##### SetProductDiscountKey

Ƭ **SetProductDiscountKey**: { `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6188](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6188)

___

##### SetProductDiscountValidFrom

Ƭ **SetProductDiscountValidFrom**: { `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`validFrom?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6192](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6192)

___

##### SetProductDiscountValidFromAndUntil

Ƭ **SetProductDiscountValidFromAndUntil**: { `validFrom?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`validFrom?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`validUntil?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6196](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6196)

___

##### SetProductDiscountValidUntil

Ƭ **SetProductDiscountValidUntil**: { `validUntil?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`validUntil?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6201](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6201)

___

##### SetProductDiscountedPrice

Ƭ **SetProductDiscountedPrice**: { `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `discounted?`: [*Maybe*](#maybe)<[*DiscountedProductPriceValueInput*](#discountedproductpricevalueinput)\> ; `priceId`: [*Scalars*](#scalars)[*String*] ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`discounted?` | [*Maybe*](#maybe)<[*DiscountedProductPriceValueInput*](#discountedproductpricevalueinput)\> |
`priceId` | [*Scalars*](#scalars)[*String*] |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6181](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6181)

___

##### SetProductImageLabel

Ƭ **SetProductImageLabel**: { `imageUrl`: [*Scalars*](#scalars)[*String*] ; `label?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`imageUrl` | [*Scalars*](#scalars)[*String*] |
`label?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6205](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6205)

___

##### SetProductKey

Ƭ **SetProductKey**: { `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6213](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6213)

___

##### SetProductMetaAttributes

Ƭ **SetProductMetaAttributes**: { `metaDescription?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `metaKeywords?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `metaTitle?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`metaDescription?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`metaKeywords?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`metaTitle?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6217](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6217)

___

##### SetProductMetaDescription

Ƭ **SetProductMetaDescription**: { `metaDescription?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`metaDescription?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6224](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6224)

___

##### SetProductMetaKeywords

Ƭ **SetProductMetaKeywords**: { `metaKeywords?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`metaKeywords?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6229](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6229)

___

##### SetProductMetaTitle

Ƭ **SetProductMetaTitle**: { `metaTitle?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`metaTitle?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6234](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6234)

___

##### SetProductPriceCustomField

Ƭ **SetProductPriceCustomField**: { `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `name`: [*Scalars*](#scalars)[*String*] ; `priceId`: [*Scalars*](#scalars)[*String*] ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`name` | [*Scalars*](#scalars)[*String*] |
`priceId` | [*Scalars*](#scalars)[*String*] |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6239](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6239)

___

##### SetProductPriceCustomType

Ƭ **SetProductPriceCustomType**: { `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `priceId`: [*Scalars*](#scalars)[*String*] ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`priceId` | [*Scalars*](#scalars)[*String*] |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6247](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6247)

___

##### SetProductPrices

Ƭ **SetProductPrices**: { `catalog?`: [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> ; `prices`: [*ProductPriceDataInput*](#productpricedatainput)[] ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`catalog?` | [*Maybe*](#maybe)<[*ReferenceInput*](#referenceinput)\> |
`prices` | [*ProductPriceDataInput*](#productpricedatainput)[] |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6257](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6257)

___

##### SetProductSku

Ƭ **SetProductSku**: { `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6265](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6265)

___

##### SetProductTaxCategory

Ƭ **SetProductTaxCategory**: { `taxCategory?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`taxCategory?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6271](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6271)

___

##### SetProductVariantKey

Ƭ **SetProductVariantKey**: { `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6275](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6275)

___

##### SetProjectSettingsExternalOAuth

Ƭ **SetProjectSettingsExternalOAuth**: { `externalOAuth?`: [*Maybe*](#maybe)<[*ExternalOAuthDraft*](#externaloauthdraft)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`externalOAuth?` | [*Maybe*](#maybe)<[*ExternalOAuthDraft*](#externaloauthdraft)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6282](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6282)

___

##### SetProjectSettingsShippingRateInputType

Ƭ **SetProjectSettingsShippingRateInputType**: { `shippingRateInputType?`: [*Maybe*](#maybe)<[*ShippingRateInputTypeInput*](#shippingrateinputtypeinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`shippingRateInputType?` | [*Maybe*](#maybe)<[*ShippingRateInputTypeInput*](#shippingrateinputtypeinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6286](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6286)

___

##### SetSearchKeywords

Ƭ **SetSearchKeywords**: { `searchKeywords`: [*SearchKeywordInput*](#searchkeywordinput)[] ; `staged?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`searchKeywords` | [*SearchKeywordInput*](#searchkeywordinput)[] |
`staged?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6290](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6290)

___

##### SetShippingMethodDescription

Ƭ **SetShippingMethodDescription**: { `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6295](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6295)

___

##### SetShippingMethodKey

Ƭ **SetShippingMethodKey**: { `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6299](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6299)

___

##### SetShippingMethodPredicate

Ƭ **SetShippingMethodPredicate**: { `predicate?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`predicate?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6303](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6303)

___

##### SetShoppingListAnonymousId

Ƭ **SetShoppingListAnonymousId**: { `anonymousId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`anonymousId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6307](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6307)

___

##### SetShoppingListCustomField

Ƭ **SetShoppingListCustomField**: { `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6315](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6315)

___

##### SetShoppingListCustomType

Ƭ **SetShoppingListCustomType**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6320](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6320)

___

##### SetShoppingListCustomer

Ƭ **SetShoppingListCustomer**: { `customer?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`customer?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6311](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6311)

___

##### SetShoppingListDeleteDaysAfterLastModification

Ƭ **SetShoppingListDeleteDaysAfterLastModification**: { `deleteDaysAfterLastModification?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`deleteDaysAfterLastModification?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6327](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6327)

___

##### SetShoppingListDescription

Ƭ **SetShoppingListDescription**: { `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6331](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6331)

___

##### SetShoppingListKey

Ƭ **SetShoppingListKey**: { `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6335](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6335)

___

##### SetShoppingListLineItemCustomField

Ƭ **SetShoppingListLineItemCustomField**: { `lineItemId`: [*Scalars*](#scalars)[*String*] ; `name`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`name` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6339](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6339)

___

##### SetShoppingListLineItemCustomType

Ƭ **SetShoppingListLineItemCustomType**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `lineItemId`: [*Scalars*](#scalars)[*String*] ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6345](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6345)

___

##### SetShoppingListSlug

Ƭ **SetShoppingListSlug**: { `slug?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`slug?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6353](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6353)

___

##### SetShoppingListTextLineItemCustomField

Ƭ **SetShoppingListTextLineItemCustomField**: { `name`: [*Scalars*](#scalars)[*String*] ; `textLineItemId`: [*Scalars*](#scalars)[*String*] ; `value?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |
`textLineItemId` | [*Scalars*](#scalars)[*String*] |
`value?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6357](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6357)

___

##### SetShoppingListTextLineItemCustomType

Ƭ **SetShoppingListTextLineItemCustomType**: { `fields?`: [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> ; `textLineItemId`: [*Scalars*](#scalars)[*String*] ; `type?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `typeId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `typeKey?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`fields?` | [*Maybe*](#maybe)<[*CustomFieldInput*](#customfieldinput)[]\> |
`textLineItemId` | [*Scalars*](#scalars)[*String*] |
`type?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`typeId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`typeKey?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6363](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6363)

___

##### SetShoppingListTextLineItemDescription

Ƭ **SetShoppingListTextLineItemDescription**: { `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `textLineItemId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`textLineItemId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6371](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6371)

___

##### SetStoreLanguages

Ƭ **SetStoreLanguages**: { `languages?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`languages?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6376](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6376)

___

##### SetStoreName

Ƭ **SetStoreName**: { `name?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`name?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6380](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6380)

___

##### SetTaxCategoryKey

Ƭ **SetTaxCategoryKey**: { `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6384](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6384)

___

##### SetType

Ƭ **SetType**: [*FieldType*](#fieldtype) & { `__typename?`: *SetType* ; `elementType`: [*FieldType*](#fieldtype) ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6388](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6388)

___

##### SetZoneDescription

Ƭ **SetZoneDescription**: { `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6394](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6394)

___

##### SetZoneKey

Ƭ **SetZoneKey**: { `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6398](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6398)

___

##### ShippingInfo

Ƭ **ShippingInfo**: { `__typename?`: *ShippingInfo* ; `deliveries`: [*Delivery*](#delivery)[] ; `discountedPrice?`: [*Maybe*](#maybe)<[*DiscountedLineItemPrice*](#discountedlineitemprice)\> ; `price`: [*Money*](#money) ; `shippingMethod?`: [*Maybe*](#maybe)<[*ShippingMethod*](#shippingmethod)\> ; `shippingMethodName`: [*Scalars*](#scalars)[*String*] ; `shippingMethodRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `shippingMethodState`: [*ShippingMethodState*](#enumstypes_graphqlshippingmethodstatemd) ; `shippingRate`: [*ShippingRate*](#shippingrate) ; `taxCategory?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `taxRate?`: [*Maybe*](#maybe)<[*TaxRate*](#taxrate)\> ; `taxedPrice?`: [*Maybe*](#maybe)<[*TaxedItemPrice*](#taxeditemprice)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ShippingInfo* |
`deliveries` | [*Delivery*](#delivery)[] |
`discountedPrice?` | [*Maybe*](#maybe)<[*DiscountedLineItemPrice*](#discountedlineitemprice)\> |
`price` | [*Money*](#money) |
`shippingMethod?` | [*Maybe*](#maybe)<[*ShippingMethod*](#shippingmethod)\> |
`shippingMethodName` | [*Scalars*](#scalars)[*String*] |
`shippingMethodRef?` | [*Maybe*](#maybe)<[*Reference*](#reference)\> |
`shippingMethodState` | [*ShippingMethodState*](#enumstypes_graphqlshippingmethodstatemd) |
`shippingRate` | [*ShippingRate*](#shippingrate) |
`taxCategory?` | [*Maybe*](#maybe)<[*Reference*](#reference)\> |
`taxRate?` | [*Maybe*](#maybe)<[*TaxRate*](#taxrate)\> |
`taxedPrice?` | [*Maybe*](#maybe)<[*TaxedItemPrice*](#taxeditemprice)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6411](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6411)

___

##### ShippingMethod

Ƭ **ShippingMethod**: [*Versioned*](#versioned) & { `__typename?`: *ShippingMethod* ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `isDefault`: [*Scalars*](#scalars)[*Boolean*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `name`: [*Scalars*](#scalars)[*String*] ; `predicate?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `taxCategory?`: [*Maybe*](#maybe)<[*TaxCategory*](#taxcategory)\> ; `taxCategoryRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `version`: [*Scalars*](#scalars)[*Long*] ; `zoneRates`: [*ZoneRate*](#zonerate)[]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6426](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6426)

___

##### ShippingMethodDraft

Ƭ **ShippingMethodDraft**: { `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `isDefault`: [*Scalars*](#scalars)[*Boolean*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name`: [*Scalars*](#scalars)[*String*] ; `predicate?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `taxCategory`: [*ResourceIdentifierInput*](#resourceidentifierinput) ; `zoneRates?`: [*Maybe*](#maybe)<[*ZoneRateDraft*](#zoneratedraft)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`isDefault` | [*Scalars*](#scalars)[*Boolean*] |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*Scalars*](#scalars)[*String*] |
`predicate?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`taxCategory` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`zoneRates?` | [*Maybe*](#maybe)<[*ZoneRateDraft*](#zoneratedraft)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6444](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6444)

___

##### ShippingMethodQueryResult

Ƭ **ShippingMethodQueryResult**: { `__typename?`: *ShippingMethodQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*ShippingMethod*](#shippingmethod)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ShippingMethodQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*ShippingMethod*](#shippingmethod)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6454](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6454)

___

##### ShippingMethodUpdateAction

Ƭ **ShippingMethodUpdateAction**: { `addShippingRate?`: [*Maybe*](#maybe)<[*AddShippingMethodShippingRate*](#addshippingmethodshippingrate)\> ; `addZone?`: [*Maybe*](#maybe)<[*AddShippingMethodZone*](#addshippingmethodzone)\> ; `changeIsDefault?`: [*Maybe*](#maybe)<[*ChangeShippingMethodIsDefault*](#changeshippingmethodisdefault)\> ; `changeName?`: [*Maybe*](#maybe)<[*ChangeShippingMethodName*](#changeshippingmethodname)\> ; `changeTaxCategory?`: [*Maybe*](#maybe)<[*ChangeShippingMethodTaxCategory*](#changeshippingmethodtaxcategory)\> ; `removeShippingRate?`: [*Maybe*](#maybe)<[*RemoveShippingMethodShippingRate*](#removeshippingmethodshippingrate)\> ; `removeZone?`: [*Maybe*](#maybe)<[*RemoveShippingMethodZone*](#removeshippingmethodzone)\> ; `setDescription?`: [*Maybe*](#maybe)<[*SetShippingMethodDescription*](#setshippingmethoddescription)\> ; `setKey?`: [*Maybe*](#maybe)<[*SetShippingMethodKey*](#setshippingmethodkey)\> ; `setPredicate?`: [*Maybe*](#maybe)<[*SetShippingMethodPredicate*](#setshippingmethodpredicate)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addShippingRate?` | [*Maybe*](#maybe)<[*AddShippingMethodShippingRate*](#addshippingmethodshippingrate)\> |
`addZone?` | [*Maybe*](#maybe)<[*AddShippingMethodZone*](#addshippingmethodzone)\> |
`changeIsDefault?` | [*Maybe*](#maybe)<[*ChangeShippingMethodIsDefault*](#changeshippingmethodisdefault)\> |
`changeName?` | [*Maybe*](#maybe)<[*ChangeShippingMethodName*](#changeshippingmethodname)\> |
`changeTaxCategory?` | [*Maybe*](#maybe)<[*ChangeShippingMethodTaxCategory*](#changeshippingmethodtaxcategory)\> |
`removeShippingRate?` | [*Maybe*](#maybe)<[*RemoveShippingMethodShippingRate*](#removeshippingmethodshippingrate)\> |
`removeZone?` | [*Maybe*](#maybe)<[*RemoveShippingMethodZone*](#removeshippingmethodzone)\> |
`setDescription?` | [*Maybe*](#maybe)<[*SetShippingMethodDescription*](#setshippingmethoddescription)\> |
`setKey?` | [*Maybe*](#maybe)<[*SetShippingMethodKey*](#setshippingmethodkey)\> |
`setPredicate?` | [*Maybe*](#maybe)<[*SetShippingMethodPredicate*](#setshippingmethodpredicate)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6481](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6481)

___

##### ShippingMethodsByCartInterface

Ƭ **ShippingMethodsByCartInterface**: { `shippingMethodsByCart`: [*ShippingMethod*](#shippingmethod)[]  }

A field to retrieve available shipping methods for a cart.

###### Type declaration:

Name | Type |
------ | ------ |
`shippingMethodsByCart` | [*ShippingMethod*](#shippingmethod)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6463](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6463)

___

##### ShippingMethodsByCartInterfaceShippingMethodsByCartArgs

Ƭ **ShippingMethodsByCartInterfaceShippingMethodsByCartArgs**: { `id`: [*Scalars*](#scalars)[*String*]  }

A field to retrieve available shipping methods for a cart.

###### Type declaration:

Name | Type |
------ | ------ |
`id` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6468](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6468)

___

##### ShippingRate

Ƭ **ShippingRate**: { `__typename?`: *ShippingRate* ; `freeAbove?`: [*Maybe*](#maybe)<[*Money*](#money)\> ; `isMatching?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `price`: [*Money*](#money) ; `tiers`: [*ShippingRatePriceTier*](#shippingratepricetier)[]  }

Shipping Rate

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ShippingRate* |
`freeAbove?` | [*Maybe*](#maybe)<[*Money*](#money)\> |
`isMatching?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`price` | [*Money*](#money) |
`tiers` | [*ShippingRatePriceTier*](#shippingratepricetier)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6495](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6495)

___

##### ShippingRateCartClassificationPriceTier

Ƭ **ShippingRateCartClassificationPriceTier**: [*ShippingRatePriceTier*](#shippingratepricetier) & { `__typename?`: *ShippingRateCartClassificationPriceTier* ; `isMatching?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `price`: [*Money*](#money) ; `type`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6503](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6503)

___

##### ShippingRateCartScorePriceTier

Ƭ **ShippingRateCartScorePriceTier**: [*ShippingRatePriceTier*](#shippingratepricetier) & { `__typename?`: *ShippingRateCartScorePriceTier* ; `isMatching?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `price?`: [*Maybe*](#maybe)<[*Money*](#money)\> ; `priceFunction?`: [*Maybe*](#maybe)<[*PriceFunction*](#pricefunction)\> ; `score`: [*Scalars*](#scalars)[*Int*] ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6511](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6511)

___

##### ShippingRateCartValuePriceTier

Ƭ **ShippingRateCartValuePriceTier**: [*ShippingRatePriceTier*](#shippingratepricetier) & { `__typename?`: *ShippingRateCartValuePriceTier* ; `isMatching?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `minimumCentAmount`: [*Scalars*](#scalars)[*Int*] ; `price`: [*Money*](#money) ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6520](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6520)

___

##### ShippingRateDraft

Ƭ **ShippingRateDraft**: { `freeAbove?`: [*Maybe*](#maybe)<[*MoneyDraft*](#moneydraft)\> ; `price`: [*MoneyDraft*](#moneydraft) ; `tiers?`: [*Maybe*](#maybe)<[*ShippingRatePriceTierDraft*](#shippingratepricetierdraft)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`freeAbove?` | [*Maybe*](#maybe)<[*MoneyDraft*](#moneydraft)\> |
`price` | [*MoneyDraft*](#moneydraft) |
`tiers?` | [*Maybe*](#maybe)<[*ShippingRatePriceTierDraft*](#shippingratepricetierdraft)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6528](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6528)

___

##### ShippingRateInput

Ƭ **ShippingRateInput**: { `type`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6534](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6534)

___

##### ShippingRateInputDraft

Ƭ **ShippingRateInputDraft**: { `Classification?`: [*Maybe*](#maybe)<[*ClassificationShippingRateInputDraft*](#classificationshippingrateinputdraft)\> ; `Score?`: [*Maybe*](#maybe)<[*ScoreShippingRateInputDraft*](#scoreshippingrateinputdraft)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`Classification?` | [*Maybe*](#maybe)<[*ClassificationShippingRateInputDraft*](#classificationshippingrateinputdraft)\> |
`Score?` | [*Maybe*](#maybe)<[*ScoreShippingRateInputDraft*](#scoreshippingrateinputdraft)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6538](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6538)

___

##### ShippingRateInputLocalizedEnumValue

Ƭ **ShippingRateInputLocalizedEnumValue**: { `__typename?`: *ShippingRateInputLocalizedEnumValue* ; `key`: [*Scalars*](#scalars)[*String*] ; `label?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `labelAllLocales`: [*LocalizedString*](#localizedstring)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ShippingRateInputLocalizedEnumValue* |
`key` | [*Scalars*](#scalars)[*String*] |
`label?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`labelAllLocales` | [*LocalizedString*](#localizedstring)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6543](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6543)

___

##### ShippingRateInputLocalizedEnumValueLabelArgs

Ƭ **ShippingRateInputLocalizedEnumValueLabelArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6550](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6550)

___

##### ShippingRateInputType

Ƭ **ShippingRateInputType**: { `type`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6555](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6555)

___

##### ShippingRateInputTypeInput

Ƭ **ShippingRateInputTypeInput**: { `CartClassification?`: [*Maybe*](#maybe)<[*CartClassificationInput*](#cartclassificationinput)\> ; `CartScore?`: [*Maybe*](#maybe)<[*CartScoreInput*](#cartscoreinput)\> ; `CartValue?`: [*Maybe*](#maybe)<[*CartValueInput*](#cartvalueinput)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`CartClassification?` | [*Maybe*](#maybe)<[*CartClassificationInput*](#cartclassificationinput)\> |
`CartScore?` | [*Maybe*](#maybe)<[*CartScoreInput*](#cartscoreinput)\> |
`CartValue?` | [*Maybe*](#maybe)<[*CartValueInput*](#cartvalueinput)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6559](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6559)

___

##### ShippingRatePriceTier

Ƭ **ShippingRatePriceTier**: { `type`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`type` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6565](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6565)

___

##### ShippingRatePriceTierCartClassificationDraft

Ƭ **ShippingRatePriceTierCartClassificationDraft**: { `price`: [*MoneyDraft*](#moneydraft) ; `value`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`price` | [*MoneyDraft*](#moneydraft) |
`value` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6569](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6569)

___

##### ShippingRatePriceTierCartScoreDraft

Ƭ **ShippingRatePriceTierCartScoreDraft**: { `price?`: [*Maybe*](#maybe)<[*MoneyDraft*](#moneydraft)\> ; `priceFunction?`: [*Maybe*](#maybe)<[*PriceFunctionDraft*](#pricefunctiondraft)\> ; `score`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`price?` | [*Maybe*](#maybe)<[*MoneyDraft*](#moneydraft)\> |
`priceFunction?` | [*Maybe*](#maybe)<[*PriceFunctionDraft*](#pricefunctiondraft)\> |
`score` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6574](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6574)

___

##### ShippingRatePriceTierCartValueDraft

Ƭ **ShippingRatePriceTierCartValueDraft**: { `minimumCentAmount`: [*Scalars*](#scalars)[*Int*] ; `price`: [*MoneyDraft*](#moneydraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`minimumCentAmount` | [*Scalars*](#scalars)[*Int*] |
`price` | [*MoneyDraft*](#moneydraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6580](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6580)

___

##### ShippingRatePriceTierDraft

Ƭ **ShippingRatePriceTierDraft**: { `CartClassification?`: [*Maybe*](#maybe)<[*ShippingRatePriceTierCartClassificationDraft*](#shippingratepricetiercartclassificationdraft)\> ; `CartScore?`: [*Maybe*](#maybe)<[*ShippingRatePriceTierCartScoreDraft*](#shippingratepricetiercartscoredraft)\> ; `CartValue?`: [*Maybe*](#maybe)<[*ShippingRatePriceTierCartValueDraft*](#shippingratepricetiercartvaluedraft)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`CartClassification?` | [*Maybe*](#maybe)<[*ShippingRatePriceTierCartClassificationDraft*](#shippingratepricetiercartclassificationdraft)\> |
`CartScore?` | [*Maybe*](#maybe)<[*ShippingRatePriceTierCartScoreDraft*](#shippingratepricetiercartscoredraft)\> |
`CartValue?` | [*Maybe*](#maybe)<[*ShippingRatePriceTierCartValueDraft*](#shippingratepricetiercartvaluedraft)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6585](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6585)

___

##### ShippingTarget

Ƭ **ShippingTarget**: [*CartDiscountTarget*](#cartdiscounttarget) & { `__typename?`: *ShippingTarget* ; `type`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6591](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6591)

___

##### ShippingTargetDraft

Ƭ **ShippingTargetDraft**: { `addressKey`: [*Scalars*](#scalars)[*String*] ; `quantity`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`addressKey` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6596](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6596)

___

##### ShippingTargetDraftType

Ƭ **ShippingTargetDraftType**: { `addressKey`: [*Scalars*](#scalars)[*String*] ; `quantity`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`addressKey` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6601](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6601)

___

##### ShippingTargetInput

Ƭ **ShippingTargetInput**: { `dummy?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`dummy?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6606](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6606)

___

##### ShoppingList

Ƭ **ShoppingList**: [*Versioned*](#versioned) & { `__typename?`: *ShoppingList* ; `anonymousId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `customer?`: [*Maybe*](#maybe)<[*Customer*](#customer)\> ; `customerRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\> ; `deleteDaysAfterLastModification?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `descriptionAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `lineItems`: [*ShoppingListLineItem*](#shoppinglistlineitem)[] ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales`: [*LocalizedString*](#localizedstring)[] ; `slug?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `slugAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `textLineItems`: [*TextLineItem*](#textlineitem)[] ; `version`: [*Scalars*](#scalars)[*Long*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6610](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6610)

___

##### ShoppingListDescriptionArgs

Ƭ **ShoppingListDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6639](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6639)

___

##### ShoppingListDraft

Ƭ **ShoppingListDraft**: { `anonymousId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `customer?`: [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> ; `deleteDaysAfterLastModification?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lineItems?`: [*Maybe*](#maybe)<[*ShoppingListLineItemDraft*](#shoppinglistlineitemdraft)[]\> ; `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `slug?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `textLineItems?`: [*Maybe*](#maybe)<[*TextLineItemDraft*](#textlineitemdraft)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`anonymousId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`customer?` | [*Maybe*](#maybe)<[*ResourceIdentifierInput*](#resourceidentifierinput)\> |
`deleteDaysAfterLastModification?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`lineItems?` | [*Maybe*](#maybe)<[*ShoppingListLineItemDraft*](#shoppinglistlineitemdraft)[]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`slug?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`textLineItems?` | [*Maybe*](#maybe)<[*TextLineItemDraft*](#textlineitemdraft)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6649](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6649)

___

##### ShoppingListLineItem

Ƭ **ShoppingListLineItem**: { `__typename?`: *ShoppingListLineItem* ; `addedAt`: [*Scalars*](#scalars)[*DateTime*] ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `deactivatedAt?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales`: [*LocalizedString*](#localizedstring)[] ; `productId`: [*Scalars*](#scalars)[*String*] ; `productSlug?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `productType`: [*ProductTypeDefinition*](#producttypedefinition) ; `productTypeRef`: [*Reference*](#reference) ; `quantity`: [*Scalars*](#scalars)[*Int*] ; `variant?`: [*Maybe*](#maybe)<[*ProductVariant*](#productvariant)\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ShoppingListLineItem* |
`addedAt` | [*Scalars*](#scalars)[*DateTime*] |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> |
`deactivatedAt?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`id` | [*Scalars*](#scalars)[*String*] |
`name?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] |
`productId` | [*Scalars*](#scalars)[*String*] |
`productSlug?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`productType` | [*ProductTypeDefinition*](#producttypedefinition) |
`productTypeRef` | [*Reference*](#reference) |
`quantity` | [*Scalars*](#scalars)[*Int*] |
`variant?` | [*Maybe*](#maybe)<[*ProductVariant*](#productvariant)\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6662](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6662)

___

##### ShoppingListLineItemDraft

Ƭ **ShoppingListLineItemDraft**: { `addedAt?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `productId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `quantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sku?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `variantId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addedAt?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`productId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`quantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sku?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`variantId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6689](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6689)

___

##### ShoppingListLineItemNameArgs

Ƭ **ShoppingListLineItemNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6679](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6679)

___

##### ShoppingListLineItemProductSlugArgs

Ƭ **ShoppingListLineItemProductSlugArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6684](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6684)

___

##### ShoppingListNameArgs

Ƭ **ShoppingListNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6634](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6634)

___

##### ShoppingListQueryInterface

Ƭ **ShoppingListQueryInterface**: { `shoppingList?`: [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> ; `shoppingLists`: [*ShoppingListQueryResult*](#shoppinglistqueryresult)  }

Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists.

###### Type declaration:

Name | Type |
------ | ------ |
`shoppingList?` | [*Maybe*](#maybe)<[*ShoppingList*](#shoppinglist)\> |
`shoppingLists` | [*ShoppingListQueryResult*](#shoppinglistqueryresult) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6699](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6699)

___

##### ShoppingListQueryInterfaceShoppingListArgs

Ƭ **ShoppingListQueryInterfaceShoppingListArgs**: { `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists.

###### Type declaration:

Name | Type |
------ | ------ |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6705](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6705)

___

##### ShoppingListQueryInterfaceShoppingListsArgs

Ƭ **ShoppingListQueryInterfaceShoppingListsArgs**: { `limit?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `offset?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> ; `sort?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `where?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists.

###### Type declaration:

Name | Type |
------ | ------ |
`limit?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`offset?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |
`sort?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`where?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6711](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6711)

___

##### ShoppingListQueryResult

Ƭ **ShoppingListQueryResult**: { `__typename?`: *ShoppingListQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*ShoppingList*](#shoppinglist)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ShoppingListQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*ShoppingList*](#shoppinglist)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6718](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6718)

___

##### ShoppingListSlugArgs

Ƭ **ShoppingListSlugArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6644](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6644)

___

##### ShoppingListUpdateAction

Ƭ **ShoppingListUpdateAction**: { `addLineItem?`: [*Maybe*](#maybe)<[*AddShoppingListLineItem*](#addshoppinglistlineitem)\> ; `addTextLineItem?`: [*Maybe*](#maybe)<[*AddShoppingListTextLineItem*](#addshoppinglisttextlineitem)\> ; `changeLineItemQuantity?`: [*Maybe*](#maybe)<[*ChangeShoppingListLineItemQuantity*](#changeshoppinglistlineitemquantity)\> ; `changeLineItemsOrder?`: [*Maybe*](#maybe)<[*ChangeShoppingListLineItemsOrder*](#changeshoppinglistlineitemsorder)\> ; `changeName?`: [*Maybe*](#maybe)<[*ChangeShoppingListName*](#changeshoppinglistname)\> ; `changeTextLineItemName?`: [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemName*](#changeshoppinglisttextlineitemname)\> ; `changeTextLineItemQuantity?`: [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemQuantity*](#changeshoppinglisttextlineitemquantity)\> ; `changeTextLineItemsOrder?`: [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemsOrder*](#changeshoppinglisttextlineitemsorder)\> ; `removeLineItem?`: [*Maybe*](#maybe)<[*RemoveShoppingListLineItem*](#removeshoppinglistlineitem)\> ; `removeTextLineItem?`: [*Maybe*](#maybe)<[*RemoveShoppingListTextLineItem*](#removeshoppinglisttextlineitem)\> ; `setAnonymousId?`: [*Maybe*](#maybe)<[*SetShoppingListAnonymousId*](#setshoppinglistanonymousid)\> ; `setCustomField?`: [*Maybe*](#maybe)<[*SetShoppingListCustomField*](#setshoppinglistcustomfield)\> ; `setCustomType?`: [*Maybe*](#maybe)<[*SetShoppingListCustomType*](#setshoppinglistcustomtype)\> ; `setCustomer?`: [*Maybe*](#maybe)<[*SetShoppingListCustomer*](#setshoppinglistcustomer)\> ; `setDeleteDaysAfterLastModification?`: [*Maybe*](#maybe)<[*SetShoppingListDeleteDaysAfterLastModification*](#setshoppinglistdeletedaysafterlastmodification)\> ; `setDescription?`: [*Maybe*](#maybe)<[*SetShoppingListDescription*](#setshoppinglistdescription)\> ; `setKey?`: [*Maybe*](#maybe)<[*SetShoppingListKey*](#setshoppinglistkey)\> ; `setLineItemCustomField?`: [*Maybe*](#maybe)<[*SetShoppingListLineItemCustomField*](#setshoppinglistlineitemcustomfield)\> ; `setLineItemCustomType?`: [*Maybe*](#maybe)<[*SetShoppingListLineItemCustomType*](#setshoppinglistlineitemcustomtype)\> ; `setSlug?`: [*Maybe*](#maybe)<[*SetShoppingListSlug*](#setshoppinglistslug)\> ; `setTextLineItemCustomField?`: [*Maybe*](#maybe)<[*SetShoppingListTextLineItemCustomField*](#setshoppinglisttextlineitemcustomfield)\> ; `setTextLineItemCustomType?`: [*Maybe*](#maybe)<[*SetShoppingListTextLineItemCustomType*](#setshoppinglisttextlineitemcustomtype)\> ; `setTextLineItemDescription?`: [*Maybe*](#maybe)<[*SetShoppingListTextLineItemDescription*](#setshoppinglisttextlineitemdescription)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addLineItem?` | [*Maybe*](#maybe)<[*AddShoppingListLineItem*](#addshoppinglistlineitem)\> |
`addTextLineItem?` | [*Maybe*](#maybe)<[*AddShoppingListTextLineItem*](#addshoppinglisttextlineitem)\> |
`changeLineItemQuantity?` | [*Maybe*](#maybe)<[*ChangeShoppingListLineItemQuantity*](#changeshoppinglistlineitemquantity)\> |
`changeLineItemsOrder?` | [*Maybe*](#maybe)<[*ChangeShoppingListLineItemsOrder*](#changeshoppinglistlineitemsorder)\> |
`changeName?` | [*Maybe*](#maybe)<[*ChangeShoppingListName*](#changeshoppinglistname)\> |
`changeTextLineItemName?` | [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemName*](#changeshoppinglisttextlineitemname)\> |
`changeTextLineItemQuantity?` | [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemQuantity*](#changeshoppinglisttextlineitemquantity)\> |
`changeTextLineItemsOrder?` | [*Maybe*](#maybe)<[*ChangeShoppingListTextLineItemsOrder*](#changeshoppinglisttextlineitemsorder)\> |
`removeLineItem?` | [*Maybe*](#maybe)<[*RemoveShoppingListLineItem*](#removeshoppinglistlineitem)\> |
`removeTextLineItem?` | [*Maybe*](#maybe)<[*RemoveShoppingListTextLineItem*](#removeshoppinglisttextlineitem)\> |
`setAnonymousId?` | [*Maybe*](#maybe)<[*SetShoppingListAnonymousId*](#setshoppinglistanonymousid)\> |
`setCustomField?` | [*Maybe*](#maybe)<[*SetShoppingListCustomField*](#setshoppinglistcustomfield)\> |
`setCustomType?` | [*Maybe*](#maybe)<[*SetShoppingListCustomType*](#setshoppinglistcustomtype)\> |
`setCustomer?` | [*Maybe*](#maybe)<[*SetShoppingListCustomer*](#setshoppinglistcustomer)\> |
`setDeleteDaysAfterLastModification?` | [*Maybe*](#maybe)<[*SetShoppingListDeleteDaysAfterLastModification*](#setshoppinglistdeletedaysafterlastmodification)\> |
`setDescription?` | [*Maybe*](#maybe)<[*SetShoppingListDescription*](#setshoppinglistdescription)\> |
`setKey?` | [*Maybe*](#maybe)<[*SetShoppingListKey*](#setshoppinglistkey)\> |
`setLineItemCustomField?` | [*Maybe*](#maybe)<[*SetShoppingListLineItemCustomField*](#setshoppinglistlineitemcustomfield)\> |
`setLineItemCustomType?` | [*Maybe*](#maybe)<[*SetShoppingListLineItemCustomType*](#setshoppinglistlineitemcustomtype)\> |
`setSlug?` | [*Maybe*](#maybe)<[*SetShoppingListSlug*](#setshoppinglistslug)\> |
`setTextLineItemCustomField?` | [*Maybe*](#maybe)<[*SetShoppingListTextLineItemCustomField*](#setshoppinglisttextlineitemcustomfield)\> |
`setTextLineItemCustomType?` | [*Maybe*](#maybe)<[*SetShoppingListTextLineItemCustomType*](#setshoppinglisttextlineitemcustomtype)\> |
`setTextLineItemDescription?` | [*Maybe*](#maybe)<[*SetShoppingListTextLineItemDescription*](#setshoppinglisttextlineitemdescription)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6726](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6726)

___

##### SimpleAttributeTypeDraft

Ƭ **SimpleAttributeTypeDraft**: { `dummy?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`dummy?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6754](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6754)

___

##### State

Ƭ **State**: [*Versioned*](#versioned) & { `__typename?`: *State* ; `builtIn`: [*Scalars*](#scalars)[*Boolean*] ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `descriptionAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `initial`: [*Scalars*](#scalars)[*Boolean*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `roles`: [*StateRole*](#enumstypes_graphqlstaterolemd)[] ; `transitions?`: [*Maybe*](#maybe)<[*State*](#state)[]\> ; `transitionsRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)[]\> ; `type`: [*StateType*](#enumstypes_graphqlstatetypemd) ; `version`: [*Scalars*](#scalars)[*Long*]  }

[State](http://dev.commercetools.com/http-api-projects-states.html)

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6767](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6767)

___

##### StateDescriptionArgs

Ƭ **StateDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

[State](http://dev.commercetools.com/http-api-projects-states.html)

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6795](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6795)

___

##### StateNameArgs

Ƭ **StateNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

[State](http://dev.commercetools.com/http-api-projects-states.html)

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6789](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6789)

___

##### StateQueryResult

Ƭ **StateQueryResult**: { `__typename?`: *StateQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*State*](#state)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *StateQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*State*](#state)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6800](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6800)

___

##### Store

Ƭ **Store**: [*Versioned*](#versioned) & { `__typename?`: *Store* ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `id`: [*Scalars*](#scalars)[*String*] ; `key`: [*Scalars*](#scalars)[*String*] ; `languages?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

[BETA] Stores allow defining different contexts for a project.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6822](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6822)

___

##### StoreNameArgs

Ƭ **StoreNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

[BETA] Stores allow defining different contexts for a project.

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6837](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6837)

___

##### StoreQueryResult

Ƭ **StoreQueryResult**: { `__typename?`: *StoreQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*Store*](#store)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *StoreQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Store*](#store)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6842](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6842)

___

##### StoreUpdateAction

Ƭ **StoreUpdateAction**: { `setLanguages?`: [*Maybe*](#maybe)<[*SetStoreLanguages*](#setstorelanguages)\> ; `setName?`: [*Maybe*](#maybe)<[*SetStoreName*](#setstorename)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`setLanguages?` | [*Maybe*](#maybe)<[*SetStoreLanguages*](#setstorelanguages)\> |
`setName?` | [*Maybe*](#maybe)<[*SetStoreName*](#setstorename)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6850](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6850)

___

##### StringAttribute

Ƭ **StringAttribute**: [*Attribute*](#attribute) & { `__typename?`: *StringAttribute* ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6855](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6855)

___

##### StringField

Ƭ **StringField**: [*CustomField*](#customfield) & { `__typename?`: *StringField* ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6861](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6861)

___

##### StringType

Ƭ **StringType**: [*FieldType*](#fieldtype) & { `__typename?`: *StringType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6867](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6867)

___

##### SubRate

Ƭ **SubRate**: { `__typename?`: *SubRate* ; `amount`: [*Scalars*](#scalars)[*Float*] ; `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *SubRate* |
`amount` | [*Scalars*](#scalars)[*Float*] |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6872](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6872)

___

##### SubRateDraft

Ƭ **SubRateDraft**: { `amount`: [*Scalars*](#scalars)[*Float*] ; `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`amount` | [*Scalars*](#scalars)[*Float*] |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6878](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6878)

___

##### SyncInfo

Ƭ **SyncInfo**: { `__typename?`: *SyncInfo* ; `channel?`: [*Maybe*](#maybe)<[*Channel*](#channel)\> ; `channelRef`: [*Reference*](#reference) ; `externalId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `syncedAt`: [*Scalars*](#scalars)[*DateTime*]  }

Stores information about order synchronization activities (like export or import).

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *SyncInfo* |
`channel?` | [*Maybe*](#maybe)<[*Channel*](#channel)\> |
`channelRef` | [*Reference*](#reference) |
`externalId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`syncedAt` | [*Scalars*](#scalars)[*DateTime*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6886](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6886)

___

##### TaxCategory

Ƭ **TaxCategory**: [*Versioned*](#versioned) & { `__typename?`: *TaxCategory* ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `name`: [*Scalars*](#scalars)[*String*] ; `rates`: [*TaxRate*](#taxrate)[] ; `version`: [*Scalars*](#scalars)[*Long*]  }

Tax Categories define how products are to be taxed in different countries.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6906](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6906)

___

##### TaxCategoryAddTaxRate

Ƭ **TaxCategoryAddTaxRate**: { `taxRate`: [*TaxRateDraft*](#taxratedraft)  }

###### Type declaration:

Name | Type |
------ | ------ |
`taxRate` | [*TaxRateDraft*](#taxratedraft) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6920](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6920)

___

##### TaxCategoryChangeName

Ƭ **TaxCategoryChangeName**: { `name`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`name` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6924](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6924)

___

##### TaxCategoryDraft

Ƭ **TaxCategoryDraft**: { `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `name`: [*Scalars*](#scalars)[*String*] ; `rates?`: [*Maybe*](#maybe)<[*TaxRateDraft*](#taxratedraft)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`key?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`name` | [*Scalars*](#scalars)[*String*] |
`rates?` | [*Maybe*](#maybe)<[*TaxRateDraft*](#taxratedraft)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6928](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6928)

___

##### TaxCategoryQueryResult

Ƭ **TaxCategoryQueryResult**: { `__typename?`: *TaxCategoryQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*TaxCategory*](#taxcategory)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *TaxCategoryQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*TaxCategory*](#taxcategory)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6935](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6935)

___

##### TaxCategoryRemoveTaxRate

Ƭ **TaxCategoryRemoveTaxRate**: { `taxRateId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`taxRateId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6943](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6943)

___

##### TaxCategoryReplaceTaxRate

Ƭ **TaxCategoryReplaceTaxRate**: { `taxRate`: [*TaxRateDraft*](#taxratedraft) ; `taxRateId`: [*Scalars*](#scalars)[*String*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`taxRate` | [*TaxRateDraft*](#taxratedraft) |
`taxRateId` | [*Scalars*](#scalars)[*String*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6947](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6947)

___

##### TaxCategorySetDescription

Ƭ **TaxCategorySetDescription**: { `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`description?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6952](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6952)

___

##### TaxCategoryUpdateAction

Ƭ **TaxCategoryUpdateAction**: { `addTaxRate?`: [*Maybe*](#maybe)<[*TaxCategoryAddTaxRate*](#taxcategoryaddtaxrate)\> ; `changeName?`: [*Maybe*](#maybe)<[*TaxCategoryChangeName*](#taxcategorychangename)\> ; `removeTaxRate?`: [*Maybe*](#maybe)<[*TaxCategoryRemoveTaxRate*](#taxcategoryremovetaxrate)\> ; `replaceTaxRate?`: [*Maybe*](#maybe)<[*TaxCategoryReplaceTaxRate*](#taxcategoryreplacetaxrate)\> ; `setDescription?`: [*Maybe*](#maybe)<[*TaxCategorySetDescription*](#taxcategorysetdescription)\> ; `setKey?`: [*Maybe*](#maybe)<[*SetTaxCategoryKey*](#settaxcategorykey)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addTaxRate?` | [*Maybe*](#maybe)<[*TaxCategoryAddTaxRate*](#taxcategoryaddtaxrate)\> |
`changeName?` | [*Maybe*](#maybe)<[*TaxCategoryChangeName*](#taxcategorychangename)\> |
`removeTaxRate?` | [*Maybe*](#maybe)<[*TaxCategoryRemoveTaxRate*](#taxcategoryremovetaxrate)\> |
`replaceTaxRate?` | [*Maybe*](#maybe)<[*TaxCategoryReplaceTaxRate*](#taxcategoryreplacetaxrate)\> |
`setDescription?` | [*Maybe*](#maybe)<[*TaxCategorySetDescription*](#taxcategorysetdescription)\> |
`setKey?` | [*Maybe*](#maybe)<[*SetTaxCategoryKey*](#settaxcategorykey)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6956](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6956)

___

##### TaxPortion

Ƭ **TaxPortion**: { `__typename?`: *TaxPortion* ; `amount`: [*Money*](#money) ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `rate`: [*Scalars*](#scalars)[*Float*]  }

Represents the portions that sum up to the totalGross field of a TaxedPrice. The portions are calculated
from the TaxRates. If a tax rate has SubRates, they are used and can be identified by name. Tax portions
from line items that have the same rate and name will be accumulated to the same tax portion.

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *TaxPortion* |
`amount` | [*Money*](#money) |
`name?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`rate` | [*Scalars*](#scalars)[*Float*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7002](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7002)

___

##### TaxPortionDraft

Ƭ **TaxPortionDraft**: { `amount`: [*MoneyInput*](#moneyinput) ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `rate`: [*Scalars*](#scalars)[*Float*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`amount` | [*MoneyInput*](#moneyinput) |
`name?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`rate` | [*Scalars*](#scalars)[*Float*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7009](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7009)

___

##### TaxRate

Ƭ **TaxRate**: { `__typename?`: *TaxRate* ; `amount`: [*Scalars*](#scalars)[*Float*] ; `country`: [*Scalars*](#scalars)[*Country*] ; `id?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `includedInPrice`: [*Scalars*](#scalars)[*Boolean*] ; `name`: [*Scalars*](#scalars)[*String*] ; `state?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `subRates`: [*SubRate*](#subrate)[]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *TaxRate* |
`amount` | [*Scalars*](#scalars)[*Float*] |
`country` | [*Scalars*](#scalars)[*Country*] |
`id?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`includedInPrice` | [*Scalars*](#scalars)[*Boolean*] |
`name` | [*Scalars*](#scalars)[*String*] |
`state?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`subRates` | [*SubRate*](#subrate)[] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7015](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7015)

___

##### TaxRateDraft

Ƭ **TaxRateDraft**: { `amount?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Float*]\> ; `country`: [*Scalars*](#scalars)[*Country*] ; `includedInPrice`: [*Scalars*](#scalars)[*Boolean*] ; `name`: [*Scalars*](#scalars)[*String*] ; `state?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `subRates?`: [*Maybe*](#maybe)<[*SubRateDraft*](#subratedraft)[]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`amount?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Float*]\> |
`country` | [*Scalars*](#scalars)[*Country*] |
`includedInPrice` | [*Scalars*](#scalars)[*Boolean*] |
`name` | [*Scalars*](#scalars)[*String*] |
`state?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`subRates?` | [*Maybe*](#maybe)<[*SubRateDraft*](#subratedraft)[]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7026](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7026)

___

##### TaxedItemPrice

Ƭ **TaxedItemPrice**: { `__typename?`: *TaxedItemPrice* ; `totalGross`: [*Money*](#money) ; `totalNet`: [*Money*](#money)  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *TaxedItemPrice* |
`totalGross` | [*Money*](#money) |
`totalNet` | [*Money*](#money) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6965](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6965)

___

##### TaxedPrice

Ƭ **TaxedPrice**: { `__typename?`: *TaxedPrice* ; `taxPortions`: [*TaxPortion*](#taxportion)[] ; `totalGross`: [*Money*](#money) ; `totalNet`: [*Money*](#money)  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *TaxedPrice* |
`taxPortions` | [*TaxPortion*](#taxportion)[] |
`totalGross` | [*Money*](#money) |
`totalNet` | [*Money*](#money) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:6971](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L6971)

___

##### TextAttributeDefinitionType

Ƭ **TextAttributeDefinitionType**: [*AttributeDefinitionType*](#attributedefinitiontype) & { `__typename?`: *TextAttributeDefinitionType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7035](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7035)

___

##### TextLineItem

Ƭ **TextLineItem**: { `__typename?`: *TextLineItem* ; `addedAt`: [*Scalars*](#scalars)[*DateTime*] ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `descriptionAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales`: [*LocalizedString*](#localizedstring)[] ; `quantity`: [*Scalars*](#scalars)[*Int*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *TextLineItem* |
`addedAt` | [*Scalars*](#scalars)[*DateTime*] |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsType*](#customfieldstype)\> |
`description?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`descriptionAllLocales?` | [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> |
`id` | [*Scalars*](#scalars)[*String*] |
`name?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`nameAllLocales` | [*LocalizedString*](#localizedstring)[] |
`quantity` | [*Scalars*](#scalars)[*Int*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7046](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7046)

___

##### TextLineItemDescriptionArgs

Ƭ **TextLineItemDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7063](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7063)

___

##### TextLineItemDraft

Ƭ **TextLineItemDraft**: { `addedAt?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `custom?`: [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> ; `description?`: [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> ; `name`: [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] ; `quantity?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addedAt?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`custom?` | [*Maybe*](#maybe)<[*CustomFieldsDraft*](#customfieldsdraft)\> |
`description?` | [*Maybe*](#maybe)<[*LocalizedStringItemInputType*](#localizedstringiteminputtype)[]\> |
`name` | [*LocalizedStringItemInputType*](#localizedstringiteminputtype)[] |
`quantity?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Int*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7068](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7068)

___

##### TextLineItemNameArgs

Ƭ **TextLineItemNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7058](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7058)

___

##### TimeAttribute

Ƭ **TimeAttribute**: [*Attribute*](#attribute) & { `__typename?`: *TimeAttribute* ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*Time*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7076](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7076)

___

##### TimeAttributeDefinitionType

Ƭ **TimeAttributeDefinitionType**: [*AttributeDefinitionType*](#attributedefinitiontype) & { `__typename?`: *TimeAttributeDefinitionType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7082](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7082)

___

##### TimeField

Ƭ **TimeField**: [*CustomField*](#customfield) & { `__typename?`: *TimeField* ; `name`: [*Scalars*](#scalars)[*String*] ; `value`: [*Scalars*](#scalars)[*Time*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7087](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7087)

___

##### TimeType

Ƭ **TimeType**: [*FieldType*](#fieldtype) & { `__typename?`: *TimeType* ; `name`: [*Scalars*](#scalars)[*String*]  }

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7093](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7093)

___

##### TrackingData

Ƭ **TrackingData**: { `__typename?`: *TrackingData* ; `carrier?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `isReturn`: [*Scalars*](#scalars)[*Boolean*] ; `provider?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `providerTransaction?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `trackingId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *TrackingData* |
`carrier?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`isReturn` | [*Scalars*](#scalars)[*Boolean*] |
`provider?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`providerTransaction?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`trackingId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7098](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7098)

___

##### TrackingDataDraftType

Ƭ **TrackingDataDraftType**: { `carrier?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `isReturn?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `provider?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `providerTransaction?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `trackingId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`carrier?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`isReturn?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`provider?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`providerTransaction?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`trackingId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7107](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7107)

___

##### Transaction

Ƭ **Transaction**: { `__typename?`: *Transaction* ; `amount`: [*Money*](#money) ; `id`: [*Scalars*](#scalars)[*String*] ; `interactionId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `state`: [*TransactionState*](#enumstypes_graphqltransactionstatemd) ; `timestamp?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `type?`: [*Maybe*](#maybe)<[*TransactionType*](#enumstypes_graphqltransactiontypemd)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *Transaction* |
`amount` | [*Money*](#money) |
`id` | [*Scalars*](#scalars)[*String*] |
`interactionId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`state` | [*TransactionState*](#enumstypes_graphqltransactionstatemd) |
`timestamp?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`type?` | [*Maybe*](#maybe)<[*TransactionType*](#enumstypes_graphqltransactiontypemd)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7115](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7115)

___

##### TransitionOrderCustomLineItemState

Ƭ **TransitionOrderCustomLineItemState**: { `actualTransitionDate?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `customLineItemId`: [*Scalars*](#scalars)[*String*] ; `fromState`: [*ResourceIdentifierInput*](#resourceidentifierinput) ; `quantity`: [*Scalars*](#scalars)[*Long*] ; `toState`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`actualTransitionDate?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`customLineItemId` | [*Scalars*](#scalars)[*String*] |
`fromState` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`quantity` | [*Scalars*](#scalars)[*Long*] |
`toState` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7140](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7140)

___

##### TransitionOrderLineItemState

Ƭ **TransitionOrderLineItemState**: { `actualTransitionDate?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> ; `fromState`: [*ResourceIdentifierInput*](#resourceidentifierinput) ; `lineItemId`: [*Scalars*](#scalars)[*String*] ; `quantity`: [*Scalars*](#scalars)[*Long*] ; `toState`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`actualTransitionDate?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |
`fromState` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`lineItemId` | [*Scalars*](#scalars)[*String*] |
`quantity` | [*Scalars*](#scalars)[*Long*] |
`toState` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7148](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7148)

___

##### TransitionOrderState

Ƭ **TransitionOrderState**: { `force?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `state`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`force?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`state` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7156](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7156)

___

##### TransitionProductState

Ƭ **TransitionProductState**: { `force?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> ; `state`: [*ReferenceInput*](#referenceinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`force?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Boolean*]\> |
`state` | [*ReferenceInput*](#referenceinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7161](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7161)

___

##### Type

Ƭ **Type**: { `type?`: [*Maybe*](#maybe)<[*TypeDefinition*](#typedefinition)\> ; `typeRef`: [*Reference*](#reference)  }

###### Type declaration:

Name | Type |
------ | ------ |
`type?` | [*Maybe*](#maybe)<[*TypeDefinition*](#typedefinition)\> |
`typeRef` | [*Reference*](#reference) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7166](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7166)

___

##### TypeDefinition

Ƭ **TypeDefinition**: [*Versioned*](#versioned) & { `__typename?`: *TypeDefinition* ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `descriptionAllLocales?`: [*Maybe*](#maybe)<[*LocalizedString*](#localizedstring)[]\> ; `fieldDefinitions`: [*FieldDefinition*](#fielddefinition)[] ; `id`: [*Scalars*](#scalars)[*String*] ; `key`: [*Scalars*](#scalars)[*String*] ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `name?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `nameAllLocales`: [*LocalizedString*](#localizedstring)[] ; `resourceTypeIds`: [*Scalars*](#scalars)[*String*][] ; `version`: [*Scalars*](#scalars)[*Long*]  }

Types define the structure of custom fields which can be attached to different entities throughout the platform.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7172](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7172)

___

##### TypeDefinitionDescriptionArgs

Ƭ **TypeDefinitionDescriptionArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

Types define the structure of custom fields which can be attached to different entities throughout the platform.

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7196](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7196)

___

##### TypeDefinitionFieldDefinitionsArgs

Ƭ **TypeDefinitionFieldDefinitionsArgs**: { `excludeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> ; `includeNames?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\>  }

Types define the structure of custom fields which can be attached to different entities throughout the platform.

###### Type declaration:

Name | Type |
------ | ------ |
`excludeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |
`includeNames?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*][]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7202](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7202)

___

##### TypeDefinitionNameArgs

Ƭ **TypeDefinitionNameArgs**: { `acceptLanguage?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> ; `locale?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\>  }

Types define the structure of custom fields which can be attached to different entities throughout the platform.

###### Type declaration:

Name | Type |
------ | ------ |
`acceptLanguage?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*][]\> |
`locale?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*Locale*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7190](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7190)

___

##### TypeDefinitionQueryResult

Ƭ **TypeDefinitionQueryResult**: { `__typename?`: *TypeDefinitionQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*TypeDefinition*](#typedefinition)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *TypeDefinitionQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*TypeDefinition*](#typedefinition)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7207](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7207)

___

##### UnpublishProduct

Ƭ **UnpublishProduct**: { `dummy?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`dummy?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7215](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7215)

___

##### UpdateCartItemShippingAddress

Ƭ **UpdateCartItemShippingAddress**: { `address`: [*AddressInput*](#addressinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`address` | [*AddressInput*](#addressinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7219](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7219)

___

##### UpdateOrderItemShippingAddress

Ƭ **UpdateOrderItemShippingAddress**: { `address`: [*AddressInput*](#addressinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`address` | [*AddressInput*](#addressinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7223](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7223)

___

##### UpdateOrderSyncInfo

Ƭ **UpdateOrderSyncInfo**: { `channel`: [*ResourceIdentifierInput*](#resourceidentifierinput) ; `externalId?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `syncedAt?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`channel` | [*ResourceIdentifierInput*](#resourceidentifierinput) |
`externalId?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |
`syncedAt?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*DateTime*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7227](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7227)

___

##### Versioned

Ƭ **Versioned**: { `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `id`: [*Scalars*](#scalars)[*String*] ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `version`: [*Scalars*](#scalars)[*Long*]  }

Versioned object have an ID and version and modification. Every update of this object changes it's version.

###### Type declaration:

Name | Type |
------ | ------ |
`createdAt` | [*Scalars*](#scalars)[*DateTime*] |
`createdBy?` | [*Maybe*](#maybe)<[*Initiator*](#initiator)\> |
`id` | [*Scalars*](#scalars)[*String*] |
`lastModifiedAt` | [*Scalars*](#scalars)[*DateTime*] |
`lastModifiedBy?` | [*Maybe*](#maybe)<[*Initiator*](#initiator)\> |
`version` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7234](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7234)

___

##### WhitespaceSuggestTokenizerInput

Ƭ **WhitespaceSuggestTokenizerInput**: { `dummy?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`dummy?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7243](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7243)

___

##### Zone

Ƭ **Zone**: [*Versioned*](#versioned) & { `__typename?`: *Zone* ; `createdAt`: [*Scalars*](#scalars)[*DateTime*] ; `createdBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `description?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `id`: [*Scalars*](#scalars)[*String*] ; `key?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> ; `lastModifiedAt`: [*Scalars*](#scalars)[*DateTime*] ; `lastModifiedBy?`: [*Maybe*](#maybe)<[*Initiator*](#initiator)\> ; `locations`: [*Location*](#location)[] ; `name`: [*Scalars*](#scalars)[*String*] ; `version`: [*Scalars*](#scalars)[*Long*]  }

Zones allow defining ShippingRates for specific Locations.

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7248](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7248)

___

##### ZoneLocation

Ƭ **ZoneLocation**: { `country`: [*Scalars*](#scalars)[*Country*] ; `state?`: [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`country` | [*Scalars*](#scalars)[*Country*] |
`state?` | [*Maybe*](#maybe)<[*Scalars*](#scalars)[*String*]\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7262](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7262)

___

##### ZoneQueryResult

Ƭ **ZoneQueryResult**: { `__typename?`: *ZoneQueryResult* ; `count`: [*Scalars*](#scalars)[*Int*] ; `offset`: [*Scalars*](#scalars)[*Int*] ; `results`: [*Zone*](#zone)[] ; `total`: [*Scalars*](#scalars)[*Long*]  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ZoneQueryResult* |
`count` | [*Scalars*](#scalars)[*Int*] |
`offset` | [*Scalars*](#scalars)[*Int*] |
`results` | [*Zone*](#zone)[] |
`total` | [*Scalars*](#scalars)[*Long*] |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7267](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7267)

___

##### ZoneRate

Ƭ **ZoneRate**: { `__typename?`: *ZoneRate* ; `shippingRates`: [*ShippingRate*](#shippingrate)[] ; `zone?`: [*Maybe*](#maybe)<[*Zone*](#zone)\> ; `zoneRef?`: [*Maybe*](#maybe)<[*Reference*](#reference)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`__typename?` | *ZoneRate* |
`shippingRates` | [*ShippingRate*](#shippingrate)[] |
`zone?` | [*Maybe*](#maybe)<[*Zone*](#zone)\> |
`zoneRef?` | [*Maybe*](#maybe)<[*Reference*](#reference)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7275](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7275)

___

##### ZoneRateDraft

Ƭ **ZoneRateDraft**: { `shippingRates?`: [*Maybe*](#maybe)<[*ShippingRateDraft*](#shippingratedraft)[]\> ; `zone`: [*ResourceIdentifierInput*](#resourceidentifierinput)  }

###### Type declaration:

Name | Type |
------ | ------ |
`shippingRates?` | [*Maybe*](#maybe)<[*ShippingRateDraft*](#shippingratedraft)[]\> |
`zone` | [*ResourceIdentifierInput*](#resourceidentifierinput) |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7282](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7282)

___

##### ZoneUpdateAction

Ƭ **ZoneUpdateAction**: { `addLocation?`: [*Maybe*](#maybe)<[*AddZoneLocation*](#addzonelocation)\> ; `changeName?`: [*Maybe*](#maybe)<[*ChangeZoneName*](#changezonename)\> ; `removeLocation?`: [*Maybe*](#maybe)<[*RemoveZoneLocation*](#removezonelocation)\> ; `setDescription?`: [*Maybe*](#maybe)<[*SetZoneDescription*](#setzonedescription)\> ; `setKey?`: [*Maybe*](#maybe)<[*SetZoneKey*](#setzonekey)\>  }

###### Type declaration:

Name | Type |
------ | ------ |
`addLocation?` | [*Maybe*](#maybe)<[*AddZoneLocation*](#addzonelocation)\> |
`changeName?` | [*Maybe*](#maybe)<[*ChangeZoneName*](#changezonename)\> |
`removeLocation?` | [*Maybe*](#maybe)<[*RemoveZoneLocation*](#removezonelocation)\> |
`setDescription?` | [*Maybe*](#maybe)<[*SetZoneDescription*](#setzonedescription)\> |
`setKey?` | [*Maybe*](#maybe)<[*SetZoneKey*](#setzonekey)\> |

Defined in: [packages/commercetools/composables/src/types/GraphQL.ts:7287](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/types/GraphQL.ts#L7287)


<a name="modulesusecartmd"></a>

### Module: useCart

#### Properties

##### default

• **default**: () => *UseCart*<[*Cart*](#cart), [*LineItem*](#lineitem), [*ProductVariant*](#productvariant), AgnosticCoupon\>

Defined in: [packages/commercetools/composables/src/index.ts:25](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/index.ts#L25)


<a name="modulesusecart_currentcartmd"></a>

### Module: useCart/currentCart

#### Functions

##### default

▸ `Const`**default**(`context`: Context, `customQueryFn?`: (`user`: *any*, `cart`: *any*) => { `cart`: *any* ; `user`: *any*  }): *Promise*<Cart\>

###### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`context` | Context | - |
`customQueryFn` | (`user`: *any*, `cart`: *any*) => { `cart`: *any* ; `user`: *any*  } | ... |

**Returns:** *Promise*<Cart\>

Defined in: [packages/commercetools/composables/src/useCart/currentCart.ts:3](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useCart/currentCart.ts#L3)


<a name="modulesusecategorymd"></a>

### Module: useCategory

#### Functions

##### default

▸ `Const`**default**(`id`: *string*): *UseCategory*<[*Category*](#category), *any*\>

###### Parameters:

Name | Type |
------ | ------ |
`id` | *string* |

**Returns:** *UseCategory*<[*Category*](#category), *any*\>

Defined in: [packages/commercetools/composables/src/useCategory/index.ts:16](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useCategory/index.ts#L16)


<a name="modulesusecheckoutmd"></a>

### Module: useCheckout

#### Properties

##### default

• **default**: () => { `billingDetails`: *ComputedRef*<*any*\> ; `chosenPaymentMethod`: *ComputedRef*<*any*\> ; `chosenShippingMethod`: *ComputedRef*<*any*\> ; `clean`: () => *void* ; `isBillingAddressCompleted`: *ComputedRef*<*any*\> ; `isPersonalDetailsCompleted`: *ComputedRef*<*any*\> ; `isShippingAddressCompleted`: *ComputedRef*<*any*\> ; `isShippingMethodCompleted`: *ComputedRef*<*boolean*\> ; `loadDetails`: () => *Promise*<*void*\> ; `loadPaymentMethods`: () => *Promise*<*void*\> ; `loadShippingMethods`: () => *Promise*<*void*\> ; `loading`: *ComputedRef*<*any*\> ; `paymentMethods`: *ComputedRef*<*any*\> ; `personalDetails`: *ComputedRef*<*any*\> ; `placeOrder`: () => *Promise*<*any*\> ; `setBillingDetails`: (`data`: *any*, `options`: *any*, `customQuery?`: *CustomQuery*<*any*\>) => *Promise*<*void*\> ; `setPaymentMethod`: (`method`: *any*, `options`: *any*) => *Promise*<*void*\> ; `setPersonalDetails`: (`data`: *any*, `options`: *any*, `customQuery?`: *CustomQuery*<*any*\>) => *Promise*<*void*\> ; `setShippingDetails`: (`data`: *any*, `options`: *any*, `customQuery?`: *CustomQuery*<*any*\>) => *Promise*<*void*\> ; `setShippingMethod`: (`method`: *any*, `options`: *any*, `customQuery?`: *CustomQuery*<*any*\>) => *Promise*<*void*\> ; `shippingDetails`: *ComputedRef*<*any*\> ; `shippingMethods`: *ComputedRef*<*any*\>  }

Defined in: [packages/commercetools/composables/src/index.ts:26](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/index.ts#L26)


<a name="modulesusecheckout_createloaddetailsmd"></a>

### Module: useCheckout/createLoadDetails

#### Functions

##### default

▸ `Const`**default**(`params`: *any*, `customQuery?`: *CustomQuery*<*any*\>): *function*

###### Parameters:

Name | Type |
------ | ------ |
`params` | *any* |
`customQuery?` | *CustomQuery*<*any*\> |

**Returns:** *function*

Defined in: [packages/commercetools/composables/src/useCheckout/createLoadDetails.ts:5](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useCheckout/createLoadDetails.ts#L5)


<a name="modulesusecheckout_createloadpaymentmethodsmd"></a>

### Module: useCheckout/createLoadPaymentMethods

#### Functions

##### default

▸ `Const`**default**(`__namedParameters`: *Object*): *function*

###### Parameters:

• **__namedParameters**: *Object*

**Returns:** *function*

Defined in: [packages/commercetools/composables/src/useCheckout/createLoadPaymentMethods.ts:41](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useCheckout/createLoadPaymentMethods.ts#L41)


<a name="modulesusecheckout_createloadshippingmethodsmd"></a>

### Module: useCheckout/createLoadShippingMethods

#### Functions

##### default

▸ `Const`**default**(`__namedParameters`: *Object*, `customQuery?`: *CustomQuery*<*any*\>): *function*

###### Parameters:

• **__namedParameters**: *Object*

• **customQuery**: *CustomQuery*<*any*\>

**Returns:** *function*

Defined in: [packages/commercetools/composables/src/useCheckout/createLoadShippingMethods.ts:4](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useCheckout/createLoadShippingMethods.ts#L4)


<a name="modulesusecheckout_createplaceordermd"></a>

### Module: useCheckout/createPlaceOrder

#### Functions

##### default

▸ `Const`**default**(`__namedParameters`: *Object*, `customQuery?`: *CustomQuery*<*any*\>): *function*

###### Parameters:

• **__namedParameters**: *Object*

• **customQuery**: *CustomQuery*<*any*\>

**Returns:** *function*

Defined in: [packages/commercetools/composables/src/useCheckout/createPlaceOrder.ts:5](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useCheckout/createPlaceOrder.ts#L5)


<a name="modulesusecheckout_createsetbillingdetailsmd"></a>

### Module: useCheckout/createSetBillingDetails

#### Functions

##### default

▸ `Const`**default**(`params`: *any*): *function*

###### Parameters:

Name | Type |
------ | ------ |
`params` | *any* |

**Returns:** *function*

Defined in: [packages/commercetools/composables/src/useCheckout/createSetBillingDetails.ts:9](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useCheckout/createSetBillingDetails.ts#L9)


<a name="modulesusecheckout_createsetpaymentmethodmd"></a>

### Module: useCheckout/createSetPaymentMethod

#### Functions

##### default

▸ `Const`**default**(`__namedParameters`: *Object*): *function*

###### Parameters:

• **__namedParameters**: *Object*

**Returns:** *function*

Defined in: [packages/commercetools/composables/src/useCheckout/createSetPaymentMethod.ts:3](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useCheckout/createSetPaymentMethod.ts#L3)


<a name="modulesusecheckout_createsetpersonaldetailsmd"></a>

### Module: useCheckout/createSetPersonalDetails

#### Functions

##### default

▸ `Const`**default**(`params`: *any*): *function*

###### Parameters:

Name | Type |
------ | ------ |
`params` | *any* |

**Returns:** *function*

Defined in: [packages/commercetools/composables/src/useCheckout/createSetPersonalDetails.ts:7](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useCheckout/createSetPersonalDetails.ts#L7)


<a name="modulesusecheckout_createsetshippingdetailsmd"></a>

### Module: useCheckout/createSetShippingDetails

#### Functions

##### default

▸ `Const`**default**(`params`: *any*): *function*

###### Parameters:

Name | Type |
------ | ------ |
`params` | *any* |

**Returns:** *function*

Defined in: [packages/commercetools/composables/src/useCheckout/createSetShippingDetails.ts:9](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useCheckout/createSetShippingDetails.ts#L9)


<a name="modulesusecheckout_createsetshippingmethodmd"></a>

### Module: useCheckout/createSetShippingMethod

#### Functions

##### default

▸ `Const`**default**(`params`: *any*): *function*

###### Parameters:

Name | Type |
------ | ------ |
`params` | *any* |

**Returns:** *function*

Defined in: [packages/commercetools/composables/src/useCheckout/createSetShippingMethod.ts:7](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useCheckout/createSetShippingMethod.ts#L7)


<a name="modulesusecheckout_initfieldsmd"></a>

### Module: useCheckout/initFields

#### Functions

##### default

▸ `Const`**default**(`cart`: [*Cart*](#cart), `__namedParameters`: *Object*): *void*

###### Parameters:

• **cart**: [*Cart*](#cart)

• **__namedParameters**: *Object*

**Returns:** *void*

Defined in: [packages/commercetools/composables/src/useCheckout/initFields.ts:3](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useCheckout/initFields.ts#L3)


<a name="modulesusefacetmd"></a>

### Module: useFacet

#### Properties

##### default

• **default**: (`id?`: *string*) => *UseFacet*<[*FacetResultsData*](#interfacestypesfacetresultsdatamd)\>

Defined in: [packages/commercetools/composables/src/index.ts:33](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/index.ts#L33)


<a name="modulesusefacet__utilsmd"></a>

### Module: useFacet/\_utils

#### Functions

##### buildBreadcrumbs

▸ `Const`**buildBreadcrumbs**(`rootCat`: *any*): *any*

###### Parameters:

Name | Type |
------ | ------ |
`rootCat` | *any* |

**Returns:** *any*

Defined in: [packages/commercetools/composables/src/useFacet/_utils.ts:8](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useFacet/_utils.ts#L8)

___

##### buildFacets

▸ `Const`**buildFacets**(`searchData`: [*SearchData*](#searchdata), `reduceFn`: *any*, `criteria?`: *string*[]): *any*[]

###### Parameters:

Name | Type |
------ | ------ |
`searchData` | [*SearchData*](#searchdata) |
`reduceFn` | *any* |
`criteria?` | *string*[] |

**Returns:** *any*[]

Defined in: [packages/commercetools/composables/src/useFacet/_utils.ts:48](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useFacet/_utils.ts#L48)

___

##### reduceForFacets

▸ `Const`**reduceForFacets**(`facets`: *any*, `filters`: *any*): *function*

###### Parameters:

Name | Type |
------ | ------ |
`facets` | *any* |
`filters` | *any* |

**Returns:** *function*

Defined in: [packages/commercetools/composables/src/useFacet/_utils.ts:33](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useFacet/_utils.ts#L33)

___

##### reduceForGroupedFacets

▸ `Const`**reduceForGroupedFacets**(`facets`: *any*, `filters`: *any*): *function*

###### Parameters:

Name | Type |
------ | ------ |
`facets` | *any* |
`filters` | *any* |

**Returns:** *function*

Defined in: [packages/commercetools/composables/src/useFacet/_utils.ts:38](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useFacet/_utils.ts#L38)


<a name="modulesuseproductmd"></a>

### Module: useProduct

#### Functions

##### default

▸ `Const`**default**(`cacheId`: *string*): *UseProduct*<[*ProductVariant*](#productvariant)[], [*ProductsSearchParams*](#interfacestypesproductssearchparamsmd)\>

###### Parameters:

Name | Type |
------ | ------ |
`cacheId` | *string* |

**Returns:** *UseProduct*<[*ProductVariant*](#productvariant)[], [*ProductsSearchParams*](#interfacestypesproductssearchparamsmd)\>

Defined in: [packages/commercetools/composables/src/useProduct/index.ts:19](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useProduct/index.ts#L19)


<a name="modulesusereviewmd"></a>

### Module: useReview

#### Functions

##### useReview

▸ `Const`**useReview**(`cacheId`: *string*): *UseReview*<*any*, *any*, *any*\>

###### Parameters:

Name | Type |
------ | ------ |
`cacheId` | *string* |

**Returns:** *UseReview*<*any*, *any*, *any*\>

Defined in: [packages/commercetools/composables/src/useReview/index.ts:18](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useReview/index.ts#L18)


<a name="modulesuseusermd"></a>

### Module: useUser

#### Properties

##### default

• **default**: () => *UseUser*<[*Customer*](#customer), *any*\>

Defined in: [packages/commercetools/composables/src/index.ts:27](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/index.ts#L27)


<a name="modulesuseuser_authenticatemd"></a>

### Module: useUser/authenticate

#### Functions

##### authenticate

▸ `Const`**authenticate**(`userData`: UserData, `fn`: *any*): *Promise*<*any*\>

###### Parameters:

Name | Type |
------ | ------ |
`userData` | UserData |
`fn` | *any* |

**Returns:** *Promise*<*any*\>

Defined in: [packages/commercetools/composables/src/useUser/authenticate.ts:6](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useUser/authenticate.ts#L6)


<a name="modulesuseuser_factoryparamsmd"></a>

### Module: useUser/factoryParams

#### Variables

##### params

• `Const` **params**: *UseUserFactoryParams*<[*Customer*](#customer), *any*, *any*\>

Defined in: [packages/commercetools/composables/src/useUser/factoryParams.ts:25](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useUser/factoryParams.ts#L25)


<a name="modulesuseuserbillingmd"></a>

### Module: useUserBilling

#### Properties

##### default

• **default**: () => *UseUserBilling*<*any*, *any*\>

Defined in: [packages/commercetools/composables/src/index.ts:29](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/index.ts#L29)


<a name="modulesuseuserordersmd"></a>

### Module: useUserOrders

#### Properties

##### default

• **default**: () => *UseUserOrders*<[*Order*](#order)[], [*OrderSearchParams*](#ordersearchparams)\>

Defined in: [packages/commercetools/composables/src/index.ts:28](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/index.ts#L28)


<a name="modulesuseusershippingmd"></a>

### Module: useUserShipping

#### Properties

##### default

• **default**: () => *UseUserShipping*<*any*, *any*\>

Defined in: [packages/commercetools/composables/src/index.ts:31](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/index.ts#L31)


<a name="modulesusewishlistmd"></a>

### Module: useWishlist

#### Properties

##### default

• **default**: () => *UseWishlist*<Wishlist, [*LineItem*](#lineitem), [*ProductVariant*](#productvariant)\>

Defined in: [packages/commercetools/composables/src/index.ts:30](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/index.ts#L30)

#### Variables

##### wishlist

• `Const` **wishlist**: *Ref*<Wishlist\>

Defined in: [packages/commercetools/composables/src/useWishlist/index.ts:9](https://github.com/vuestorefront/vue-storefront/blob/8a84224e5/packages/commercetools/composables/src/useWishlist/index.ts#L9)
