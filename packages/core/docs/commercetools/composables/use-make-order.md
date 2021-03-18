# `useMakeOrder`

## Features

`useMakeOrder` composable is responsible for making an order 

## API

- `make` - function for making an order. This method accepts a single optional `params` object. The `params` has the following option:

    - `customQuery?: CustomQuery`

```ts
type CustomQuery = Record<string, string>
```
- `order: Order` - a main data object that contains a made order.
```ts
type Order = Versioned & {
  __typename?: "Order";
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
  completedAt?: Maybe<Scalars["DateTime"]>;
  orderNumber?: Maybe<Scalars["String"]>;
  orderState: OrderState;
  stateRef?: Maybe<Reference>;
  state?: Maybe<State>;
  shipmentState?: Maybe<ShipmentState>;
  paymentState?: Maybe<PaymentState>;
  syncInfo: Array<SyncInfo>;
  returnInfo: Array<ReturnInfo>;
  lastMessageSequenceNumber: Scalars["Long"];
  cartRef?: Maybe<Reference>;
  cart?: Maybe<Cart>;
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  /** This field would contain type data */
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  id: Scalars["String"];
  version: Scalars["Long"];
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  createdBy?: Maybe<Initiator>;
  lastModifiedBy?: Maybe<Initiator>;
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList?: Maybe<Array<CustomField>>;
};
```

- `loading: boolean` - a reactive object containing information about loading state of your `make` method.

- `error: UseMakeOrderErrors` - a reactive object containing the error message, if `load` or `save` failed for any reason.

```ts
interface UseMakeOrderErrors {
  make?: Error;
}
```

## Getters

We do not provide getters for checkout and its parts.

## Example

```js
import { useMakeOrder } from '@vue-storefront/commercetools';
export default {
  setup () {
    const { make, order } = useMakeOrder();
    return {
      make,
      order
    };
  }
}
```