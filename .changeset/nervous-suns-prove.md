---
"@vue-storefront/sdk": minor
---

[ADDED] `logger` option to the `middlewareModule` config. This option allows you to turn on/off the logging of the SDK requests and responses or to provide a custom logger function.

```diff
import { initSDK, buildModule, middlewareModule } from "@vue-storefront/sdk";
import { Endpoints } from "@vsf-enterprise/sapcc-api";

const sdk = initSDK({
  commerce: buildModule(middlewareModule<Endpoints>, {
    apiUrl: "http://localhost:8181/commerce",
+   logger: true,
  }),
});
```

Logger can be also turned on by setting the `ALOKAI_SDK_DEBUG` environment variable to `true`.
