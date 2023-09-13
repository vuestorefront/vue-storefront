import { apiClientFactory } from "../apiClientFactory";

const onCreate = (config: { hello: string }) => {
  return {
    config,
    client: {
      hello: () => {
        console.log("hello");
      },
    },
  };
};
const { createApiClient } = apiClientFactory({
  onCreate,
  api: {
    hello: (context) => {
      console.log("hello", context);
    },
  },
  extensions: [
    {
      name: "klevuExtension",
      extendApiMethods: {
        world: (context) => {
          console.log("world", context);
        },
      },
    },
  ],
});

export { createApiClient };
