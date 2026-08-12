## Context

Order History renders an alteration-product form from the alteration bundle recorded on each order item. The form resolves a visible option value's amount from the localized price of the product identified by that value's SKU. If that product is unavailable in the product cache, the shared resolver intentionally uses the price stored on the option value as a resilience fallback.

The Order History list loader and the single order-item customize-upgrades loader both fetch the alteration bundle with associated bundle-product prefetching disabled. Consequently, the catalog hook does not populate the product cache with the products linked by the alteration bundle's option values. This most visibly affects Sneak Peek, but the loading contract applies to every displayed alteration-bundle option value.

Catalog's existing associated-bundle prefetch path fetches a bundle's linked products and registers each one in `product/getProductBySkuDictionary`. It is already used by the Petsies multi-product flow and is the narrowest way to restore the form's required price inputs.

## Goals / Non-Goals

**Goals:**

- Ensure that a client-side load of an alteration bundle also loads its linked option-value products before the alteration form depends on their localized prices.
- Apply identical dependency loading to the Order History list and single-item customize-upgrades entry points.
- Preserve localized-price resolution when a linked product is available and retain the existing fallback in generic contexts where it is not.

**Non-Goals:**

- Changing the shared option-value price resolver, bundle option data, or product-price calculation.
- Altering cart contents, checkout totals, order totals, saved configuration values, or submission behavior.
- Replacing the catalog associated-product prefetch mechanism or adding a backend endpoint.

## Decisions

### Re-enable associated bundle-product prefetching in both alteration loaders

Change each alteration loader's `product/findProducts` request to opt into `prefetchGroupProducts`. The catalog action will then configure the alteration bundle, fetch products referenced by its bundle links, and register those products in the standard product-by-SKU dictionary before the loader completes. The form's existing reactive price calculation can consequently use the referenced product's localized price without any presentation-layer exception for Sneak Peek.

An alternative is to parse every bundle option in the alteration loaders and issue a separate SKU query for its values. That would duplicate catalog associated-product logic, increase the chance of incomplete traversal as bundle structures evolve, and create separate cache-registration behavior. Altering the resolver to reject or override its fallback would affect unrelated customization and cart displays that deliberately depend on its resilience behavior.

### Keep both loading entry points behaviorally aligned

Apply the prefetch option to `useAlterationProductsLoader` and `useOrderItemAlterationProductLoader`. The first serves the Order History list, while the second backs the dedicated customize-upgrades route; fixing only the list would leave the same incomplete dependency contract in the single-item path.

An alternative is to factor the request construction into a new shared abstraction. The two helpers have different SKU collection and loading conditions, and this small aligned option change does not justify expanding their coupling.

## Risks / Trade-offs

- [Associated product prefetch adds catalog requests and payload on alteration-bundle loads] → Limit it to the two alteration loaders and reuse the catalog's existing bundle-link batching behavior.
- [A linked product is unavailable or lacks localized pricing] → Retain the shared fallback so the existing resilient behavior continues outside the corrected loading path.

## Migration Plan

1. Deploy the client-side alteration-loader change.
2. If unexpected catalog-load overhead or a regression occurs, revert the two loader prefetch-option changes; no persisted data, backend migration, or cache-schema migration is involved.
