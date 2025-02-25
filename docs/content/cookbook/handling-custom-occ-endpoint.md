# Handling custom OCC endpoints

It is a common task to add support for a custom (non-standard) SAP OCC API endpoint not covered by the Alokai intergration.
There are two ways how you can do it:

1. Generate new API client based on OpenAPI (swagger) specification.
2. Add support for a custom endpoint manually.

## Generating new API client

Generation of new API client allows you to add support for all custom endpoints at once. You just run a script and all the endpoints will be added to the integration.

How to do this is described in the [Generated API guide](/integrations/sapcc/features/generated-api).

This should be your default approach, because it is the most scalable and maintainable way.

## Adding support for a custom endpoint manually

If you don't want or cannot generate a new API client, you can add support for a custom endpoint manually. 
It boils down to adding a new API method to the middleware that calls the custom endpoint. This guide shows how to do it efficiently.

When to use this approach?

- When for some reason you cannot generate a new API client, e.g. OpenAPI specification is not available.
- When you are iterating fast both on the API and the front-end and you don't want to regenerate the API client for each change.

### Prerequisites

Before we start make sure that you are familiar with [Adding New API Methods](/unified-data-layer/integration-and-setup/creating-new-api-methods) guide. With that guide, you would be able to
communicate with OCC API but it would require manual retrieval of context parameters (baseSiteId, userId, language,
and currency) and preparation of authorization headers. Read on to see how to streamline that process.

### Communicating with OCC API effectively

OCC endpoints have a given structure

`{baseUrl}/{baseSiteId}/{resource_path}?fields={fields}&lang={language}&curr={currency}`

or for user-specific data:

`{baseUrl}/{baseSiteId}/user/{userId}/{resource_path}?fields={fields}&lang={language}&curr={currency}`

These parameters are:

- `baseUrl` - the URL to the OCC API
- `baseSiteId` - most endpoints require this due to multisite capabilities. eg. powertools-spa
- `userId` - some endpoints return user-specific data. This parameter is either “current” for an authorized user, “anonymous” for an anonymous user, or a specific user id when we use ASM (link).
- `resource_path` - what data we want to retrieve from the API. e.g. products/{productCode}/reviews
- `fields` - what fieldset should be returned. e.g BASIC, DEFAULT, FULL, or list of fields
- `language` - in what language the data should be returned
- `currency` - in which currency the data should be returned

Additionally, for a logged-in user, the request should contain authorization headers.

Here's where to find the parameters:

- `baseUrl` - is configured in .env file as `SAPCC_API_URI`. The api client already knows it and prepends each URL with it.
- `baseSiteId` - is defined in the middleware configuration. That configuration is exposed to api method via context.
- `userId` - can be found in the request cookies under [`AUTH_USER_COOKIE_NAME`](/integrations/sapcc/api/sapcc-api/AUTH_USER_COOKIE_NAME).
- `language` - can be found in the request cookies under [`VSF_LOCALE_COOKIE`](/storefront/features/internationalization/internatialization-support).
- `currency` - can be found in the request cookies under [`VSF_CURRENCY_COOKIE`](/storefront/features/internationalization/currency-switching).
- authorization token - can be found in the request cookies under [`AUTH_USER_TOKEN_COOKIE_NAME`](/integrations/sapcc/api/sapcc-api/AUTH_USER_TOKEN_COOKIE_NAME)

You don't have to parse the cookies yourself. Alokai provides helper methods for that. Here’s a code example of how to do it:

```typescript [apps/storefront-middleware/api/custom-methods/types.ts]
import { BaseProps, BaseUserId } from '@vsf-enterprise/sapcc-types';

export interface CustomMethodArgs extends BaseProps, BaseUserId {
  customField: any;
}

export interface CustomMethodResponse {
  whatever: any;
}
```

```typescript [apps/storefront-middleware/api/custom-methods/custom.ts]
import { createRequestOptions, getUserIdFromRequest, TokenModes } from '@vsf-enterprise/sapcc-api';
import { type IntegrationContext } from '../../types';
import type { CustomMethodArgs, CustomMethodResponse } from './types';

export async function exampleCustomMethod(
  context: IntegrationContext,
  args: CustomMethodArgs,
): Promise<CustomMethodResponse> {
  const { config, req, client } = context;

  const userId = getUserIdFromRequest({ context, props: args }); // retrieves userID from props or cookies

  const res = await client.get(
    `/${config.api.baseSiteId}/users/${userId}/customEndpoint/${args.customField}`,
    createRequestOptions({
      // adds authorization headers and language & currency parameters
      context,
      props: args,
      tokenMode: TokenModes.CUSTOMERORAPPLICATION,
    }),
  );

  return res.data;
}

```

Read more about the helper methods:

- [getUserIdFromRequest](/integrations/sapcc/api/sapcc-api/getUserIdFromRequest)
- [createRequestOptions](/integrations/sapcc/api/sapcc-api/createRequestOptions)

### Real life example

Here's an example implementation of the product interest feature.
Let's add support for it.

First, you need to add a new API method in the middleware.

```typescript [apps/storefront-middleware/api/custom-methods/types.ts]
import { BaseProps, BaseUserId, Product } from '@vsf-enterprise/sapcc-types';

export interface GetProductInterestsArgs extends BaseProps, BaseUserId {
  productCode?: string;
}
export interface ProductInterestEntry {
  interestType?: string;
  dateAdded?: string;
  expirationDate?: string;
}
export interface ProductInterestRelation {
  product?: Product;
  productInterestEntry?: Array<ProductInterestEntry>;
}
export interface UserInterestsResponse {
  results: Array<ProductInterestRelation>;
}

```

```typescript [apps/storefront-middleware/api/custom-methods/custom.ts]
import { createRequestOptions, getUserIdFromRequest, TokenModes } from '@vsf-enterprise/sapcc-api';
import { type IntegrationContext } from '../../types';
import type { GetProductInterestsArgs, UserInterestsResponse } from './types';

export async function getProductInterests(
  context: IntegrationContext,
  args: GetProductInterestsArgs,
): Promise<UserInterestsResponse> {
  const { config, client } = context;

  const userId = getUserIdFromRequest({ context, props: args });

  const requestOptions = createRequestOptions({
    context,
    props: args,
    tokenMode: TokenModes.CUSTOMERORAPPLICATION,
  });

  const res = await client.get(`/${config.api.baseSiteId}/users/${userId}/productinterests`, {
    ...requestOptions,
    params: {
      ...requestOptions.params,
      productCode: args.productCode,
    },
  });

  return res.data;
}
```

```typescript [apps/storefront-middleware/api/custom-methods/index.ts]
export { getProductInterests } from './custom';
export * from './types';
```

Then, in your frontend application, you need to add a custom hook to retrieve the product interests on the front end.

```typescript [storefront-unified-nextjs/hooks/useProductInterests/useProductInterests.ts]
import { useQuery } from '@tanstack/react-query';

import { useSdk } from '@/sdk/alokai-context';

export function useProductInterests({ productCode }: { productCode: string }) {
  const sdk = useSdk();

  return useQuery({
    queryFn: () =>
      sdk.customExtension.getProductInterests({
        productCode,
      }),
    queryKey: ['product interests', productCode],
  });
}

```
