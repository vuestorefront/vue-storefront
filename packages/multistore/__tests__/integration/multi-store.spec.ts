import request from "supertest";
import { Express } from "express";
import { createServer } from "@vue-storefront/middleware";
import { integrations } from "./bootstrap/middleware.config";
import { mockMiddlewareConfig } from "../../__mocks__/middleware.config.mock";
import { multistoreExtension } from "../../src/extension";

describe("[MultiStoreExtension] Unified multistore approach", () => {
  const mockedMiddlewareConfig = mockMiddlewareConfig();

  describe("Extended app", () => {
    let app: Express;

    const bootstrapedConfig = {
      ...integrations.bootstraped,
      configuration: mockedMiddlewareConfig,
      extensions: (extensions) => [...extensions, multistoreExtension],
    };

    beforeAll(async () => {
      app = await createServer({
        integrations: {
          bootstraped: bootstrapedConfig,
        },
      });
    });

    describe("overwrites base config with store-specific config", () => {
      const localhosHeader = "localhost:3000";
      const mydomainHeader = "mydomain.io";
      const podHostname = "vue-storefront:3000";

      const localhostConfig = {
        ...mockedMiddlewareConfig.multistore.fetchConfiguration({})[
          localhosHeader
        ],
        uri: "uri",
      };

      const mydomainConfig = {
        ...mockedMiddlewareConfig.multistore.fetchConfiguration({})[
          mydomainHeader
        ],
        uri: "uri",
      };

      it("based on x-forwarded-host header for server-to-server communication", async () => {
        const { body } = await request(app)
          .post("/bootstraped/getConfig")
          .set("x-forwarded-host", mydomainHeader)
          .set("host", podHostname)
          .send([]);

        expect(body.config.api).toEqual(mydomainConfig);
      });

      it("based on fallback to host header for server-to-server communication", async () => {
        const { body } = await request(app)
          .post("/bootstraped/getConfig")
          .set("x-forwarded-host", "")
          .set("host", localhosHeader)
          .send([]);

        expect(body.config.api).toEqual(localhostConfig);
      });

      it("based on origin header for client-to-server communication", async () => {
        const { body } = await request(app)
          .post("/bootstraped/getConfig")
          .set("origin", `http://${mydomainHeader}`)
          .set("host", podHostname)
          .send([]);

        expect(body.config.api).toEqual(mydomainConfig);
      });
    });
  });
});
