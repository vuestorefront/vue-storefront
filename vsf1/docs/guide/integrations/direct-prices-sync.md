# Direct prices sync with Magento

As you may have noticed in our architecture, we're synchronizing the whole product catalog with our Elasticsearch data store. There are some edge cases among industries where this kind of synchronization may lead to non-invalidated prices and stock quantity problems.

Regarding these challenges, we've introduced a special mode that allows vue-storefront to download the prices (in)directly from CMS (Magento or other).
To enable real-time prices sync, please change the following lines in the `config/local.json`

```json
    "products": {
      "preventConfigurableChildrenDirectAccess": true,
      "alwaysSyncPlatformPricesOver": true,
      "clearPricesBeforePlatformSync": true,
      "waitForPlatformSync": false,
      "endpoint": "http://localhost:8080/api/product"
    },
```

This means that each time vue-storefront is downloading the product feed from Elasticsearch, it will call the `vue-storefront-api` unified proxy method to get the prices in real time from Magento.

To use this feature, you should also modify `config/local.json` within your `vue-storefront-api` installation:

```json
	"tax": {
		"defaultCountry": "PL",
		"defaultRegion": "",
		"calculateServerSide": true,
		"alwaysSyncPlatformPricesOver": true
	  },
```

_Important note_: To use the dynamic Magento 2 prices sync, you should restore the database using `yarn restore` within the `vue-storefront-api` or re-run the `mage2vuestorefront` product sync, because an "ID" field has been added to the `configurable_children` products and it's required for the prices sync.
