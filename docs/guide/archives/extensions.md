# Extensions

:::danger REMINDER
This document is _archived_ and _NOT_ relevant with the latest version which is `1.11` at the time of writing. Please keep in mind this document is supposed to help you maintain legacy product, not the fresh installation. 
:::


## Introduction

### What do Vue Storefront extensions look like?

Depending on your needs, Vue Storefront extensions can have two parts:
- **Client-side part,** which is just a [Vue Storefront module](https://github.com/vuestorefront/vue-storefront/blob/master/docs/guide/modules/introduction.md). It covers most of the use cases.

- **Server-side part** which is a [Vue Storefront API extension](https://github.com/vuestorefront/vue-storefront/blob/master/docs/guide/extensions/extending-api.md) and should be used if you want to add some endpoints to `vue-storefront-api` or interact with Elasticsearch.

### Where extensions are located
- On the client side, extension modules should be placed in `src/modules` folder of `vue-storefront` or installed via NPM cli and registered in `src/modules/index.ts`
- On the server side, extensions should be placed in `src/api/extensions` folder of `vue-storefront-api` and registered in config file

### Writing extensions
If you are writing a VS extension as an NPM module, start the package name with a `vsf-` prefix so it can be transpiled with other VS code and ship it as a raw es6/typescript module. If you don't use the prefix, you need to handle transpilation by yourself. We are currently building an extension boilerplate to make it easier to develop one.

Here, you can find two articles explaining how to create custom Vue Storefront extensions:
- [How to create an Instagram Feed module for Vue Storefront](https://itnext.io/how-to-create-an-instagram-feed-module-for-vue-storefront-eaa03019b288) by Javier Villanueva
- [Developing a Vue Storefront payment module](https://www.develodesign.co.uk/news/development-of-the-paypal-module-for-vue-storefront/#.XCoa2h2Mmmo.twitter) by Dmitry Schegolikhin from [Develo Design](https://www.develodesign.co.uk/)

**IMPORTANT** If you are an extension developer, please join `#extension-dev` channel on our Slack to receive information about important API updates and new features.

### Extensions list
You can find a curated list of VS extensions in [Awesome Vue Storefront](https://github.com/frqnck/awesome-vue-storefront) list.


## Extending the API

Some extensions need to have additional API methods to get some data directly from Magento/other CMS or just from custom Elasticsearch data collections.

You may add new ES collections [using the Migration mechanism](../data/data-migrations.md)

Then you may extend the [`vue-storefront-api`](https://github.com/vuestorefront/vue-storefront-api) to add your custom API methods. Please take a look at: [mailchimp-subscribe](https://github.com/vuestorefront/vue-storefront-api/blob/master/src/api/extensions/mailchimp-subscribe/index.js) for reference.

To add the API extension to `vue-storefront-api`:

1. Create the folder within `src/api/extensions` for example 'custom_extension`.
2. Then add the `index.js` file and put the API methods code inside. We're using Express.js. Here is a boilerplate/example for the extension code:

```js
import { apiStatus } from '../../../lib/util';
import { Router } from 'express';

module.exports = ({ config, db }) => {
  let mcApi = Router();

  /**
   * POST create an user
   */
  mcApi.post('/subscribe', (req, res) => {
    let userData = req.body;
    if (!userData.email) {
      apiStatus(res, 'Invalid e-mail provided!', 500);
      return;
    }

    let request = require('request');
    request(
      {
        url:
          config.extensions.mailchimp.apiUrl +
          '/lists/' +
          encodeURIComponent(config.extensions.mailchimp.listId) +
          '/members',
        method: 'POST',
        headers: {
          Authorization: 'apikey ' + config.extensions.mailchimp.apiKey,
        },
        json: true,
        body: { email_address: userData.email, status: 'subscribed' },
      },
      function(error, response, body) {
        if (error) {
          apiStatus(res, error, 500);
        } else {
          apiStatus(res, body, 200);
        }
      },
    );
  });

  /**
   * DELETE delete an user
   */
  mcApi.delete('/subscribe', (req, res) => {
    let userData = req.body;
    if (!userData.email) {
      apiStatus(res, 'Invalid e-mail provided!', 500);
      return;
    }

    let request = require('request');
    request(
      {
        url:
          config.extensions.mailchimp.apiUrl +
          '/lists/' +
          encodeURIComponent(config.extensions.mailchimp.listId),
        method: 'POST',
        headers: {
          Authorization: 'apikey ' + config.extensions.mailchimp.apiKey,
        },
        json: true,
        body: {
          members: [{ email_address: userData.email, status: 'unsubscribed' }],
          update_existing: true,
        },
      },
      function(error, response, body) {
        if (error) {
          apiStatus(res, error, 500);
        } else {
          apiStatus(res, body, 200);
        }
      },
    );
  });
  return mcApi;
};
```

3. Add the extension to `config/local.json`:

```json
	"registeredExtensions": ["mailchimp-subscribe"],
```

4. Restart the `vue-storefront-api`
5. Your new API method is available on `localhost:8080/api/ext/<extension_name>/<extension_method>` for example: `localhost:8080/api/ext/mailchimp-subscribe/subscribe`


## Extending Express.js server-side routes

From Vue Storefront 1.4.0, you can add your own custom server-side routes without Vue.js SSR context. These routes may be used, for example, for generating large, unbuffered files like XML maps, binary files, etc.

You can add numerous, custom Express js middlewares and routes by simply modifying the `src/server/index.js`:

```js
// You can extend Vue Storefront server routes by binding to the Express.js (expressApp) in here
module.exports.registerUserServerRoutes = expressApp => {
  require('./example/generator')(expressApp);
};
```

The example route handler looks like this:

```js
module.exports = expressApp => {
  /**
   * This is an example on how You can bind Your own Express.js server routes to SSR server running Vue Storefront.
   * It may be usefull to avoid all the Vue.js processing and context - and useful for example for large XML/binary file generation
   */
  expressApp.get('/vue-storefront.xml', (req, res) => {
    res.end('<content>Vue Storefront custom XML generator example</content>');
  });
};
```

### Data operations inside Express routes

Unfortunately, as you may have seen above in the `core/scripts/server.js`, all modules used by the script (including the dynamic routes) can not use ES modules (`import ... from ...` type of statements). By this limitation, you can't currently use `@vue-storefront`modules inside the custom Express.js routes as they're not compiled to the CommonJS. This is likely to be fixed. To get the data, you may execute `fetch()` requests to the `vue-storefront-api` endpoints. You can still use `const config = require('config')` to read the endpoints, URLs, etc.


## Using extensions to Modify Elasticsearch results

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
