import { HealthCheckError, TerminusOptions } from "@godaddy/terminus";
import { setTimeout } from "node:timers/promises";
import { ReadinessProbe } from "./types";

export const createReadyzHandler =
  (readinessChecks: ReadinessProbe[]) => async () => {
    // call all provided readiness checks in parallel
    // warning: because Promise.allSettled (also happens for .all()) is used,
    // all readiness checks need to return a promise (that is, need to be async functions)
    const calledReadinessChecks = await Promise.allSettled(
      readinessChecks.map((fn) => fn())
    );

    const readinessCheckFailureReasons = calledReadinessChecks.reduce<
      unknown[]
    >(
      (failureReasons, settledReadinessCheck) =>
        settledReadinessCheck.status === "rejected"
          ? [...failureReasons, settledReadinessCheck.reason]
          : failureReasons,
      []
    );

    if (readinessCheckFailureReasons.length) {
      throw new HealthCheckError(
        "Readiness check failed",
        readinessCheckFailureReasons
      );
    }
  };

/*
 * When running in Alokai Cloud, middleware pods are ran with a `ALOKAI_MEMORY_LIMIT` environment variable
 * This limit represents what is the Kubernetes resource limit on memory of the pod (a number in kilobytes), which if crossed, will kill the app
 * Here we're using that env var to monitor the current memory usage vs. the limit
 * The existence of this env var is a workaround for the lack of `process.availableMemory()` in Node 18 (available in Node 20, which e.g. Alokai bootstrapper doesn't use yet), which retrieves the memory limit from kernel cgroups
 */
export const createMemoryFullnessReadinessProbe =
  (memoryLimit: number, memoryLimitThreshold: number): ReadinessProbe =>
  async () => {
    const memoryUtilization = process.memoryUsage().rss / memoryLimit;
    if (memoryUtilization > memoryLimitThreshold) {
      throw new Error(
        `Process memory usage over threshold - current is ${memoryUtilization} where ALOKAI_MEMORY_LIMIT_THRESHOLD is ${memoryLimitThreshold}`
      );
    }
  };

export const memoryFulnessReadinessProbe = createMemoryFullnessReadinessProbe(
  Number.parseInt(process.env.ALOKAI_MEMORY_LIMIT, 10),
  Number.parseFloat(process.env.ALOKAI_MEMORY_LIMIT_THRESHOLD ?? "0.8")
);

// ALOKAI_MEMORY_LIMT won't be set in local dev envs etc.
const defaultReadinessChecks = process.env.ALOKAI_MEMORY_LIMT
  ? [memoryFulnessReadinessProbe]
  : [];

export const createTerminusOptions = (
  readinessChecks: ReadinessProbe[] = defaultReadinessChecks
): TerminusOptions => {
  return {
    useExit0: true,
    // In case some requests are still being handled when SIGTERM was received, naively wait in hopes that they will be resolved in that time, and only then shut down the process
    beforeShutdown: () => setTimeout(10 ** 4),
    healthChecks: {
      verbatim: true,
      "/readyz": createReadyzHandler(readinessChecks),
    },
  };
};
