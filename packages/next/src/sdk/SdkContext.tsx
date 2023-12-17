"use client";

/* eslint-disable import/no-extraneous-dependencies */
import { initSDK } from "@vue-storefront/sdk";
import Script from "next/script";
import React, { createContext, useContext } from "react";

/**
 *
 * @param config Sdk config created with defineSdkConfig
 * @returns [SdkProvider, useSdk] a tuple with SdkProvider, required to register the Sdk context, and useSdk hook
 * @example
 * ```ts
 * const [SdkProvider, useSdk] = createSdkContext(getSdkConfig());
 * ```
 */
export function createSdkContext<TConfig extends Record<string, any>>() {
  type Sdk = ReturnType<typeof initSDK<TConfig>>;
  const SdkContext = createContext<Sdk | null>(null);

  function SdkProvider({
    children,
    sdk,
  }: {
    children: React.ReactNode;
    sdk: Sdk;
  }) {
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
    const sdk = useContext(SdkContext);
    if (!sdk) {
      throw new Error("useSdk must be used within a SdkProvider");
    }
    return sdk;
  };

  return [SdkProvider, useSdk] as const;
}
