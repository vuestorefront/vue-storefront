
## Multistore Magento2 support

Vue Storefront support for the Multistore installations is work in progress (https://github.com/DivanteLtd/vue-storefront/issues/1135). 

### Multiwebsite indexing

Multiwebsite support starts with the ElasticSearch indexing. Basically - each store has it's own ElasticSearch index and should be populated separately using [mage2vuestorefront](https://github.com/DivanteLtd/mage2vuestorefront) tool.

The simplest script to index multi site:

```bash
echo 'Indexing the EN site'
export TIME_TO_EXIT=2000
export MAGENTO_URL=http://your.magentosite.com/rest/en
export INDEX_NAME=vue_storefront_catalog_en
export MAGENTO_CONSUMER_KEY=s9e2dsbpoxo5xcklq9pffyyto84ose7h
export MAGENTO_CONSUMER_SECRET=jdatyq6yu5c9534sy3fflg3nx49j7hng
export MAGENTO_ACCESS_TOKEN=sgpec63709lukofofsjojffri8e2wb78
export MAGENTO_ACCESS_TOKEN_SECRET=scmpoj4uox2mhk9ijuffu410f1qmfjtr

node --harmony cli.js categories --partitions=1 --removeNonExistient=true
node --harmony cli.js productcategories --partitions=1
node --harmony cli.js attributes --partitions=1 --removeNonExistient=true
node --harmony cli.js taxrule --partitions=1 --removeNonExistient=true
node --harmony cli.js products --partitions=1 --removeNonExistient=true

echo 'Indexing the Default site'
export MAGENTO_URL=http://your.magentosite.com/rest/
export INDEX_NAME=vue_storefront_catalog

node --harmony cli.js categories --partitions=1 --removeNonExistient=true
node --harmony cli.js productcategories --partitions=1
node --harmony cli.js attributes --partitions=1 --removeNonExistient=true
node --harmony cli.js taxrule --partitions=1 --removeNonExistient=true
node --harmony cli.js products --partitions=1 --removeNonExistient=true

```

As You may see it's just a **en** store code which is added to the base Magento2 REST API urls that makes the difference and then the **INDEX_NAME** set to the dedicated index name.

In the result You should get:
- *vue_storefront_catalog_en* - populated with the "en" store data
- *vue_storefront_catalog* - populated with the "default" store data

Then, to use these indexes in the Vue Storefront You should index the database schema using the `vue-storefront-api` db tool:

```bash
npm run db rebuild -- --indexName=vue_storefront_catalog_en
npm run db rebuild -- --indexName=vue_storefront_catalog
```

After this sequence of command You may add the available ES index to Your `vue-storefront-api/config/local.json`:

```json
{
    "server": {
      "host": "localhost",
      "port": 8080
    },
	"esHost": "localhost:9200",
	"esIndexes": [
		"vue_storefront_catalog",
 		"vue_storefront_catalog_en",
	],

```

The last thing is to change the `vue-storefront/config/local.json` to point to the right index (currently You need to run separate `vue-storefront` instances - one per the store view (it will be changed shortly)).

```json
{
  "elasticsearch": {
    "host": "localhost:8080/api/catalog",
    "index": "vue_storefront_catalog"
  },
```

and in the *en* instance:

```json
{
  "elasticsearch": {
    "host": "localhost:8080/api/catalog",
    "index": "vue_storefront_catalog_en"
  },
```

You may want to change the other locale-oriented sections as well:

```json
    "tax": {
      "defaultCountry": "PL",
      "defaultRegion": "",
      "calculateServerSide": true
    },
    "i18n": {
      "defaultCountry": "US",
      "defaultLanguage": "EN",
      "availableLocale": ["en-US","de-DE","fr-FR","es-ES","nl-NL", "jp-JP", "ru-RU", "it-IT", "pt-BR"],
      "defaultLocale": "en-US",
      "currencyCode": "USD",
      "currencySign": "$",
      "dateFormat": "HH:mm D/M/YYYY"
    },
```
