## 1. Alteration-bundle dependency loading

- [x] 1.1 Update `useAlterationProductsLoader` so its alteration-bundle product request uses the catalog associated-product prefetch path while retaining its existing SKU collection, loading guard, and rush-addon load.
- [x] 1.2 Update `useOrderItemAlterationProductLoader` to use the same associated-product prefetch behavior while retaining its single-item guard and rush-addon load.

## 2. Preservation checks

- [x] 2.1 Verify that the shared option-value fallback remains unchanged for an unavailable associated product or localized price.
- [x] 2.2 Verify unaffected visible upgrades continue to render and price correctly, and verify cart amount, checkout total, resulting order total, and submission behavior are unchanged.
