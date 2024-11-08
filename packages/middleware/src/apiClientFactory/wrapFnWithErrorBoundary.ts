import type { LogScope } from "../types";

type ErrorWithBoundary = Error & { errorBoundary: LogScope };

/**
 * @param fn Function to be wraped.
 * @param errorBoundaryProvider Factory function providing value of errorBoundary to be injected
 * @returns Decorated provided async function with catch block extending error with
 * "errorBoundary" property equal value derived from errorBoundaryProvider factory.
 */
export function wrapFnWithErrorBoundary(
  fn: Function,
  errorBoundaryProvider: (err: ErrorWithBoundary) => LogScope
) {
  return async (...args: any[]) => {
    try {
      const response = await fn(...args);
      return response;
    } catch (err) {
      Object.assign(err, { errorBoundary: errorBoundaryProvider(err) });

      throw err;
    }
  };
}

/**
 * @param fn Function to be wraped.
 * @param errorBoundaryProvider Factory function providing value of errorBoundary to be injected
 * @returns Decorated provided sync function with catch block extending error with
 * "errorBoundary" property equal value derived from errorBoundaryProvider factory.
 */
export function wrapFnWithErrorBoundarySync(
  fn: Function,
  errorBoundaryProvider: (err: ErrorWithBoundary) => LogScope
) {
  return (...args: any[]) => {
    try {
      const response = fn(...args);
      return response;
    } catch (err) {
      Object.assign(err, { errorBoundary: errorBoundaryProvider(err) });

      throw err;
    }
  };
}
