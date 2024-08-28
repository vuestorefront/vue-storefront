import express from "express";
import request from "supertest";
import { Server } from "http";
import { createServer } from "../../src";

const app = express();
app.use(express.json());

const myExtension = {
  name: "myExtension",
  extendApiMethods: {
    testEndpoint: async () => {
      return {};
    },
  },
  extendApp({ configuration }) {
    configuration.testParams = {};
  },
  hooks: () => ({
    beforeCreate: async ({ configuration }) => {
      configuration.testParams.beforeCreate = true;
      return Promise.resolve(configuration);
    },
    afterCreate: async ({ configuration }) => {
      configuration.testParams.afterCreate = true;
      return Promise.resolve(configuration);
    },
    beforeCall: async ({ configuration, args }) => {
      configuration.testParams.beforeCall = true;
      return Promise.resolve(args);
    },
    afterCall: async ({ configuration, args, response }) => {
      configuration.testParams.afterCall = true;
      return Promise.resolve({
        ...response,
        ...configuration.testParams,
        ...args[0],
      });
    },
  }),
};

describe("POST /test_integration/testEndpoint", () => {
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
            return [myExtension as any];
          },
        },
      },
    });
  });

  it("should return all added parameters", async () => {
    const res = await request(app)
      .post("/test_integration/testEndpoint")
      .send({ arg1: "value1", arg2: "value2" });

    expect(res.body).toEqual({
      beforeCreate: true,
      afterCreate: true,
      beforeCall: true,
      afterCall: true,
      arg1: "value1",
      arg2: "value2",
    });
  });
});
