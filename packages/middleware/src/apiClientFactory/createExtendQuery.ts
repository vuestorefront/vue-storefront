import { CustomQuery, ContextQuery, MiddlewareContext } from "../types";

export const createExtendQuery =
  (context: MiddlewareContext) =>
  <T extends ContextQuery, Key extends keyof T>(
    customQuery: CustomQuery | null,
    defaults: T
  ): ContextQuery<Key> => {
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
