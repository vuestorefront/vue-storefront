/**
 * @docs https://nextjs.org/docs/advanced-features/middleware
 */
import { NextRequest, NextResponse } from "next/server";
import { getSdk } from "./sdk.config";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // By using the `getSdk` in the middleware, we validate that the sdk can be used in the Edge Runtime.
  const sdk = getSdk({ getRequestHeaders: () => request.headers });
  await sdk.example.getSuccess();

  return response;
}
