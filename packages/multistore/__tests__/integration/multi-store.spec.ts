/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import { Express } from "express";
import { createServer } from "@vue-storefront/middleware";
import { integrations } from "./bootstrap/middleware.config";
import { mockMiddlewareConfig } from "../../__mocks__/middleware.config.mock";
import { mockMultistoreConfig } from "../../__mocks__/multistore.config.mock";
import { createMultistoreExtension } from "../../src/extension";
import { MultistoreExtensionMethods } from "../../src/types";

describe("[MultiStoreExtension] Overwrites base config with store specific one", () => {
  // Globals
  let app: Express;

  // Mocks
  const mockedMiddlewareConfig = mockMiddlewareConfig();
  const multistoreConfigMock = mockMultistoreConfig();

  // Headers
  const localhosHeader = "localhost:3000";
  const mydomainHeader = "mydomain.io";
  const podHostname = "vue-storefront:3000";

  // Configs
  const localhostConfig = {
    ...multistoreConfigMock.fetchConfiguration({})[localhosHeader],
    uri: "uri",
  };
  const mydomainConfig = {
    ...multistoreConfigMock.fetchConfiguration({})[mydomainHeader],
    uri: "uri",
  };
  const bootstrapedConfig = {
    ...integrations.bootstraped,
    configuration: mockedMiddlewareConfig,
    extensions: (extensions) => [
      ...extensions,
      createMultistoreExtension(
        // Cast to any and then to MultistoreExtensionMethods to avoid TS errors caused by using jest mocks.
        multistoreConfigMock as any as MultistoreExtensionMethods
      ),
    ],
  };

  // Setup
  beforeAll(async () => {
    app = await createServer({
      integrations: {
        bootstraped: bootstrapedConfig,
      },
    });
  });

  // Tests
  it("overwrites base configuration based on x-forwarded-host header for server-to-server communication", async () => {
    const { body } = await request(app)
      .post("/bootstraped/getConfig")
      .set("x-forwarded-host", mydomainHeader)
      .set("host", podHostname)
      .send([]);

    expect(body.config.api).toEqual(mydomainConfig);
  });

  it("overwrites base configuration based on fallback to host header for server-to-server communication", async () => {
    const { body } = await request(app)
      .post("/bootstraped/getConfig")
      .set("x-forwarded-host", "")
      .set("host", localhosHeader)
      .send([]);

    expect(body.config.api).toEqual(localhostConfig);
  });

  it("overwrites base configuration based on origin header for client-to-server communication", async () => {
    const { body } = await request(app)
      .post("/bootstraped/getConfig")
      .set("origin", `http://${mydomainHeader}`)
      .set("host", podHostname)
      .send([]);

    expect(body.config.api).toEqual(mydomainConfig);
  });
});
