// @ts-check
import { isExtensionEndpointHandler } from "../helpers";
import { createExtendQuery } from "./createExtendQuery";
import {
  AfterCallParams,
  ApiMethods,
  ApplyingContextHooks,
  BeforeCallParams,
  MiddlewareContext,
} from "../types";
import { getLogger } from "../logger";

const nopBefore = <ARGS>({ args }: BeforeCallParams<any, ARGS>): ARGS => args;
const nopAfter = <RESPONSE>({
  response,
}: AfterCallParams<any, any, RESPONSE>) => response;

const checkMetadataScope = <CONTEXT extends MiddlewareContext>(
  context: CONTEXT
) => Boolean(context.res.locals?.alokai?.metadata?.scope);

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
        const hasMetadataScope = checkMetadataScope(context);
        if (!hasMetadataScope) {
          const logger = getLogger(context.res);
          logger.warning(
            `Alokai's metadata object is missing in the context under 'res.locals.alokai'. 
            This could indicate that the extension's scope or metadata has not been properly initialized. 
            Without this metadata, certain custom API client functionalities may not work as expected, 
            including tracking of extension-specific actions or data. 
            Please ensure that the Alokai metadata object is correctly set up in 'res.locals.alokai' before proceeding with the request.
            
            Steps to troubleshoot:
            1. Verify if content of res.locals hasn't been overwritten, instead of extended.
            2. If you're unsure, please consult Alokai's team for further assistance or review the source code implementation.

            Call Name: ${callName}
            Function Name: ${fn.name || "Unnamed function"}`
          );
        }
        const extendQuery = createExtendQuery(context);
        let tmpIntegrationName = "";
        let tmpFnName = "";
        if (hasMetadataScope) {
          context.res.locals.alokai.metadata.scope.type = "requestHook";
          tmpIntegrationName =
            context.res.locals.alokai.metadata.scope.integrationName;
          context.res.locals.alokai.metadata.scope.integrationName =
            context.integrationKey;

          tmpFnName = context.res.locals.alokai.metadata.scope.functionName;
          context.res.locals.alokai.metadata.scope.functionName = callName;
        }
        const transformedArgs = await hooks.before({ callName, args });
        const apiClientContext = { ...context, extendQuery };
        if (isExtensionEndpointHandler(fn)) {
          context.res.locals.alokai.metadata.scope.extensionName =
            fn._extensionName;
        }
        let tmp = {
          extensionName: null,
          functionName: null,
        };
        const isTmpSet = (tmp) => !!tmp.functionName; // as we never set fn name to nullish
        if (hasMetadataScope) {
          context.res.locals.alokai.metadata.scope.type = "endpoint";
          context.res.locals.alokai.metadata.scope.hookName = undefined;
          if (!(fn as any)._extensionName) {
            tmp = {
              extensionName:
                context.res.locals.alokai.metadata.scope.extensionName,
              functionName:
                context.res.locals.alokai.metadata.scope.functionName,
            };
            context.res.locals.alokai.metadata.scope.extensionName = undefined;
            context.res.locals.alokai.metadata.scope.functionName = callName;
            // console.log(`wywolam ${fn.name} lub ${callName}`, { ...tmp });
          }
        }
        const response = await fn(apiClientContext, ...transformedArgs);
        if (hasMetadataScope) {
          if (isTmpSet(tmp)) {
            context.res.locals.alokai.metadata.scope.extensionName =
              tmp.extensionName;
            context.res.locals.alokai.metadata.scope.functionName =
              tmp.functionName;
          }
          // console.log("co ustawiam?: ", { ...tmp });
          context.res.locals.alokai.metadata.scope.type = "requestHook";
        }
        const transformedResponse = await hooks.after({
          callName,
          args,
          response,
        });

        if (hasMetadataScope) {
          context.res.locals.alokai.metadata.scope.integrationName =
            tmpIntegrationName;
          context.res.locals.alokai.metadata.scope.functionName = tmpFnName;
        }

        return transformedResponse;
      },
    }),
    {} as any
  );

export { applyContextToApi };
