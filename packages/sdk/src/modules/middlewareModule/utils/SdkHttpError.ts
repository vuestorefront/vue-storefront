/**
 * Defines the parameters required to construct an `SDKError`.
 */
export type ErrorParams = {
  /** The error message. */
  message: string;
  /** The HTTP status code associated with this error. */
  statusCode: number;
  /** An optional cause for the error, providing more context or the underlying error that led to this error. */
  cause?: unknown;
  /** The full request url. */
  url: string;
};

/**
 * Represents a custom error for SDK HTTP operations.
 */
export class SdkHttpError extends Error {
  /** The HTTP status code associated with this error. */
  public readonly statusCode: number;

  /** The full request url. */
  public readonly url: string;

  /**
   * Constructs an instance of `SDKError`.
   */
  constructor(errorParams: ErrorParams) {
    const { message, statusCode, url, cause = undefined } = errorParams;
    super(message, { cause });
    this.statusCode = statusCode;
    this.url = url;
  }
}

/**
 * Represents an error type with a cause property of type `SDKError`.
 */
export type ErrorCausedBySDKError = Error & { cause: SdkHttpError };

/**
 * Defines a predicate for checking an `SDKError` based on its status code.
 */
export type SdkErrorPredicate = {
  /** The status code or a function that evaluates the status code to determine if it matches a condition. */
  statusCode: number | ((statusCode: number) => boolean);
};

/**
 * Checks if the given error was caused by `SDKError`.
 * @param error - The error to check.
 * @returns A type predicate indicating whether the error is an `ErrorCausedBySDKError`.
 * @example
 * ```typescript
 * catch (error) {
 *   if (isCausedBySdkError(error)) {
 *     const statusCode = error.cause.statusCode;
 *   }
 * }
 * ```
 */
export const isCausedBySdkHttpError = (
  error: unknown
): error is ErrorCausedBySDKError =>
  error instanceof Error &&
  "cause" in error &&
  error.cause instanceof SdkHttpError;

/**
 * Checks if the given error was caused by `SDKError` and matches a specific status code or condition.
 * @param error - The error to check.
 * @param statusCodePredicate - The predicate to match the error's status code against.
 * @returns A type predicate indicating whether the error matches the specific condition.
 * @example
 * ```typescript
 * catch (error) {
 *   if (isSpecificSdkError(error, { statusCode: 422 })) {
 *     // handle 422
 *   }
 * }
 * ```
 * @example
 * ```typescript
 * catch (error) {
 *   if (isSpecificSdkError(error, { statusCode: (code) => code === 401 || code === 403 })) {
 *     // handle 401 or 403
 *   }
 * }
 * ```
 */
export const isSpecificSdkHttpError = (
  error: unknown,
  statusCodePredicate: SdkErrorPredicate
): error is ErrorCausedBySDKError =>
  isCausedBySdkHttpError(error) &&
  (typeof statusCodePredicate.statusCode === "function"
    ? statusCodePredicate.statusCode(error.cause.statusCode)
    : error.cause.statusCode === statusCodePredicate.statusCode);

/**
 * Checks if the given error was caused by `SDKError` and its status code is between 400 and 500, indicating a client error.
 * @param error - The error to check.
 * @returns A type predicate indicating whether the error is a client error caused by `SDKError`.
 * @example
 * ```typescript
 * catch (error) {
 *   if (isSdkRequestError(error)) {
 *     // handle client error
 *   }
 * }
 * ```
 */
export const isSdkRequestError = (
  error: unknown
): error is ErrorCausedBySDKError =>
  isSpecificSdkHttpError(error, {
    statusCode: (code: number) => code >= 400 && code < 500,
  });

/**
 * Checks if the given error was caused by `SDKError` and its status code is 401, indicating an unauthorized request error.
 * @param error - The error to check.
 * @returns A type predicate indicating whether the error is an unauthorized request error caused by `SDKError`.
 * @example
 * ```typescript
 * catch (error) {
 *   if (isSdkUnauthorizedError(error)) {
 *     // handle unauthorized error
 *   }
 * }
 * ```
 */
export const isSdkUnauthorizedError = (
  error: unknown
): error is ErrorCausedBySDKError =>
  isSpecificSdkHttpError(error, { statusCode: 401 });
