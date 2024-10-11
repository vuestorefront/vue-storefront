import { injectMetadata } from "../../../modules/loggerModule/injectMetadata";
import type { LoggerInterface } from "../../../modules/loggerModule/types";

describe("loggerModule injectMetadata", () => {
  it("should return logger with injected metadata", () => {
    const mock = jest.fn();
    const logger = { info: mock } as unknown as LoggerInterface;
    const loggerWithMetadata = injectMetadata(logger, { foo: "bar" });

    loggerWithMetadata.info("test message");

    expect(mock).toHaveBeenCalledWith("test message", { foo: "bar" });
  });
});
