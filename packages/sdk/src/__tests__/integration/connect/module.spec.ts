/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  connect,
  prepareConfig,
  type EnforceEndpointsConstraint,
} from "../../../modules/connect";
import { initSDK } from "../../../bootstrap";
import { buildModule } from "../../../modules/buildModule";

type TestEndpoints = {
  /**
   * FooBar.
   */
  fooBar: (foo: string, bar?: number) => Promise<string>;
  /**
   * Baz.
   */
  baz: () => Promise<string>;
  /**
   * Object.
   */
  object: (params: { foo: string }) => Promise<string>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testEndpointsComplianceCheck: EnforceEndpointsConstraint<TestEndpoints> =
  {} as TestEndpoints;

describe("Connect SDK module", () => {
  const defaultConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    params: [],
  };

  it("should create a middleware module with methods", async () => {
    // Given
    const options = {
      apiUrl: "https://api.example.com",
    };

    // When
    const sdk = initSDK({
      test: buildModule(connect<TestEndpoints>, options),
    });

    // Then
    expect(sdk.test).toBeDefined();
    expect(sdk.test.fooBar).toBeDefined();
    expect(sdk.test.baz).toBeDefined();
    expect(sdk.test.object).toBeDefined();
  });

  it("should call a method with params", async () => {
    // Given
    const httpClient = jest.fn((url, config) => Promise.resolve("ok"));
    const options = {
      apiUrl: "https://api.example.com",
      httpClient,
    };
    const sdk = initSDK({
      test: buildModule(connect<TestEndpoints>, options),
    });

    // When
    const result = await sdk.test.fooBar("foo", 1);

    // Then
    expect(httpClient).toHaveBeenCalledWith("https://api.example.com/fooBar", {
      ...defaultConfig,
      params: ["foo", 1],
    });
    expect(result).toEqual("ok");
  });

  it("should call a method with params in GET method", async () => {
    // Given
    const httpClient = jest.fn((url, config) => Promise.resolve("ok"));
    const options = {
      apiUrl: "https://api.example.com",
      httpClient,
    };
    const sdk = initSDK({
      test: buildModule(connect<TestEndpoints>, options),
    });
    const expectedUrl = new URL("https://api.example.com/fooBar");
    expectedUrl.searchParams.append("body", JSON.stringify(["foo", 1]));

    // When
    const result = await sdk.test.fooBar(
      "foo",
      1,
      prepareConfig({ method: "GET" })
    );

    // Then

    expect(httpClient).toHaveBeenCalledWith(expectedUrl.toString(), {
      ...defaultConfig,
      method: "GET",
    });
    expect(result).toEqual("ok");
  });

  it("should call a method with params in GET method and headers", async () => {
    // Given
    const httpClient = jest.fn((url, config) => Promise.resolve("ok"));
    const options = {
      apiUrl: "https://api.example.com",
      httpClient,
    };
    const sdk = initSDK({
      test: buildModule(connect<TestEndpoints>, options),
    });
    const expectedUrl = new URL("https://api.example.com/object");
    expectedUrl.searchParams.append("body", JSON.stringify([{ foo: "bar" }]));

    // When
    const result = await sdk.test.object(
      { foo: "bar" },
      prepareConfig({ method: "GET", headers: { "X-Test": "test" } })
    );

    // Then
    expect(httpClient).toHaveBeenCalledWith(expectedUrl.toString(), {
      ...defaultConfig,
      method: "GET",
      headers: {
        ...defaultConfig.headers,
        "X-Test": "test",
      },
    });
    expect(result).toEqual("ok");
  });

  it("should call a method with default request config", async () => {
    // Given
    const httpClient = jest.fn((url, config) => Promise.resolve("ok"));
    const options = {
      apiUrl: "https://api.example.com",
      httpClient,
      defaultRequestConfig: {
        headers: {
          "X-Test-Default": "test default",
        },
      },
    };
    const sdk = initSDK({
      test: buildModule(connect<TestEndpoints>, options),
    });

    // When
    const result = await sdk.test.baz();

    // Then
    expect(httpClient).toHaveBeenCalledWith("https://api.example.com/baz", {
      ...defaultConfig,
      headers: {
        ...defaultConfig.headers,
        "X-Test-Default": "test default",
      },
    });
    expect(result).toEqual("ok");
  });

  it("should use error handler only if method fails", async () => {
    // Given
    const httpClient = jest.fn((url, config) => Promise.resolve("ok"));
    const errorHandler = jest.fn((error) => Promise.resolve("error handled"));
    const options = {
      apiUrl: "https://api.example.com",
      httpClient,
      errorHandler,
    };
    const sdk = initSDK({
      test: buildModule(connect<TestEndpoints>, options),
    });

    // When
    const result = await sdk.test.baz();

    // Then
    expect(errorHandler).not.toHaveBeenCalled();
    expect(result).toEqual("ok");
  });

  it("should call a method with custom error handler", async () => {
    // Given
    const httpClient = jest.fn((url, config) => Promise.reject());
    const errorHandler = jest.fn((error) => Promise.resolve("error handled"));
    const options = {
      apiUrl: "https://api.example.com",
      httpClient,
      errorHandler,
    };
    const sdk = initSDK({
      test: buildModule(connect<TestEndpoints>, options),
    });

    // When
    const result = await sdk.test.baz();
    expect(errorHandler).toHaveBeenCalled();
    expect(result).toEqual("error handled");
  });
});
