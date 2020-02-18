# E2E Tests with cypress.io

We use our own HTML Attribute `data-test-id` to identify elements in DOM to avoid duplicate id attributes.

This leads to a coding standard which contains that each new component gets its name as `data-test-id` attribute and important elements a own attribute with the components name as prefix. This way the `data-test-id` should always be pascal-case (camel-case with uppercase first letter).

## Namespacing

`data-test-id="ComponentName"`

For instance:
- `data-test-id="ProductTile"`
- `data-test-id="ProductListingWidget"`
- ...
