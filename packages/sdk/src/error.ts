export class SDKError extends Error {
  cause: unknown;

  constructor(message: string, cause: unknown) {
    super(message);
    this.name = "SDKError";
    this.cause = cause;
  }
}

export const handleError = (err: Error) => {
  const errMsg = err?.message ?? "[SDK] Error: something went wrong.";

  return new SDKError(errMsg, err);
};
