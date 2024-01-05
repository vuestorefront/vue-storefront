"use client";

import { useEffect, useState } from "react";
import { useSdk } from "../../hooks";

export function ClientComponentUsingSdk() {
  const sdk = useSdk();
  const [response, setResponse] = useState<any>();

  useEffect(() => {
    sdk.example.getSuccess().then((res) => {
      setResponse(res);
    });
  }, []);

  return <pre>{JSON.stringify(response, null, 2)}</pre>;
}
