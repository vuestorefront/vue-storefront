import { resolveDependency } from "./resolveDependency";
// import type { ApiClientExtension } from "../../deprecated/types";
import { BaseExtension } from "../../types";

/**
 * Imports extensions from the current working directory if they're represented as strings.
 */
export function lookUpExternal(
  extension: string | BaseExtension
): BaseExtension[] {
  return typeof extension === "string"
    ? resolveDependency<BaseExtension[]>(extension)
    : [extension];
}
