import { buildModule } from "../../modules/buildModule";
import proxyModule1Mock from "../__mocks__/proxyModule1.mock";
import { initSDK } from "../../bootstrap";
import { createModuleMock } from "../__mocks__/createModuleMock";

describe("[Subscription]", () => {
  it("triggers subscribers when module is proxy", async () => {
    expect.assertions(2);
    const mock = proxyModule1Mock({});
    const sdkConfig = {
      proxyModule1: buildModule(() => mock),
    };

    const sdk = initSDK(sdkConfig);
    sdk.proxyModule1.callProxyFunction();

    expect(mock.subscribers["*_before"][0]).toBeCalledTimes(1);
    expect(
      mock.subscribers.proxyModule1_callProxyFunction_before
    ).toBeCalledTimes(1);
  });

  it("triggers interceptors when module is proxy", async () => {
    expect.assertions(4);

    const beforeInterceptorReturnValue = Symbol("beforeInterceptorReturnValue");
    const afterInterceptorReturnValue = Symbol("afterInterceptorReturnValue");
    const { moduleMock, methodMock } = createModuleMock(true, {
      interceptors: [
        {
          before: {
            callProxyFunction: jest.fn(() => {
              return [beforeInterceptorReturnValue];
            }),
          },
          after: {
            callProxyFunction: jest.fn(() => {
              return [afterInterceptorReturnValue];
            }),
          },
        },
      ],
      subscribers: {
        "*_before": [jest.fn()],
        proxyModule1_callProxyFunction_before: jest.fn(),
      },
    });

    const sdkConfig = {
      proxyModule1: buildModule(moduleMock),
    };

    const sdk = initSDK(sdkConfig);

    const result = await sdk.proxyModule1.callProxyFunction();

    expect(
      moduleMock().interceptors[0].before.callProxyFunction
    ).toBeCalledTimes(1);
    expect(
      moduleMock().interceptors[0].after.callProxyFunction
    ).toBeCalledTimes(1);
    expect(methodMock).toHaveBeenCalledWith(beforeInterceptorReturnValue);
    expect(result).toEqual([afterInterceptorReturnValue]);
  });

  it("triggers hooks when module is proxy and hooks are added by extension", async () => {
    expect.assertions(6);

    const beforeInterceptorReturnValue = Symbol("beforeInterceptorReturnValue");
    const afterInterceptorReturnValue = Symbol("afterInterceptorReturnValue");

    const { moduleMock, methodMock } = createModuleMock(true);

    const extension = {
      interceptors: [
        {
          before: {
            callProxyFunction: jest.fn(() => {
              return [beforeInterceptorReturnValue];
            }),
          },
          after: {
            callProxyFunction: jest.fn(() => {
              return [afterInterceptorReturnValue];
            }),
          },
        },
      ],
      subscribers: {
        "*_before": [jest.fn()],
        proxyModule1_callProxyFunction_before: jest.fn(),
      },
    };

    const sdkConfig = {
      proxyModule1: buildModule(moduleMock, {}, extension),
    };

    const sdk = initSDK(sdkConfig);

    const result = await sdk.proxyModule1.callProxyFunction();

    expect(extension.subscribers["*_before"][0]).toBeCalledTimes(1);
    expect(
      extension.subscribers.proxyModule1_callProxyFunction_before
    ).toBeCalledTimes(1);
    expect(extension.interceptors[0].before.callProxyFunction).toBeCalledTimes(
      1
    );
    expect(extension.interceptors[0].after.callProxyFunction).toBeCalledTimes(
      1
    );
    expect(methodMock).toHaveBeenCalledWith(beforeInterceptorReturnValue);
    expect(result).toEqual([afterInterceptorReturnValue]);
  });

  it("triggers hooks on overridden functions when module is proxy and hooks are added by extension", async () => {
    expect.assertions(6);
    const beforeInterceptorReturnValue = Symbol("beforeInterceptorReturnValue");
    const afterInterceptorReturnValue = Symbol("afterInterceptorReturnValue");
    const { moduleMock, methodMock } = createModuleMock(true);

    const extension = {
      extend: {},
      override: {
        overriddenFunction: methodMock,
      },
      interceptors: [
        {
          before: {
            overriddenFunction: jest.fn(() => {
              return [beforeInterceptorReturnValue];
            }),
          },
          after: {
            overriddenFunction: jest.fn(() => {
              return [afterInterceptorReturnValue];
            }),
          },
        },
      ],
      subscribers: {
        "*_before": [jest.fn()],
        proxyModule1_overriddenFunction_before: jest.fn(),
      },
    };

    const sdkConfig = {
      proxyModule1: buildModule(moduleMock, {}, extension),
    };

    const sdk = initSDK(sdkConfig);

    const result = await sdk.proxyModule1.overriddenFunction();

    expect(extension.subscribers["*_before"][0]).toBeCalledTimes(1);
    expect(
      extension.subscribers.proxyModule1_overriddenFunction_before
    ).toBeCalledTimes(1);
    expect(extension.interceptors[0].before.overriddenFunction).toBeCalledTimes(
      1
    );
    expect(extension.interceptors[0].after.overriddenFunction).toBeCalledTimes(
      1
    );
    expect(methodMock).toHaveBeenCalledWith(beforeInterceptorReturnValue);
    expect(result).toEqual([afterInterceptorReturnValue]);
  });

  it("triggers hooks on functions when module is proxy and hooks are added by extension and overriding functions are being added", async () => {
    expect.assertions(6);

    const beforeInterceptorReturnValue = Symbol("beforeInterceptorReturnValue");
    const afterInterceptorReturnValue = Symbol("afterInterceptorReturnValue");
    const { moduleMock, methodMock } = createModuleMock(true);

    const extension = {
      extend: {},
      override: {
        overriddenFunction() {
          return "hello";
        },
      },
      interceptors: [
        {
          before: {
            callProxyFunction: jest.fn(() => {
              return [beforeInterceptorReturnValue];
            }),
          },
          after: {
            callProxyFunction: jest.fn(() => {
              return [afterInterceptorReturnValue];
            }),
          },
        },
      ],
      subscribers: {
        "*_before": [jest.fn()],
        proxyModule1_callProxyFunction_before: jest.fn(),
      },
    };

    const sdkConfig = {
      proxyModule1: buildModule(moduleMock, {}, extension),
    };

    const sdk = initSDK(sdkConfig);

    const result = await sdk.proxyModule1.callProxyFunction();

    expect(extension.subscribers["*_before"][0]).toBeCalledTimes(1);
    expect(
      extension.subscribers.proxyModule1_callProxyFunction_before
    ).toBeCalledTimes(1);
    expect(extension.interceptors[0].before.callProxyFunction).toBeCalledTimes(
      1
    );
    expect(extension.interceptors[0].after.callProxyFunction).toBeCalledTimes(
      1
    );
    expect(methodMock).toHaveBeenCalledWith(beforeInterceptorReturnValue);
    expect(result).toEqual([afterInterceptorReturnValue]);
  });
});
