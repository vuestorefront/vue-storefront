---
platform: Commercetools
---

<IncludeContent content-key="use-review" />

::: slot header-warning
::: warning Paid feature
This feature is part of the Enterprise version. Please [contact our team](https://www.vuestorefront.io/contact/sales) if you'd like to use it in your project.
:::

::: slot search-params

```typescript
interface ReviewSearchParams {
  productId: string;
  limit?: number;
  offset?: number;
}
```

:::

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

::: slot usage

## Usage

When `@vsf-enterprise/ct-reviews` plugin is installed as a dependency, it requires minor modifications in the code to work.

At the top of `script` tag in `Product.vue`, we're importing `useReview` and `reviewGetters` from `@vue-storefront/commercetools`. To use this plugin, simple import them from `@vsf-enterprise/ct-reviews` instead of `@vue-storefront/commercetools`:

```javascript
// Before
import { /* other imports */, useReview, reviewGetters } from '@vue-storefront/commercetools';

// After
import { /* other imports */ } from '@vue-storefront/commercetools';
import { useReview, reviewGetters } from '@vsf-enterprise/ct-reviews';
```

:::

::: slot integration-specific-examples
Providing custom GraphQL query and variables:

```typescript
await search(searchParams, (query, variables) => ({ query, variables }));
await addReview(addParams, (query, variables) => ({ query, variables }));
```

:::
