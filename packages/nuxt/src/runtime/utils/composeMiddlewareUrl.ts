interface ComposeMiddlewareUrlParams {
  config: {
    apiBaseUrl: string;
    apiProtocol: string;
    apiSubpath: string;
    isMultistoreEnabled: boolean;
  };
  headers: Record<string, string>;
  clientsideUrl: string | null;
}

export function composeMiddlewareUrl({
  config,
  headers,
  clientsideUrl,
}: ComposeMiddlewareUrlParams) {
  const { isMultistoreEnabled, apiProtocol, apiBaseUrl, apiSubpath } = config;
  if (!isMultistoreEnabled)
    return `${apiProtocol}://${apiBaseUrl}${apiSubpath}`;

  const ssrApiUrl = headers["x-forwarded-host"] ?? headers.host;
  const apiHost = clientsideUrl || ssrApiUrl || apiBaseUrl;

  return `${apiProtocol}://${apiHost}${apiSubpath}`;
}
