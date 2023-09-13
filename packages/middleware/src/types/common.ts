export type BaseConfig = Record<string, any>;

export type BaseMethod = (...args: any[]) => any;

export type BaseClient = any;

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
