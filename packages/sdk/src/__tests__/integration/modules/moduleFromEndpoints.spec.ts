import "isomorphic-fetch";
import { initSDK, buildModule } from "../../../index";
import { moduleFromEndpoints } from "../../../modules/moduleFromEndpoints";
import { Endpoints } from "../../__mocks__/apiClient/types";

describe("moduleFromEndpoints", () => {
  it("should be able to be used as standard SDK module", async () => {
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints, {
        apiUrl: "http://localhost:8181/commerce",
      }),
    };

    const sdk = initSDK(sdkConfig);

    expect(sdk.commerce).toBeDefined();
  });

  it("should use generic types to define the endpoints", async () => {
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "http://localhost:8181/commerce",
      }),
    };

    const sdk = initSDK(sdkConfig);

    expect(sdk.commerce.getProduct).toBeDefined();
    expect(sdk.commerce.getProducts).toBeDefined();
  });

  it("should allow to override the default HTTP Client", async () => {
    const customHttpClient = jest
      .fn()
      .mockResolvedValue({ id: 1, name: "Test Product" });
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "http://localhost:8181/commerce",
        httpClient: customHttpClient,
      }),
    };
    const sdk = initSDK(sdkConfig);

    await sdk.commerce.getProduct({ id: 1 });

    expect(customHttpClient).toHaveBeenCalled();
  });

  it("should send a POST request to <BASE_URL>/<METHOD_NAME> by default", async () => {
    const customHttpClient = jest
      .fn()
      .mockResolvedValue({ id: 1, name: "Test Product" });
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "http://localhost:8181/commerce",
        httpClient: customHttpClient,
      }),
    };
    const sdk = initSDK(sdkConfig);

    await sdk.commerce.getProduct({ id: 1 });

    expect(customHttpClient).toHaveBeenCalledWith(
      "http://localhost:8181/commerce/getProduct",
      {
        method: "POST",
        params: [{ id: 1 }],
      }
    );
  });

  it("should use default HTTP Client if it's not provided", async () => {
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "http://localhost:8181/commerce",
      }),
    };
    const sdk = initSDK(sdkConfig);

    const response = await sdk.commerce.getProduct({ id: 1 });

    expect(response).toEqual({ id: 1, name: "Test Product" });
  });
});
