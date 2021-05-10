# Cart

[[toc]]

## Features

`useCart` composition function can be used to:

* load cart information,
* add, update and remove items to the cart,
* applying and removing coupons,
* checking if product is already added to the cart.

## API

`useCart` contains following properties:

- `cart` - a main data object that contains cart structure in platform specific structure
<Content slot-key="cart-interface" />
- `load` - function required to fetch cart from a server or create brand new if it doesn't exist.  
- `addToCart` - function for adding products to the cart
- `updateQuantity` - function for updating quantity of a product that is already in the cart
- `removeFromCart` - function for removing a product that currently is in the cart
- `isInCart` - function for checking if a product is currently in the cart
- `clearCart` - function for removing all items currently stored in cart
- `coupon` - reactive data object containing coupon details
- `applyCoupon` - function for applying coupon to cart
- `removeCoupon` - function for removing coupon applied to cart
- `loading` - a reactive object containing information about loading state of the cart

## Usage

Cart composable is a service designed for supporting a single cart and access it everywhere with ease.
Initialization of a cart requires using `load()` when calling `useCart()` for the first time. Keep in mind that upon
execution of `load`, the cart will get loaded only once, if a wishlist has already been loaded, nothing happens.  

<Content slot-key="cart-initialization" />
