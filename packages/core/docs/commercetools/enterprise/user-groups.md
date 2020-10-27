# User groups

User groups is the feature commonly used in projects when we want to assign dedicated benefits for the close group of customers. Discounts, price rules, special prices - all of them can be quickly assigned to the group of customers so you don't have to configure them one by one.

## Available API functions

```ts
interface CustomerIdentifier {
  id: string;
  version: number;
}

type UpdateResult = MutationResponse<'customer', Customer>
```

- `addCustomerToGroup: (customer: CustomerIdentifier, group: ResourceIdentifierInput) => Promise<UpdateResult>` - adds user to the group
- `removeCustomerFromGroup: (customer: CustomerIdentifier) => Promise<UpdateResult>` - removes user from the group
- `setup` - it configures the api client within the enterprise package. It expects the fully configured apollo client, so we recommend to configure the original api-client first and pass this configuration to the enterprise package (example below).

## Usage

We strongly recommend to use these functions in our middleware as they require wider permissions. Using it purely on the front-end side affects security.

In order to create our middleware, firstly you have to register your middleware in the configuration:

```js
import customerGroupsMiddleware from './customerGroupsMiddleware'

['@vue-storefront/{PLATFORM}/nuxt', {
  apiMiddleware: {
    extend: customerGroupsMiddleware
  }
}]
```

Secondly, the implementation itself:

```js
// customerGroupsMiddleware.js
import {
  setup as originSetup,
  getSettings as getOriginSettings
} from '@vue-storefront/commercetools-api';
import {
  addCustomerToGroup,
  setup as serverSetup
} from '@vsf-enterprise/customer-groups';

export default (app) => {
  // API client setup
  originSetup({
    api: {
      uri: '{URI ENDPOINT FOR GRAPHQL}',
      authHost: '{AUTH URI}',
      projectKey: '{YOUR PROJECT KEY}',
      clientId: '{CLIENT ID}',
      clientSecret: '{SECRET}',
      scopes: ['{RIGHT SCOPE}']
    }
  });

  // Passing the configured API client
  serverSetup(getOriginSettings());

  app.get('/add-to-customer-group', async (req, res) => {
    const customer = { id: 'eb7d1289-3063-4158-8bef-4caaa1ef476c', version: 5 };
    const group = { id: 'd0df9c72-5248-4da4-ac78-826a59e7dc47' };
    const response = await addCustomerToGroup(customer, group);

    res.send({ response });
  });
};
```

Please note that we configure the API client from scratch, because we should use a different one for the server-side communication with the different scopes and permissions.
