import "isomorphic-fetch";
import { initSDK, buildModule } from "../../../index";
import {
  moduleFromEndpoints,
  prepareConfig,
} from "../../../modules/moduleFromEndpoints";
import { Endpoints } from "../../__mocks__/apiClient/types";

const axios = require("axios/dist/node/axios.cjs");

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

    expect(sdk.commerce.getProduct).toBeInstanceOf(Function);
    expect(sdk.commerce.getProducts).toBeInstanceOf(Function);
  });

  it("should allow to override the default HTTP Client", async () => {
    const customHttpClient = jest.fn();
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
    const customHttpClient = jest.fn();
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
      [{ id: 1 }],
      expect.objectContaining({
        method: "POST",
      })
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

    // To avoid mocking fetch, we're calling the real middleware and verifying the response.
    expect(response).toEqual({ id: 1, name: "Test Product" });
  });

  it("should allow to use GET request with query parameters", async () => {
    const customHttpClient = jest.fn();
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "http://localhost:8181/commerce",
        httpClient: customHttpClient,
      }),
    };
    const sdk = initSDK(sdkConfig);

    await sdk.commerce.getProducts(
      { limit: 1 },
      prepareConfig({ method: "GET" })
    );

    expect(customHttpClient).toHaveBeenCalledWith(
      `http://localhost:8181/commerce/getProducts?body=${encodeURIComponent(
        JSON.stringify([{ limit: 1 }])
      )}`,
      [],
      expect.objectContaining({
        method: "GET",
      })
    );
  });

  it("should allow to use GET request when apiUrl is a path", async () => {
    const customHttpClient = jest.fn();
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "/api/commerce",
        httpClient: customHttpClient,
      }),
    };
    const sdk = initSDK(sdkConfig);

    await sdk.commerce.getProducts(
      { limit: 1 },
      prepareConfig({ method: "GET" })
    );

    expect(customHttpClient).toHaveBeenCalledWith(
      `/api/commerce/getProducts?body=${encodeURIComponent(
        JSON.stringify([{ limit: 1 }])
      )}`,
      [],
      expect.objectContaining({
        method: "GET",
      })
    );
  });

  it("should normalize the url", async () => {
    const customHttpClient = jest.fn();
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "http://localhost:8181/commerce///", // Extra slashes
        httpClient: customHttpClient,
      }),
    };
    const sdk = initSDK(sdkConfig);

    await sdk.commerce.getProduct({ id: 1 });

    expect(customHttpClient).toHaveBeenCalledWith(
      "http://localhost:8181/commerce/getProduct",
      expect.any(Array),
      expect.any(Object)
    );
  });

  it("should allow to use custom headers", async () => {
    const customHttpClient = jest.fn();
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
      expect.any(Array),
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Test": "x-test-header",
        },
      })
    );
  });

  it("should allow to define default headers", async () => {
    const customHttpClient = jest.fn();
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
      expect.any(Array),
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Test": "x-test-header",
        },
      })
    );
  });

  it("should use different base URL during SSR if defined", async () => {
    const customHttpClient = jest.fn();
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
      expect.any(Array),
      expect.any(Object)
    );
  });

  it("should be able to use axios as a custom HTTP client", async () => {
    expect.assertions(2);

    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "http://localhost:8181/commerce",
        httpClient: async (url, params, config) => {
          const { data } = await axios(url, {
            ...config,
            data: params,
          });
          return data;
        },
      }),
    };
    const sdk = initSDK(sdkConfig);

    const postResponse = await sdk.commerce.getProduct({ id: 1 });
    const getResponse = await sdk.commerce.getProduct(
      { id: 2 },
      prepareConfig({ method: "GET" })
    );

    expect(postResponse).toEqual({ id: 1, name: "Test Product" });
    expect(getResponse).toEqual({ id: 2, name: "Test Product" });
  });

  it("should accept headers as Record<string | string[]>", async () => {
    const customHttpClient = jest.fn();
    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "http://localhost:8181/commerce",
        httpClient: customHttpClient,
        defaultRequestConfig: {
          headers: {
            "X-Test-Default": ["x-test-header", "x-test-header-2"],
          },
        },
      }),
    };
    const sdk = initSDK(sdkConfig);

    await sdk.commerce.getProduct(
      { id: 1 },
      prepareConfig({
        method: "POST",
        headers: {
          "X-Test": ["x-test-header", "x-test-header-2"],
        },
      })
    );

    expect(customHttpClient).toHaveBeenCalledWith(
      "http://localhost:8181/commerce/getProduct",
      expect.any(Array),
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Test-Default": "x-test-header,x-test-header-2",
          "X-Test": "x-test-header,x-test-header-2",
        },
      })
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
