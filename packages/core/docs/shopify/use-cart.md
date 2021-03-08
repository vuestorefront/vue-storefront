# useCart composable

`useCart` composition API function is responsible, as its name suggests, for interactions with cart in your eCommerce. This function returns following values:

- `cart` - a main data object that contains cart structure in platform specific structure
```typescript
export type Maybe<T> = T | null;

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Json: any;
  Array: any;
};

export type Cart = {
  __typename?: 'Cart';
  appliedGiftCards: Maybe<Scalars['Array']>;
  completedAt: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['String']>;
  currencyCode: Maybe<Scalars['String']>;
  customAttributes: Maybe<Scalars['Array']>;
  discountApplications: Maybe<Scalars['Array']>;
  email: Maybe<Scalars['String']>;
  errors: Maybe<Scalars['Json']>;
  id: Maybe<Scalars['String']>;
  lineItems?: Maybe<Scalars['Array']>;
  lineItemsSubtotalPrice?: Maybe<Scalars['Json']>;
  note?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
  orderStatusUrl?: Maybe<Scalars['String']>;
  paymentDue?: Maybe<Scalars['String']>;
  ready?: Maybe<Scalars['String']>;
  requiresShipping?: Maybe<Scalars['String']>;
  shippingAddress?: Maybe<Scalars['Json']>;
  shippingLine?: Maybe<Scalars['String']>;
  subtotalPrice?: Maybe<Scalars['String']>;
  taxExempt?: Maybe<Scalars['String']>;
  taxesIncluded?: Maybe<Scalars['String']>;
  totalPrice?: Maybe<Scalars['String']>;
  totalTax?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  userErrors?: Maybe<Scalars['Array']>;
  webUrl?: Maybe<Scalars['String']>;
}
```
- `loadCart` - function required to fetch cart from a server or create brand new if it doesn't exist.
- `addToCart` - Adds cart items to an existing checkout.
    - It takes two parameters:
    - `product` (Object) The identifier of the product variant for the cart item.
    - `quantity` (Int) The quantity of the cart item.
- `updateQuantity` - Updates line items on an existing checkout.
    - It takes two parameters:
    - `product` (Object) The identifier of the product variant for the cart item.
    - `quantity` (Int) The quantity of the cart item.
- `removeFromCart` - function for removing a product that currently is in the cart
    - It takes one parameter:
    - `product` (Object) The identifier of the product variant for the cart item.
- `isInCart` - function for checking if a product is currently in the cart
- `clearCart` - function for removing all items currently stored in cart
- `coupon` - reactive data object containing coupon details
- `applyCoupon` - function for applying coupon to cart
    - It takes one parameter:
    - `coupon` (String) The coupon string
- `removeCoupon` - function for removing coupon applied to cart
- `loading` - a reactive object containing information about loading state of the cart

## cartGetters

- `getTotals` - Return an object car totals
    - `total` (float) - The value of cart total
    - `subtotal` (float) - The value of cart sub total.
- `getShippingPrice` - To retrieve shipping price. 
- `getItems` - Return list of cart items.
- `getItemName` - Accept one parameter `product` and return the name of product.
- `getItemImage` - Accept one parameter `product` and return the image source URL of product.
- `getItemPrice` - Accept one parameter `product` and return the price of product.
- `getItemQty` - Accept one parameter `product` and return the quantity of product.
- `getItemAttributes` - Accept two parameter, `product` and `filterByAttributeName` (Optional). 
- `getItemSku` - Accept one parameter `product` and return the sku of product.
- `getFormattedPrice` Accept one parameter `product` and return the price of product with currency symbol.
- `getTotalItems` - To get the total numbers of cart items
- `getCheckoutUrl`- To retrieve the Shopify checkout URL. i.e. `https://vsf-next-pwa.myshopify.com/40719024288/checkouts/9882505fd32f9432c5b72e213ed0d7b8`
- `hasItemAttributes` - Check if product contains variant or not.

## Examples
Cart composable is a service designed for supporting a single cart and access it everywhere with ease. 
Initialization of a cart requires using `loadCart()` when calling `useCart()` for the first time. Keep in mind that upon
execution of `loadCart`, the cart will get loaded only once, if a wishlist has already been loaded, nothing happens.  

```javascript
import { onSSR } from '@vue-storefront/core';
import { useCart } from '@vue-storefront/shopify';

export default {
  setup() {
    const { cart, loadCart } = useCart();
    
    onSSR(async () => {
      await loadCart();
    });

    return {
      cart
    };
  }
};
```

Get the list of cart item objects, each one containing information about an item in the checkout.

```javascript
import { onSSR } from '@vue-storefront/core';
import { useCart } from '@vue-storefront/shopify';

export default {
  setup() {
    const { cart, loadCart } = useCart();
    
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const checkoutUrl = computed(() => cartGetters.getCheckoutUrl(cart.value));
    
    onSSR(async () => {
      await loadCart();
    });

    return {
      cart,
      products,
      totals,
      totalItems,
      checkoutUrl
    };
  }
};
```
