import { SdkModuleOptions } from "~/src/types";

interface ComposeMiddlewareUrlParams {
  options: SdkModuleOptions;
  headers: Record<string, string | string[]>;
}

function calculateMiddlewareUrl({
  options,
  headers,
}: ComposeMiddlewareUrlParams) {
  const { apiUrl, ssrApiUrl } = options.middleware;

  if (typeof window !== "undefined") {
    if (options.multistore?.enabled) {
      const url = new URL(apiUrl);
      url.host = window.location.host;
      return url.href;
    }
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

function removeTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

/**
 * @description A helper function to compute the middleware url. It will be used only internally in the package
 */
export function composeMiddlewareUrl({
  options,
  headers,
}: ComposeMiddlewareUrlParams) {
  const url = calculateMiddlewareUrl({ options, headers });
  return removeTrailingSlash(url);
}
