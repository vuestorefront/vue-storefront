`useReview` contains following properties:

- `search` - function for fetching review data. When invoked, it requests data from the API and populates `reviews` property.

<Content slot-key="search-params" />

- `addReview` - function for posting new review. When invoked, it submits data to the API and populates `reviews` property with updated information.

<Content slot-key="add-params" />

- `reviews` - reactive data object containing response from the backend.

- `loading` - reactive object containing information about loading state of `search` and `addReview` methods.

- `error` - reactive object containing error message, if `search` or `addReview` failed for any reason.
