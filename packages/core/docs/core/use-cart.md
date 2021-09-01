# Cart

## Features

`useCart` composition function can be used to:

* load cart information,
* add, update and remove items to the cart,
* applying and removing coupons,
* checking if a product is already added to the cart.

## API

`useCart` contains the following properties:

- `cart` - a main data object that contains cart structure in platform specific structure
<Content slot-key="cart-interface" />
- `load` - a function required to fetch the cart from a server or create a new one if it doesn't exist.  
- `addToCart` - a function for adding products to the cart
- `updateQuantity` - a function for updating a quantity of a product that is already in the cart
- `removeFromCart` - a function for removing a product that currently is in the cart
- `isInCart` - a function for checking if a product is currently in the cart
- `clearCart` - a function for removing all items currently stored in the cart
- `coupon` - a reactive data object containing coupon details
- `applyCoupon` - a function for applying a coupon to the cart
- `removeCoupon` - a function for removing coupon applied to cart
- `loading` - a reactive object containing information about the loading state of the cart

## Usage

Cart composable is a service designed for supporting a single cart and access it everywhere with ease.
Initialization of a cart requires using `load()` when calling `useCart()` for the first time. Keep in mind that upon
execution of `load`, the cart will get loaded only once. If the cart has already been loaded, nothing happens.  

<Content slot-key="cart-initialization" />
