import { Module, SDKConfig } from "../../types";

type ModuleMock<Overwrite extends Partial<SDKConfig[string]>> = {
  moduleMock: () => Module & Overwrite;
  methodMock: jest.Mock;
};

export function createModuleMock<Overwrite extends Partial<SDKConfig[string]>>(
  isProxy: boolean,
  overwrite: Overwrite = {} as Overwrite
): ModuleMock<Overwrite> {
  const methodMock = jest.fn();
  const proxyModule = new Proxy(
    {},
    {
      get() {
        return methodMock;
      },
    }
  ) as unknown as { callFunction: () => symbol };

  const connector = isProxy ? proxyModule : { callFunction: methodMock };

  const mockedModule = {
    connector,
    utils: {},
    extend: {},
    interceptors: [],
    subscribers: {},
    ...overwrite,
  };
  return {
    moduleMock: () => mockedModule,
    methodMock,
  };
}
