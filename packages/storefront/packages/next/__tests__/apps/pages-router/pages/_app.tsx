import type { AppProps } from "next/app";
import { SdkProvider } from "../hooks";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SdkProvider>
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
  );
}
