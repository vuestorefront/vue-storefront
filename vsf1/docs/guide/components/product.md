# Core Product Page

## Props

No props

## Data

- `loading` - If `true` this indicates the product is currently being loaded from the backend.
- `favorite` - An object that defines 1) if the current product is in the list of favorite products and 2) the name of an icon that will be shown to indicate its status in relation to being in the list of favorite products.
- `compare` - Defines if the current product is in compare list.
- `product` -A computed property that represents the current product that is shown on the page. Initially gets its value from `product/getCurrentProduct` Vuex store getter. Includes all the options like size and color that the user sets on the page.
- `originalProduct` - A computed property that represents the current product in its initial state. Gets its value from`product/getOriginalProduct` Vuex store getter.
- `parentProduct` - A computed property that represents the current product parent product, if any. Gets its value from `product/getParentProduct` Vuex store getter.
- `attributesByCode` - A computed property that returns the list of all product attributes by their code. Gets its value from `attribute/attributeListByCode` Vuex store getter.
- `attributesById` - A computed property that returns the list of all product attributes by their ID. Gets its value from `attribute/attributeListById` Vuex store getter. **This prop is not used anywhere**.
- `breadcrumbs` - A computed property that represents breadcrumbs for the current product. Gets its value from `category-next/getBreadcrumbs` Vuex store getter.
- `configuration` - A computed property that represents an object that shows which attributes (like size and color) are chosen on the product. Gets its value from `product/getCurrentProductConfiguration` Vuex store getter.
- `options` - A computed property that represents an object that shows what attributes (like size and color) with what values are available on the product. Gets its value from `product/getCurrentProductOptions` Vuex store getter.
- `category` - A computed property representing a category object of the current product. Gets its value from `category/getCurrentCategory` Vuex store getter.
- `productName` - A computed property that represents a product name. Gets its value from `category/getCurrentCategory` Vuex store getter.
- `productId` - A computed property representing a product ID. Gets its value from `category/getCurrentCategory` Vuex store getter.
- `isOnCompare` - A computed property that checks if a given product is in compare list.
- `image` - A computed property that defines an image (thumbnail) that will be shown on the page and its size.
- `customAttributes` - this is a subset of `attributesByCode` list of attributes that the current product has.

## Methods

### Unbound methods

#### filterChanged (filterOption)

Sets attributes on the product according to what the user has chosen on the page. Dispatches `product/configure` action.

:::tip Note
This method is called when the 'filter-changed-product' event is triggered, but it's not triggered anywhere in the code.
:::

_Parameters_

- `filterOption` - An object that represents an attribute that has changed on the product.

#### fetchData (store, route)

Fetches current product data from the backend by dispatching the product/single action. Also dispatches several other actions to get breadcrumbs, product attributes, variants for a configurable product, and to set sub-products if the product is grouped.

_Parameters_

- `store` - Vuex store
- `route` - global router object

#### loadData ({ store, route })

Dispatches `product/reset` action that sets the current product to the original product, nullifies all the configuration and options, then calls the `fetchData` method to load current product data.

_Parameters_

- `{store, route}` - An object that consists of references to the Vuex store and global router object.

#### stateCheck

If the current product has a parent, redirects to a parent product page, then check if the current product is in the wishlist or in the compare list, and set `favorite` and `compare` props accordingly.

_Parameters_
No parameters

### Bound methods

#### validateRoute

This method is called whenever the global `$route` object changes its value. Calls `loadData` and `stateCheck` methods.

_Parameters_
No parameters

#### addToList

Adds the current product to the compare by dispatching `compare/addItem` action accordingly.

_Parameters_

- `list` - compare

#### removeFromList

Removes the current product from the compare by dispatching `compare/removeItem` action accordingly.

_Parameters_

- `list` - compare

## Hooks

### asyncData

Since the app is using SSR, this method prefetches and resolves the asynchronous data before rendering happens and saves it to the Vuex store. On the Product page, this is done by calling the `loadData` method.

The `asyncData` fires the `product-after-load` event which can be used to populate the Vuex SSR store for additional data regarding the product.

### beforeMount

Calls `stateCheck` method. Defines `product-after-priceupdate` event listener which, if triggered, dispatches `product/setCurrent` action that sets current product object in Vuex store. Also defines `filter-changed-product` event listener, which, if triggered, calls `filterChanged` method. **Currently 'filter-changed-product' event is not triggered anywhere.**

### beforeDestroy

Removes event listeners that were defined in `beforeMount` hook.
