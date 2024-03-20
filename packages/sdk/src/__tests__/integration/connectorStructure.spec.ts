import { initSDK } from "../../bootstrap";
import { buildModule } from "../../modules/buildModule";
import { createModuleMock } from "../__mocks__/createModuleMock";

describe("[ConnectorStructure]", () => {
  it("exposes utils", async () => {
    expect.assertions(1);
    const utilFunction = () => undefined;
    const { moduleMock } = createModuleMock(true, { utils: { utilFunction } });

    const extension = {};

    const sdkConfig = {
      proxyModule1: buildModule(moduleMock, {}, extension),
    };

    const sdk = initSDK(sdkConfig);

    expect(sdk.proxyModule1.utils.utilFunction).toEqual(utilFunction);
  });

  it("returns undefined when method doesn't exist", async () => {
    expect.assertions(1);
    const utilFunction = () => undefined;
    const { moduleMock } = createModuleMock(true, {
      utils: utilFunction,
      connector: {
        realFunction: () => undefined,
      },
    });

    const extension = {};

    const sdkConfig = {
      proxyModule1: buildModule(moduleMock, {}, extension),
    };

    const sdk = initSDK(sdkConfig);

    expect(sdk.proxyModule1.fakeFunction).toEqual(undefined);
  });

  it("handles connectors with nonconfigurable properties", async () => {
    expect.assertions(1);
    const utilFunction = () => undefined;

    const connector = {};

    Object.defineProperty(connector, "realFunction", {
      value: () => undefined,
      configurable: false,
      enumerable: true,
    });

    const { moduleMock } = createModuleMock(true, {
      utils: utilFunction,
      connector,
    });

    const extension = {};

    const sdkConfig = {
      proxyModule1: buildModule(moduleMock, {}, extension),
    };

    const sdk = initSDK(sdkConfig);

    expect(() => sdk.proxyModule1.realFunction()).not.toThrow();
  });
});
