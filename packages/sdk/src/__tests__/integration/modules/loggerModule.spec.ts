import { LoggerFactory } from "@vue-storefront/logger";
import { buildModule } from "../../../modules/buildModule";
import { initSDK } from "../../../bootstrap";
import { loggerModule } from "../../../modules/loggerModule";
import type { LoggerInterface } from "../../../modules/loggerModule/types";

describe("loggerModule", () => {
  it("should be able to be used as standard SDK module", async () => {
    const sdkConfig = { logger: buildModule(loggerModule) };
    const sdk = initSDK(sdkConfig);

    expect(sdk.logger).toBeDefined();
  });

  it.each([
    "emergency",
    "alert",
    "critical",
    "error",
    "warning",
    "notice",
    "info",
    "debug",
  ])(
    "should have a function '%s' available within the logger",
    (functionName) => {
      const sdkConfig = { logger: buildModule(loggerModule) };
      const sdk = initSDK(sdkConfig);

      expect(
        sdk.logger[functionName as keyof typeof sdk.logger]
      ).toBeInstanceOf(Function);
    }
  );

  it("should return a proper module", async () => {
    const module = loggerModule();

    expect(module.connector).toBeDefined();
  });

  it("should be able to pass custom handler", async () => {
    const mock = jest.fn();
    const handler = { info: mock } as unknown as LoggerInterface;
    const sdkConfig = {
      logger: buildModule(loggerModule, {
        handler,
      }),
    };
    const sdk = initSDK(sdkConfig);

    await sdk.logger.info("foo");

    expect(mock).toHaveBeenCalled();
  });

  it("should created default logger when no custom handler is passed", async () => {
    const createSpy = jest.spyOn(LoggerFactory, "create");
    const sdkConfig = { logger: buildModule(loggerModule) };

    initSDK(sdkConfig);

    expect(createSpy).toHaveBeenCalled();
  });

  it("should warn about wrong configuration", async () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    loggerModule({
      handler: {} as unknown as LoggerInterface,
      foo: "bar",
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockReset();
  });
});
