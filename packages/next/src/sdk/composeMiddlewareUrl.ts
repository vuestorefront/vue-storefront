import { CreateSdkOptions } from "./types";

interface ComposeMiddlewareUrlParams {
  options: CreateSdkOptions;
  headers: Record<string, string | string[]>;
}

/**
 *
 * @description A helper function to compute the middleware url. It will be used only internally in the package
 */
export function composeMiddlewareUrl({
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
  const url = new URL(apiUrl);
  url.host =
    (forwardedHost && [...forwardedHost].join("")) || new URL(apiUrl).host;

  return url.href;
}
