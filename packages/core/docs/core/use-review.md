# useReview composable

<Content slot-key="header-warning" />

`useReview` composition function can be used to fetch product reviews, average rating and rating distribution (number of reviews per rate) from the API.

## Properties

`useReview` contains following properties:

- `search` - function for fetching review data. When invoked, it requests data from the API and populates `reviews` property.

<Content slot-key="search-params" />

- `addReview` - function for posting new review. When invoked, it submits data to the API and populates `reviews` property with updated information.

<Content slot-key="add-params" />

- `reviews` - reactive data object containing response from the backend.

- `loading` - reactive object containing information about loading state of `search` and `addReview` methods.

- `error` - reactive object containing error message, if `search` or `addReview` failed for any reason.

## Getters

Because `reviews` property is a raw response with some additional properties, it's recommended to use `ReviewGetters` for accessing any data from it. It includes following helper functions:

- `getItems` - returns list of reviews.

- `getTotalReviews` - returns total number of reviews product has.

- `getAverageRating` - returns average rating from all reviews.

- `getRatesCount` - returns rating distribution (number of reviews per rate).

- `getReviewsPage` - returns current page, if results are paginated.

- `getReviewId` - returns unique ID from an individual review item.

- `getReviewAuthor` - returns author name from an individual review item.

- `getReviewMessage` - returns message from an individual review item.

- `getReviewRating` - returns rating from an individual review item.

- `getReviewDate` - returns creation date from an individual review item.

Interface for the above getter looks like this:

```typescript
interface ReviewGetters<REVIEW, REVIEW_ITEM> {
  // Getters for 'review' data object
  getItems: (review: REVIEW) => REVIEW_ITEM[];
  getTotalReviews: (review: REVIEW) => number;
  getAverageRating: (review: REVIEW) => number;
  getRatesCount: (review: REVIEW) => AgnosticRateCount[];
  getReviewsPage: (review: REVIEW) => number;

  // Getters for individual review items
  getReviewId: (item: REVIEW_ITEM) => string;
  getReviewAuthor: (item: REVIEW_ITEM) => string;
  getReviewMessage: (item: REVIEW_ITEM) => string;
  getReviewRating: (item: REVIEW_ITEM) => number;
  getReviewDate: (item: REVIEW_ITEM) => string;
}

interface AgnosticRateCount {
  rate: number;
  count: number;
}
```

<Content slot-key="usage" />

## Examples

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

<Content slot-key="integration-specific-examples" />