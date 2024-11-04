import request from "supertest";
import { createServer } from "../../src/index";

describe("[Integration] Init", () => {
  it("should extend the configuration", async () => {
    const app = await createServer({
      integrations: {
        test_integration: {
          location: "./__tests__/integration/bootstrap/serverWithInit",
          configuration: {
            foo: "bar",
          },
        },
      },
    });

    const { body } = await request(app)
      .post("/test_integration/getConfig")
      .send([]);

    expect(body).toEqual({
      foo: "bar",
      integrationName: "test_integration",
      isInit: true,
    });
  });
});
