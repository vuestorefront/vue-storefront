import type { AppProps } from "next/app";
import { createSdk } from "@vue-storefront/next";
import { SdkProvider } from "../sdk/sdk-provider";
import { getSdkOptions } from "../sdk/options";
import { getSdkConfig } from "../sdk/config";
import { PublicEnvScript } from "next-runtime-env";

export default function App({ Component, pageProps }: AppProps) {
  const { getSdk } = createSdk(getSdkOptions(), getSdkConfig());

  return (
    <html>
      <head>
        <PublicEnvScript />
      </head>
      <body>
        <SdkProvider sdk={getSdk()}>
          <nav>
            <ul>
              <li>
                <a href="/ssr">SSR Page</a>
              </li>
              <li>
                <a href="/csr">CSR Page</a>
              </li>
            </ul>
          </nav>
          <Component {...pageProps} />
        </SdkProvider>
      </body>
    </html>
  );
}
