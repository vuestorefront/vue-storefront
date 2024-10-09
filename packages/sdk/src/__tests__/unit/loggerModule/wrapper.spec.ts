import { wrapLogger } from "../../../modules/loggerModule/wrapper";
import type { LoggerInterface } from "../../../modules/loggerModule/types";

describe("loggerModule wrapper", () => {
  it("should return wrapped logger", () => {
    const mock = jest.fn();
    const logger = { info: mock } as unknown as LoggerInterface;
    const wrappedLogger = wrapLogger(logger, { foo: "bar" });

    wrappedLogger.info("test message");

    expect(mock).toHaveBeenCalledWith("test message", { foo: "bar" });
  });
});
