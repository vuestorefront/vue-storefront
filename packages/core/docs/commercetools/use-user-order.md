# `useUserOrder`

## Features

`useUserOrder` composable is responsible, as it's name suggests for interactions with user's order history from your eCommerce.

## API

- `searchOrders` - a main querying function that is used to query user's order history from eCommerce platform and populate the `orders` object with the result. This method accepts a single params object. The `params` has the following options:

    - `searchParams: OrderSearchParams`
      
    - `customQuery?: customQuery`
    
```ts
type OrderSearchParams = {
  id?: string;
  page?: number;
  perPage?: number;
}

type CustomQuery = (query, variables) => {
  query?;
  variables?;
}
```

- `orders: Order[]` -  a main data object that contains an array of orders fetched by `searchOrders` method.

```ts
type Order = {
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
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  id: Scalars["String"];
  version: Scalars["Long"];
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  createdBy?: Maybe<Initiator>;
  lastModifiedBy?: Maybe<Initiator>;
  customFieldList?: Maybe<Array<CustomField>>;
}
```

- `loading: boolean` - a reactive object containing information about loading state of your `searchOrders` method.

- `error: UseUserOrderErrors` - reactive object containing the error message, if some properties failed for any reason.

```ts
interface UseUserOrderErrors {
  search?: Error;
}
```

## Getters

- `getDate` - returns order date.

- `getId` - returns order Id.

- `getStatus` - returns order status.

- `getPrice` - returns order price.

- `getItems` - returns order items.

- `getItemSku` - returns order item sku.

- `getItemName` - returns order item name.

- `getItemQty` - returns order item quantity.

- `getItemPrice` - returns order item price.

- `getFormattedPrice` - returns order price with currency sign.

```ts
interface UserOrderGetters {
  getDate: (order: Order) => string;
  getId: (order: Order) => string;
  getStatus: (order: Order) => AgnosticOrderStatus;
  getPrice: (order: Order) => number;
  getItems: (order: Order) => LineItem[];
  getItemSku: (item: LineItem) => string;
  getItemName: (item: LineItem) => string;
  getItemQty: (item: LineItem) => number;
  getItemPrice: (item: LineItem) => number;
  getFormattedPrice: (price: number) => string;
}

type Order = {
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
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  id: Scalars["String"];
  version: Scalars["Long"];
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  createdBy?: Maybe<Initiator>;
  lastModifiedBy?: Maybe<Initiator>;
  customFieldList?: Maybe<Array<CustomField>>;
}

enum AgnosticOrderStatus {
  Open = 'Open',
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Shipped = 'Shipped',
  Complete = 'Complete',
  Cancelled = 'Cancelled',
  Refunded = 'Refunded'
}

type LineItem = {
  __typename?: "LineItem";
  id: Scalars["String"];
  productId: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  nameAllLocales: Array<LocalizedString>;
  productSlug?: Maybe<Scalars["String"]>;
  productType?: Maybe<ProductTypeDefinition>;
  productTypeRef?: Maybe<Reference>;
  variant?: Maybe<ProductVariant>;
  price: ProductPrice;
  taxedPrice?: Maybe<TaxedItemPrice>;
  totalPrice?: Maybe<Money>;
  quantity: Scalars["Long"];
  state: Array<ItemState>;
  taxRate?: Maybe<TaxRate>;
  supplyChannel?: Maybe<Channel>;
  supplyChannelRef?: Maybe<Reference>;
  distributionChannel?: Maybe<Channel>;
  distributionChannelRef?: Maybe<Reference>;
  discountedPricePerQuantity: Array<DiscountedLineItemPriceForQuantity>;
  lineItemMode: LineItemMode;
  priceMode: LineItemPriceMode;
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  shippingDetails?: Maybe<ItemShippingDetails>;
  inventoryMode?: Maybe<ItemShippingDetails>;
  customFieldList?: Maybe<Array<CustomField>>;
}
```

## Example

```js
import { useUserOrder, orderGetters } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';

export default {
  setup() {
    const { orders, search, loading, error } = useUserOrder();

    onSSR(async () => {
      await search();
    });

    return {
      // extract a list of orders from a `orders` object
      orders: computed(() => orderGetters.getItems(shipping.value)),
    };
  }
};
```
