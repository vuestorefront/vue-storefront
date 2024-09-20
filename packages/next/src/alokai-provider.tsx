"use client";

import { SDKApi } from "@vue-storefront/sdk";
import Script from "next/script";
import React, { createContext, useContext } from "react";
import { CreateSdkContextReturn, AlokaiProviderProps } from "./sdk/types";
import { createSfStateProvider, type SfContract } from "./state";

/**
 * Creates a new Alokai context which is a combination of SDK and state contexts.
 * This function is dedicated for the client-side usage.
 *
 * @example
 * Create a new Alokai context somewhere in your application. It may be the `hooks/sdk.ts` file.
 *
 * ```tsx
 * import { createAlokaiContext } from "@vue-storefront/next/client";
 * import type { Sdk } from './sdk.server';
 *
 * export const [AlokaiProvider, useSdk] = createAlokaiContext<Sdk>();
 * ```
 * Then use the `AlokaiProvider` in the root component of your application.
 * For Pages Router it would be the `pages/_app.tsx` file,
 * and for the App Router it would be the `app/layout.tsx` file.
 * Finally, you can use the `useSdk` in any client component of your application.
 * @returns [AlokaiProvider, useSdk] - The SDK provider and the `useSdk` hook.
 */
export function createAlokaiContext<
  TSdk extends SDKApi<any>,
  TSfContract extends SfContract
>(): CreateSdkContextReturn<TSdk, TSfContract> {
  const SdkContext = createContext<TSdk>(null);
  const { SfStateProvider, ...rest } = createSfStateProvider<TSfContract>();

  function AlokaiProvider({
    children,
    sdk,
    initialData,
  }: AlokaiProviderProps<TSdk, TSfContract>) {
    return (
      <SdkContext.Provider value={sdk}>
        {/* an universal approach to add meta tag */}
        <Script strategy="beforeInteractive" id="vsfMetaTag">
          {`
          const vsfMetaTag = document.createElement("meta");
          vsfMetaTag.setAttribute("name", "generator");
          vsfMetaTag.setAttribute("content", "Vue Storefront 2");
          document.head.appendChild(vsfMetaTag);
        `}
        </Script>
        <SfStateProvider initialData={initialData}>{children}</SfStateProvider>
      </SdkContext.Provider>
    );
  }

  const useSdk = () => {
    const contextSdk = useContext(SdkContext);
    if (!contextSdk) {
      throw new Error("useSdk must be used within a AlokaiProvider");
    }
    return contextSdk;
  };

  return { AlokaiProvider, useSdk, ...rest } as const;
}
