export type AxiosError = {
  isAxiosError: boolean;
  response: {
    status: number;
  };
};

export type ApolloError = {
  networkError?: number;
  code?: string | number;
};

export type StatusCode = number | null;

export type UnknownError<T extends string> = { [K in T]?: number } & {
  [x: string]: UnknownError<T> | any;
};

export type ErrorObject<T extends string> =
  | AxiosError
  | ApolloError
  | UnknownError<T>;
