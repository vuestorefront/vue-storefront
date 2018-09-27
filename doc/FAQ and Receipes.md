# Introduction

Below you can find solutions for most common problems and advises for typical config changes required by Vue Storefront.
If you solved any new issues by yourself please let us know on [slack](http://vuestorefront.slack.com) and we will add them to the list so others don't need to reinvent the wheel.

# Questions

* <a href="#problem-docker-installer">Problem starting docker while installing the vue-storefront</a>
* <a href="#product-not-displayed-illegal_argument_exception">Product not displayed (illegal_argument_exception)</a>
* <a href="#custom-variants">How to add custom configurable attributes to Product page</a>
* <a href="#git-strategy">What's the recommended way to use git on custom development</a>
* <a href="#product-name-changed-to-sku-when-adding-to-cart--on-product-page">Product name changed to SKU when adding to cart / on product page</a>
* <a href="#how-to-get-dynamic-prices-to-work-catalog-rules">How to get dynamic prices to work (catalog rules)</a>
* <a href="#no-products-found-after-node---harmony-clijs-fullreindex">No products found! after node --harmony cli.js fullreindex</a>
* <a href="#how-to-sync-the-products-cart-with-magento-to-get-the-cart-promo-rules-up-and-runnig">How to sync the products cart with Magento to get the Cart Promo Rules up and runnig</a>
* <a href="#how-to-prevent-error-cant-build-storefront-npm">How to prevent an error "Can’t build storefront npm"</a>
* <a href="#legacy-software">How to integrate 3rd party platform? Do you think it could be used with a legacy bespoke PHP eCommerce?</a>
* <a href="#payment-gateways">Is there any documentation on integrating payment gateways?</a>
* <a href="#i18n-support">Is there any internationalisation support?</a>
* <a href="#caching-strategy">If 10k products are on the site will it create a high bandwith download when you navigate on the site for the first time on a mobile device</a>
* <a href="#how-to-modify-schema">How to add/remove/change field types in the ElasticSearch index</a>
* <a href="#magento-extensions">How to integrate 3rd party Magento extensions?</a>
* <a href="#multi-website">How to support Multistore / Multiwebsite setup</a>
* <a href="#configurable-filters">How to deal with Category filters based on configurable_children</a>
* <a href="#seo-redirects">How to redirect original Magento2 urls to Vue Storefront</a>
* <a href="#configurable-error">You need to choose options for your item message when I hit API for add to cart configrable product</a>
* <a href="https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Installing%20on%20Linux%20and%20MacOS.md">*Images loading* issue on Magento 2 integration</a>
* <a href="#adding-filter">Adding custom category filters</a>
* <a href="#reviews">I'm adding review and nothing happened</a>
* <a href="#verbosity">I have wrong line numbers in Chrome developer's console by the error/info messages</a>

### <a name="problem-docker-installer"></a>Problem starting docker while installing the vue-storefront

In case You get the following error:
```
┌────────────────────────────────────────────────────────────────────────────┐
│ ERROR                                                                      │
│                                                                            │
│ Can't start docker in background.                                          │
│                                                                            │
│ Please check log file for details: /tmp/vue-storefront/var/log/install.log │
└────────────────────────────────────────────────────────────────────────────┘
```
Please check:
- if there is `docker-compose` command available, if not please do install it
- please check the output of runnig `docker-compose up -d` manually inside the `vue-storefront-api` instance. On some production enviroments docker is limited for the superusers, in many cases it's just a matter of `/var/run/docker.sock` permisions to be changed (for example to 755)

### <a name="products-not-displayed"></a>Product not displayed (illegal_argument_exception)

In a case of 

```json
{"root_cause":[{"type":"illegal_argument_exception","reason":"Fielddata is disabled on text fields by default. Set fielddata=true on [created_at] in order to load fielddata in memory by uninverting the inverted index. Note that this can however use significant memory. Alternatively use a keyword field instead."}],"type":"search_phase_execution_exception","reason":"all shards failed","phase":"query","grouped":true,"failed_shards":[{"shard":0,"index":"vue_storefront_catalog_1521776807","node":"xIOeZW2lTwaprGXh6YLyCA","reason":{"type":"illegal_argument_exception","reason":"Fielddata is disabled on text fields by default. Set fielddata=true on [created_at] in order to load fielddata in memory by uninverting the inverted index. Note that this can however use significant memory. Alternatively use a keyword field instead."}}]}
```

See the discussion in [#137](https://github.com/DivanteLtd/vue-storefront/issues/137)
Please also check the [Database tool](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Database%20tool.md)

### <a name="git-strategy"></a>What's the recommended way to use git on custom development
One of the options is to do kind of fork - or just to get the whole repo to your Git service. 
Then if you like to do some VS updates you probably need to just pull the changes from our origins. Another option will be available as soon as we manageto separate the core as a npm module


### <a name="custom-variants"></a>How to add custom configurable attributes to Product page

Where can we add filters and extra configurable options for the products? For example, i've just added an iPhone X as an example. And I want to add the storage as an option.

![How to add additional custom attribute?](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/media/Apple_iPhone_X-Zwart-256GB_-_Vue_Storefront.png)

To do so You need to modify the theme, changing the following snippet:

```js
           <div class="row top-xs m0 pt15 pb40 variants-wrapper">
                  <div v-if="option.label == 'Color'">
                    <color-button
                      v-for="(c, i) in options.color"
                      :key="i"
                      :id="c.id"
                      :label="c.label"
                      context="product"
                      code="color"
                      :class="{ active: c.id == configuration.color.id }"
                    />
                  </div>
                  <div class="sizes" v-if="option.label == 'Size'">
                    <size-button
                      v-for="(s, i) in options.size"
                      :key="i"
                      :id="s.id"
                      :label="s.label"
                      context="product"
                      code="size"
                      class="mr10 mb10"
                      :class="{ active: s.id == configuration.size.id }"
                      v-focus-clean
                    />
                  </div>
```                  

You must add UI controls for additional configurable attributes.


### <a name="variant-names-problem"></a>Product name changed to SKU when adding to cart / on product page

By default, when the user selects any specific product variant on the Product.vue page for `configurable` products - the title, picture, price and other attributes are changed to corresponding `simple` one (within `product.configurable_children`). If in the Magento panel, the product names of the variants are set to SKU or anything else - then the correct behavior is that the product name change to it when selects variant.

To correct this behavior You can:
- modify the core - https://github.com/DivanteLtd/vue-storefront/blob/6a5a569a7e96703b865f841dabbe3c6a1020b3ab/core/store/modules/product/actions.js#L311 - to filter out the `name` attribute from `Object.assign` which is responsible for copying the attributes from variant -> current product,
- modify `mage2vuestorefront` importer to correct the `configurable_children` product names -> https://github.com/DivanteLtd/mage2vuestorefront/blob/ca0c4723530b148cfdfb99784168af529e39d599/src/adapters/magento/product.js#L167
- or just use bound to the `EventBus.$emitFilter('product-after-single', { key: key, options: options, product: products[0] })` event and modify the `product.configurable_children` properties:

```js
  if (product.configurable_children) {
    for (let configurableChild of product.configurable_children) {
        configurableChild.name = product.name
      }
    }
  }
```


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

### <a name="sync-carts"></a>How to sync the products cart with Magento to get the Cart Promo Rules up and runnig

To display the proper prices and totals after Magento calculates all the discounts and taxes you need to modify the `conf/local.json` config (for a reference take a look at `conf/default.json`) by putting there a additional section:

```json
  "cart": {
    "synchronize": true,
    "synchronize_totals": true,
    "create_endpoint": "http://localhost:8080/api/cart/create?token={{token}}",
    "updateitem_endpoint": "http://localhost:8080/api/cart/update?token={{token}}&cartId={{cartId}}",
    "deleteitem_endpoint": "http://localhost:8080/api/cart/delete?token={{token}}&cartId={{cartId}}",
    "pull_endpoint": "http://localhost:8080/api/cart/pull?token={{token}}&cartId={{cartId}}",
    "totals_endpoint": "http://localhost:8080/api/cart/totals?token={{token}}&cartId={{cartId}}"
  },
```

To make it work you need have Magento2 oauth keys konfigured in your `vue-storefront-api` - `conf/local.json`.
After this change you need to restart the `yarn dev` command to take the config changes into consideration by the VS. All the cart actions (add to cart, remove from cart, modify the qty) are now synchronized directly with Magento2 - for both: guest and logged in clients.

### <a name="how-to-prevent-error-cant-build-storefront-npm"></a>How to prevent an error "Can’t build storefront npm"

The error "Can’t build storefront npm" appears because npm can't automatically install required modules. To prevent this error, you should manually install those modules before running the installer. It's easy:
```bash
git clone https://github.com/DivanteLtd/vue-storefront.git vue-storefront && cd vue-storefront
npm install
npm install vue-carousel vue-no-ssr
npm run build # check if no errors
npm run installer
```

### <a name="legacy-software"></a>How to integrate 3rd party platform? Do you think it could be used with a legacy bespoke PHP eCommerce?

Yes I believe it could. You should expose the API accordingly to our spec: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Extending%20vue-storefront-api.md and the second step is to create a data bridge to fill out the ElasticSearch with the current catalog data: https://medium.com/@piotrkarwatka/how-to-connect-3rd-party-platform-to-vue-storefront-df9cb30779f6

### <a name="payment-gateways"></a>Is there any documentation on integrating payment gateways?

We're working on kind of boilerplate for payment modules. Right now please just take a look at a live example: https://github.com/develodesign/vue-storefront-stripe and try to follow the design patterns from there. The task where boilerplate + docs will show up is: https://github.com/DivanteLtd/vue-storefront/issues/923

### <a name="i18n-support"></a>Is there any internationalisation support? 

Yes, we already have 7 languages supported by default (EN, FR, ES, RU, JP, NL, DE) and the docs: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/i18n/Working%20with%20translations.md
The currency is set in the local.json configuration file and it's (along with the language) set per instance - so if You have few languages and countries supported You need to run (as for now) few separate instances

### <a name="caching-strategy"></a>If 10k products are on the site will it create a high bandwith download when you navigate on the site for the first time on a mobile device

Not necessarily. VS is caching the products from the categories browsed. This is default solution which can be changed by modifying 'core/store/lib/search.js'

### <a name="how-to-modify-schema"></a>How to add/remove/change field types in the ElasticSearch schema

It's done via Database Tool schema changes. Please follow the instructions from the <a href="https://github.com/DivanteLtd/vue-storefront/blob/develop/doc/Database%20tool.md#chaning-the-index-structure--adding-new-fields--chaning-the-types">Database Tool Manual</a>

### <a name="magento-extensions"></a>How to integrate 3rd party Magento extensions

Unofrtunatelly Magento extensions are not compilant with any PWA available solution yet. So if You like to integrate some existing extensions the simplest way is to: 

a) expose the data via some Magento2 rest api endpoints; 
b) consume the endpoints in the VS using Vuex stores; <a href="https://github.com/DivanteLtd/vue-storefront#data-in-vue-storefront">Read more on Vuex in Vue Storefront</a>
c) implement the UI in VS

