"use client";

import { useEffect, useState } from "react";
import { useSdk } from "../../sdk/sdk-provider";
import { useSfCurrencyState } from "@vue-storefront/next/client";

export function ClientComponentUsingSdk() {
  const sdk = useSdk();
  const [response, setResponse] = useState<any>();
  const [currency] = useSfCurrencyState();

  useEffect(() => {
    sdk.example.getSuccess().then((res) => {
      setResponse(res);
    });
  }, []);

  return (
    <>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <div>Currency from the state: {currency}</div>
    </>
  );
}
