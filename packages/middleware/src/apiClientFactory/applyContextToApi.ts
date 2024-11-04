// @ts-check
import {
  AfterCallParams,
  ApiMethods,
  ApplyingContextHooks,
  BeforeCallParams,
  LogScope,
  MiddlewareContext,
} from "../types";
import { createExtendQuery } from "./createExtendQuery";
import { markExtensionNameHelpers } from "./markExtensionNameHelpers";
import { getLogger, injectMetadata } from "../logger";
import { wrapFnWithErrorBoundary } from "./wrapFnWithErrorBoundary";

const nopBefore = <ARGS>({ args }: BeforeCallParams<any, ARGS>): ARGS => args;
const nopAfter = <RESPONSE>({
  response,
}: AfterCallParams<any, any, RESPONSE>) => response;

/**
 * @returns Instance of Logger with injected metadata of currently called handler and it's integration
 */
function injectHandlerMetadata<CONTEXT extends MiddlewareContext>(
  context: CONTEXT,
  fn: Function,
  callName: string
) {
  return injectMetadata(getLogger(context), () => ({
    alokai: {
      scope: {
        type: "endpoint" as const,
        /**
         * The following lines ensure proper functionality in case of orchestration.
         * In this scenario, there are multiple self-invocations of the function template we see here.
         * Adding the currently known functionName and integrationName prevents scope confusion
         * between different recurrent synchronous and parallel invocations (e.g., multiple orchestrated methods
         * executed with Promise.all).
         */
        functionName: callName,
        integrationName: context.integrationTag,
        ...(markExtensionNameHelpers.has(fn)
          ? { extensionName: markExtensionNameHelpers.get(fn) }
          : {}),
      },
    },
  }));
}

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
      [callName]: (() => {
        const logger = injectHandlerMetadata(context, fn, callName);
        /**
         * Endpoint's handler decorated with:
         * - hooks from every extension (hooks.before contains merged beforeCall's,
         *   hooks.after contains merged afterCall's),
         * - logger with metadata about scope of call (covers orchestrated parallely called endpoints),
         * - support for building error boundary (covers orchestrated parallely called endpoints),
         */
        const handler = async (...args: Parameters<typeof fn>) => {
          const transformedArgs = await hooks.before({
            callName,
            args,
          });

          const fnWithErrorBoundary = wrapFnWithErrorBoundary(fn, (err) => {
            /**
             * Handlers can call different handlers, so error could be already bubbling.
             * That's why we check for presence of err.errorBoundary at first.
             *
             * ```ts
             * async function myEndpoint(context) {
             *  const int = await context.getApiClient("some_integration");
             *  return await int.api.throwError(); // Bubbling from other integration's endpoint
             * }
             * ```
             */
            const errorBoundary: LogScope = err.errorBoundary || {
              type: "endpoint" as const,
              functionName: callName,
              integrationName: context.integrationTag,
              ...(markExtensionNameHelpers.has(fn)
                ? { extensionName: markExtensionNameHelpers.get(fn) }
                : {}),
            };

            return errorBoundary;
          });
          const apiClientContext = {
            ...context,
            extendQuery: createExtendQuery(context),
            logger,
          };
          const response = await fnWithErrorBoundary(
            apiClientContext,
            ...transformedArgs
          );

          const transformedResponse = await hooks.after({
            callName,
            args,
            response,
          });

          return transformedResponse;
        };

        /**
         * Marks decorated handler with name of integration's extension
         * from which original handler was defined, if any
         */
        if (markExtensionNameHelpers.has(fn)) {
          markExtensionNameHelpers.mark(
            handler,
            markExtensionNameHelpers.get(fn)
          );
        }
        return handler;
      })(),
    }),
    {} as any
  );

export { applyContextToApi };
