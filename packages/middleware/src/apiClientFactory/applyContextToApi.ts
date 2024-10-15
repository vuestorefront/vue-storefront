// @ts-check
import {
  AfterCallParams,
  ApiMethods,
  ApplyingContextHooks,
  BeforeCallParams,
  MiddlewareContext,
} from "../types";
import {
  ExtensionEndpointMethodDecorator,
  PurgeHookNameMethodDecorator,
  MethodDecoratorManager,
  MissingScopeMethodDecorator,
  OrchiestratedMethodDecorator,
  ScopeTypeMethodDecorator,
} from "./methodDecorator";

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
        const methodDecoratorManager = new MethodDecoratorManager(
          context,
          hooks,
          callName,
          fn
        );

        const hasMetadataScope = checkMetadataScope(context);
        const decoratorsToAdd = hasMetadataScope
          ? [
              new ScopeTypeMethodDecorator(context),
              new PurgeHookNameMethodDecorator(context),
              new ExtensionEndpointMethodDecorator(context, fn),
              new OrchiestratedMethodDecorator(context, callName, fn),
            ]
          : [new MissingScopeMethodDecorator(context, callName, fn.name)];
        methodDecoratorManager.addDecorator(...decoratorsToAdd);

        const method = methodDecoratorManager.prepare<typeof args>();

        return await method(args);
      },
    }),
    {} as any
  );

export { applyContextToApi };
