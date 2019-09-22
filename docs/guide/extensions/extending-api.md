# Extending the API

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
