import request from "supertest";
import { Server } from "http";
import { createServer } from "../../src/index";
import { success } from "./bootstrap/api";

describe("[Integration] Create server", () => {
  let app: Server;

  beforeEach(async () => {
    app = await createServer({
      integrations: {
        test_integration: {
          configuration: {
            myCfgEntry: true,
          },
          errorHandler: (error: unknown, req: any, res: any) => {
            res.status(410); // awkward status code to test if it's working
            res.send("Custom error handler");
          },
          location: "./__tests__/integration/bootstrap/server",
          extensions() {
            return [
              {
                name: "my-extension",
                extendApiMethods: {
                  myFunc(context) {
                    return context.api.success();
                  },
                  myFuncWithDependencyToOtherExtension(context) {
                    return (context.api as any).myFunc();
                  },
                },
              },
              {
                name: "my-namespaced-extension",
                isNamespaced: true,
                extendApiMethods: {
                  myFunc(context) {
                    return context.api.error();
                  },
                  myFuncNamespaced(context) {
                    return context.api.success();
                  },
                },
              },
            ];
          },
        },
      },
    });
  });

  it("config.integrations should be properly configured", async () => {
    app = await createServer({ integrations: {} });

    const { status, error } = await request(app).post(
      "/invalid_integration/action"
    );

    expect(status).toEqual(404);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.text).toEqual(
        '"invalid_integration" integration is not configured. Please, check the request path or integration configuration.'
      );
    }
  });

  it("can handle a valid request", async () => {
    const { status, body } = await request(app)
      .post("/test_integration/success")
      .send([]);

    expect(status).toEqual(200);
    expect(body.message).toEqual("ok");
  });

  it("'x-powered-by' header is removed", async () => {
    const { headers } = await request(app)
      .post("/test_integration/success")
      .send([]);

    expect(headers["x-powered-by"]).toBeUndefined();
  });

  it("healthz endpoint responds with ok", async () => {
    const { status, text } = await request(app).get("/healthz").send();

    expect(status).toEqual(200);
    expect(text).toEqual("ok");
  });

  it("should allow to override default error handler", async () => {
    const { status, error } = await request(app).post(
      "/test_integration/throwAxiosError"
    );
    expect(status).toEqual(410);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.text).toEqual("Custom error handler");
    }
  });

  it("should allow functions from extensions to access integration functions", async () => {
    expect.assertions(2);
    const { status, text } = await request(app)
      .post("/test_integration/myFunc")
      .send([]);
    const response = JSON.parse(text);

    // This is the result of the original "success" function from the integration
    const apiMethodResult = await success();

    expect(status).toEqual(200);
    expect(response).toEqual(apiMethodResult);
  });

  it("should not allow functions from extensions to access extension functions", async () => {
    expect.assertions(2);
    const { status, text } = await request(app)
      .post("/test_integration/myFuncWithDependencyToOtherExtension")
      .send([]);

    expect(status).toEqual(410);
    expect(text).toEqual("Custom error handler");
  });

  it("should pass context type to extensions functions", async () => {
    createServer({
      integrations: {
        test_integration: {
          configuration: {
            myCfgEntry: true,
          },
          errorHandler: (error: unknown, req: any, res: any) => {
            res.status(410); // awkward status code to test if it's working
            res.send("Custom error handler");
          },
          location: "./__tests__/integration/bootstrap/server",
          extensions() {
            return [
              {
                name: "my-extension",
                extendApiMethods: {
                  myFunc(context) {
                    return context.api.success();
                  },
                },
              },
            ];
          },
        },
      },
    });
  });

  it("should make a call to a namespaced method", async () => {
    const { status, text } = await request(app)
      .post("/test_integration/my-namespaced-extension/myFuncNamespaced")
      .send([]);

    const response = JSON.parse(text);
    // This is the result of the original "success" function from the integration
    const apiMethodResult = await success();

    expect(status).toEqual(200);
    expect(response).toEqual(apiMethodResult);
  });

  it("should return 404 and proper message if function is not available in the namespace", async () => {
    const { status, error } = await request(app).post(
      "/test_integration/my-namespaced-extension/unavailavbleFunction"
    );

    expect(status).toEqual(404);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.text).toEqual(
        `Failed to resolve apiClient or function: Extension "my-namespaced-extension" is not namespaced or the function "unavailavbleFunction" is not available in the namespace.`
      );
    }
  });

  it("should return 404 and proper message if function is not available in the shared namespace", async () => {
    const { status, error } = await request(app).post(
      "/test_integration/unavailavbleFunction"
    );

    expect(status).toEqual(404);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.text).toEqual(
        `Failed to resolve apiClient or function: The function "unavailavbleFunction" is not registered.`
      );
    }
  });

  it("namespaced extension should be not merged to the shared api", async () => {
    const { status, text } = await request(app)
      .post("/test_integration/myFunc")
      .send([]);

    const response = JSON.parse(text);
    // This is the result of the original "success" function from the integration
    const apiMethodResult = await success();

    // If merged, the response would be { message: "error", error: true, status: 404 }
    expect(status).toEqual(200);
    expect(response).toEqual(apiMethodResult);
  });
});
