import { AnyFunction } from "../types";

export const isFunction = (x: unknown): x is AnyFunction =>
  typeof x === "function";

// eslint-disable-next-line no-use-before-define
export function includes<T extends U, U>(
  coll: ReadonlyArray<T>,
  el: U
): el is T {
  return coll.includes(el as T);
}
