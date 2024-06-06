import express from "express";
import request from "supertest";
import { apiClientFactory } from "../../src";

const app = express();
app.use(express.json());

const onCreate = async (config) => {
  const props = await Promise.resolve({ onCreate: true });
  return {
    ...config,
    ...props,
  };
};

const myExtension = {
  name: "myExtension",
  hooks: (req, res) => ({
    beforeCreate: async ({ configuration }) => {
      return Promise.resolve({ ...configuration, beforeCreate: true });
    },
    afterCreate: async ({ configuration }) => {
      return Promise.resolve({ ...configuration, afterCreate: true });
    },
    beforeCall: async ({ args }) => {
      return Promise.resolve({ ...args, beforeCall: true });
    },
    afterCall: async ({ response }) => {
      return Promise.resolve({ ...response, afterCall: true });
    },
  }),
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api: {
    testEndpoint: async (context, args) => {
      return { context, args };
    },
  },
  extensions: [myExtension],
});

app.post("/test-endpoint", async (req, res) => {
  const client = await createApiClient({ args: req.body });
  const response = await client.api.testEndpoint(client, req.body);
  res.send(response);
});

describe("POST /test-endpoint", () => {
  it("should return all added parameters", async () => {
    const res = await request(app)
      .post("/test-endpoint")
      .send({ arg1: "value1", arg2: "value2" });

    expect(res.body.args).toEqual({
      arg1: "value1",
      arg2: "value2",
      beforeCall: true,
    });
    expect(res.body.context.config).toEqual({
      onCreate: true,
      beforeCreate: true,
      afterCreate: true,
    });
  });
});
