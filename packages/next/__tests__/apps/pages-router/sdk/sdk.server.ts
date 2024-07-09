import { createSdk } from "@vue-storefront/next";
import { getSdkConfig } from "./config";
import { getSdkOptions } from "./options";

export const { getSdk } = createSdk(getSdkOptions(), getSdkConfig());

export type Sdk = ReturnType<typeof getSdk>;
