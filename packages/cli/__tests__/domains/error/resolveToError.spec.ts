import { resolveToError } from "../../../src/domains/generate/error";

describe("resolveToError | unit tests", () => {
  describe("when value is an error", () => {
    it("returns the received value", () => {
      const error = new Error("An expected error");

      expect(resolveToError(error)).toBe(error);
    });
  });

  describe("when value is a string", () => {
    it("creates a new 'Error' using received value as message", () => {
      const error = "The database just exploded!";

      expect(resolveToError(error)).toEqual(
        new Error("The database just exploded!")
      );
    });

    it("defines value as 'cause' property", () => {
      const error = "The database just exploded!";

      // @ts-expect-error 'cause' is a valid property of 'Error' in es2022.
      expect(resolveToError(error).cause).toBe(error);
    });
  });

  describe("when value is anything other than error or string", () => {
    it("creates a new 'Error' using received value as part of the message", () => {
      const error = 404;

      expect(resolveToError(error)).toEqual(new Error('Unknown error "404"'));
    });

    it("defines value as 'cause' property", () => {
      const error = {
        reason: "Network is down",
      };

      // @ts-expect-error 'cause' is a valid property of 'Error' in es2022.
      expect(resolveToError(error).cause).toBe(error);
    });
  });
});
