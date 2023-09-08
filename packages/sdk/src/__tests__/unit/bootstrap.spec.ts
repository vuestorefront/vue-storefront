import { extension1Mock } from "../__mocks__/extension1.mock";
import { extension2Mock } from "../__mocks__/extension2.mock";
import module1, { Module1 } from "../__mocks__/module1.mock";
import module2, { Module2 } from "../__mocks__/module2.mock";
import { initSDK } from "../../bootstrap";
import { eventManager } from "../../index";
import { buildModule } from "../../module/buildModule";
import proxyModule1Mock, { ProxyModule1 } from "../__mocks__/proxyModule1.mock";
import { proxyExtensionMock1 } from "../__mocks__/proxyExtension1.mock";

const sdkConfig = {
  module1: buildModule<Module1, typeof extension1Mock>(
    module1,
    {},
    extension1Mock
  ),
  module2: buildModule<Module2, typeof extension2Mock>(
    module2,
    {},
    extension2Mock
  ),
  proxyModule1: buildModule<ProxyModule1, typeof proxyExtensionMock1>(
    proxyModule1Mock,
    {},
    proxyExtensionMock1
  ),
};

describe("[Bootstrap]", () => {
  it("initSdk should return sdk instance", () => {
    const sdk = initSDK(sdkConfig);

    expect(sdk).toBeDefined();
  });

  it("eventManager has been called with correct arguments", () => {
    const spyEvent = jest.spyOn(eventManager, "registerSubscribers");
    initSDK(sdkConfig);

    expect(spyEvent).toBeCalledWith(extension2Mock.subscribers);
  });
});
