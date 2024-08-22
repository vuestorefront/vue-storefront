import { LoggerFactory } from "../../src/LoggerFactory";

describe("LoggerFactory try to create type '$type'", () => {
  // We can add more in the future
  it.each([
    {
      type: "consola-structured",
      expected: "ConsolaStructuredLogger",
    },
  ])("should create a $type logger", ({ type, expected }) => {
    const result = LoggerFactory.create(type as any);

    expect(result.constructor.name).toBe(expected);
  });

  it(`should throw an error for unknown logger type`, () => {
    const unknownLoggerType = "some-unknown-logger";
    expect(() =>
      LoggerFactory.create(unknownLoggerType as any, {})
    ).toThrowError(`Logger type ${unknownLoggerType} is not supported`);
  });
});
