import type { AppProps } from "next/app";
import { SdkProvider } from "../hooks";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SdkProvider>
      <Component {...pageProps} />
    </SdkProvider>
  );
}
