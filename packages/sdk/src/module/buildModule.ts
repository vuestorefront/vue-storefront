import mergeDeep from "../helpers/mergeDeep";
import {
  Module,
  Extension,
  ModuleInitializer,
  ExtensionInitializer,
  ModuleOptions,
} from "../types";

/**
 * Build module with extension.
 * Provide a module factory function and an extension object.
 *
 * Overloaded function:
 * - buildModule(module, moduleOptions)
 * - buildModule(module, moduleOptions, extension)
 * - buildModule(module, moduleOptions, extension, extensionOptions)
 */
function buildModule<
  InitializedModule extends Module,
  Options extends ModuleOptions,
  InitializedExtension extends Extension<InitializedModule>,
  ExtensionOptions extends ModuleOptions
>(
  module: ModuleInitializer<InitializedModule, Options>,
  moduleOptions?: Options,
  extension?:
    | ExtensionInitializer<
        InitializedModule,
        InitializedExtension,
        ExtensionOptions
      >
    | InitializedExtension,
  extensionOptions?: ExtensionOptions
): InitializedModule & InitializedExtension {
  const resolvedExtension =
    typeof extension === "function"
      ? extension(extensionOptions)
      : extension ?? {};

  return mergeDeep(module(moduleOptions), resolvedExtension);
}

export { buildModule };
