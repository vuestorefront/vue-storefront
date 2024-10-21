import { ExtensionEndpointHandler } from "../types";

/**
 * Set of helpers to faciliate working with _extensionName property
 * added on handlers added by extension's extendApiMethod hook.
 */
export const markExtensionNameHelpers = {
  /**
   * Decorates handler added or overwritten by extension's extendApiMethod hook
   * with information about source extension's name
   */
  mark(apiMethod: ExtensionEndpointHandler, extensionName: string) {
    apiMethod._extensionName = extensionName;
    return apiMethod;
  },

  /**
   * Marks a set of endpoints using `mark` method
   */
  markApi(
    api: Record<string, ExtensionEndpointHandler>,
    extensionName: string
  ) {
    return Object.entries(api).reduce(
      (total, [name, fn]: [string, ExtensionEndpointHandler]) => {
        return {
          ...total,
          [name]: markExtensionNameHelpers.mark(fn, extensionName),
        };
      },
      {}
    );
  },

  /**
   * Checks if object is marked with extension's name
   */
  has(obj: object): obj is ExtensionEndpointHandler {
    return "_extensionName" in obj;
  },

  /**
   * Gets extension's name from which handler comes
   *
   * @remarks Returns undefined if it's missing in the handler
   */
  get(obj: object) {
    return (obj as ExtensionEndpointHandler)?._extensionName;
  },
};
