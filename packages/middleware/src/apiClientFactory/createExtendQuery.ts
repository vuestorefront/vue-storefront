import { Context, Query, CustomQuery } from "../types";

export const createExtendQuery =
  (context: Context) =>
  <T extends Query, Key extends keyof T>(
    customQuery: CustomQuery | null,
    defaults: T
  ): Query<Key> => {
    const { customQueries = {} } = context;
    const { metadata = {} } = customQuery || {};

    return Object.entries(defaults).reduce((prev, [queryName, initialArgs]) => {
      const key = customQuery?.[queryName];

      const queryFn = (key && customQueries[key]) || (() => initialArgs);

      return {
        ...prev,
        [queryName]: queryFn({ ...initialArgs, metadata }),
      };
    }, {} as any);
  };
