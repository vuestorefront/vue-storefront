// eslint-disable-next-line import/no-unresolved
import { createSdkContext } from "@vue-storefront/next/client";
import { getSdk } from "../sdk.config";

export const [SdkProvider, useSdk] = createSdkContext(getSdk() as any);
