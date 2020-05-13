# useCart composable

`useCart` composition API function is responsible, as it's name suggests, for interactions with cart in your eCommerce. This function returns following values:

- `search` - a main querying function that is used to query products from eCommerce platform and populate the `products` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object.

- `cart` - a main data object that contains cart structure in platform specific structure
<Content slot-key="cart-interface" />
- `addToCart` - function for adding products to the cart
- `updateQuantity` - function for updating quantity of a product that is already in the cart
- `removeFromCart` - function for removing a product that currently is in the cart
- `isOnCart` - function for checking if a product is currently in the cart
- `refreshCart` - function for (re)loading cart from backend
- `clearCart` - function for removing all items currently stored in cart
- `coupon` - reactive data object containing coupon details
- `applyCoupon` - function for applying coupon to cart
- `removeCoupon` - function for removing coupon applied to cart
- `loading` - a reactive object containing information about loading state of your `search` method

## Cart initialization
Cart composable is a service designed for supporting single cart and access it everywhere with ease. Initialization of cart happens automatically when calling `useCart()` for the first time.
<Content slot-key="cart-initialization" />