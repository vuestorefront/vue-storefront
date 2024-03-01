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
      expect.objectContaining({
        method: "POST",
        params: [{ id: 1 }],
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
    const expectedUrl = new URL("http://localhost:8181/commerce/getProducts");
    expectedUrl.searchParams.append("body", JSON.stringify([{ limit: 1 }]));

    await sdk.commerce.getProducts(
      { limit: 1 },
      prepareConfig({ method: "GET" })
    );

    expect(customHttpClient).toHaveBeenCalledWith(
      expectedUrl.toString(),
      expect.objectContaining({
        method: "GET",
        params: [],
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
    const serializedParams = encodeURIComponent(JSON.stringify([{ limit: 1 }]));

    await sdk.commerce.getProducts(
      { limit: 1 },
      prepareConfig({ method: "GET" })
    );

    expect(customHttpClient).toHaveBeenCalledWith(
      `/api/commerce/getProducts?body=${serializedParams}`,
      expect.objectContaining({
        method: "GET",
        params: [],
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
      expect.any(Object)
    );
  });

  it("should be able to use axios as a custom HTTP client", async () => {
    expect.assertions(2);

    const sdkConfig = {
      commerce: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: "http://localhost:8181/commerce",
        httpClient: async (url, config) => {
          const { params, ...restConfig } = config;
          const { data } = await axios(url, {
            ...restConfig,
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
});
