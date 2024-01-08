interface Options {
  apiUrl: string;
  headers?: Record<string, string>;
}

export function exampleSdkModule({ apiUrl, headers }: Options) {
  return {
    connector: {
      async getSuccess() {
        const response = await fetch(`${apiUrl}/success`, {
          method: "POST",
        });
        const payload = await response.json();
        return { ...payload, cookie: headers.cookie ?? null };
      },
    },
    utils: {},
    subscribers: {},
  };
}
