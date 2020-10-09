# Multistore Magento 2 support

Vue Storefront supports Magento Multistore installations

## Multiwebsite indexing

Multiwebsite support starts with the Elasticsearch indexing. Basically, each store has its own Elasticsearch index and should be populated separately using the [mage2vuestorefront](https://github.com/DivanteLtd/mage2vuestorefront) tool.

:::warning

Using node indexer to enable _multistore_ feature for _Vue Storefront_ has been deprecated. 
You can use _Bridge Indexer_ for the better performance and maintainability. For Magento 2, you can find it [here](https://github.com/DivanteLtd/magento2-vsbridge-indexer)
:::

The simplest script to index multi site:

```bash
export TIME_TO_EXIT=2000
export MAGENTO_CONSUMER_KEY=byv3730rhoulpopcq64don8ukb8lf2gq
export MAGENTO_CONSUMER_SECRET=u9q4fcobv7vfx9td80oupa6uhexc27rb
export MAGENTO_ACCESS_TOKEN=040xx3qy7s0j28o3q0exrfop579cy20m
export MAGENTO_ACCESS_TOKEN_SECRET=7qunl3p505rubmr7u1ijt7odyialnih9

echo 'German store - de'
export MAGENTO_URL=http://demo-magento2.vuestorefront.io/rest/de
export INDEX_NAME=vue_storefront_catalog_de

node --harmony cli.js categories --partitions=1 --removeNonExistient=true
node --harmony cli.js productcategories --partitions=1
node --harmony cli.js attributes --partitions=1 --removeNonExistient=true
node --harmony cli.js taxrule --partitions=1 --removeNonExistient=true
node --harmony cli.js products --partitions=1 --removeNonExistient=true

echo 'Italian store - it'
export MAGENTO_URL=http://demo-magento2.vuestorefront.io/rest/it
export INDEX_NAME=vue_storefront_catalog_it

node --harmony cli.js categories --partitions=1 --removeNonExistient=true
node --harmony cli.js productcategories --partitions=1
node --harmony cli.js attributes --partitions=1 --removeNonExistient=true
node --harmony cli.js taxrule --partitions=1 --removeNonExistient=true
node --harmony cli.js products --partitions=1 --removeNonExistient=true

echo 'Default store - in our case United States / en'
export MAGENTO_URL=http://demo-magento2.vuestorefront.io/rest
export INDEX_NAME=vue_storefront_catalog

node --harmony cli.js categories --partitions=1 --removeNonExistient=true
node --harmony cli.js productcategories --partitions=1
node --harmony cli.js attributes --partitions=1 --removeNonExistient=true
node --harmony cli.js taxrule --partitions=1 --removeNonExistient=true
node --harmony cli.js products --partitions=1 --removeNonExistient=true
```

As you can see, it's just an **IT** or **DE** store code that is added to the base Magento 2 REST API URLs that makes the difference, and then the **INDEX_NAME** set to the dedicated index name.

In the result, you should get:

- _vue_storefront_catalog_it_ - populated with the "it" store data
- _vue_storefront_catalog_de_ - populated with the "it" store data
- _vue_storefront_catalog_ - populated with the "default" store data

Then, to use these indexes in Vue Storefront, you should index the database schema using the `vue-storefront-api` db tool:

```bash
yarn db rebuild -- --indexName=vue_storefront_catalog_it
yarn db rebuild -- --indexName=vue_storefront_catalog_de
yarn db rebuild -- --indexName=vue_storefront_catalog
```

## Vue Storefront and Vue Storefront API configuration

After this sequence of command, you may add the available ES index to your `vue-storefront-api/config/local.json`:

```json
{
    "server": {
      "host": "localhost",
      "port": 8080
    },
	"esHost": "localhost:9200",
	"esIndexes": [
		"vue_storefront_catalog",
		"vue_storefront_catalog_de",
		"vue_storefront_catalog_it"
	],
	"availableStores": [
		"de", "it"
	],

```

The last thing is to change the `vue-storefront/config/local.json` to configure the storeViews that are available.

```json
    "storeViews": {
      "multistore": false,
      "mapStoreUrlsFor": ["de", "it"],
      "de": {
        "storeCode": "de",
        "storeId": 3,
        "name": "German Store",
        "url": "/de",
        "elasticsearch": {
          "host": "localhost:8080/api/catalog",
          "index": "vue_storefront_catalog_de"
        },
        "tax": {
          "defaultCountry": "DE",
          "defaultRegion": "",
          "sourcePriceIncludesTax": false,
          "calculateServerSide": true,
          "userGroupId": null,
          "useOnlyDefaultUserGroupId": false,
          "deprecatedPriceFieldsSupport": true,
          "finalPriceIncludesTax": false
        },
        "i18n": {
          "defaultCountry": "DE",
          "defaultLanguage": "DE",
          "availableLocale": [
            "de-DE"
          ],
          "defaultLocale": "de-DE",
          "currencyCode": "EUR",
          "currencySign": "€",
          "currencyDecimal": "",
          "currencyGroup": "",
          "fractionDigits": 2,
          "priceFormat": "{sign}{amount}",
          "dateFormat": "HH:mm D/M/YYYY",
          "fullCountryName": "Deutschland",
          "fullLanguageName": "German",
          "bundleAllStoreviewLanguages": false
        }
      },
      "it": {
        "storeCode": "it",
        "storeId": 4,
        "name": "Italian Store",
        "url": "/it",
        "elasticsearch": {
          "host": "localhost:8080/api/catalog",
          "index": "vue_storefront_catalog_it"
        },
        "tax": {
          "defaultCountry": "IT",
          "defaultRegion": "",
          "sourcePriceIncludesTax": false,
          "calculateServerSide": true,
          "userGroupId": null,
          "useOnlyDefaultUserGroupId": false,
          "deprecatedPriceFieldsSupport": true,
          "finalPriceIncludesTax": false
        },
        "i18n": {
          "defaultCountry": "IT",
          "defaultLanguage": "IT",
          "availableLocale": [
            "it-IT"
          ],
          "defaultLocale": "it-IT",
          "currencyCode": "EUR",
          "currencySign": "€",
          "currencyDecimal": "",
          "currencyGroup": "",
          "fractionDigits": 2,
          "priceFormat": "{sign}{amount}",
          "dateFormat": "HH:mm D/M/YYYY",
          "fullCountryName": "Italy",
          "fullLanguageName": "Italian",
          "bundleAllStoreviewLanguages": false
        }
      }
    },
```

:::tip
You can find more options available to _multistore_ features in [store view](/guide/basics/configuration.html#store-views) section of _Configuration File Explained_. 
:::

After these changes, you'll have a `LanguageSwitcher` component visible on the bottom.

By default, the language / store is switched by the URL prefix:

- `http://localhost:3000` is for the default store
- `http://localhost:3000/it` will switch the store to the Italian one
- `http://localhost:3000/de` will switch the store to the German one one

General URL format is:
`http://localhost:3000/{storeCode}`

The storeCode may be switched by ENV variable set before running `yarn dev` / `yarn start`:

- `export STORE_CODE=de && yarn dev` will run the shop with the `de` shop loaded

Another option, useful when using multistore mode with the NGINX/varnish mode, is to set the shop code by the `x-vs-store-code` http reqeuest header.

## Changing the UI for specific store views

If you would like to modify the routes or change some particular components regarding the current locale (for example, a different checkout in the German store), please take a look at: `src/themes/default/index.js`:

```js
export default function(app, router, store) {
  // if youre' runing multistore setup this is copying the routed above adding the 'storeCode' prefix to the URLs and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please execlude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the URLs by Your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  router.addRoutes(routes);
  setupMultistoreRoutes(config, router, routes);
  store.registerModule('ui', UIStore);
}
```

Another option is to create a separate theme for a specific storeview. Runtime theme changes are not possible, as themes are compiled in the JS bundles by webpack during the page build process. In that case, you should run separate instances of `vue-storefront` having the proper theme set in the `config/local.json` file.

## Localized routes

The route switching mechanism by default works on the URL level. Please use the `localizedRoute` mixin:

```vue
<router-link :to="localizedRoute(page.link)" class="cl-accent relative">{{
  page.title
}}</router-link>
```

or

```vue
<router-link
  :to="
    localizedRoute({
      name: product.type_id + '-product',
      params: {
        parentSku: product.parentSku ? product.parentSku : product.sku,
        slug: product.slug,
        childSku: product.sku,
      },
    })
  "
></router-link>
```

## Useful _Helpers_

### How to get current store view?

Here is a helper method to get the value of current store view.

You just need to import `currentStoreView` function from `core/lib/multistore` as example follows: 

```js
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
// ... abridged 
  return {
    currency: currentStoreView().i18n.currencyCode,
    value: method.price_incl_tax
  }
```

`currentStoreView()` will return the object value you set in `local.json` - it should be type of StoreView or extended StoreView.
```ts
interface StoreView {
  storeCode: string,
  extend?: string,
  disabled?: boolean,
  storeId: any,
  name?: string,
  url?: string,
  appendStoreCode?: boolean,
  elasticsearch: {
    host: string,
    index: string
  },
  tax: {
    sourcePriceIncludesTax?: boolean,
    finalPriceIncludesTax?: boolean,
    deprecatedPriceFieldsSupport?: boolean,
    defaultCountry: string,
    defaultRegion: null | string,
    calculateServerSide: boolean,
    userGroupId?: number,
    useOnlyDefaultUserGroupId: boolean
  },
  i18n: {
    fullCountryName: string,
    fullLanguageName: string,
    defaultLanguage: string,
    defaultCountry: string,
    defaultLocale: string,
    currencyCode: string,
    currencySign: string,
    currencyDecimal: string,
    currencyGroup: string,
    fractionDigits: number,
    priceFormat: string,
    dateFormat: string
  },
  seo: {
    defaultTitle: string
  }
}
```

### How to remove store code from route

When you need to remove `storeCode` from route in such a case you want to route to default store by mapping fallback, use `removeStoreCodeFromRoute` as following example : 

```js
import { removeStoreCodeFromRoute } from '@vue-storefront/core/lib/multistore'
// ... abridged 
    const urlWithoutStorecode1 = removeStoreCodeFromRoute('/gb/home'); // should return '/home`
    const urlWithoutStorecode2 = removeStoreCodeFromRoute('gb/home'); // should return 'home`
    const urlWithoutStorecode3 = removeStoreCodeFromRoute({
      path: '/gb/home'
    }); // should return '/home`
``` 

### Update/append a store code to your URL
If you need to append or update `storeCode` query parameter in provided URL you can do it by calling `adjustMultistoreApiUrl` function as following example:

```js
import { adjustMultistoreApiUrl } from '@vue-storefront/core/lib/multistore'

// ... abridged 
// Let's say current storeCode is `de`
const myUrl1 = adjustMultistoreApiUrl('https://example.com?a=b'); // returns 'https://example.com?a=b&storeCode=de'
const myUrl2 = adjustMultistoreApiUrl('https://example.com?a=b&storeCode=it'); // returns 'https://example.com?a=b&storeCode=de'
``` 

### Localize URL with correct store code
:::tip
Localized Route means denoting store code in URL by convention without a parameter.

e.g. It's `de` in `https://example.com/de?a=b` 
:::

Method that allows use to do that is `localizedRoute`. Example transformations for `de` as a current storeCode:
```js
localizedRoute('http://example.com/'); // returns http://example.com/de
localizedRoute('/'); // returns /de
localizedRoute('/?a=b'); // returns /de?a=b
localizedRoute('/about'); // returns /de/about
```

:::warning
`appendStoreCode` option of the store view configuration should be set to `true` to display store code as tip above
:::

### How to extract store code from route

You can extract store code from route as follows : 

```js
import storeCodeFromRoute from '@vue-storefront/core/lib/storeCodeFromRoute'
// abridged
 const storeCode = storeCodeFromRoute(currentRoute)
```

You should get store code `gb` from route `https://example.com/gb/foo` where storeCode is `gb`