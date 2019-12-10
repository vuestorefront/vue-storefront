# Extensions

:::danger REMINDER
This document is _archived_ and _NOT_ relevant with the latest version which is `1.11` at the time of writing. Please keep in mind this document is supposed to help you maintain legacy product, not the fresh installation. 
:::


## Introduction

### What do Vue Storefront extensions look like?

Depending on your needs, Vue Storefront extensions can have two parts:
- **Client-side part,** which is just a [Vue Storefront module](https://github.com/DivanteLtd/vue-storefront/blob/master/docs/guide/modules/introduction.md). It covers most of the use cases.

- **Server-side part** which is a [Vue Storefront API extension](https://github.com/DivanteLtd/vue-storefront/blob/master/docs/guide/extensions/extending-api.md) and should be used if you want to add some endpoints to `vue-storefront-api` or interact with Elasticsearch.

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

Then you may extend the [`vue-storefront-api`](https://github.com/DivanteLtd/vue-storefront-api) to add your custom API methods. Please take a look at: [mailchimp-subscribe](https://github.com/DivanteLtd/vue-storefront-api/blob/master/src/api/extensions/mailchimp-subscribe/index.js) for reference.

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
