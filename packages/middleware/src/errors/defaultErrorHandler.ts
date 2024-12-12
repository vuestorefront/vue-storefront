import { getAgnosticStatusCode } from "../helpers";
import type { Integration } from "../types";

/**
 * Default error handler for the middleware
 */
export const defaultErrorHandler: Integration["errorHandler"] = (
  error,
  _req,
  res
) => {
  const status = getAgnosticStatusCode(error);
  res.status(status);
  if (status < 500) {
    /**
     * For all 4xx error codes or client error codes we wanted to send the error message
     */
    res.send({ message: getClientSideErrorMessage(error, status) });
  } else {
    /**
     * For all other error codes we wanted to send a generic error message
     */
    res.send(
      "ServerError: Something went wrong. Please, check the logs for more details."
    );
  }
};

const getClientSideErrorMessage = (error: unknown, status: number) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return `Request failed with status code ${status}`;
};
