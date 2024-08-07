# Handling custom OCC endpoints

It is a common task to add support for a custom (non-standard) SAP OCC API endpoint not covered by the Alokai intergration.
This guide will show you how can do it using Alokai.

## Prerequisites

Before we start make sure that you are familiar with [Adding New API Methods](https://docs.alokai.com/storefront/integration-and-setup/storefront-extension#adding-new-api-methods) guide. With that guide, you would be able to
communicate with OCC API but it would require manual retrieval of context parameters (baseSiteId, userId, language,
and currency) and preparation of authorization headers. Read on to see how to streamline that process.

## Communicating with OCC API effectively

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
- `userId` - can be found in the request cookies under [`AUTH_USER_COOKIE_NAME`](https://docs.alokai.com/integrations/sapcc/api/sapcc-api/AUTH_USER_COOKIE_NAME).
- `language` - can be found in the request cookies under [`VSF_LOCALE_COOKIE`](https://docs.alokai.com/storefront/features/internationalization/internatialization-support).
- `currency` - can be found in the request cookies under [`VSF_CURRENCY_COOKIE`](https://docs.alokai.com/storefront/features/internationalization/currency-switching).
- authorization token - can be found in the request cookies under [`AUTH_USER_TOKEN_COOKIE_NAME`](https://docs.alokai.com/integrations/sapcc/api/sapcc-api/AUTH_USER_TOKEN_COOKIE_NAME)

You don't have to parse the cookies yourself. Alokai provides helper methods for that. Here’s a code example of how to do it:

```typescript
import {
  SapccIntegrationContext,
  TokenModes,
  createRequestOptions,
  getUserIdFromRequest,
} from "@vsf-enterprise/sapcc-api";
import { BaseProps, BaseUserId } from "@vsf-enterprise/sapcc-types";

export interface CustomEndpointProps extends BaseProps, BaseUserId {
  customField: any;
}

export interface CustomResponse {
  whatever: any;
}

const callCustomEndpoint = async (
  context: SapccIntegrationContext,
  props: CustomEndpointProps
): Promise<CustomResponse> => {
  const { config, req, client } = context;

  const userId = getUserIdFromRequest({ req, props } as any); // retrieves userID from props or cookies

  const res = await client.get(
    `/${config.api.baseSiteId}/users/${userId}/customEndpoint/${props.customField}`,
    createRequestOptions({
      // adds authorization headers and language & currency parameters
      context,
      props,
      tokenMode: TokenModes.CUSTOMERORAPPLICATION,
    })
  );

  return res.data;
};
```

Read more about the helper methods:

- [getUserIdFromRequest](https://docs.alokai.com/integrations/sapcc/api/sapcc-api/getUserIdFromRequest)
- [createRequestOptions](https://docs.alokai.com/integrations/sapcc/api/sapcc-api/createRequestOptions)

## Real life example

Here's an example implementation of the product interest feature. This feature is available in OCC API, but not in the middleware and SDK integration.
Let's add support for it.

First, you need to add a new API method in the middleware. (For simplicity, this guide shows how to do it in one file, but we recommend splitting it into multiple files to maintain cleaner code.)

```typescript [storefront-middleware/middleware.config.ts]
import {
  SapccIntegrationContext,
  TokenModes,
  createRequestOptions,
  getUserIdFromRequest,
} from "@vsf-enterprise/sapcc-api";
import { BaseProps, BaseUserId, Product } from "@vsf-enterprise/sapcc-types";

export interface GetProductInterestsProps extends BaseProps, BaseUserId {
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

const getProductInterests = async (
  context: SapccIntegrationContext,
  props: GetProductInterestsProps
): Promise<UserInterestsResponse> => {
  const { config, req, client } = context;

  const userId = getUserIdFromRequest({ req, props } as any);

  const requestOptions = createRequestOptions({
    context,
    props,
    tokenMode: TokenModes.CUSTOMERORAPPLICATION,
  });

  const res = await client.get(
    `/${config.api.baseSiteId}/users/${userId}/productinterests`,
    {
      ...requestOptions,
      params: {
        ...requestOptions.params,
        productCode: props.productCode,
      },
    }
  );

  return res.data;
};

const apiMethods = methods<typeof normalizers>();
const unifiedApiExtension = createUnifiedExtension<Context, Config>()({
  normalizers,
  apiMethods: {
    ...apiMethods,
    getProductInterests,
  },
  config: {
    /* ... */
  },
});
```

Then, in your frontend application, you need to add a custom hook to retrieve the product interests on the front end.

```typescript [storefront-unified-nextjs/hooks/useProductInterests/useProductInterests.ts]
import { useQuery } from "@tanstack/react-query";
import { InferSdkArgs, useSdk } from "~/sdk";

export type GetProductInterestsArgs = InferSdkArgs<"getProductInterests">;

export function useProductInterests({ productCode }: GetProductInterestsArgs) {
  const sdk = useSdk();

  return useQuery({
    queryKey: ["product interests", productCode],
    queryFn: () =>
      sdk.unified.getProductInterests({
        productCode,
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
```
