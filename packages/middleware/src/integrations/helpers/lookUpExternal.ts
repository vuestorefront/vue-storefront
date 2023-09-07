import { resolveDependency } from "./resolveDependency";
import type { ApiClientExtension } from "../../types";

/**
 * Imports extensions from the current working directory if they're represented as strings.
 */
export function lookUpExternal(
  extension: string | ApiClientExtension
): ApiClientExtension[] {
  return typeof extension === "string"
    ? resolveDependency<ApiClientExtension[]>(extension)
    : [extension];
}
