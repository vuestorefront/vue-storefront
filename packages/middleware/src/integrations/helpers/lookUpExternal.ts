import { resolveDependency } from "./resolveDependency";
import type { AlokaiContainer, ApiClientExtension } from "../../types";

/**
 * Imports extensions from the current working directory if they're represented as strings.
 */
export function lookUpExternal(alokai: AlokaiContainer) {
  return function (
    extension: string | ApiClientExtension
  ): ApiClientExtension[] {
    return typeof extension === "string"
      ? resolveDependency<ApiClientExtension[]>(extension, alokai)
      : [extension];
  };
}
