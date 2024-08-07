import { GetServerSideProps } from "next";
import { getSdk } from "../sdk/sdk.server";
import { useSfCurrencyState } from "@vue-storefront/next/client";

export default function SsrPage({ result }: any) {
  const [currency] = useSfCurrencyState();
  return (
    <main>
      <h1>Server Side Page</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
      <div>Currency from the state: {currency}</div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const sdk = getSdk({
    getRequestHeaders: () => req.headers,
  });

  return {
    props: {
      result: await sdk.example.getSuccess(),
    },
  };
};
