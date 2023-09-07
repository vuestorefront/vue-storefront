import mergeDeep from "../helpers/mergeDeep";
import { Module, Extension, InitFunction } from "../types";

/* eslint-disable no-redeclare */
function buildModule<T extends Module>(
  module: InitFunction<T>,
  moduleOptions?: any
): T;
function buildModule<T extends Module, U extends Extension = object>(
  module: InitFunction<T>,
  moduleOptions: any
): T & U;
function buildModule<T extends Module, U extends Extension = object>(
  module: InitFunction<T>,
  moduleOptions: any,
  extension: U
): T & U;
function buildModule<T extends Module, U extends Extension = object>(
  module: InitFunction<T>,
  moduleOptions: any,
  extension?: InitFunction<U> | U,
  extensionOptions?: object
): T & U;

/**
 * Build module with extension.
 * Provide a module factory function and an extension object.
 *
 * Overloaded function:
 * - buildModule(module, moduleOptions)
 * - buildModule(module, moduleOptions, extension)
 * - buildModule(module, moduleOptions, extension, extensionOptions)
 */
function buildModule<T extends Module, U extends Extension = object>(
  module: InitFunction<T>,
  moduleOptions: any = {},
  extension?: InitFunction<U> | U,
  extensionOptions?: object
): T & U {
  const resolvedExtension =
    typeof extension === "function"
      ? extension(extensionOptions)
      : extension ?? {};
  // This is safe, because extension doesn't have "connector" property
  return mergeDeep(module(moduleOptions), resolvedExtension);
}

export { buildModule };
