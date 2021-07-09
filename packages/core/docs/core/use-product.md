# Products

* [Features](#features)
* [API](#api)

## Features

`useProduct` composition API function is responsible for fetching a list of products.

## API

`useProduct` contains the following properties:

- `search` - the main querying function that is used to query products from the eCommerce platform and populate the `products` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object,

<Content slot-key="search-params" />

- `products` - the main data object that contains an array of products fetched by `search` method,

- `loading` - a reactive object containing information about the loading state of your `search` method.
