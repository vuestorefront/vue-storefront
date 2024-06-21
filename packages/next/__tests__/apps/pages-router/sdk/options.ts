import type { CreateSdkOptions } from "@vue-storefront/next";
import { env } from "next-runtime-env";

export function getSdkOptions() {
  return {
    middleware: {
      apiUrl:
        env("NEXT_PUBLIC_ALOKAI_MIDDLEWARE_API_URL") ?? "http://localhost:4000",
    },
  } satisfies CreateSdkOptions;
}
