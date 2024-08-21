"use client";

import { createAlokaiContext } from "@vue-storefront/next/client";

import type { Sdk } from "./sdk.server";

export const [AlokaiProvider, useSdk] = createAlokaiContext<Sdk>();
