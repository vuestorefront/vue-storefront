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
  const resolvedModule = module(moduleOptions);

  const resolvedExtension =
    typeof extension === "function"
      ? extension(extensionOptions, {
          methods: resolvedModule.connector,
          context: resolvedModule?.context ?? {},
        })
      : extension ?? {};

  return mergeDeep(resolvedModule, resolvedExtension);
}

export { buildModule };
