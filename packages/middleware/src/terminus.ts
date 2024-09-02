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

export const createTerminusOptions = (
  readinessChecks: ReadinessProbe[]
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
