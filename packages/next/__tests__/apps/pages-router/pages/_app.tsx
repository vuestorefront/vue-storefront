import type { AppProps } from "next/app";
import { useState } from "react";
import { SdkProvider } from "../hooks";
import { getSdk } from "../sdk.config";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [sdk] = useState(getSdk());
  return (
    <SdkProvider sdk={sdk}>
      <Component {...pageProps} />
    </SdkProvider>
  );
}
