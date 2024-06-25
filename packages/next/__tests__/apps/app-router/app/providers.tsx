"use client";

import { ReactNode } from "react";
import { createSdk, type CreateSdkOptions } from "@vue-storefront/next";
import { SdkProvider } from "../sdk/sdk-provider";
import { getSdkConfig } from "../sdk/config";

export function Providers({
  children,
  sdkOptions,
}: {
  children: ReactNode;
  sdkOptions: CreateSdkOptions;
  }) {
  const { getSdk } = createSdk(sdkOptions, getSdkConfig());

  return <SdkProvider sdk={getSdk()}>{children}</SdkProvider>;
}
