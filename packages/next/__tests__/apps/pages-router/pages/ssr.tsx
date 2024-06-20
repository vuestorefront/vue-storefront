import { GetServerSideProps } from "next";
import { getSdk } from "../sdk/sdk.server";

export default function SsrPage({ result }: any) {
  return (
    <main>
      <h1>Server Side Page</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
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
