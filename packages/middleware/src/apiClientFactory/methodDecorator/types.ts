export interface MethodDecorator {
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
