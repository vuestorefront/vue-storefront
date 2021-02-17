---
platform: Commercetools
---

# Cart

## Features

`useCart` composition function can be used to:

* load cart information,
* add, update and remove items in the cart,
* applying and removing coupons,
* checking if product is already added to the cart.

## API

- `cart` - a main data object

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
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  /** This field would contain type data */
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  deleteDaysAfterLastModification?: Maybe<Scalars["Int"]>;
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

Because `cart` property is a raw response with some additional properties, it's recommended to use `cartGetters` for accessing any data from it. It includes the following helper functions:

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

Interface for the above getter looks like this:

```ts
interface CartGetters<Cart, LineItem> {
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
```

## Examples

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

:::tip
Because in commercetools each interaction with the cart (such as adding or removing items) triggers token recreation, cart is loaded only when it's really needed. For more information please visit [commercetools documentation](https://docs.commercetools.com/http-api-authorization#create-anonymous-sessions-only-once-necessary).
:::
