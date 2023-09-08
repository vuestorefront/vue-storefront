import { identity } from "../../../src/domains/generate/math";

describe("identity | unit tests", () => {
  it("returns first argument", () => {
    expect(identity("Vue.js")).toBe("Vue.js");

    // @ts-expect-error because 'identity' can only receive 1 argument.
    expect(identity(1, 2, 3)).toBe(1);
  });
});
