# Vuex conventions

## Module
Vuex module should be created for specific set of functionalities. Should also have only absolutely necessary dependencies to other modules.
Name of module should be short, quite clear about it’s destination and has words separated by dash.

Good examples:
* products
* product
* user
* checkout
* compare-products
* notifications
* order

Bad examples:
* next-module
* compare (because it’s not saying what its compare)

## State
State properties should be simple and their structure should not be nested.  Their names are written in underscore case notation and indicates what they are containing.
We should avoid to have more than one instance of object, even between modules. In the vast majority of cases they can be referenced by it’s unique id property. Example:
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
* categories_map
* current_category_id
* order
* product_parent_id

Bad examples 
* list
* elements
```
filters: {
  available: {},
  chosen: {}
},
```

## Getters
Vuex state, except of mutations, should always be accessed by getters. Including actions.
Getter should:
* start from `is` when returns Boolean, or `get` otherwise
* answer to question `what am I returning?`
* contain module name to ensure that getter is unique through whole vuex. But I doesn’t have to start with that name - first of all it should have natural name.
So for example we have module `category` and in state `availableFilters`. So `what am I returning?` -> `available Filters`. And this filters are `category filters` . Its not a Boolean, it’s array or map so we’re starting with `get` -> `getAvailableCategoryFilters`

Good examples:
* for state user -> isUserLoggedIn, getUser
* for state availableFilters -> getAvailableCategoryFilters
* for state currentProductId -> getCurrentProduct (because it gets product object from map), getCurrentProductId

Bad examples:
* totals
* product
* current
* list

## Actions
It’s a heart of logic for module. Every state change from outside of module should be invoked as an action. Actions are meant to:
* fetch something from server(or cache) - in this case they have to be asynchronous (return promise)
* mutate state of current module
* dispatch actions from same module (to avoid repeating logic)
* dispatch actions from another modules (only if it’s absolutely required)

Their names should most possibly be unique and in simple way says what specific action is doing. **Almost every action should return promise**.
We allow to replicate convention for existing methods like `list` or `single` in new modules to have consistient api.

Good examples:
* fetchProduct - gets product by id from server or cache, sets it in products map and returns it by getter
* findProducts - fetches products by specific query, sets them in products map and returns them as array
* setCurrentProduct - param could be id, it could dispatch `fetchProduct`, mutate it to productsMap and mutate its id to currentProductId. Also if productId is null then it removes currentProduct.
* addCartItem
* toggleMicrocart

Bad examples:
* products
* reset

## Mutations
Finally we have mutations. Only mutations can change state of module. They should be synchronous (never returns promise), not contain any logic (be extremely fast) except one needed to keep state as it should be (for example sets default value for state). Mutations should be invoked only by actions from the same module. In most cases it should be only a single action which invokes specific mutation.
Types of mutation:
* SET_ - it’s the most common type of mutation. It can set an object (or whole array), set default value of object (or maybe clean array), 
* ADD_ - it can add new element to state property which is an array or add new element to Map
* REMOVE_ - an opposite to ADD. It can remove map element or array element by index (or by finding object which is not recommended way on big arrays, then mutation could be slow)

Good examples:
* ADD_PRODUCT
* SET_CURRENT_PRODUCT_ID
* ADD_CATEGORY_FILTER
* REMOVE_WISHLIST_PRODUCT_ID

Bad examples:
* CATEGORY_UPD_CURRENT_CATEGORY
* TAX_UPDATE_RULES
