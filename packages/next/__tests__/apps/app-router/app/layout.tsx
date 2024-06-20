import { ReactNode } from "react";
import { PublicEnvScript } from 'next-runtime-env';
import { Providers } from "./providers";
import { getSdkOptions } from "../sdk/options";

export default function RootLayout({ children }: { children: ReactNode }) {
  const sdkOptions = getSdkOptions();

  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
      </head>
      <body>
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
        <Providers sdkOptions={sdkOptions}>{children}</Providers>
      </body>
    </html>
  );
}
