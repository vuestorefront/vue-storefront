import {
  isEmptyObject,
  isInvalidConfig,
} from "../../../modules/loggerModule/utils";
import type { LoggerInterface } from "../../../modules/loggerModule/types";

describe("loggerModule utils", () => {
  it("should verify if object is empty", () => {
    expect(isEmptyObject()).toBe(true);
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject({ foo: "bar" })).toBe(false);
  });

  it("should verify if config is invalid", () => {
    expect(isInvalidConfig()).toBe(false);
    expect(isInvalidConfig({})).toBe(false);
    expect(isInvalidConfig({ foo: "bar" })).toBe(false);
    expect(isInvalidConfig({ handler: {} as LoggerInterface })).toBe(false);
    expect(
      isInvalidConfig({
        handler: {} as unknown as LoggerInterface,
        foo: "bar",
      })
    ).toBe(true);
  });
});
