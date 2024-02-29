import { initSDK, buildModule } from "../../../index";
import { moduleFromEndpoints } from "../../../modules/moduleFromEndpoints";

type Endpoints = {
  getProduct: (params: { id: string }) => Promise<any>;
  getProducts: (params: { limit: number }) => Promise<any>;
};

describe("moduleFromEndpoints", () => {
  it("should be able to be used as standard SDK module", async () => {
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints),
    };

    const sdk = initSDK(sdkConfig);

    expect(sdk.commerce).toBeDefined();
  });

  it("should use generic types to define the endpoints", async () => {
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>),
    };

    const sdk = initSDK(sdkConfig);

    expect(sdk.commerce.getProduct).toBeInstanceOf(Function);
    expect(sdk.commerce.getProducts).toBeInstanceOf(Function);
  });
});
