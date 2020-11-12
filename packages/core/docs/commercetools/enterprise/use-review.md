---
platform: Commercetools
---

# Reviews

[[toc]]

## Features

<IncludeContent content-key="useReview/features" />

## API

<IncludeContent content-key="useReview/api" />

## Getters

<IncludeContent content-key="useReview/getters" />

## Usage

When you already installed `@vsf-enterprise/ct-reviews` as a dependency, there are few minor modifications required to make it work.

The first step is to add `@vsf-enterprise/ct-reviews` to `build > traspile` array in `nuxt.config.js`.

Then we need to replace the import of `useReview` and `reviewGetters` everywhere they are used from `@vue-storefront/commercetools` to `@vsf-enterprise/ct-reviews`:

```javascript
// Before
import { /* other imports */, useReview, reviewGetters } from '@vue-storefront/commercetools';

// After
import { /* other imports */ } from '@vue-storefront/commercetools';
import { useReview, reviewGetters } from '@vsf-enterprise/ct-reviews';
```

## Examples

<IncludeContent content-key="useReview/examples" />

Providing custom GraphQL query and variables:

```typescript
await search(searchParams, (query, variables) => ({ query, variables }));
await addReview(addParams, (query, variables) => ({ query, variables }));
```

<!---------------------------------------------------- SLOTS ---------------------------------------------------->

<!---------------------- SLOT: search-params ---------------------->
::: slot search-params

```typescript
interface ReviewSearchParams {
  productId: string;
  limit?: number;
  offset?: number;
}
```

:::

<!---------------------- SLOT: add-params ---------------------->
::: slot add-params

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
```

:::
