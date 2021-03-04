# `useReview` <Badge text="Enterprise" type="info" />

> This feature is a part of our commercial offering and does not exist in Open Source version of commercetools integration. Read more about a Vue Storefront Enterprise Cloud [here](https://www.vuestorefront.io/cloud)

## Features

`useReview` composable can be used to:

* fetch:
    * reviews list,
    * average rating,
    * rating distribution (number of reviews per rate).
* submit new reviews.

## API

- `search` - function for fetching review data. When invoked, it requests data from the API and populates `reviews` property. This method accepts a single params object. The `params` has the following option:

  - `searchParams: ReviewSearchParams`

```typescript
interface ReviewSearchParams {
  productId: string;
  limit?: number;
  offset?: number;
}
```

- `addReview` - function for posting new review. When invoked, it submits data to the API and populates `reviews` property with updated information. This method accepts a single params object. The `params` has the following options:

  - `params: ReviewAddParams`
  
  - `customQueryFn?: CustomQueryFn`

```typescript
interface ReviewAddParams {
  productId: string;
  limit?: number;
  offset?: number;
  draft: ReviewDraft;
}

interface ReviewDraft {
  authorName: string;
  text: string;
  rating: number;
}

type CustomQueryFn = (query, variables) => {
  query?;
  variables?;
}
```

- `reviews: Review[]` - reactive data object containing the response from the backend.

```ts
type Review = any;
```

- `loading: boolean` - reactive object containing information about loading state of `search` and `addReview` methods.

- `error: UseReviewErrors` - reactive object containing the error message, if `search` or `addReview` failed for any reason.

```ts
interface UseReviewErrors {
  search?: Error;
  addReview?: Error;
}
```

## Getters

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

```typescript
interface ReviewGetters {
  getItems: (review: ReviewResponse) => Review[];
  getTotalReviews: (review: ReviewResponse) => number;
  getAverageRating: (review: ReviewResponse) => number;
  getRatesCount: (review: ReviewResponse) => AgnosticRateCount[];
  getReviewsPage: (review: ReviewResponse) => number;
  getReviewId: (item: Review) => string;
  getReviewAuthor: (item: Review) => string;
  getReviewMessage: (item: Review) => string;
  getReviewRating: (item: Review) => number;
  getReviewDate: (item: Review) => string;
}

type ReviewResponse = {
  results: Review[],
  total: number;
  limit: number;
  offset: number;
  averageRating: number;
  ratingsDistribution: {
    [rating: number]: number;
  };
}

type Review = any;

interface AgnosticRateCount {
  rate: number;
  count: number;
}
```

## Example

```typescript
import { onSSR } from '@vue-storefront/core';
import { useReview, reviewGetters } from '@vsf-enterprise/commercetoolss';

export default {
  setup() {
    const {
      reviews,
      search,
      loading,
      error
    } = useReview('<CACHE_ID>');

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
