# useProduct composable

`useProduct` composition API function is responsible, as it's name suggests for interactions with products from your eCommerce. This function returns following values:

- `search` - a main querying function that is used to query products from eCommerce platform and populate the `products` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object.

<Content slot-key="search-params" />

- `products` - a main data object that contains an array of products fetched by `search` method
- `loading` - a reactive object containing information about loading state of your `search` method
