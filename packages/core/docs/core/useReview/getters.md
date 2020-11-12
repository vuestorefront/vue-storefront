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
