# `useReview`

## When to use it?

Use `useReview` composition function can be used to:

- fetch:
  - reviews list,
  - average rating,
  - rating distribution (number of reviews per rate).
- submit new reviews.


## How to use it in your project?

```js
import { useReview, reviewGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup() {
    const {
      reviews,
      search,
      loading,
      error
    } = useReview('<UNIQUE_ID>');

    onSSR(async () => {
      await search({ productId: '<PRODUCT_ID>' });
    });

    return {
      reviews: computed(() => reviewGetters.getItems(reviews.value)),
      averageRating: computed(() => reviewGetters.getAverageRating(reviews.value)),
      totalReviews: computed(() => reviewGetters.getTotalReviews(reviews.value)),
      loading,
      error
    };
  }
};
```