If the extensions are not playing with the User Interface, probably they will work with VS out of the box, as we're using the standard Magento2 API calls for the integration part.

### <a name="multi-website"></a>How to support Multistore / Multiwebsite setup

Please check the [Multistore setup](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Multistore%20setup.md) guide for details

### <a name="configurable-filters"></a>How to deal with Category filters based on configurable_children

If You like to have Category filter working with configurable products - You need to expand the `product.configurable_children.attrName` to `product.attrName_options` array. This is automatically done by [mage2vuestorefront](https://github.com/DivanteLtd/mage2vuestorefront) for all attributes set as `product.configurable_options` (by default: color, size). If You like to add additional fields like `manufacturer` to the filters You need to expand `product.manufacturer_options` field. The easiest way to do so is to set `config.product.expandConfigurableFilters` to `['manufacturer']` and re-run the `mage2vuestorefront` indexer.

### <a name="seo-redirects"></a>How to redirect original Magento2 urls to Vue Storefront

There is a SEO redirects generator for nginx -> https://serverfault.com/a/441517 available within the [vue-storefront-api](https://github.com/DivanteLtd/vue-storefront-api/commit/2c7e10b4c4294f222f7a1aae96627d6a0e23f30e). Now You can generate SEO map redirecting users from the original Magento urls to Vue Storefront URLs by running:

`npm run seo redirects — —oldFormat=true | false`

- `oldFormat` - should be set accordingly to the `vue-storefront/config/local.json` setting of `products.useShortCatalogUrls` (oldFormat = !useShortCatalogUrls)

Please make sure that  `vue-storefront/config/local.json` setting of `useMagentoUrlKeys` is set to `true` and You have ElasticSearch synchronised with the Magento2 instance using current version of https://github.com/DivanteLtd/mage2vuestorefront

### <a name="configurable-error"></a>You need to choose options for your item message when I hit API for add to cart configrable product

This is because the demo data dump works on the demo-magento2.vuestorefront.io instance's attribute ids. Please reimport all product data using [mage2vuestorefront](https://github.com/DivanteLtd/mage2vuestorefront)

### <a name="adding-filters"></a>Adding custom category filters

You need to add the attributes You'll like to have displayed to the `config/local.json` field name is: `products.defaultFilters`:

```json
      "defaultFilters": ["color", "size", "price", "erin_recommends"],
```

And then You can use proper controls for each individual filter in here:
https://github.com/DivanteLtd/vue-storefront/blob/49dc8a2dc9326e9e83d663cc27f8bb0688525f13/src/themes/default/components/core/blocks/Category/Sidebar.vue


### <a name="reviews"></a>I'm adding product review and nothing is displayed

We've added the Reviews support, however Magento2 is still lacking Reviews support in the REST API. To have reviews up and running please add the https://github.com/DivanteLtd/magento2-review-api to Your Magento2 instance.

### <a href="#verbosity"></a>I have wrong line numbers in Chrome developer's console by the error/info messages

We've added [console filter](https://github.com/DivanteLtd/vue-storefront/issues/1752) and it changes the original source code position in dev's console. Please set `config.console.verbosityLevel=display-everything` to disable the filter and bring back the original dev. console

