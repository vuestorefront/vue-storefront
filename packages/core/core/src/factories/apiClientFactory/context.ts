import { ApiClientMethod } from './../../types';

interface ApplyingContextHooks {
  before: ({ callName, args }) => any[];
  after: ({ callName, args, response }) => any;
}

const nopBefore = ({ args }) => args;
const nopAfter = ({ response }) => response;

const createExtendQuery = (context) => (customQuery, defaults) => {
  const customQueries = context.customQueries || {};
  const queryArgs = customQuery || {};

  return Object.entries(defaults)
    .reduce((prev, [queryName, initialArgs]: any) => {
      const queryFn = customQueries[queryArgs[queryName]] || (() => initialArgs);

      return {
        ...prev,
        [queryName]: queryFn(initialArgs)
      };
    }, {});
};

const applyContextToApi = (
  api: Record<string, ApiClientMethod>,
  context: any,

  /**
   * By default we use NOP function for returning the same parameters as they come.
   * It's useful in extensions, when someone don't want to inject into changing arguments or the response,
   * in that case, we use default function, to handle that scenario - NOP
   */
  hooks: ApplyingContextHooks = { before: nopBefore, after: nopAfter }
) =>
  Object.entries(api)
    .reduce((prev, [callName, fn]: any) => ({
      ...prev,
      [callName]: async (...args) => {
        const extendQuery = createExtendQuery(context);
        const transformedArgs = hooks.before({ callName, args });
        const apiClientContext = { ...context, extendQuery };
        const response = await fn(apiClientContext, ...transformedArgs);
        const transformedResponse = hooks.after({ callName, args, response });

        return transformedResponse;
      }
    }), {});

export { applyContextToApi };
