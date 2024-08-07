import type { Request } from "express";

/**
 * Resolves domain for client to server and server to server communications.
 */
export const resolveDomain = (req: Request): string => {
  const origin = req.get("origin");
  const host = req.get("host");
  const forwardedHost = req.get("x-forwarded-host");

  if (origin) {
    return new URL(origin).host;
  }

  return (forwardedHost || host) as string;
};
