/* eslint-disable */
type Method1 = (test: string) => { result: string };

export const proxyExtensionMock1 = {
  beforeInterceptors: {
    callProxyFunction: [
      (...args: Parameters<Method1>): Parameters<Method1> => {
        return args;
      },
    ],
  },
  interceptors: [
    {
      before: {
        callProxyFunction: [
          (result: ReturnType<Method1>): ReturnType<Method1> => {
            return result;
          },
          (result: ReturnType<Method1>): ReturnType<Method1> => {
            return result;
          },
        ],
      },
    },
  ],
  utils: {
    math: { test: () => false },
  },
  override: {},
  extend: {},
  subscribers: {
    '*_before': [(args: any) => {}],
  },
};
