import { includes } from "./utils";
import {
  AxiosError,
  StatusCode,
  UnknownError,
  ApolloError,
  ErrorObject,
} from "../types";

const STATUS_FIELDS = ["status", "statusCode"] as const;
/**
 * @key is constant string identifier of connection error
 * @value is desired HTTP code that we are going to
 *  send back when we encounter specified connection error
 */
const CONNECTION_ERRORS = {
  ECONNABORTED: 408,
  ECONNRESET: 500,
};

export type Status = (typeof STATUS_FIELDS)[number];

function isErrorObject(obj: unknown): obj is ErrorObject<Status> {
  // typeof null is 'object' https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null
  if (obj === null) return false;
  return typeof obj === "object";
}

function isAxiosError(error: ErrorObject<Status>): error is AxiosError {
  return "isAxiosError" in error;
}

function isApolloError(error: ErrorObject<Status>): error is ApolloError {
  return "networkError" in error || "code" in error;
}

function reduceStatus(narrowObject: UnknownError<Status>, depth: number) {
  return function reduceStatusNested(
    statusCode: StatusCode,
    key: string
  ): StatusCode {
    if (statusCode) {
      return statusCode;
    }

    if (includes(STATUS_FIELDS, key)) {
      return narrowObject[key] || null;
    }
    const newDepth = depth + 1;

    // eslint-disable-next-line no-use-before-define
    return obtainStatusCode(narrowObject[key], newDepth);
  };
}

function obtainStatusCode(
  givenObject: UnknownError<Status>,
  depth = 1
): StatusCode {
  const obj = givenObject || {};

  if (depth > 3) {
    return null;
  }

  return Object.keys(obj).reduce(reduceStatus(obj, depth), null);
}

function getAxiosStatusCode(error: AxiosError) {
  if (error?.code && CONNECTION_ERRORS[error.code]) {
    return CONNECTION_ERRORS[error.code];
  }

  return error.response?.status;
}

function getApolloStatusCode(error: ApolloError) {
  if (error.networkError) {
    return 500;
  }
  if (error.code) {
    return typeof error.code === "string" ? 400 : error.code;
  }

  if (error?.graphQLErrors?.length > 0) {
    return 200;
  }

  return undefined;
}

function getCodeFromError(error: unknown) {
  if (!isErrorObject(error)) {
    return undefined;
  }
  if (isAxiosError(error)) {
    return getAxiosStatusCode(error);
  }
  if (isApolloError(error)) {
    return getApolloStatusCode(error);
  }

  return obtainStatusCode(error);
}

export function getAgnosticStatusCode(error: unknown): number {
  return getCodeFromError(error) || 500;
}
