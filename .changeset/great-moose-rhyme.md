---
"@vue-storefront/middleware": minor
---

**[ADDED]** `defaultErrorHandler` is now exported from the package. Example usage:

```ts
import type { Integration } from "@vue-storefront/middleware";
import type { MiddlewareConfig } from "@vsf-enterprise/sapcc-api";
import { defaultErrorHandler } from "@vue-storefront/middleware";

export const config = {
  integrations: {
    commerce: {
      errorHandler: (error, req, res) => {
        // Perform custom actions before delegating to the default error handler
        defaultErrorHandler(error, req, res);
      }
    } satisfies Integration<MiddlewareConfig>,
  },
};
```