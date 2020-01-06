# Vuex conventions

## Module
The Vuex module should be created for a specific set of functionalities. It should also have only absolutely necessary dependencies to other modules. The name of module should be short, quite clear about it’s destination, and have words separated by a dash.

Good examples:

- products
- product
- user
- checkout
- compare-products
- notifications
- order

Bad examples:

- next-module
- compare (because it’s not saying what it compares)

## State
State properties should be simple and their structure should not be nested. Their names are written in underscore-case notation and indicate what they contain. We should avoid having more than one instance of an object, even between modules. In the vast majority of cases, they can be referenced by their unique ID property. Example:

```
{
  "products_map": {
    "WS08": {
      "sku": "WS08",
      "name": "Minerva LumaTech&trade; V-Tee"
      // other options
    },
    "WS12": {
      "sku": "WS12",
      "name": "Radiant Tee"
      // other options
    },
    "WS08-XS-Black": {
        "sku": "WS08-XS-Black",
        "name": "Minerva LumaTech&trade; V-Tee"
        // other options
    }
    // maaaaaaaany more products
  },
  "current_product_id": "WS08-XS-Black",
  "wishlist": ["MP01-32-Black", "MSH05-32-Black"],
  "cart_items": [
    {
      "sku": "WH09-XS-Green",
      "qty": 3
    },
    {
      "sku": "WH09-S-Red",
      "qty": 1
    }
  ]
}
```

Good examples:

 - categories_map
- current_category_id
- order
- product_parent_id

Bad examples
- list
- elements

```
filters: {
  available: {},
  chosen: {}
},
```

## Getters
The Vuex state, except of mutations, should always be accessed by getters, including actions. Getter should:

* Start from `is` when returns Boolean, or `get` otherwise
* Answer to question `what am I returning?`
* Contain module name to ensure that getter is unique through whole Vuex, but it doesn’t have to start with that name. First, it should have a natural name, so for example we have module `category` and in the state `availableFilters`. So `what am I returning?` -> `available Filters` and these filters are `category filters`. It's not a Boolean, it’s an array or map so we’re starting with `get` -> `getAvailableCategoryFilters`

Good examples:

- For state user -> isUserLoggedIn, getUser
- For state availableFilters -> getAvailableCategoryFilters
- For state currentProductId -> getCurrentProduct (because it gets product object from map), getCurrentProductId

Bad examples:

- totals
- product
- current
- list

## Actions

Every state change from outside of a module should be invoked as an action. Actions are meant to:

- Fetch something from the server(or cache) — in this case, they have to be asynchronous (return promise).
- Mutate state of current module.
- Dispatch actions from the same module (to avoid repeating logic).
- Dispatch actions from another module (only if it’s absolutely required).
- Their names should be as unique as possible and simply describe what specific action will happen. **Almost every action should return promise.** We allow you to replicate conventions for existing methods like list or single in new modules to have a consistent API.

Good examples:

- fetchProduct - Gets product by ID from server or cache, sets it in products map, and returns it by getter.
- findProducts - Fetches products by specific query, sets them in products map, and returns them as array.
- setCurrentProduct - Param could be ID, it could dispatch fetchProduct, mutate it to productsMap, and mutate its ID to currentProductId. Also if productId is null, then it removes currentProduct.
- addCartItem
- toggleMicrocart

Bad examples:

- products
- reset

## Mutations

Finally we have mutations. Only mutations can change the state of the module. They should be synchronous (never return promise), not contain any logic (be extremely fast), except one needed to keep the state as it should be (for example, sets default value for state). Mutations should be invoked only by actions from the same module. In most cases, it should only be a single action that invokes a specific mutation. Types of mutations:

- SET_ - The most common type of mutation. It can set an object (or whole array), set default value of object (or maybe clean array),
- ADD_ - It can add a new element to the state property, which is an array or add new element to map.
- REMOVE_ - An opposite to ADD. It can remove the map element or array element by index (or by finding object, which is not recommended on big arrays, as mutation could be slow).

Good examples:

- ADD_PRODUCT
- SET_CURRENT_PRODUCT_ID
- ADD_CATEGORY_FILTER
- REMOVE_WISHLIST_PRODUCT_ID

Bad examples:

- CATEGORY_UPD_CURRENT_CATEGORY
- TAX_UPDATE_RULES
