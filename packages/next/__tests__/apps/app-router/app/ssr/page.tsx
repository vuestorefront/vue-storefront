import { headers } from "next/headers";
import { getSdk } from "../../sdk/sdk.server";

export default async function SsrPage() {
  const pageData = await getSdk({
    getRequestHeaders: () => headers(),
  }).example.getSuccess();

  return (
    <main>
      <h1>Server Side Page</h1>
      <pre>{JSON.stringify(pageData, null, 2)}</pre>
    </main>
  );
}
