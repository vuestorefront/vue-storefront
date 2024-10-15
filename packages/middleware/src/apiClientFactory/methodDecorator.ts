/* eslint-disable max-classes-per-file */
import {
  AfterCallParams,
  ApplyingContextHooks,
  BeforeCallParams,
  MiddlewareContext,
} from "../types";
import { createExtendQuery } from "./createExtendQuery";
import { getLogger } from "../logger";
import { markExtensionNameHelpers } from "./markExtensionNameHelpers";

const nopBefore = <ARGS>({ args }: BeforeCallParams<any, ARGS>): ARGS => args;
const nopAfter = <RESPONSE>({
  response,
}: AfterCallParams<any, any, RESPONSE>) => response;

interface MethodDecorator {
  /**
   * Called before calling before hooks
   */
  beforeHooksStart?: Function;

  /**
   * Called before calling handler function
   */
  beforeHandlerStart?: Function;

  /**
   * Called before calling after hooks
   */
  beforeHooksEnd?: Function;

  /**
   * Called after calling after hooks
   */
  afterHooksEnd?: Function;
}

/**
 * MethodDecoratorManager allows subscribing to different moments of handler call.
 * It prevents pollution of the code by allowing separation of code into meaningful decorators.
 */
export class MethodDecoratorManager<CONTEXT extends MiddlewareContext> {
  private decorators: MethodDecorator[] = [];

  private apiClientContext: CONTEXT & {
    extendQuery: ReturnType<typeof createExtendQuery>;
  };

  private callBeforeHooksStartDecorators() {
    this.decorators.map((decorator) =>
      decorator.beforeHooksStart?.bind(decorator)()
    );
  }

  private callBeforeHandlerStartDecorators() {
    this.decorators.map((decorator) =>
      decorator.beforeHandlerStart?.bind(decorator)()
    );
  }

  private callBeforeHooksEndDecorators() {
    this.decorators.map((decorator) =>
      decorator.beforeHooksEnd?.bind(decorator)()
    );
  }

  private callAfterHooksEndDecorators() {
    this.decorators.map((decorator) =>
      decorator.afterHooksEnd?.bind(decorator)()
    );
  }

  constructor(
    private context: CONTEXT,
    private hooks: ApplyingContextHooks = {
      before: nopBefore,
      after: nopAfter,
    },
    private callName: string,
    private fn: Function
  ) {
    this.apiClientContext = {
      ...this.context,
      extendQuery: createExtendQuery(this.context),
    };
  }

  addDecorator(...decorators: MethodDecorator[]) {
    this.decorators.push(...decorators);
  }

  /**
   * @returns Built decorated handler
   */
  prepare<A extends Array<any>>() {
    return async (...args: A) => {
      this.callBeforeHooksStartDecorators();
      const transformedArgs = await this.hooks.before({
        callName: this.callName,
        args,
      });
      this.callBeforeHandlerStartDecorators();
      const response = await this.fn(this.apiClientContext, ...transformedArgs);
      this.callBeforeHooksEndDecorators();
      const transformedResponse = await this.hooks.after({
        callName: this.callName,
        args,
        response,
      });
      this.callAfterHooksEndDecorators();

      return transformedResponse;
    };
  }
}

/**
 * Decorator responsible for printing warning to the developer if for some reason, global object in whom we store metadata disappeared.
 */
export class MissingScopeMethodDecorator<CONTEXT extends MiddlewareContext>
  implements MethodDecorator
{
  constructor(
    private context: CONTEXT,
    private callName: string,
    private fnName: string
  ) {}

  beforeHooksStart() {
    const logger = getLogger(this.context.res);
    logger.warning(
      `Alokai's metadata object is missing in the context under 'res.locals.alokai'. 
      This could indicate that the extension's scope or metadata has not been properly initialized. 
      Without this metadata, certain custom API client functionalities may not work as expected, 
      including tracking of extension-specific actions or data. 
      Please ensure that the Alokai metadata object is correctly set up in 'res.locals.alokai' before proceeding with the request.
      
      Steps to troubleshoot:
      1. Verify if content of res.locals hasn't been overwritten, instead of extended.
      2. If you're unsure, please consult Alokai's team for further assistance or review the source code implementation.

      Call Name: ${this.callName}
      Function Name: ${this.fnName || "Unnamed function"}`
    );
  }
}

