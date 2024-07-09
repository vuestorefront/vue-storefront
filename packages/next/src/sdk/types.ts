/* eslint-disable no-secrets/no-secrets */
import { SDKApi, buildModule, middlewareModule } from "@vue-storefront/sdk";
import { ReactNode } from "react";
import type { defaultMethodsRequestConfig } from "@storefront/shared";
export type GetSdkContext = {
  /**
   * A function that returns the request headers.
   */
  getRequestHeaders?: () =>
    | Record<string, string | string[] | undefined>
    | Headers;
};

export type DynamicContext = {
  getRequestHeaders: () => Record<string, string | string[]>;
};

export type StaticContext = {
  buildModule: typeof buildModule;
  middlewareModule: typeof middlewareModule;
  /**
   * @deprecated Use `config.middlewareUrl` instead.
   */
  middlewareUrl: string;
  /**
   * @deprecated Use `config.defaultMethodsRequestConfig` instead.
   */
  defaults: typeof defaultMethodsRequestConfig;
  config: {
    middlewareUrl: string;
    defaultMethodsRequestConfig: typeof defaultMethodsRequestConfig;
    cdnCacheBustingId: string;
  };
};

type InjectedContext = DynamicContext & StaticContext;

export type Config<TConfig> = (context: InjectedContext) => TConfig;

export type SdkProviderProps<TSdk> = {
  children: ReactNode;
  sdk: TSdk;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CreateSdkReturn<TConfig extends Record<string, any>> {
  /**
   * Creates a new SDK instance. This function is dedicated for server-side usage,
   * where a new SDK instance should be created for each request.
   * For the client side usage, use the `createSdkContext` function instead.
   *
   * @param dynamicContext - The dynamic, request-specific, context
   *
   * @returns The SDK instance.
   *
   * @example
   * For the Pages Router, you can use the `getSdk` function in the `getServerSideProps` function:
   * ```tsx
   * import type { GetServerSideProps } from "next";
   * import { getSdk } from "../../sdk.config";
   *
   * export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   *  const sdk = getSdk({
   *    getRequestHeaders: () => req.headers,
   *  });
   *  const { products } = await sdk.unified.getProducts();
   *
   *  return {
   *    props: {...}
   *  }
   * };
   * ```
   *
   * @example
   * For the App Router, you can use the `getSdk` function in your React Server Component:
   * ```tsx
   * import { headers } from "next/headers";
   * import { getSdk } from "../../sdk.config";
   *
   * export default async function SsrPage() {
   *  const sdk = getSdk({
   *    getRequestHeaders: () => headers(),
   *  });
   *  const { products } = await sdk.unified.getProducts();
   *
   *  return <div>...</div>
   * };
   * ```
   */
  getSdk: (dynamicContext?: GetSdkContext) => SDKApi<TConfig>;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CreateSdkContextReturn<TSdk extends SDKApi<any>> = readonly [
  ({ children }: SdkProviderProps<TSdk>) => JSX.Element,
  () => TSdk
];
