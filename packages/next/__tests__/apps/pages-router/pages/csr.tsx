import { useEffect, useState } from "react";
import { useSdk } from "../sdk/sdk-provider";

export default function ClientPage() {
  const sdk = useSdk();
  const [result, setResult] = useState();

  useEffect(() => {
    sdk.example.getSuccess().then((res) => {
      setResult(res);
    });
  }, []);

  return (
    <main>
      <h1>Client Side Page</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