/**
 * Decorator responsible for adjusting metadata scope's type depending on what's going to be called, hook or handler.
 */
export class ScopeTypeMethodDecorator<CONTEXT extends MiddlewareContext>
  implements MethodDecorator
{
  constructor(private context: CONTEXT) {}

  beforeHooksStart() {
    this.context.res.locals.alokai.metadata.scope.type = "requestHook";
  }

  beforeHandlerStart() {
    this.context.res.locals.alokai.metadata.scope.type = "endpoint";
  }

  beforeHooksEnd() {
    this.context.res.locals.alokai.metadata.scope.type = "requestHook";
  }
}

/**
 * Decorator responsible for removing metadata scope's hookName,
 * as we are going to call pure method, without hook now.
 *
 * @remarks
 * Each hook is setting hookName on it's own. So we don't need to
 * revert it's value.
 */
export class PurgeHookNameMethodDecorator<CONTEXT extends MiddlewareContext>
  implements MethodDecorator
{
  constructor(private context: CONTEXT) {}

  beforeHandlerStart() {
    this.context.res.locals.alokai.metadata.scope.hookName = undefined;
  }
}

/**
 * Decorator responsible for adjusting metadata scope's extensionName if called handler has information about it.
 * Information is added by us in previous step (see markWithExtensionName function in apiClientFactory/index.ts)
 */
export class ExtensionEndpointMethodDecorator<CONTEXT extends MiddlewareContext>
  implements MethodDecorator
{
  constructor(private context: CONTEXT, private fn: Function) {}

  beforeHandlerStart() {
    if (markExtensionNameHelpers.has(this.fn)) {
      this.context.res.locals.alokai.metadata.scope.extensionName =
        markExtensionNameHelpers.get(this.fn);
    }
  }
}

/**
 * Decorator responsible for adjusting integrationName, functionName, and extensionName,
 * for limited period of time, and reverting it to old value. This is for very specific
 * case when in extension for integration, end-developer used orchestration functionalities.
 */
export class OrchiestratedMethodDecorator<CONTEXT extends MiddlewareContext>
  implements MethodDecorator
{
  private swapStorage = {
    tmpIntegrationName: "",
    tmpFnName: "",
    tmpExtensionName: "",
  };

  private swapIntegrationName() {
    this.swapStorage.tmpIntegrationName =
      this.context.res.locals.alokai.metadata.scope.integrationName;
    this.context.res.locals.alokai.metadata.scope.integrationName =
      this.context.integrationTag;
  }

  private unswapIntegrationName() {
    this.context.res.locals.alokai.metadata.scope.integrationName =
      this.swapStorage.tmpIntegrationName;
  }

  private swapFunctionName() {
    this.swapStorage.tmpFnName =
      this.context.res.locals.alokai.metadata.scope.functionName;
    this.context.res.locals.alokai.metadata.scope.functionName = this.callName;
  }

  // private unswapFunctionName() {
  //   this.context.res.locals.alokai.metadata.scope.functionName =
  //     this.swapStorage.tmpFnName;
  // }

  private swapExtensionName() {
    this.swapStorage.tmpExtensionName =
      this.context.res.locals.alokai.metadata.scope.extensionName;
    this.context.res.locals.alokai.metadata.scope.extensionName = undefined;
  }

  private unswapExtensionName() {
    this.context.res.locals.alokai.metadata.scope.extensionName =
      this.swapStorage.tmpExtensionName;
  }

  constructor(
    private context: CONTEXT,
    private callName: string,
    private fn: Function
  ) {}

  beforeHooksStart() {
    this.swapIntegrationName();
    this.swapFunctionName();
  }

  beforeHandlerStart() {
    if (!markExtensionNameHelpers.has(this.fn)) {
      this.swapExtensionName();
      // this.swapFunctionName(); // Do I really need it?
    }
  }

  beforeHooksEnd() {
    // unswap ext and fn name
    if (!markExtensionNameHelpers.has(this.fn)) {
      this.unswapExtensionName();
      // this.unswapFunctionName();
    }
  }

  afterHooksEnd() {
    this.unswapIntegrationName();
    // this.unswapFunctionName(); // Do I really need it?
  }
}
