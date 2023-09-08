/* eslint-disable */
export default function createProxyModule1(options: any, methodMock: Function = () => {}) {
  return {
    connector: new Proxy(
      {},
      {
        get(_, key) {
          return methodMock;
        },
      }
    ) as unknown as { callProxyFunction: () => symbol },
    utils: {
      helpers: {
        formatCurrency(price: string, currency: string) {
          return `${currency} ${price}`;
        },
      },
    },
    extend: {},
    interceptors: [
      {
        before: {
          callProxyFunction: jest.fn((...args: any[]) => {
            return args;
          }),
        },
        after: {
          callProxyFunction: jest.fn((...args: any[]) => {
            return args;
          }),
        },
      },
    ],
    subscribers: {
      '*_before': [jest.fn()],
      proxyModule1_callProxyFunction_before: jest.fn(),
    },
  };
}

export const stringDecoratorInterceptor = (result: string): string => {
  return `((((${result}))))`;
};

export type ProxyModule1 = ReturnType<typeof createProxyModule1>;
