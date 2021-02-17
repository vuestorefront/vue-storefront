# `useCart`

## Features

`useCart` composable can be used to:

* load cart information,
* add, update and remove items in the cart,
* applying and removing coupons,
* checking if product is already added to the cart.

## API

- `cart` - a main data object

```ts
type Cart = {
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
- `load` - function required to fetch cart from a server or create brand new if it doesn't exist.
  
- `addItem` - function for adding products to the cart
  
- `updateItemQty` - function for updating quantity of a product that is already in the cart
  
- `removeItem` - function for removing a product that currently is in the cart
  
- `isOnCart` - function for checking if a product is currently in the cart
  
- `clear` - function for removing all items currently stored in cart
  
- `coupon` - reactive data object containing coupon details
  
- `applyCoupon` - function for applying coupon to cart
  
- `removeCoupon` - function for removing coupon applied to cart
  
- `loading` - a reactive object containing information about loading state of the cart

## Getters

- `getTotals` - returns cart totals.

- `getShippingPrice` - returns current shipping price.

- `getItems` - returns all items from cart.
  
- `getItemName` - returns product name.

- `getItemImage` - returns product image.

- `getItemPrice` - returns product price.

- `getItemQty` - returns product quantity.

- `getItemAttributes` - returns product attribute.

- `getItemSku` - returns product SKU.

- `getTotalItems` - returns products amount.

- `getFormattedPrice` - returns product price with currency sign.

- `getCoupons` - returns applied coupons.

- `getDiscounts` - returns all discounts.

```ts
interface CartGetters {
  getTotals: (cart: Cart) => AgnosticTotals;
  getShippingPrice: (cart: Cart) => number;
  getItems: (cart: Cart) => LineItem;
  getItemName: (product: LineItem) => string;
  getItemImage: (product: LineItem) => string;
  getItemPrice: (product: LineItem) => AgnosticPrice;
  getItemQty: (product: LineItem) => number;
  getItemAttributes: (product: LineItem, filterByAttributeName?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getItemSku: (product: LineItem) => string;
  getTotalItems: (cart: Cart) => number;
  getFormattedPrice: (price: number) => string;
  getCoupons: (cart: Cart) => AgnosticCoupon[];
  getDiscounts: (cart: Cart) => AgnosticDiscount[];
}

interface AgnosticTotals {
  total: number;
  subtotal: number;
  special?: number;
  [x: string]: unknown;
}

interface AgnosticPrice {
  regular: number | null;
  special?: number | null;
}

interface AgnosticAttribute {
  name?: string;
  value: string | Record<string, any>;
  label: string;
}

interface AgnosticCoupon {
  id: string;
  name: string;
  code: string;
  value: number;
}

interface AgnosticDiscount {
  id: string;
  name: string;
  description: string;
  value: number;
  code?: string;
}
```

## Example

```js
import { useCart, cartGetters } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { cart, removeItem, updateItemQty, load } = useCart();

    onSSR(async () => {
      await loadCart();
    })

    return {
      removeItem,
      updateItemQty,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      totalItems: computed(() => cartGetters.getTotalItems(cart.value))
    }
  }
}
```
