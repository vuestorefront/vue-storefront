/* eslint-disable no-redeclare */
import mergeDeep from "../helpers/mergeDeep";
import {
  Module,
  Extension,
  ExtensionInitializer,
  ModuleOptions,
  ModuleInitializer,
  ModuleInitializerWithMandatoryOptions,
} from "../types";

// === Overload with mandatory options ===
function buildModule<
  InitializedModule extends Module,
  Options extends ModuleOptions,
  InitializedExtension extends Extension<InitializedModule> = object,
  ExtensionOptions extends ModuleOptions = object
>(
  module: ModuleInitializerWithMandatoryOptions<InitializedModule, Options>,
  moduleOptions: Options,
  extension?:
    | ExtensionInitializer<
        InitializedModule,
        InitializedExtension,
        ExtensionOptions
      >
    | InitializedExtension,
  extensionOptions?: ExtensionOptions
): InitializedModule & InitializedExtension;

// === Overload with optional options ===
function buildModule<
  InitializedModule extends Module,
  Options extends ModuleOptions = object,
  InitializedExtension extends Extension<InitializedModule> = object,
  ExtensionOptions extends ModuleOptions = object
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
): InitializedModule & InitializedExtension;

// === Implementation ===
/**
 * Build module with extension.
 * Provide a module factory function and an extension object.
 *
 */
function buildModule<
  InitializedModule extends Module,
  Options extends ModuleOptions = object,
  InitializedExtension extends Extension<InitializedModule> = object,
  ExtensionOptions extends ModuleOptions = object
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
