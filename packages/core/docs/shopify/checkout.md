# Checkout Flow
This tutorial shows a Shopify integrator how Storefront API are used in the lifecycle of an order, including creating
 cart, preparing for checkout and more order-related tasks. 

#### Before you begin
Let's know more about the Shopify Storefront API. Storefront API gives you full creative control to add Shopify 
buying experiences anywhere your customers are, including websites, apps, and video games. Access product 
information, create customer orders, and check out purchases programmatically. 

The Storefront API is composed of the following:

**Customers** - Information about customers in Shopify such as their shipping address and display name.

**Nodes** - Set of Shopify Storefront API root nodes, including Checkouts, Collections, Orders, Payments etc. See a 
complete list of nodes [here.](https://shopify.dev/docs/storefront-api/reference/object)

**Shops** - Shop information such as billing address, currency code, and domain.

Using the Storefront API, you can:

* Fetch data about a single product or a collection of products to display on any website or device.
* Create unique checkout experiences with full control over the shopping cart.
* Create new customers or modify existing ones, including address information.
* Allow customers to select unique product options.

This **5-step** tutorial generally takes 30 minutes to understand complete lifecycle of checkout.

### Step 1: Get Product
Retrieve the product information from Shopify store. Use the `useProduct` composable method to retrieve product by 
handle (url key) or product id.

This example fetch a single product by handle.
```typescript
import { computed } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useProduct, productGetters } from '@vue-storefront/shopify';

export default {
  setup(props, context) {
    const { products, search } = useProduct('products');
    const { slug } = context.root.$route.params;
    
    const product = computed(() => productGetters.getFiltered(products.value));

    onSSR(async () => {
      await search({ slug });
    });

    return {
      product
    };
  }
};
```

* [useProduct](/shopify/use-product) provides additional information about the product.

### Step 2: Add to cart
This step shows how to add a product to the cart. To add a product to a cart, you must provide product object and the
 quantity to `addToCart` method of `useCart` composable.

```typescript
import { useCart } from '@vue-storefront/shopify';
import { ref } from '@vue/composition-api';

export default {
  setup() {
    
    const qty = ref(1);
    const { addToCart } = useCart();

    return {
      addToCart,
      qty
    };
  }
};
```
Now, add the following line on your "Add to cart" button to trigger the `addToCart` event.

```
@click="addToCart(product, parseInt(qty))"
```

### Step 3: List cart item
Now that all the items have been added to the cart, then retrieve the cart to review all cart items and summary.
Use `loadCart` method of `useCart` to get the cart from Shop.

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

* [useCart](/shopify/use-cart) provides additional information about the cart.

### Step 4: Go to Checkout
In this step, redirect the customer on Shopify checkout page to complete the order. 

First, obtain the checkout URL from cart object.

```javascript
    const { cart, loadCart } = useCart();
    
    const checkoutUrl = computed(() => cartGetters.getCheckoutUrl(cart.value));

    onSSR(async () => {
      await loadCart();
    });

    return {
      cart,
      checkoutUrl
    };
```

The checkout URL look like the following:
```javascript
const checkoutUrl = 'https://vsf-next-pwa.myshopify.com/40719024288/checkouts/9882505fd32f9432c5b72e213ed0d7b8';
```

Now, add the following link on cart page.

```Vue
<template>
    <a :href="checkoutUrl" class="sf-button--full-width color-secondary">
        Go to checkout
    </a>
</template>
```

When you submit payment information, Shopify creates an order and sends an order confirmation to the customer.

### Step 5: Thank you page
Thank you page appears on placed order successfully but the customer still on Shopify website.
You've to edit the thank you page and following code to redirect them back to the frontend.
```javascript
const wrapper = document.querySelectorAll("header.main__header")[0].querySelectorAll(".logo");
if (wrapper) {
	const a = document.createElement('a');
	a.appendChild(document.createTextNode("Back To Home"));  
	a.title = "Back To Home";  
	a.classList.add('btn');
	a.classList.add('back-btn');
	a.href = "https://shopify.vuestorefront.io"; 
	wrapper[0].appendChild(a);	
}

setTimeout(function(){
  window.location.href="https://shopify.vuestorefront.io";
}, 5000);
```
You can edit above code as per your needs.

Shopify have a special section in the admin where you can enter that code so that it'll apply to the Thank You page. 
It's called, **"Additional Scripts."**

If you navigate to **Settings > Checkout** and scroll to the bottom of the Order Processing section, you'll find a 
text box where you can paste code into. 
