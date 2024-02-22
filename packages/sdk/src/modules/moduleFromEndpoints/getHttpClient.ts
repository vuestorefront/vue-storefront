import { Options } from "./types";

export const getHTTPClient = (options: Options) => {
  const getUrl = (methodName: string) => {
    return `${options.apiUrl}/${methodName}`;
  };

  const getConfig = (config: any) => {
    return {
      ...config,
      method: "POST",
    };
  };

  const customHttpClient = options.httpClient;

  const defaultHTTPClient = async (url: string, config: any) => {
    const response = await fetch(url, config);
    return response.json();
  };

  const httpClient = customHttpClient || defaultHTTPClient;

  return async (methodName: string, config: any) => {
    return httpClient(getUrl(methodName), getConfig(config));
  };
};
