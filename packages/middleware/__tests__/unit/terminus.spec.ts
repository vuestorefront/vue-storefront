import { HealthCheckError } from "@godaddy/terminus";
import { createReadyzHandler } from "../../src/terminus";

describe("terminus", () => {
  describe("createReadyzHandler", () => {
    it("throws on failing ready check", () => {
      const readinessChecks = [
        async () => {
          throw new Error();
        },
      ];
      const readyzHandler = createReadyzHandler(readinessChecks);

      expect(readyzHandler()).rejects.toThrow(HealthCheckError);
    });
    it("doesn't throw on succeeding ready check", () => {
      const readinessChecks = [async () => undefined];
      const readyzHandler = createReadyzHandler(readinessChecks);

      expect(readyzHandler()).resolves.toBe(undefined);
    });
  });
});
