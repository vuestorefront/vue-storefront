"use client";

import { SDKApi } from "@vue-storefront/sdk";
import Script from "next/script";
import React, { createContext, useContext } from "react";
import { CreateSdkContextReturn, SdkProviderProps } from "./types";

/**
 * Creates a new SDK context. This function is dedicated for the client-side usage.
 *
 * @example
 * Create a new SDK context somewhere in your application. It may be the `hooks/sdk.ts` file.
 *
 * ```tsx
 * import { createSdkContext } from "@vue-storefront/next/client";
 * import { getSdk } from "../../sdk.config.ts";
 *
 * export const [SdkProvider, useSdk] = createSdkContext(getSdk());
 * ```
 * Then use the `SdkProvider` in the root component of your application.
 * For Pages Router it would be the `pages/_app.tsx` file,
 * and for the App Router it would be the `app/layout.tsx` file.
 * Finally you can use the `useSdk` in any client component of your application.
 * @returns [SdkProvider, useSdk] - The SDK provider and the `useSdk` hook.
 */
export function createSdkContext<
  TSdk extends SDKApi<any>
>(): CreateSdkContextReturn<TSdk> {
  const SdkContext = createContext<TSdk>(null);

  function SdkProvider({ children, sdk }: SdkProviderProps<TSdk>) {
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
        {children}
      </SdkContext.Provider>
    );
  }

  const useSdk = () => {
    const contextSdk = useContext(SdkContext);
    if (!contextSdk) {
      throw new Error("useSdk must be used within a SdkProvider");
    }
    return contextSdk;
  };

  return [SdkProvider, useSdk] as const;
}
