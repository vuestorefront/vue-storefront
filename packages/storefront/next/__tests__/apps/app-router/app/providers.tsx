"use client";

import { ReactNode, useState } from "react";
import { SdkProvider } from "../hooks";
import { getSdk } from "../sdk.config";

export function Providers({ children }: { children: ReactNode }) {
  const [sdk] = useState(getSdk());

  return <SdkProvider sdk={sdk}>{children}</SdkProvider>;
}
