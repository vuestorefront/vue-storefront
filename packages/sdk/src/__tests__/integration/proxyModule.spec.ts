import {
  middlewareModule,
  prepareRequestConfig,
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
    const getMock = jest.fn(() => Promise.resolve("getFoo"));
    const postMock = jest.fn(() => Promise.resolve("postFoo"));

    const options: Options = {
      apiUrl: "https://api.example.com",
      httpClient: {
        get: getMock,
        post: postMock,
      },
    };

    const sdk = initSDK({
      test: buildModule(middlewareModule<TestEndpoints>, options),
    });

    const result = await sdk.test.foo("foo");
    expect(result).toBe("postFoo");
  });

  it("should call a method with request config", async () => {
    const getMock = jest.fn(() => Promise.resolve("getFoo"));
    const postMock = jest.fn(() => Promise.resolve("postFoo"));

    const options: Options = {
      apiUrl: "https://api.example.com",
      httpClient: {
        get: getMock,
        post: postMock,
      },
    };

    const sdk = initSDK({
      test: buildModule(middlewareModule<TestEndpoints>, options),
    });

    const result = await sdk.test.object(
      { foo: "foo" },
      prepareRequestConfig({ method: "GET" })
    );
    expect(result).toBe("getFoo");
  });

  it("should call a method with request config and without params", async () => {
    const getMock = jest.fn(() => Promise.resolve("getFoo"));
    const postMock = jest.fn(() => Promise.resolve("postFoo"));

    const options: Options = {
      apiUrl: "https://api.example.com",
      httpClient: {
        get: getMock,
        post: postMock,
      },
    };

    const sdk = initSDK({
      test: buildModule(middlewareModule<TestEndpoints>, options),
    });

    const result = await sdk.test.baz(prepareRequestConfig({ method: "GET" }));
    expect(result).toBe("getFoo");
  });
});
