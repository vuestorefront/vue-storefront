import consola from "consola";
import type { Request, Response } from "express";
import { getAgnosticStatusCode } from "../helpers";

type ClientSideError = {
  message?: string;
};

/**
 * Default error handler for the middleware
 *
 * @param error
 * @param req
 * @param res
 */
export const defaultErrorHandler = (
  error: ClientSideError,
  req: Request,
  res: Response
) => {
  consola.error(error);
  const status = getAgnosticStatusCode(error);
  res.status(status);
  if (status < 500) {
    const errMsg =
      error?.message ?? `Request failed with status code ${status}`;
    /**
     * For all 4xx error codes or client error codes we wanted to send the error message
     */
    res.send({ message: errMsg });
  } else {
    /**
     * For all other error codes we wanted to send a generic error message
     */
    res.send(
      "ServerError: Something went wrong. Please, check the logs for more details."
    );
  }
};
