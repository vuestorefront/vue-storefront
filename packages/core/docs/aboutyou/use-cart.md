---
platform: AboutYouCloud
---


<IncludeContent content-key="use-cart" />

::: slot cart-interface
```javascript
export interface BasketResponseData<P = BapiProduct, V = Variant> {
    key: BasketKey;
    cost: BasketTotalPrice;
    currencyCode: "EUR";
    items: BasketItem<P, V>[];
    packages: BasketPackageInformation[];
}
export interface BasketItem<P = BapiProduct, V = Variant> {
    key: string;
    customData: unknown;
    packageId: number;
    price: {
        total: BasketItemPrice;
        unit: BasketItemPrice;
    };
    quantity: number;
    availableQuantity?: number;
    deliveryForecast?: {
        deliverable?: {
            quantity: number;
            key: string;
        };
        subsequentDelivery?: {
            quantity: number;
            key: string;
        };
    };
    status: "available" | "unavailable" | "deliverable" | "undeliverable" | "cancelled";
    product: P;
    variant: V;
    displayData: BasketItemDisplayData;
}
```
:::

::: slot cart-initialization
```javascript
import { onSSR } from '@vue-storefront/core';
import { useCart } from '@vue-storefront/about-you';

export default {
  setup() {
    const { cart, addToCart, removeFromCart, updateQuantity, loadCart } = useCart();

    onSSR(async () => {
      await loadCart();
    });

    return {
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
    };
  }
};
```
:::
