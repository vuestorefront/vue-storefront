import { extension1Mock } from "../__mocks__/extension1.mock";
import { extension2Mock } from "../__mocks__/extension2.mock";
import module1 from "../__mocks__/module1.mock";
import module2 from "../__mocks__/module2.mock";
import { initSDK } from "../../bootstrap";
import { eventManager } from "../../index";
import { buildModule } from "../../modules/buildModule";
import proxyModule1Mock from "../__mocks__/proxyModule1.mock";
import { proxyExtensionMock1 } from "../__mocks__/proxyExtension1.mock";

const sdkConfig = {
  module1: buildModule(module1, {}, extension1Mock),
  module2: buildModule(module2, {}, extension2Mock),
  proxyModule1: buildModule(proxyModule1Mock, {}, proxyExtensionMock1),
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
