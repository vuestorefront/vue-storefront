import { buildModule } from "../../../modules/buildModule";
import { initSDK } from "../../../bootstrap";
import { loggerModule } from "../../../modules/loggerModule";

describe("loggerModule", () => {
  it("should be able to be used as standard SDK module", async () => {
    const sdkConfig = { logger: buildModule(loggerModule) };

    const sdk = initSDK(sdkConfig);

    expect(sdk.logger).toBeDefined();
  });

  it.each([
    "log",
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
    const customLogger = {
      log: mock,
      emergency: mock,
      alert: mock,
      critical: mock,
      error: mock,
      warning: mock,
      notice: mock,
      info: mock,
      debug: mock,
    };
    const sdkConfig = {
      logger: buildModule(loggerModule, {
        handler: customLogger,
      }),
    };

    const sdk = initSDK(sdkConfig);

    await sdk.logger.info("foo");

    expect(mock).toHaveBeenCalled();
  });
});
