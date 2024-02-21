import { AnyFunction } from "../../types";

/**
 * Constraint for the endpoints.
 *
 * @example
 * ```ts
 * type Endpoints = {
 *   getUser: (id: string) => Promise<User>;
 *   createUser: (data: CreateUser) => Promise<User>;
 * };
 * ```
 */
export type EndpointsConstraint = {
  [key: string]: AnyFunction;
};

/**
 * Options for the `moduleFromEndpoints`.
 */
export interface Options {
  /**
   * Base URL for the API.
   */
  apiUrl: string;
}
