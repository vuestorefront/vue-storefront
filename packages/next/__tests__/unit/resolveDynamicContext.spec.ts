import { describe, it, expect } from "vitest";
import { resolveDynamicContext } from "../../src/sdk/helpers";

describe("resolveDynamicContext", () => {
  it("skips blacklisted headers", () => {
    const result = resolveDynamicContext({
      getRequestHeaders: () => {
        return {
          host: "localhost:3000",
          "x-foo": "bar",
        };
      },
    });

    expect(result.getRequestHeaders()).toEqual({
      "x-foo": "bar",
    });
  });

  it("resolves app router headers", () => {
    const headers = new Headers({
      "x-foo": "bar",
    });

    const result = resolveDynamicContext({
      getRequestHeaders: () => headers,
    });

    expect(result.getRequestHeaders()).toEqual({
      "x-foo": "bar",
    });
  });

  it("returns empty headers when no headers are provided", () => {
    const result = resolveDynamicContext({});

    expect(result.getRequestHeaders()).toEqual({});
  });
});
