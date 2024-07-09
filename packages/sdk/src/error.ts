export class SDKError extends Error {
  cause: unknown;

  constructor(message: string, cause: unknown) {
    super(message);
    this.name = "SDKError";
    this.cause = cause;
  }
}

export const handleError = (err: Error) => {
  if ((err.cause as { code: unknown })?.code === "ECONNREFUSED")
    return new SDKError(
      "Please check if the middleware is running and is accessible by frontend app",
      err
    );

  const errMsg = err?.message ?? "[SDK] Error: something went wrong.";

  return new SDKError(errMsg, err);
};
