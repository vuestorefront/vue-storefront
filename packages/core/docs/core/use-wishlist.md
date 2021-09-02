# Wishlist

`useWishlist` composition API function is responsible, as its name suggests, for interactions with wishlist in your eCommerce. This function returns following values:

- `wishlist` - a main data object that contains wishlist structure in platform specific structure

<Content slot-key="wishlist-interface" />

- `load` - function required to fetch wishlist from a server or create brand new if it doesn't exist.  
- `addToWishlist` - function for adding products to the wishlist
- `removeFromWishlist` - function for removing a product that currently is in the wishlist
- `isInWishlist` - function for checking if a product is currently in the wishlist
- `clearWishlist` - function for removing all items currently stored in wishlist
- `loading` - a reactive object containing information about loading state of the wishlist

## Wishlist initialization

Wishlist composable is a service designed for supporting a single wishlist and access it everywhere with ease. 
Initialization of a wishlist requires using `load()` when calling `useWishlist()` for the first time. Keep in mind that upon
execution of `load`, the wishlist will get loaded only once, if a wishlist has already been loaded, nothing happens.  

<Content slot-key="wishlist-initialization" />


