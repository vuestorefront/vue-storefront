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
import { onSSR } from '@vue-storefront/core';
import { useReview, reviewGetters } from '@vsf-enterprise/ct-reviews';

export default {
  setup() {
    const {
      reviews,
      search,
      loading,
      error
    } = useReview('<UNIQUE_ID>');

    // If you're using Nuxt or any other framework for Universal Vue apps
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