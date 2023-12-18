/* eslint-disable import/no-unresolved */
import { createSdkContext } from "@vue-storefront/next/client";
import { getSdk } from "../sdk.config";

export const [SdkProvider, useSdk] = createSdkContext(getSdk());
