# Cart module

This module contains all the logic, components and store related to review operations.

## Components

### AddReview.ts

This component represents a single button that when pressed adds a review.

**Methods**

- `addReview(review)` - adds review to the product.

### Review

Product page with reviews

**Computed**

- `reviews` - array of reviews that are currently for the product

## Store

Review Store is designed to handle all actions related product reviews.

### State

```js
  state: {
    items: [] // it is properly namespaced
  },
```

The review state data:

- `items` - reviews

### Events

The following events are published from `cart` store:

- `EventBus.$emit('notification-progress-start', Adding a review ...)` - fired to show review is being added

- `EventBus.$emit('notification-progress-stop')` - the event fired after review is submitted for moderation
