import { createSdk } from "@vue-storefront/next";
import { getSdkOptions } from "./options";
import { getSdkConfig } from "./config";

export const { getSdk } = createSdk(
  getSdkOptions(), getSdkConfig()
);

export type Sdk = ReturnType<typeof getSdk>;
