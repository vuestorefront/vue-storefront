import type { AppProps } from "next/app";
import { createSdk } from "@vue-storefront/next";
import { AlokaiProvider } from "../sdk/sdk-provider";
import { getSdkOptions } from "../sdk/options";
import { getSdkConfig } from "../sdk/config";

export default function App({ Component, pageProps }: AppProps) {
  const { getSdk } = createSdk(getSdkOptions(), getSdkConfig());

  return (
    <AlokaiProvider
      initialData={{
        currencies: ["USD", "EUR"],
        currency: "USD",
        locale: "en",
        locales: ["en", "de"],
      }}
      sdk={getSdk()}
    >
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
    </AlokaiProvider>
  );
}
