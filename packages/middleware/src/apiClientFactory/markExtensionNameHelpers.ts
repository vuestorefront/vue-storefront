import { ExtensionEndpointHandler } from "../types";

/**
 * Set of helpers to faciliate working with _extensionName property
 * added on handlers added by extension's extendApiMethod hook.
 */
export const markExtensionNameHelpers = {
  /**
   * Function marking endpoint added or overwritten by extension's extendApiMethod hook
   * with information about source extension's name
   */
  mark(apiMethod: ExtensionEndpointHandler, extensionName: string) {
    apiMethod._extensionName = extensionName;
    return apiMethod;
  },

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

  has(obj: object): obj is ExtensionEndpointHandler {
    return "_extensionName" in obj;
  },

  get(obj: object) {
    return (obj as ExtensionEndpointHandler)?._extensionName;
  },
};
