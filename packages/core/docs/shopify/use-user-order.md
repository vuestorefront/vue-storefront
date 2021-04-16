# useUserOrder composable

`useUserOrder` composition API function is responsible, as it's name suggests for interactions with user's order history from your eCommerce. This function returns following values:

- `searchOrders` - a main querying function that is used to query user's order history from eCommerce platform and populate the `orders` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object.
- `orders` - a main data object that contains an array of orders fetched by `searchOrders` method
```typescript
export type Maybe<T> = T | null;

export type Price = {
  amount: Maybe<number>;
  currencyCode: Maybe<string>;
}

export type Order = {
  name?: Maybe<string>;
  totalPriceV2?: Maybe<Price>;
  processedAt?: Maybe<string>;
  financialStatus?: Maybe<string>;
  lineItems?: Maybe<OrderItem[]>;
}

export type OrderItem = {
  sku?: Maybe<string>;
  originalTotalPrice?: Maybe<Price>;
  quantity?: Maybe<number>;
  title?: Maybe<string>;
}
```
- `loading` - a reactive object containing information about loading state of your `searchOrders` method

## Example

The list of orders associated with the customer.

```javascript
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useUserOrders } from '@vue-storefront/shopify';

export default {
  setup() {
    const { orders, searchOrders } = useUserOrders();

    onSSR(async () => {
      await searchOrders();
    });

    return {
      orders: computed(() => orders ? orders.value : [])
    };
  }
};
```
