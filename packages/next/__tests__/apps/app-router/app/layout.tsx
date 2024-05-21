import { ReactNode } from "react";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
