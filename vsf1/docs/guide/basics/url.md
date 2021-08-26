# Custom URL structure

By default Vue Storefront uses pretty rigid URL structure - where each type of content is kind of "prefixed" like: `/p/MH08/product-slug` or `/c/women-20`. Starting with Vue Storefront **1.9** we added the `url` module including fully customizable url dispatcher.

When `config.seo.useUrlDispatcher` set to true the `product.url_path` and `category.url_path` fields are used as absolute URL addresses (no `/c` and `/p` prefixes anymore). Check the latest [`mage2vuestorefront`] snapshot and reimport Your products to properly set `url_path` fields.

For example, when the `category.url_path` is set to `women/frauen-20` the product will be available under the following URL addresses:

`http://localhost:3000/women/frauen-20`
`http://localhost:3000/de/women/frauen-20`
...

**Please note:** The `config.products.useShortCatalogUrls` should be set to `false` in order to have `urlDispatcher` working properly. It may interfere with the Url Dispatcher mechanism. From VS 1.10.rc1 the `useShortCatalogUrls` option has been removed.

## How to customize the mapping mechanism

The `url` module contains the Vuex Store actions that are responsible for proper mapping the content with URLs.

By default, the [`url/mappingFallback`](https://github.com/pkarw/vue-storefront/blob/9847f0695df0b54774dceb3c381e64770fd5cfda/core/modules/url/store/actions.ts#L65) action queries first: `product/list` then `category/list` actions to check if provided `url_path` is related to product either category.

Because it's a Vuex action - You might want to override it from Your custom module to customize the mapping logic (for example for: by using the [Magento2 URL dispatching mechanism](https://devdocs.magento.com/guides/v2.3/graphql/reference/url-resolver.html)).

With all `product/list` Vuex action calls the `url/registerMapping` action is being called for registering the mappings for every particular product or category. Mappings are cached in `localStorage` so they work in the Offline mode as well + don't require any additional network calls once product/category list has been retrieved.

## Custom URLs for CMS pages and other content types

You can use the Url Dispatcher feature with all content types. The only thing You need to change is to customize the `url/mappingFallback` Vuex action to properly query other content sources.

## Modules

* [vsf-mapping-fallback](https://github.com/kodbruket/vsf-mapping-fallback) simplifies the process of adding URL mappings
