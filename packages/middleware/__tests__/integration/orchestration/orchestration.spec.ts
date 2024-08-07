import request from "supertest";
import { createServer } from "../../../src/createServer";

describe("[Integration] Orchestration basics", () => {
  /**
   * Basic orchestration
   */
  it("calls other integrations methods from an integration's extension", async () => {
    // Given
    const middlewareConfigMock = {
      integrations: {
        firstIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "firstIntegration",
          },
          extensions: (extensions) => [
            ...extensions,
            {
              name: "orchestration-extension",
              extendApiMethods: {
                getSecondIntegrationConfig: async (context) => {
                  const secondIntegration = await context.getApiClient(
                    "secondIntegration"
                  );
                  const firstIntegrationConfig = await context.api.getConfig();

                  return {
                    first: firstIntegrationConfig,
                    second: await secondIntegration.api.getConfig(),
                  };
                },
              },
            },
          ],
        },
        secondIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "secondIntegration",
          },
        },
      },
    };

    // When
    const app = await createServer(middlewareConfigMock);
    const res = await request(app).post(
      "/firstIntegration/getSecondIntegrationConfig"
    );

    // Then
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      first: {
        integrationName: "firstIntegration",
        id: "firstIntegration",
      },
      second: {
        integrationName: "secondIntegration",
        id: "secondIntegration",
      },
    });
  });

  /**
   * Orchestration order does not matter
   */
  it("calls integrations registered before the integration that implements orchestration", async () => {
    // Given
    const middlewareConfigMock = {
      integrations: {
        firstIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "firstIntegration",
          },
        },
        secondIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "secondIntegration",
          },
          extensions: (extensions) => [
            ...extensions,
            {
              name: "orchestration-extension",
              extendApiMethods: {
                async getFirstIntegrationConfig(context) {
                  const firstIntegration = await context.getApiClient(
                    "firstIntegration"
                  );
                  return firstIntegration.api.getConfig();
                },
              },
            },
          ],
        },
      },
    };

    // When
    const app = await createServer(middlewareConfigMock);
    const res = await request(app).post(
      "/secondIntegration/getFirstIntegrationConfig"
    );

    // Then
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      integrationName: "firstIntegration",
      id: "firstIntegration",
    });
  });

  /**
   * Self-referring
   */
  it("allows self-referring with getApiClient", async () => {
    // Given
    const middlewareConfigMock = {
      integrations: {
        firstIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "firstIntegration",
          },
        },
        secondIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "secondIntegration",
          },
          extensions: (extensions) => [
            ...extensions,
            {
              name: "orchestration-extension",
              extendApiMethods: {
                async getConfigFromSelfRefer(context) {
                  const secondIntegration = await context.getApiClient(
                    "secondIntegration"
                  );
                  return secondIntegration.api.getConfig();
                },
              },
            },
          ],
        },
      },
    };

    // When
    const app = await createServer(middlewareConfigMock);
    const res = await request(app).post(
      "/secondIntegration/getConfigFromSelfRefer"
    );

    // Then
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      integrationName: "secondIntegration",
      id: "secondIntegration",
    });
  });

  /**
   * Multiple integrations
   */
  it("calls more than one additional integration", async () => {
    // Given
    const middlewareConfigMock = {
      integrations: {
        firstIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "firstIntegration",
          },
        },
        secondIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "secondIntegration",
          },
          extensions: (extensions) => [
            ...extensions,
            {
              name: "orchestration-extension",
              extendApiMethods: {
                getMultipleIntegrationsConfig: async (context) => {
                  const firstIntegration = await context.getApiClient(
                    "firstIntegration"
                  );

                  const secondIntegrationConfig = await context.api.getConfig();

                  const thirdIntegration = await context.getApiClient(
                    "thirdIntegration"
                  );

                  return {
                    first: await firstIntegration.api.getConfig(),
                    second: secondIntegrationConfig,
                    third: await thirdIntegration.api.getConfig(),
                  };
                },
              },
            },
          ],
        },
        thirdIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "thirdIntegration",
          },
        },
      },
    };

    // When
    const app = await createServer(middlewareConfigMock);
    const res = await request(app).post(
      "/secondIntegration/getMultipleIntegrationsConfig"
    );

    // Then
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      first: {
        integrationName: "firstIntegration",
        id: "firstIntegration",
      },
      second: {
        integrationName: "secondIntegration",
        id: "secondIntegration",
      },
      third: {
        integrationName: "thirdIntegration",
        id: "thirdIntegration",
      },
    });
  });

  /**
   * Prefedined extensions
   */
  it("calls integration methods added as predefined extensions", async () => {
    // Given
    const middlewareConfigMock = {
      integrations: {
        firstIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "firstIntegration",
          },
          extensions: (extensions) => [
            ...extensions,
            {
              name: "orchestration-extension",
              extendApiMethods: {
                secondIntegrationExtendedFunc: async (context) => {
                  const secondIntegration = await context.getApiClient(
                    "secondIntegration"
                  );

                  return secondIntegration.api.extendedFunc();
                },
              },
            },
          ],
        },
        secondIntegration: {
          location: "./__tests__/integration/bootstrap/serverWithExtensions",
          configuration: {
            id: "secondIntegration",
          },
        },
      },
    };

    // When
    const app = await createServer(middlewareConfigMock);
    const res = await request(app).post(
      "/firstIntegration/secondIntegrationExtendedFunc"
    );

    // Then
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      isExtended: true,
    });
  });

  /**
   * Custom extensions e.g. unified
   */
  it("calls integration methods added as custom extensions", async () => {
    // Given
    const middlewareConfigMock = {
      integrations: {
        firstIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "firstIntegration",
          },
          extensions: (extensions) => [
            ...extensions,
            {
              name: "orchestration-extension",
              extendApiMethods: {
                orchestrationMethod: async (context) => {
                  const secondIntegration = await context.getApiClient(
                    "secondIntegration"
                  );

                  const firstIntegrationConfig = await context.api.getConfig();

                  return {
                    first: firstIntegrationConfig,
                    second: await secondIntegration.api.unifiedMethod(),
                  };
                },
              },
            },
          ],
        },
        secondIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "secondIntegration",
          },
          extensions: (extensions) => [
            ...extensions,
            {
              name: "example-unified-extension",
              extendApiMethods: {
                unifiedMethod: async (context) => {
                  return {
                    unified: true,
                    ...context.config,
                  };
                },
              },
            },
          ],
        },
      },
    };

    // When
    const app = await createServer(middlewareConfigMock);
    const res = await request(app).post(
      "/firstIntegration/orchestrationMethod"
    );

    // Then
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      first: {
        id: "firstIntegration",
        integrationName: "firstIntegration",
      },
      second: {
        id: "secondIntegration",
        integrationName: "secondIntegration",
        unified: true,
      },
    });
  });

  /**
   * Error handling
   */
  it("informs the user that non-existing integration key has been used", async () => {
    // Given
    const middlewareConfigMock = {
      integrations: {
        firstIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "firstIntegration",
          },
          extensions: (extensions) => [
            ...extensions,
            {
              name: "orchestration-extension",
              extendApiMethods: {
                getSecondIntegrationConfig: async (context) => {
                  const secondIntegration = context.getApiClient(
                    "nonExistingIntegration"
                  );
                  const firstIntegrationConfig = await context.api.getConfig();

                  return {
                    first: firstIntegrationConfig,
                    second: await secondIntegration.api.getConfig(),
                  };
                },
              },
            },
          ],
        },
        secondIntegration: {
          location: "./__tests__/integration/bootstrap/server",
          configuration: {
            id: "secondIntegration",
          },
        },
      },
    };

    // When
    const app = await createServer(middlewareConfigMock);
    const res = await request(app).post(
      "/firstIntegration/getSecondIntegrationConfig"
    );

    // Then
    expect(res.status).toBe(500);
    expect(res.text).toEqual(
      "ServerError: Something went wrong. Please, check the logs for more details."
    );
  });
});
