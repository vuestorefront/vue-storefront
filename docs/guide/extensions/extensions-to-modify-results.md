# Using extensions to Modify Elasticsearch results

Vue Storefront API has a built-in processor for calculating taxes and adding that data to product search results. API extensions can also add their own processors for modifying Elasticsearch results.

Some possible use cases for this could be:
- Replacing Magento product descriptions with data from a CMS.
- Cleaning Magento "WYSIWYG" data.
- Adding product ratings or other data from third-party systems.

Here is an example of creating a custom result processor to replace Product descriptions with Prismic CMS data:

1. Create the extension folder in `src/api/extensions`.
2. The extension folder must contain another folder called `processors`.
3. Add the processor file, for example `src/api/extensions/example-extension/processors/prismic-product.js`.
```js
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'

class ProductPrismic {
  constructor (config, request) {
    this._request = request
    this._config = config
  }

  process (productList) {
    const skus = productList.map( prod => {
      return prod._source.sku.toLowerCase()
    })
    return Prismic.getApi(this._config.extensions['example-extension'].baseUrl).then((api) => {
      return api.query(Prismic.Predicates.in('my.product.uid', skus))
    }).then((result) => {
      for (const item of result.results) {
        const product = productList.find( prod => {
          return prod._source.sku.toLowerCase() === item.uid
        })
        if (product) {
          try {
            product._source.description = PrismicDOM.RichText.asHtml(item.data.description)
          }
          catch(error) {
            console.log(error)
          }
        }
      }
      return productList
    }).catch(err => {
      console.log(err)
    })
  }
}

module.exports = ProductPrismic
```
4. Add the extension to `config/local.json` and declare the custom processor in the extension settings. It needs to be in this structure:
```json
  "registeredExtensions": ["example-extension"],
  "extensions": {
    "example-extension": {
      "baseUrl": "https://my_account.cdn.prismic.io/api/v2",
      "resultProcessors": {
        "product": "prismic-product"
      }
    }
  }
```

That's it. In Prismic, create documents with a uid matching each product SKU, and a description field. Those description will then appear in Vue Storefront product listings. The data update instantly, whenever a document is published in Prismic.

Note: This example uses Prismic and PrismicDOM, so they'll need to be added to your dependencies in package.json

Note 2: See `src/platform/magento2/tax.js` for another example of a results processor.
