export type ParamType = string | number | symbol;

export type TObject = Record<string, any>;

export type CustomQuery<T extends ParamType = string> = {
  [P in T]?: string;
} & { metadata?: unknown };

export interface ContextQueryParams {
  query: string;
  variables: TObject;
}

export type ContextQuery<T extends ParamType = string> = {
  [Key in T]: ContextQueryParams;
};

export type CustomQueryFunction<T = any> = ({
  query,
  variables,
  metadata,
}: {
  query: string;
  variables: T;
  metadata: unknown;
}) => {
  query: string;
  variables: T;
  metadata?: unknown;
};

export type ComposableFunctionArgs<T> = T & { customQuery?: CustomQuery };

export type ApiClientMethod = (...args: any) => Promise<any>;

export type ApiClientMethods<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any
    ? (...args: [...Parameters<T[K]>, CustomQuery?]) => ReturnType<T[K]>
    : T[K];
};

export type AxiosError = {
  isAxiosError: boolean;
  code: string;
  response?: {
    status: number;
  };
};

export type ApolloError = {
  networkError?: number;
  code?: string | number;
  graphQLErrors: Array<any>;
};

export type StatusCode = number | null;

export type UnknownError<T extends string> = { [K in T]?: number } & {
  [x: string]: UnknownError<T> | any;
};

export type ErrorObject<T extends string> =
  | AxiosError
  | ApolloError
  | UnknownError<T>;
