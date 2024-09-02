import { HealthCheckError } from "@godaddy/terminus";
import {
  createReadyzHandler,
  createMemoryFullnessReadinessProbe,
} from "../../src/terminus";

describe("terminus", () => {
  describe("terminus: createMemoryFUllnessReadinessProbe", () => {
    it("throws if memory usage over threshold", () => {
      expect.assertions(1);
      const memoryLimit = 3;
      const memoryLimitThreshold = 0.5;

      jest
        .spyOn(process, "memoryUsage")
        // @ts-expect-error other props not needed
        .mockImplementationOnce(() => ({ rss: 2 }));

      const memoryFullnessReadinessProbe = createMemoryFullnessReadinessProbe(
        memoryLimit,
        memoryLimitThreshold
      );

      expect(memoryFullnessReadinessProbe()).rejects.toThrow();
    });
    it("doesn't throw if memory usage is under threshold", () => {
      const memoryLimit = 3;
      const memoryLimitThreshold = 0.5;

      jest
        .spyOn(process, "memoryUsage")
        // @ts-expect-error other props not needed
        .mockImplementationOnce(() => ({ rss: 1 }));

      const memoryFullnessReadinessProbe = createMemoryFullnessReadinessProbe(
        memoryLimit,
        memoryLimitThreshold
      );

      expect(memoryFullnessReadinessProbe()).resolves.toBe(undefined);
    });
  });

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
