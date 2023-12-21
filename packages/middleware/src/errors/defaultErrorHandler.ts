import consola from "consola";
import type { Request, Response } from "express";
import { getAgnosticStatusCode } from "../helpers";

/**
 * Default error handler for the middleware
 *
 * @param error
 * @param req
 * @param res
 */
export const defaultErrorHandler = (
  error: unknown,
  req: Request,
  res: Response
) => {
  consola.error(error);
  const status = getAgnosticStatusCode(error);
  res.status(status);
  if (status < 500) {
    /**
     * For all 4xx error codes or client error codes we wanted to send the error message
     */
    res.send(error);
  } else {
    /**
     * For all other error codes we wanted to send a generic error message
     */
    res.send(
      "ServerError: Something went wrong. Please, check the logs for more details."
    );
  }
};
