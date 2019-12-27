# Order module

This module contains all the logic, components and store related to order operations.

## Components

### UserOrder

**Computed**

- `ordersHistory` - maps the value from `state.user.orders_history.items`
- `isHistoryEmpty` - checks if `state.user.orders_history.items` array is empty

**Methods**

- `reorder (products)` - iterates through passed 'products' array, adding each item to cart
- `skipGrouped (items)` - filters passed 'items' array returning only items without `parent_id`

### UserSingleOrder

**Computed**

- `ordersHistory` - maps the value from `state.user.orders_history.items`
- `order` - finds the order in the `orderHistory` computed property with an id matching to route `orderId` parameter
- `paymentMethod` - returns `payment.additional_information[0]` from the `order` computed property
- `billingAddress` - returns `billing_address` from the `order` computed property
- `shippingAddress` - returns `extension_attributes.shipping_assignments[0].shipping.address` from the `order` computed property
- `singleOrderItems` - returns ordered products without `parent_id`

**Methods**

- `remakeOrder (items)` - iterates through passed 'items' array, adding each item to cart as a single product
- `skipGrouped (items)` - filters passed 'items' array returning only items without `parent_id`

## Store

Order store is very simple, used just to pass the current order to the backend service.

## Actions

The order store provides following public actions:

### `placeOrder ({ commit }, order)`

The order object is queued in the local, indexedDb `ordersCollection` to be sent to the server.
Please take a look at the [Working with data](../data/data.md) for the details about data formats and how does `localForage` is being used in this project.
