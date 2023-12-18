"use client";

import { ReactNode } from "react";
import { SdkProvider } from "../hooks";

export function Providers({ children }: { children: ReactNode }) {
  return <SdkProvider>{children}</SdkProvider>;
}
