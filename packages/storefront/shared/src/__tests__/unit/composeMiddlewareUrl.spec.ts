import { describe, it, expect, vi, afterEach } from "vitest";
import { composeMiddlewareUrl } from "../../helpers";

describe("composeMiddlewareUrl", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("client side", () => {
    it("returns api url regardless of the config", () => {
      vi.stubGlobal("window", {});

      expect(
        composeMiddlewareUrl({
          options: {
            middleware: {
              apiUrl: "http://localhost:4000",
            },
            multistore: {
              enabled: true,
            },
          },
          headers: {
            host: "localhost:3000",
          },
        })
      ).toBe("http://localhost:4000");

      expect(
        composeMiddlewareUrl({
          options: {
            middleware: {
              apiUrl: "http://localhost:4000",
              ssrApiUrl: "http://localhost:5000",
            },
          },
          headers: {
            host: "localhost:3000",
          },
        })
      ).toBe("http://localhost:4000");
    });

    it("removes trailing slash", () => {
      vi.stubGlobal("window", {});

      expect(
        composeMiddlewareUrl({
          options: {
            middleware: {
              apiUrl: "http://localhost:4000/",
            },
          },
          headers: {},
        })
      ).toBe("http://localhost:4000");
    });
  });

  describe("server side", () => {
    describe("single store", () => {
      it("returns ssrApiUrl", () => {
        const composedUrl = composeMiddlewareUrl({
          options: {
            middleware: {
              apiUrl: "http://localhost:4000",
              ssrApiUrl: "http://localhost:5000",
            },
          },
          headers: {},
        });

        expect(composedUrl).toBe("http://localhost:5000");
      });

      it("fallbacks to apiUrl when ssrApiUrl not defined", () => {
        const composedUrl = composeMiddlewareUrl({
          options: {
            middleware: {
              apiUrl: "http://localhost:4000",
            },
          },
          headers: {},
        });

        expect(composedUrl).toBe("http://localhost:4000");
      });

      it("removes trailing slash", () => {
        const composedUrl = composeMiddlewareUrl({
          options: {
            middleware: {
              apiUrl: "http://localhost:4000/",
              ssrApiUrl: "http://localhost:5000/",
            },
          },
          headers: {},
        });

        expect(composedUrl).toBe("http://localhost:5000");
      });
    });

    describe("multistore", () => {
      it('uses "host" header', () => {
        const composedUrl = composeMiddlewareUrl({
          options: {
            middleware: {
              apiUrl: "http://localhost:4000",
            },
            multistore: {
              enabled: true,
            },
          },
          headers: {
            host: "localhost:3000",
          },
        });

        expect(composedUrl).toBe("http://localhost:3000");
      });

      it("uses original url when request has been proxied", () => {
        const composedUrl = composeMiddlewareUrl({
          options: {
            middleware: {
              apiUrl: "http://localhost:4000",
            },
            multistore: {
              enabled: true,
            },
          },
          headers: {
            host: "localhost:3000",
            "x-forwarded-host": "localhost:5000",
          },
        });

        expect(composedUrl).toBe("http://localhost:5000");
      });

      it("uses ssrApiUrl when available", () => {
        const composedUrl = composeMiddlewareUrl({
          options: {
            middleware: {
              apiUrl: "http://localhost:4000",
              ssrApiUrl: "http://localhost:5000",
            },
            multistore: {
              enabled: true,
            },
          },
          headers: {
            host: "localhost:3000",
          },
        });

        expect(composedUrl).toBe("http://localhost:5000");
      });

      it("removes trailing slash", () => {
        const composedUrl = composeMiddlewareUrl({
          options: {
            middleware: {
              apiUrl: "http://localhost:4000/",
            },
            multistore: {
              enabled: true,
            },
          },
          headers: {
            host: "localhost:3000/",
          },
        });

        expect(composedUrl).toBe("http://localhost:3000");
      });
    });
  });
});
