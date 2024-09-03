import request from "supertest";
import { Server } from "http";
import { createServer } from "../../src/index";

const Logger = {
  info: jest.fn(),
};

const cachingExtension = {
  name: "caching-extension",
  hooks(req, res) {
    return {
      afterCall({ response }) {
        if (req.method !== "GET") {
          Logger.info("[CACHING] It's not a GET request, skipping caching");
          return response;
        }

        if (res.getHeader("set-cookie")) {
          Logger.info(
            "[CACHING] Response containing Set-Cookie header, skipping caching"
          );
          return response;
        }

        const apiMethod = req.params.functionName;
        const params = req.query;
        if (apiMethod === "success") {
          if (
            params.country &&
            params.currency &&
            params.locale &&
            "channel" in params &&
            "customerGroupId" in params
          ) {
            Logger.info(
              "[CACHING] It's a success request, caching requirements fulfilled!"
            );
            res.set("Cache-Control", "public, max-age=3600");
          } else {
            Logger.info(
              "[CACHING] It's a success request, caching requirements not fulfilled!"
            );
          }
        }

        return response;
      },
    };
  },
};

/**
 * The following test suite is responsible for making sure
 * the caching extension's boilerplate in our documentation is working correctly
 * and no one will break it accidently during working on the middleware.
 *
 * Aforementioned caching extension is responsible for setting Cache-Control response header
 * for cookie-independent requests to the GET endpoints in our integrations
 */
describe("[Integration] Caching extension", () => {
  let app: Server;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    app = await createServer({
      integrations: {
        test_integration: {
          configuration: {},
          location: "./__tests__/integration/bootstrap/server",
          extensions() {
            return [cachingExtension as any];
          },
        },
      },
    });
  });

  it("doesn't add Cache-Control header for not GET method", async () => {
    const { status, body, headers } = await request(app).post(
      "/test_integration/success"
    );

    expect(status).toEqual(200);
    expect(body.message).toEqual("ok");
    expect(headers["cache-control"]).toBeUndefined();
  });

  it("doesn't add Cache-Control header if there is Set-Cookie response header", async () => {
    const { status, body, headers } = await request(app).get(
      "/test_integration/setCookieHeader"
    );

    expect(status).toEqual(200);
    expect(body.message).toEqual("ok");
    expect(headers["cache-control"]).toBeUndefined();
  });

  it("adds Cache-Control header if request variables were passed via params, so there are not dependencies on cookies", async () => {
    const { status, body, headers } = await request
      .agent(app)
      .get("/test_integration/success")
      .query({
        country: "PL",
        currency: "PLN",
        locale: "pl",
        channel: null,
        customerGroupId: null,
      });

    expect(status).toEqual(200);
    expect(body.message).toEqual("ok");
    expect(headers["cache-control"]).toEqual("public, max-age=3600");
  });

  it("doesn't add Cache-Control header if request variables weren't passed via params, so there are dependencies on cookies", async () => {
    const { status, body, headers } = await request(app).get(
      "/test_integration/success"
    );

    expect(status).toEqual(200);
    expect(body.message).toEqual("ok");
    expect(headers["Cache-Control"]).toBeUndefined();
  });
});
