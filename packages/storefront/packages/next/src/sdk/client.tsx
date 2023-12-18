/* eslint-disable import/no-extraneous-dependencies */

"use client";

import { SDKApi } from "@vue-storefront/sdk";
import Script from "next/script";
import React, { createContext, useContext } from "react";
import { SdkProviderProps } from "./types";

export function createSdkContext<TSdk extends SDKApi<any>>(sdk: TSdk) {
  const SdkContext = createContext<TSdk>(sdk);

  function SdkProvider({ children }: SdkProviderProps) {
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
