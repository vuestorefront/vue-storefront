# Release Notes and Migration Guides

To make sure that the adopters of our products and integrations can always use the latest and greaters versions we implemented a standarization for Release Notes and Migration Guides. The goal is to make the migration process to the newer version of each package as smooth and effortless as possible.



---
## Reference Release Notes

## `@vue-storefront/unified-data-model@2.0.0`  (3.12.2023)

* :badge{label="ADDED" type="info"} [`getPhysicalStores`]() method that allows fetching a list of physical stores and filtering it by their location.
```js
// get list of physical stores in germany, "commerce" can be replaced with any eCommerce platform tag
const storesInGermany = sdk.commerce.getPhysicalStores({ location: 'germany'})
```
* :badge{label="CHANGED" type="warning"} :badge{label="BREAKING" type="error"} We moved [`getPhysicalStores`]() filtering to the filter properly to avoid breaking changes in the future and be able to include non-filter parameters 
```js
// Before, filters passed as main parameter
const storesInGermany = sdk.commerce.getPhysicalStores({ location: 'germany'})

// After, filters passed into `filter` parameter
const storesInGermany = sdk.commerce.getPhysicalStores({ filter: { location: 'germany'} })
```
* :badge{label="FIXED" type="info"} [`getPhysicalStores`]() method was returning an empty list of filters were provided. Now, the filtering works correctly.
- :badge{label="REMOVED" type="error"} :badge{label="BREAKING" type="error"} [`getPhysicalStores`]() method was removed from the Middleware and SDK. This method almost always resulted in overfetching as product description usually comes along with the product data or from the CMS. You can use description field from the [`SfProduct`]() object returned by [`getProduct`]() and [`getProducts`]().

### Migration guide


* Update all occurrences of `getPhysicalStores` method that use filtering to use new filter attribute:

```js
// Before, filters passed as main parameter
const storesInGermany = sdk.commerce.getPhysicalStores({ location: 'germany'})

// After, filters passed into `filter` parameter
const storesInGermany = sdk.commerce.getPhysicalStores({ filter: { location: 'germany'} })
```
* Use description field from `getProduct` response instead of `getProductDescription` method.
```js
// "commerce" can be replaced with any eCommerce platform tag
// Before, use getProductDescription to fetch product description
const desription = sdk.commerce.getProductDescription({ productId: '123' })

// After, use getProduct to fetch full product data and extratc description
const product = sdk.commerce.getProduct({ id: '123'})
const description = product.description
```
* Update your API Client 
    * `@vsf-enterprise/sapcc@3.0.2` - [Migration Guide]()
    * `@vsf-enterprise/commercetools@7.2.0` - [Migration Guide]()
    * `@vsf-enterprise/sapcc-api@3.3.2` - [Migration Guide]()
    * `@vsf-enterprise/commercetools-api@3.2.0` - [Migration Guide]()