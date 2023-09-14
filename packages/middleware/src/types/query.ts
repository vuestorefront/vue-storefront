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
