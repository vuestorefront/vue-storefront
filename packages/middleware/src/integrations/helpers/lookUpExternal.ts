import { resolveDependency } from "./resolveDependency";
import { Extension } from "../../types";

/**
 * Imports extensions from the current working directory if they're represented as strings.
 */
export function lookUpExternal(extension: string | Extension): Extension[] {
  return typeof extension === "string"
    ? resolveDependency<Extension[]>(extension)
    : [extension];
}
