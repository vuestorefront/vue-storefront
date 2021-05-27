import { Logger } from '@vue-storefront/core';

enum ERROR_TYPE_ENUM {
  NETWORK = 'Network Error'
}

interface LogMiddlewareNetworkErrorParams {
  networkError: any;
  failedFunctionName: string;
}

export function logMiddlewareNetworkError({
  networkError,
  failedFunctionName
}: LogMiddlewareNetworkErrorParams) {
  if (!networkError) {
    return;
  }
  const error = (): string | undefined => networkError.error;
  const code = (): number | undefined => networkError.code;
  const message = (): string | undefined => networkError.message;

  Logger.error({
    errorType: ERROR_TYPE_ENUM.NETWORK,
    code: code(),
    error: error(),
    message: message(),
    failedFunction: failedFunctionName
  });
}
