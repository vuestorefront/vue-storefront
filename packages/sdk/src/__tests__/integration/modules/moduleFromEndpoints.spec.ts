import "isomorphic-fetch";
import { initSDK, buildModule } from "../../../index";
import {
  moduleFromEndpoints,
  prepareConfig,
} from "../../../modules/moduleFromEndpoints";
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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

  it("should allow to use GET request with query parameters", async () => {
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
    const expectedUrl = new URL("http://localhost:8181/commerce/getProducts");
    expectedUrl.searchParams.append("body", JSON.stringify([{ limit: 1 }]));

    await sdk.commerce.getProducts(
      { limit: 1 },
      prepareConfig({ method: "GET" })
    );

    expect(customHttpClient).toHaveBeenCalledWith(expectedUrl.toString(), {
      method: "GET",
      params: [],
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  });

  it("should normalize the base URL", async () => {
    const customHttpClient = jest
      .fn()
      .mockResolvedValue({ id: 1, name: "Test Product" });
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "http://localhost:8181/commerce/",
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  });

  it("should allow to use custom headers", async () => {
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

    await sdk.commerce.getProduct(
      { id: 1 },
      prepareConfig({
        method: "POST",
        headers: {
          "X-Test": "x-test-header",
        },
      })
    );

    expect(customHttpClient).toHaveBeenCalledWith(
      "http://localhost:8181/commerce/getProduct",
      {
        method: "POST",
        params: [{ id: 1 }],
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Test": "x-test-header",
        },
      }
    );
  });

  it("should allow to define default headers", async () => {
    const customHttpClient = jest
      .fn()
      .mockResolvedValue({ id: 1, name: "Test Product" });
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "http://localhost:8181/commerce",
        httpClient: customHttpClient,
        defaultRequestConfig: {
          headers: {
            "X-Test": "x-test-header",
          },
        },
      }),
    };
    const sdk = initSDK(sdkConfig);

    await sdk.commerce.getProduct({ id: 1 });

    expect(customHttpClient).toHaveBeenCalledWith(
      "http://localhost:8181/commerce/getProduct",
      {
        method: "POST",
        params: [{ id: 1 }],
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Test": "x-test-header",
        },
      }
    );
  });

  it("should use different base URL during SSR if defined", async () => {
    const customHttpClient = jest
      .fn()
      .mockResolvedValue({ id: 1, name: "Test Product" });
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "/api/commerce",
        ssrApiUrl: "http://localhost:8181/commerce",
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  });

  it("should allow to use custom error handler", async () => {
    const error = new Error("Test error");
    const customErrorHandler = jest
      .fn()
      .mockResolvedValue({ id: 1, name: "Error handler did a good job" });
    const customHttpClient = jest.fn().mockRejectedValue(error);
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "http://localhost:8181/commerce",
        httpClient: customHttpClient,
        errorHandler: customErrorHandler,
      }),
    };
    const sdk = initSDK(sdkConfig);

    const res = await sdk.commerce.getProduct({ id: 1 });
    expect(customErrorHandler).toHaveBeenCalledWith(error);
    expect(res).toEqual({ id: 1, name: "Error handler did a good job" });
  });
});
