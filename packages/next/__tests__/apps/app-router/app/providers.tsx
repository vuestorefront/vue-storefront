"use client";

import { ReactNode } from "react";
import { createSdk, type CreateSdkOptions } from "@vue-storefront/next";
import { AlokaiProvider } from "../sdk/sdk-provider";
import { getSdkConfig } from "../sdk/config";

export function Providers({
  children,
  sdkOptions,
}: {
  children: ReactNode;
  sdkOptions: CreateSdkOptions;
}) {
  const { getSdk } = createSdk(sdkOptions, getSdkConfig());

  return (
    <AlokaiProvider
      initialData={{
        currencies: ["USD", "EUR"],
        currency: "USD",
        locale: "en",
        locales: ["en", "de"],
      }}
      sdk={getSdk()}
    >
      {children}
    </AlokaiProvider>
  );
}
