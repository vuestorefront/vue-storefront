# Introduction

Below you can find solutions for most common problems encountered in Vue Storefront.
If you solved any new issues by yourself please let us know on [slack](http://vuestorefront.slack.com) and we will add them to the list so others don't need to reinvent the wheel.

# Issues

### <a name="products-not-displayed"></a>Product not displayed (illegal_argument_exception)

See discussion in [#137](https://github.com/DivanteLtd/vue-storefront/issues/137)

### <a name="dynamic-pricing"></a>How to get dynamic prices to work (catalog rules)

After following the Tutorial on [how to connect to Magento2](https://medium.com/@piotrkarwatka/vue-storefront-how-to-install-and-integrate-with-magento2-227767dd65b2) the pricess are updated just after manually runing [mage2vuestorefront cli command](https://github.com/DivanteLtd/mage2vuestorefront).

However there is an option to get the prices dynamicaly. To do so you must change the config inside `conf/local.json` from the default (`conf/default.json`):

```json
"products": {
      "preventConfigurableChildrenDirectAccess": true,
      "alwaysSyncPlatformPricesOver": false,
      "clearPricesBeforePlatformSync": false,
      "waitForPlatformSync": false,
      "endpoint": "http://localhost:8080/api/product"
    },
    ```
    
to:

```json
"products": {
      "preventConfigurableChildrenDirectAccess": true,
      "alwaysSyncPlatformPricesOver": true,
      "clearPricesBeforePlatformSync": true,
      "waitForPlatformSync": false,
      "endpoint": "http://localhost:8080/api/product"
    },
```

To make it work you need have Magento2 oauth keys konfigured in your `vue-storefront-api` - `conf/local.json`.
This change means that each time product list will be displayed, VS will get the fresh prices directly from magento without the need to re-index ElasticSearch.

### <a name="no-products"></a>No products found! after node --harmony cli.js fullreindex

Take a look at the discussion at [#644](https://github.com/DivanteLtd/vue-storefront/issues/644)
Long story short -> you need to run the following command within the `mage2nosql` project:

```bash
node cli.js products --partitions=1
```

