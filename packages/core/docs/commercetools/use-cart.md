---
platform: Commercetools
---


<IncludeContent content-key="use-cart" />

::: slot cart-interface
```ts
type Cart = Versioned & {
  __typename?: "Cart";
  customerId?: Maybe<Scalars["String"]>;
  customer?: Maybe<Customer>;
  customerEmail?: Maybe<Scalars["String"]>;
  anonymousId?: Maybe<Scalars["String"]>;
  lineItems: Array<LineItem>;
  customLineItems: Array<CustomLineItem>;
  totalPrice: Money;
  taxedPrice?: Maybe<TaxedPrice>;
  shippingAddress?: Maybe<Address>;
  billingAddress?: Maybe<Address>;
  inventoryMode: InventoryMode;
  taxMode: TaxMode;
  taxRoundingMode: RoundingMode;
  taxCalculationMode: TaxCalculationMode;
  customerGroup?: Maybe<CustomerGroup>;
  customerGroupRef?: Maybe<Reference>;
  country?: Maybe<Scalars["Country"]>;
  shippingInfo?: Maybe<ShippingInfo>;
  discountCodes: Array<DiscountCodeInfo>;
  refusedGifts: Array<CartDiscount>;
  refusedGiftsRefs: Array<Reference>;
  paymentInfo?: Maybe<PaymentInfo>;
  locale?: Maybe<Scalars["Locale"]>;
  shippingRateInput?: Maybe<ShippingRateInput>;
  origin: CartOrigin;
  storeRef?: Maybe<KeyReference>;
  store?: Maybe<Store>;
  itemShippingAddresses: Array<Address>;
  cartState: CartState;
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  deleteDaysAfterLastModification?: Maybe<Scalars["Int"]>;
  id: Scalars["String"];
  version: Scalars["Long"];
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  createdBy?: Maybe<Initiator>;
  lastModifiedBy?: Maybe<Initiator>;
  customFieldList?: Maybe<Array<CustomField>>;
};
```
:::


## Loading cart on-demand

In the commetcetools, in order to avoid unnecessary token creation calls, we need to load the cart only when it's really needed, thus each interaction with a cart such as adding item, removing item etc. triggers also token recreation to the one that handles user session. For more information please visit [commercetools documentation](https://docs.commercetools.com/http-api-authorization#create-anonymous-sessions-only-once-necessary).
