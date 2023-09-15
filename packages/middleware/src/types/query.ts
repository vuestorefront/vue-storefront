// Query Function Types

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

//  Create Extend Query Function Types

export type ParamType = string | number | symbol;

export interface QueryParams {
  query: string;
  variables: Record<string, any>;
}

export type Query<T extends ParamType = string> = {
  [Key in T]: QueryParams;
};

export type CustomQuery<T extends ParamType = string> = {
  [P in T]?: string;
} & { metadata?: unknown };
