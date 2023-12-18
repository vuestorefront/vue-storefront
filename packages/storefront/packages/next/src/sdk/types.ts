import { SDKApi, buildModule } from "@vue-storefront/sdk";
import { ReactNode, JSX } from "react";

export interface MiddlewareConfig {
  /**
   * The URL of the middleware.
   * @example "http://localhost:4000"
   */
  apiUrl: string;
  /**
   * The URL of the middleware for server-side rendering.
   * @example "http://localhost:4000"
   */
  ssrApiUrl?: string;
}

export interface MultistoreConfig {
  /**
   * Whether the multistore is enabled or not.
   * @example false
   * @default false
   */
  enabled: boolean;
}

export interface CreateSdkOptions {
  multistore?: MultistoreConfig;
  middleware: MiddlewareConfig;
}

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
  middlewareUrl: string;
};

type InjectedContext = DynamicContext & StaticContext;

export type Config<TConfig> = (context: InjectedContext) => TConfig;

export type SdkProviderProps = {
  children: ReactNode;
};

type CreateSdkContextReturn<TConfig extends Record<string, any>> = readonly [
  (props: SdkProviderProps) => JSX.Element,
  () => SDKApi<TConfig>
];

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

  /**
   * Creates a new SDK context. This function is dedicated for the client-side usage.
   *
   * @example
   * Create a new SDK context somewhere in your application. It may be the `hooks/sdk.ts` file.
   *
   * ```tsx
   * import { createSdkContext } from "../../sdk.config";
   *
   * export const [SdkProvider, useSdk] = createSdkContext();
   * ```
   * Then use the `SdkProvider` in the root component of your application.
   * For Pages Router it would be the `pages/_app.tsx` file,
   * and for the App Router it would be the `app/layout.tsx` file.
   * Finally you can use the `useSdk` in any client component of your application.
   * @returns [SdkProvider, useSdk] - The SDK provider and the `useSdk` hook.
   */
  createSdkContext: () => CreateSdkContextReturn<TConfig>;
}
