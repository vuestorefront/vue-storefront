import { includes, isFunction } from "../../../src/helpers";

describe("[helpers] utils", () => {
  describe("[isFunction]", () => {
    it("should validate function", () => {
      const testFn = () => undefined;
      const invalidTypes = ["test", 123, {}, [], new Set()];

      expect(isFunction(() => undefined)).toBe(true);
      // eslint-disable-next-line
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction(testFn)).toBe(true);

      invalidTypes.forEach((val) => {
        expect(isFunction(val)).toBe(false);
      });
    });
  });

  describe("[includes]", () => {
    it("should validate array includes value", () => {
      const testObj = {};

      expect(includes([123, 456], 123)).toBe(true);

      expect(includes(["123", "456"], "falsy")).toBe(false);
      expect(includes([{}, {}], {})).toBe(false);

      expect(includes([{}, testObj], testObj)).toBe(true);
    });
  });
});
