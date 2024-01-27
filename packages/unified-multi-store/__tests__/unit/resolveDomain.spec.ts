import { Request } from "express";
import { mockRequest } from "../../__mocks__/request.mock";
import { resolveDomain } from "../../src/resolve/resolveDomain";

describe("[MultiStoreExtension] resolveDomain utility function", () => {
  it("responds with origin header for client-side communication", () => {
    const DOMAIN = "origin-mydomain.io";

    const mockedRequest = mockRequest();
    mockedRequest.headers.origin = "https://origin-mydomain.io";
    mockedRequest.headers["x-forwarded-host"] = "x-forwarded-host-mydomain.io";
    mockedRequest.headers.host = "host-mydomain.io";

    const resolvedDomain = resolveDomain(mockedRequest as any as Request);

    expect(resolvedDomain).toBe(DOMAIN);
  });

  it("responds with x-forwarded-host header for server-side communication", () => {
    const X_FORWARDED_HOST = "x-forwarded-host-mydomain.io";

    const mockedRequest = mockRequest();
    mockedRequest.headers.origin = undefined;
    mockedRequest.headers["x-forwarded-host"] = "x-forwarded-host-mydomain.io";
    mockedRequest.headers.host = "host-mydomain.io";

    const resolvedDomain = resolveDomain(mockedRequest as any as Request);

    expect(resolvedDomain).toBe(X_FORWARDED_HOST);
  });

  it("fallbacks to host header for server-side communication", () => {
    const HOST = "host-mydomain.io";

    const mockedRequest = mockRequest();
    mockedRequest.headers.origin = undefined;
    mockedRequest.headers["x-forwarded-host"] = undefined;
    mockedRequest.headers.host = HOST;

    const resolvedDomain = resolveDomain(mockedRequest as any as Request);

    expect(resolvedDomain).toBe(HOST);
  });
});
