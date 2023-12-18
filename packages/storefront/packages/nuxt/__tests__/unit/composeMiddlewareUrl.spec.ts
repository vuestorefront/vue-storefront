import { describe, it, expect } from "vitest";
import { composeMiddlewareUrl } from "../../src/runtime/utils/composeMiddlewareUrl";

describe("SDK utils", () => {
  describe("composeMiddlewareUrl", () => {
    describe("single store", () => {
      it("uses config values", () => {
        const composedUrl = composeMiddlewareUrl({
          config: {
            apiBaseUrl: "localhost:8080",
            apiProtocol: "https",
            apiSubpath: "/api",
            isMultistoreEnabled: false,
          },
          headers: {},
          clientsideUrl: null,
        });
        expect(composedUrl).toBe("https://localhost:8080/api");
      });
    });
    describe("multistore", () => {
      it('uses "host" header ', () => {
        const composedUrl = composeMiddlewareUrl({
          config: {
            apiBaseUrl: "localhost:8080",
            apiProtocol: "https",
            apiSubpath: "/api",
            isMultistoreEnabled: true,
          },
          headers: {
            host: "incoming-url",
          },
          clientsideUrl: null,
        });
        expect(composedUrl).toBe("https://incoming-url/api");
      });
      it("uses original url when request has been proxied", () => {
        const composedUrl = composeMiddlewareUrl({
          config: {
            apiBaseUrl: "localhost:8080",
            apiProtocol: "https",
            apiSubpath: "/api",
            isMultistoreEnabled: true,
          },
          headers: {
            "x-forwarded-host": "original-url",
            host: "proxy-url",
          },
          clientsideUrl: null,
        });
        expect(composedUrl).toBe("https://original-url/api");
      });
      it("uses local url when available", () => {
        const composedUrl = composeMiddlewareUrl({
          config: {
            apiBaseUrl: "localhost:8080",
            apiProtocol: "https",
            apiSubpath: "/api",
            isMultistoreEnabled: true,
          },
          headers: {},
          clientsideUrl: "local-url",
        });
        expect(composedUrl).toBe("https://local-url/api");
      });
    });
  });
});
