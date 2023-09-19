import {
  Api,
  Context,
  Hooks,
  BeforeCallParams,
  AfterCallParams,
} from "../types";
import { createExtendQuery } from "./createExtendQuery";

const nopBefore = <ARGS>({ args }: BeforeCallParams<ARGS>): ARGS => args;
const nopAfter = <RESPONSE>({ response }: AfterCallParams<any, RESPONSE>) =>
  response;

/**
 * Wraps api methods with context and hooks triggers
 */
const applyContextToApi = (
  api: Api,
  context: Context,

  /**
   * By default we use NOP function for returning the same parameters as they come.
   * It's useful in extensions, when someone don't want to inject into changing arguments or the response,
   * in that case, we use default function, to handle that scenario - NOP
   */
  hooks: Hooks = { beforeCall: nopBefore, afterCall: nopAfter }
): Api =>
  Object.entries(api).reduce(
    (prev, [callName, fn]) => ({
      ...prev,
      [callName]: async (...args: Parameters<typeof fn>) => {
        const extendQuery = createExtendQuery(context);
        const transformedArgs = hooks.beforeCall({ callName, args });
        const apiClientContext = { ...context, extendQuery };
        const response = await fn(apiClientContext, ...transformedArgs);
        const transformedResponse = hooks.afterCall({
          callName,
          args,
          response,
        });

        return transformedResponse;
      },
    }),
    {} as any
  );

export { applyContextToApi };
