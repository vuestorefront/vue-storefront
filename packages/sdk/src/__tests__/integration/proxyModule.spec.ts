/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  middlewareModule,
  prepareConfig,
  type Options,
  type EnforceEndpointsConstraint,
} from "../../modules/middlewareModule";
import { initSDK } from "../../bootstrap";
import { buildModule } from "../../modules/buildModule";

type TestEndpoints = {
  /**
   * Foo.
   */
  foo: (foo: string) => Promise<string>;
  /**
   * Bar.
   */
  bar: (bar: number) => Promise<number>;
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

describe("Middleware module", () => {
  const defaultConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    params: [],
  };

  it("should create a middleware module", async () => {
    const options = {
      apiUrl: "https://api.example.com",
    };
    const sdk = initSDK({
      test: buildModule(middlewareModule<TestEndpoints>, options),
    });
    expect(sdk.test).toBeDefined();
  });

  it("should call a method", async () => {
    const options: Options = {
      apiUrl: "https://api.example.com",
      httpClient: jest.fn((url, config) =>
        Promise.resolve({ status: 200, message: "ok" })
      ),
    };

    const sdk = initSDK({
      test: buildModule(middlewareModule<TestEndpoints>, options),
    });

    const result = await sdk.test.foo("foo");
    expect(options.httpClient).toHaveBeenCalledWith(
      "https://api.example.com/foo",
      {
        ...defaultConfig,
        params: ["foo"],
      }
    );
    expect(result).toEqual({ status: 200, message: "ok" });
  });

  it("should call a method with request config", async () => {
    const options: Options = {
      apiUrl: "https://api.example.com",
      httpClient: jest.fn((url, config) =>
        Promise.resolve({ status: 200, message: "ok" })
      ),
    };

    const sdk = initSDK({
      test: buildModule(middlewareModule<TestEndpoints>, options),
    });

    const result = await sdk.test.object(
      { foo: "foo" },
      prepareConfig({ method: "GET", headers: { "X-Test": "test" } })
    );

    expect(options.httpClient).toHaveBeenCalledWith(
      "https://api.example.com/object",
      {
        ...defaultConfig,
        params: [{ foo: "foo" }],
        method: "GET",
        headers: {
          ...defaultConfig.headers,
          "X-Test": "test",
        },
      }
    );
    expect(result).toEqual({ status: 200, message: "ok" });
  });

  it("should call a method with request config and without params", async () => {
    const options: Options = {
      apiUrl: "https://api.example.com",
      httpClient: jest.fn((url, config) =>
        Promise.resolve({ status: 200, message: "ok" })
      ),
    };

    const sdk = initSDK({
      test: buildModule(middlewareModule<TestEndpoints>, options),
    });

    const result = await sdk.test.baz(prepareConfig({ method: "GET" }));

    expect(options.httpClient).toHaveBeenCalledWith(
      "https://api.example.com/baz",
      {
        ...defaultConfig,
        method: "GET",
      }
    );
    expect(result).toEqual({ status: 200, message: "ok" });
  });
});
