---
"@vue-storefront/multistore": major
---

[CHANGED] We standardized the way of creating and configuring multistore extension. 
Previously, the extension was created by importing `multistoreExtension` from `@vue-storefront/multistore` and passing it to the `extensions` function. 
Configuration was passed to the extension by adding `multistore` property to the `configuration` object.
Now, the extension is created by calling `createMultistoreExtension` from `@vue-storefront/multistore` and passing the multistore configuration to it.

```diff [middleware.config.ts]
- import { multistoreExtension } from "@vue-storefront/multistore";
+ import { createMultistoreExtension } from "@vue-storefront/multistore";
import { multistoreConfig } from "./multistore.config";

export default {
  integrations: {
    sapcc: {
      location: "@vue-storefront/sapcc-api/server",
      configuration: {
        // ...
-        multistore: multistoreConfig,
      },
      extensions: (predefinedExtensions) => [
        ...predefinedExtensions,
-        multistoreExtension,
+        createMultistoreExtension(multistoreConfig),
      ],
    },
  },
};
```
