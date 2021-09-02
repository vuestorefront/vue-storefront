# Wishlist

`useWishlist` composition API function is responsible, as its name suggests, for interactions with a wishlist in your eCommerce. This function returns the following values:

- `wishlist` - the main data object that contains wishlist structure in the platform-specific structure

<Content slot-key="wishlist-interface" />

- `load` - a function required to fetch the wishlist from a server or create a new one if it doesn't exist.  
- `addToWishlist` - a function for adding products to the wishlist
- `removeFromWishlist` - a function for removing a product that currently is on the wishlist
- `isInWishlist` - a function for checking if a product is currently on the wishlist
- `clearWishlist` - a function for removing all items currently stored on the wishlist
- `loading` - a reactive object containing information about the loading state of the wishlist

## Wishlist initialization

Wishlist composable is a service designed for supporting a single wishlist and access it everywhere with ease. 
Initialization of a wishlist requires using `load()` when calling `useWishlist()` for the first time. Keep in mind that upon
execution of `load`, the wishlist will get loaded only once. If the wishlist has already been loaded, nothing happens.  

<Content slot-key="wishlist-initialization" />


