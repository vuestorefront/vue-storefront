Fetching reviews for a single product:

```typescript
import { onSSR } from '@vue-storefront/core';
import { useReview, reviewGetters } from '@vsf-enterprise/ct-reviews';

export default {
  setup() {
    const {
      reviews: rawReviews,
      search,
      loading,
      error
    } = useReview('<CACHE_ID>');

    const reviews = computed(() => reviewGetters.getItems(rawReviews.value));
    const averageRating = computed(() => reviewGetters.getAverageRating(rawReviews.value));
    const totalReviews = computed(() => reviewGetters.getTotalReviews(rawReviews.value));

    // If you're using Nuxt or any other framework for Universal Vue apps
    onSSR(async () => {
      await search({ productId: '<PRODUCT_ID>' });
    });

    return {
      reviews,
      averageRating,
      totalReviews,
      loading,
      error
    };
  }
};
```
