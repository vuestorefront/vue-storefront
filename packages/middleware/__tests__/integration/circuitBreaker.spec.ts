import request from "supertest";
import type { Server } from "http";
import { randomUUID } from "crypto";
import { createServer } from "../../src/index";

const VOLUME_THRESHOLD = 7;
const ERROR_THRESHOLD_PERCENTAGE = 50;
const RESET_TIMEOUT = 5000;

class Service {
  isRunning = false;

  start() {
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }

  async call() {
    if (!this.isRunning) {
      throw new Error("Service is not running you fool");
    }
    return "Service is running";
  }
}

const serviceUnavailable = new Service();
const serviceAvailable = new Service();

const callSpyUnavailable = jest.spyOn(serviceUnavailable, "call");
const callSpyAvailable = jest.spyOn(serviceAvailable, "call");

describe("[Integration] Circuit breaker", () => {
  let app: Server;

  beforeEach(async () => {
    callSpyUnavailable.mockClear();
    callSpyAvailable.mockClear();

    app = await createServer({
      integrations: {
        test_integration: {
          configuration: {
            circuitBreaker: {
              runId: randomUUID(),
              volumeThreshold: VOLUME_THRESHOLD,
              errorThresholdPercentage: ERROR_THRESHOLD_PERCENTAGE,
              resetTimeout: RESET_TIMEOUT,
            },
          },
          location: "./__tests__/integration/bootstrap/circuitBreaker",
          extensions: (extensions) => [
            ...extensions,
            {
              name: "unavailable",
              isNamespaced: true,
              extendApiMethods: {
                callService: async () => {
                  const response = await serviceUnavailable.call();
                  return response;
                },
              },
            },
            {
              name: "available",
              isNamespaced: true,
              extendApiMethods: {
                callService: async () => {
                  const response = await serviceAvailable.call();
                  return response;
                },
              },
            },
          ],
        },
      },
    });
  });

  it("allows `volumeThreshold` requests before breaking the circuit", async () => {
    serviceUnavailable.stop();

    for (let i = 0; i < 10; i++) {
      await request(app).post("/test_integration/unavailable/callService");
    }

    expect(callSpyUnavailable).toHaveBeenCalledTimes(VOLUME_THRESHOLD);
  });

  it("breaks the circuit after reaching the `errorThresholdPercentage`", async () => {
    serviceUnavailable.start();

    const successfulRequests = 10;
    const failureRequests = 20;

    // Perform successful requests
    for (let i = 0; i < successfulRequests; i++) {
      await request(app).post("/test_integration/unavailable/callService");
    }

    // Stop the service to simulate failures
    serviceUnavailable.stop();

    // Perform failing requests
    for (let i = 0; i < failureRequests; i++) {
      await request(app).post("/test_integration/unavailable/callService");
    }

    // Calculate the expected call count
    const errorThresholdRequests = Math.ceil(
      (ERROR_THRESHOLD_PERCENTAGE / 100) * successfulRequests * 2 + 1
    );

    // The circuit should allow the first X (error threshold) failed requests before opening
    const expectedTotalCalls = successfulRequests + errorThresholdRequests;

    // Assert that the circuit opened after the threshold
    expect(callSpyUnavailable).toHaveBeenCalledTimes(expectedTotalCalls);
  });

  it("breaks request circuit for one endpoint without breaking it for another", async () => {
    serviceAvailable.start();
    serviceUnavailable.stop();

    for (let i = 0; i < 10; i++) {
      await request(app).post("/test_integration/unavailable/callService");
    }

    for (let i = 0; i < 10; i++) {
      await request(app).post("/test_integration/available/callService");
    }

    expect(callSpyUnavailable).toHaveBeenCalledTimes(VOLUME_THRESHOLD);
    expect(callSpyAvailable).toHaveBeenCalledTimes(10);
  });

  it(
    "reopens circuit after `resetTimeout`",
    async () => {
      serviceUnavailable.stop();

      for (let i = 0; i < 10; i++) {
        await request(app).post("/test_integration/unavailable/callService");
      }

      await wait(RESET_TIMEOUT + 1000);

      serviceUnavailable.start();

      for (let i = 0; i < 10; i++) {
        await request(app).post("/test_integration/unavailable/callService");
      }

      expect(callSpyUnavailable).toHaveBeenCalledTimes(VOLUME_THRESHOLD + 10);
    },
    RESET_TIMEOUT + 5000
  );
});

async function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
