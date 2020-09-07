# useCart composable

`useCart` composition API function is responsible, as its name suggests, for interactions with cart in your eCommerce. This function returns following values:

- `cart` - a main data object that contains cart structure in platform specific structure
<Content slot-key="cart-interface" />
- `loadCart` - function required to fetch cart from a server or create brand new if it doesn't exist.  
- `addToCart` - function for adding products to the cart
- `updateQuantity` - function for updating quantity of a product that is already in the cart
- `removeFromCart` - function for removing a product that currently is in the cart
- `isOnCart` - function for checking if a product is currently in the cart
- `clearCart` - function for removing all items currently stored in cart
- `coupon` - reactive data object containing coupon details
- `applyCoupon` - function for applying coupon to cart
- `removeCoupon` - function for removing coupon applied to cart
- `loading` - a reactive object containing information about loading state of the cart

## Cart initialization
Cart composable is a service designed for supporting a single cart and access it everywhere with ease. 
Initialization of a cart requires using `loadCart()` when calling `useCart()` for the first time. Keep in mind that upon
execution of `loadCart`, the cart will get loaded only once, if a wishlist has already been loaded, nothing happens.  
<Content slot-key="cart-initialization" />
