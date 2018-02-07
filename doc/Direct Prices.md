# Direct prices sync

As you may observed in our architecture we're synchronizing the whole product catalog with our Elastic Search data store. There are some edge casesamong industries when such kind of synchronization may lead to non-invalidated prices and stock quantity problems.

Regarding these challenges we've introduced a special mode which allows vue-storefront to download the prices (in)directly from CMS (Magento or other).

To enable real-time prices sync please do change the following lines in the `config/local.json`

```json
    "products": {
      "preventConfigurableChildrenDirectAccess": true,
      "alwaysSyncPlatformPricesOver": true,
      "clearPricesBeforePlatformSync": true,
      "waitForPlatformSync": false,
      "endpoint": "http://localhost:8080/api/product"
    },
```

This means that each time vue-storefront is downloading the product feed from Elastic Search it will call the `vue-storefront-api` unified proxy method to get the prices in real time from Magento.

To use this feature you should also modify `config/local.json` within your `vue-storefront-api` installation:

```json
	"tax": {
		"defaultCountry": "PL",
		"defaultRegion": "",
		"calculateServerSide": true,
		"alwaysSyncPlatformPricesOver": true
	  },  
```


*Important note*: As to use the dynamic Magento2 prices sync you should restore the database using `npm run restore` within the `vue-storefront-api`  or re-run `mage2vuestorefront` product sync, because a "id" field has been added to the `configurable_children` products and it's required for the prices sync
