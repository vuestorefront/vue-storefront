# @vue-storefront/next

## Quick Setup

1. Add `@vue-storefront/next` dependency to your project

```bash
# Using pnpm
pnpm add -D @vue-storefront/next

# Using yarn
yarn add --dev @vue-storefront/next

# Using npm
npm install --save-dev @vue-storefront/next
```

2. Create SDK config file - `sdk.config.ts` in root directory of your project:

The `createSdk` function expects
- base SDK options including the middleware and (optionally) the multistore configuration as a first argument,
- and a factory function for the SDK configuration as a second argument. Those factory function receives a context, useful for creating the SDK configuration.

See the example below illustrating the SDK configuration with Unified and Contentful modules.

```ts
import {
  contentfulModule,
  ContentfulModuleType,
} from "@vsf-enterprise/contentful-sdk";
import { unifiedModule } from "@vsf-enterprise/unified-sdk";
import { CreateSdkOptions, createSdk } from "@vue-storefront/next";
import type { UnifiedApiExtension } from "../storefront-middleware/middleware.config";

const options: CreateSdkOptions = {
  middleware: {
    apiUrl: "http://localhost:4000",
  },
};

export const { getSdk, createSdkContext } = createSdk(
  options,
  ({ buildModule, middlewareUrl, getRequestHeaders }) => ({
    unified: buildModule(unifiedModule<UnifiedApiExtension>, {
      apiUrl: middlewareUrl + "/commerce",
      requestOptions: {
        headers: getRequestHeaders,
      },
    }),
    contentful: buildModule<ContentfulModuleType>(contentfulModule, {
      apiUrl: middlewareUrl + "/cntf",
    }),
  }),
);
```

The `createSdk` function returns
- the `getSdk` function, which is used to create the new SDK instance,
- and the `createSdkContext` function, which is used to create the SDK context, to share the same SDK instance on the Client side.

3. Create SDK context in your app, it could be for example `hooks/sdk.ts` file:

```ts
import { createSdkContext } from "@vue-storefront/next/client";
import { getSdk } from "../sdk.config";

export const [SdkProvider, useSdk] = createSdkContext(getSdk());
```

4. Register the `SdkProvider` in the root component of your app:

In `pages/_app.tsx` for **Pages Router**

```tsx
import type { AppProps } from "next/app";
import { SdkProvider } from "../hooks";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SdkProvider>
      <Component {...pageProps} />
    </SdkProvider>
  );
}
```

or in `app/layout.tsx` for **App Router**

```tsx
# app/layout.tsx
import { ReactNode } from "react";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

```tsx
# app/providers.tsx
"use client";

import { ReactNode } from "react";
import { SdkProvider } from "../hooks";

export function Providers({ children }: { children: ReactNode }) {
  return <SdkProvider>{children}</SdkProvider>;
}
```

5. The example of using the SDK can be found in example applications:

- [Pages Router](https://github.com/vuestorefront/vue-storefront/tree/main/packages/storefront/packages/next/__tests__/apps/pages-router)
- [App Router](https://github.com/vuestorefront/vue-storefront/tree/main/packages/storefront/packages/next/__tests__/apps/app-router)

That's it! You can now use VueStorefront Next in your Next app ✨
