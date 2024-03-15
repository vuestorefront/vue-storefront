import { type AxiosInstance, type AxiosStatic } from "axios";
import { SdkHttpError } from "./SdkHttpError";
import { HTTPClient } from "../types";

/**
 * Adapter to use `axios` as a custom HTTP Client.
 *
 * @example
 * Using `axios` as a custom HTTP Client.
 * ```ts
 * import axios from "axios";
 * import { createSdk } from "@vue-storefront/next";
 * import type { SapccEndpoints } from "../storefront-middleware/types";
 *
 * export const { getSdk } = createSdk(options, ({ buildModule, middlewareModule }) => ({
 *   commerce: buildModule(middlewareModule<SapccEndpoints>, {
 *     apiUrl: "http://localhost:4000/sapcc",
 *     httpClient: axiosAdapter(axios),
 *   }),
 * }));
 * ```
 */
export const axiosAdapter =
  (axios: AxiosInstance | AxiosStatic): HTTPClient =>
  async (url, params, config) => {
    try {
      const { data } = await axios(url, {
        ...config,
        data: params,
        withCredentials: true,
      });

      return data;
    } catch (err: any) {
      throw new SdkHttpError({
        statusCode: err?.response?.status || 500,
        message: err?.response?.data?.message || err.message,
        cause: err,
      });
    }
  };
