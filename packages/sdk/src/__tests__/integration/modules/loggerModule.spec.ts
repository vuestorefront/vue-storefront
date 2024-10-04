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
});
