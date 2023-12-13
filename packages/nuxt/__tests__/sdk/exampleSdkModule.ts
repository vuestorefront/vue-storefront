import type { Module } from "@vue-storefront/sdk";

interface Options {
  apiUrl: string;
}

export function exampleSdkModule({ apiUrl }: Options) {
  return {
    connector: {
      getSuccess() {
        return fetch(`${apiUrl}/success`, { method: "POST" }).then((res) =>
          res.json()
        );
      },
    },
    utils: {},
    subscribers: {},
  } satisfies Module;
}
