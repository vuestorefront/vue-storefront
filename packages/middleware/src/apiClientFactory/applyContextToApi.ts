// @ts-check
import {
  AfterCallParams,
  ApiMethods,
  ApplyingContextHooks,
  BeforeCallParams,
  MiddlewareContext,
} from "../types";
import { createExtendQuery } from "./createExtendQuery";
import { markExtensionNameHelpers } from "./markExtensionNameHelpers";
import { getLogger, injectMetadata } from "../logger";

const nopBefore = <ARGS>({ args }: BeforeCallParams<any, ARGS>): ARGS => args;
const nopAfter = <RESPONSE>({
  response,
}: AfterCallParams<any, any, RESPONSE>) => response;

/**
 * Wraps api methods with context and hooks triggers
 */
const applyContextToApi = <
  API extends ApiMethods,
  CONTEXT extends MiddlewareContext
>(
  api: API,
  context: CONTEXT,
  /**
   * By default we use NOP function for returning the same parameters as they come.
   * It's useful in extensions, when someone don't want to inject into changing arguments or the response,
   * in that case, we use default function, to handle that scenario - NOP
   */
  hooks: ApplyingContextHooks = { before: nopBefore, after: nopAfter }
): API =>
  Object.entries(api).reduce(
    (prev, [callName, fn]) => ({
      ...prev,
      [callName]: async (...args: Parameters<typeof fn>) => {
        const transformedArgs = await hooks.before({
          callName,
          args,
        });
        const apiClientContext = {
          ...context,
          extendQuery: createExtendQuery(context),
        };
        const response = await fn(
          {
            ...apiClientContext,
            logger: injectMetadata(getLogger(context), (metadata) => {
              const newMetadata = {
                ...metadata,
                scope: {
                  ...metadata?.scope,
                  type: "endpoint" as const,
                  // Prevents incorrect values in advanced orchestration cases
                  functionName: callName,
                  integrationName: context.integrationTag,
                },
              };
              if (markExtensionNameHelpers.has(fn)) {
                newMetadata.scope.extensionName =
                  markExtensionNameHelpers.get(fn);
              }
              return newMetadata;
            }),
          },
          ...transformedArgs
        );
        const transformedResponse = await hooks.after({
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
