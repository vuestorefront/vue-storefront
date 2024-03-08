import mergeDeep from "../helpers/mergeDeep";
import {
  Module,
  Extension,
  ModuleInitializer,
  ExtensionInitializer,
  ModuleOptions,
} from "../types";

/* eslint-disable no-redeclare */
// Single parameter overload
function buildModule<InitializedModule extends Module>(
  module: () => InitializedModule
): InitializedModule;

// Two parameter overload
function buildModule<
  InitializedModule extends Module,
  Options extends ModuleOptions
>(
  module: ModuleInitializer<InitializedModule, Options>,
  moduleOptions?: Options
): InitializedModule;

// Three parameter overload
function buildModule<
  InitializedModule extends Module,
  Options extends ModuleOptions,
  InitializedExtension extends Extension<InitializedModule>
>(
  module: ModuleInitializer<InitializedModule, Options>,
  moduleOptions?: Options,
  extension?: InitializedExtension
): InitializedModule & InitializedExtension;

// Four parameter overload
function buildModule<
  InitializedModule extends Module,
  Options extends ModuleOptions,
  InitializedExtension extends Extension<InitializedModule>,
  ExtensionOptions extends ModuleOptions
>(
  module: ModuleInitializer<InitializedModule, Options>,
  moduleOptions?: Options,
  extension?: ExtensionInitializer<
    InitializedModule,
    InitializedExtension,
    ExtensionOptions
  >,
  extensionOptions?: ExtensionOptions
): InitializedModule & InitializedExtension;

function buildModule<
  InitializedModule extends Module,
  Options extends ModuleOptions,
  InitializedExtension extends Extension<InitializedModule>,
  ExtensionOptions extends ModuleOptions
>(
  module: (options?: Options) => InitializedModule,
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
