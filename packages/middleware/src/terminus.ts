import { HealthCheckError, TerminusOptions } from "@godaddy/terminus";
import { setTimeout } from "node:timers/promises";
import { ReadinessCheck } from "./types";

/*
 * When running in Alokai Cloud, middleware pods are ran with a `ALOKAI_MEMORY_LIMIT` environment variable
 * This limit represents what is the Kubernetes resource limit on memory of the pod (a number in kilobytes), which if crossed, will kill the app
 * Here we're using that env var to monitor the current memory usage vs. the limit
 * The existence of this env var is a workaround for the lack of `process.availableMemory()` in Node 18 (available in Node 20, which e.g. Alokai bootstrapper doesn't use yet), which retrieves the memory limit from kernel cgroups
 */
export const createMemoryFullnessReadinessCheck: () => null | ReadinessCheck =
  () => {
    const { ALOKAI_MEMORY_LIMIT, ALOKAI_MEMORY_LIMIT_THRESHOLD = "0.9" } =
      process.env;

    if (ALOKAI_MEMORY_LIMIT === undefined) {
      return null;
    }

    const [parsedMemoryLimit, parsedMemoryLimitThreshold] = [
      ALOKAI_MEMORY_LIMIT,
      ALOKAI_MEMORY_LIMIT_THRESHOLD,
    ].map((str) => Number.parseFloat(str));

    return async () => {
      const memoryUtilization = process.memoryUsage().rss / parsedMemoryLimit;
      if (memoryUtilization > parsedMemoryLimitThreshold) {
        throw new Error(
          `Process memory usage over threshold - current is ${memoryUtilization} where ALOKAI_MEMORY_LIMIT_THRESHOLD is ${parsedMemoryLimitThreshold}`
        );
      }
    };
  };

const memoryReadinessCheck = createMemoryFullnessReadinessCheck();
const defaultReadinessChecks = memoryReadinessCheck
  ? [memoryReadinessCheck]
  : [];

const createReadyzHandler = (readinessChecks: ReadinessCheck[]) => async () => {
  // call all provided readiness checks in parallel
  // warning: because Promise.allSettled (also happens for .all()) is used,
  // all readiness checks need to return a promise (that is, need to be async functions)
  const calledReadinessChecks = await Promise.allSettled(
    readinessChecks.map((fn) => fn())
  );

  const readinessCheckFailureReasons = calledReadinessChecks.reduce<unknown[]>(
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

export const createTerminusOptions = (
  readinessChecks: ReadinessCheck[] = defaultReadinessChecks
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
