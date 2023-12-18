import { CreateSdkOptions } from "../types";

interface ComposeMiddlewareUrlParams {
  options: CreateSdkOptions;
  headers: Record<string, string | string[]>;
}

function calculateMiddlewareUrl({
  options,
  headers,
}: ComposeMiddlewareUrlParams) {
  const { apiUrl, ssrApiUrl } = options.middleware;

  if (typeof window !== "undefined") {
    return apiUrl;
  }
  if (ssrApiUrl) {
    return ssrApiUrl;
  }
  if (!options.multistore?.enabled) {
    return apiUrl;
  }

  const forwardedHost = headers["x-forwarded-host"] ?? headers.host;
  const resolvedForwardedHost =
    forwardedHost && Array.isArray(forwardedHost)
      ? forwardedHost[0]
      : (forwardedHost as string | undefined);
  const url = new URL(apiUrl);
  url.host = resolvedForwardedHost || new URL(apiUrl).host;

  return url.href;
}

function removeTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

/**
 *
 * @description A helper function to compute the middleware url. It will be used only internally in the package
 */
export function composeMiddlewareUrl({
  options,
  headers,
}: ComposeMiddlewareUrlParams) {
  const url = calculateMiddlewareUrl({ options, headers });
  return removeTrailingSlash(url);
}
