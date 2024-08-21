---
"@vue-storefront/sdk": minor
---

[ADDED] new option to the `middlewareModule` - `refreshTokenHandler`.
This special handler can be used to handle 401 errors and refresh the token.
It is called before the generic `errorHandler`.
By default, it thrown an error which is being caught by the `errorHandler` and rethrown.

Example:

```ts
import { SdkHttpError } from "@vue-storefront/sdk";

const refereshToken = async () => {
  // Refresh the token
};

const options: Options = {
  apiUrl: "https://api.example.com",
  refreshTokenHandler: async ({
    error,
    methodName,
    url,
    params,
    config,
    httpClient,
  }) => {
    try {
      await refreshToken();
    } catch (error) {
      throw new SdkHttpError({
        statusCode: 401,
        message: "Unauthorized",
        cause: error,
      });
    }

    throw error;
  },
};
```
