import { jsonReporter } from "../../../../src/reporters/consola/jsonReporter";

describe("jsonReporter", () => {
  let consoleSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should log structuredLog directly in development environment", () => {
    process.env.NODE_ENV = "development";
    const logObject: any = {
      type: "log",
      args: [{ structuredLog: { message: "test message" } }],
    };

    jsonReporter(logObject, "development");

    expect(consoleSpy).toHaveBeenCalledWith({ message: "test message" });
  });

  it("should log structuredLog directly in browser environment", () => {
    delete process.env.NODE_ENV;
    (global as any).window = {};

    const logObject: any = {
      type: "log",
      args: [{ structuredLog: { message: "test message" } }],
    };

    jsonReporter(logObject, "development");

    expect(consoleSpy).toHaveBeenCalledWith({ message: "test message" });

    delete (global as any).window;
  });

  it("should log structuredLog as JSON in production environment", () => {
    process.env.NODE_ENV = "production";
    const logObject: any = {
      type: "log",
      args: [{ structuredLog: { message: "test message" } }],
    };

    jsonReporter(logObject, "production");

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({ message: "test message" })
    );
  });

  it("should use default log type if log type is not defined", () => {
    const logObject: any = {
      type: undefined,
      args: [{ structuredLog: { message: "test message" } }],
    };

    jsonReporter(logObject);

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({ message: "test message" })
    );
  });

  it("should use default log type if console does not support the log type", () => {
    const logObject: any = {
      type: "unsupportedType",
      args: [{ structuredLog: { message: "test message" } }],
    };

    jsonReporter(logObject);

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify({ message: "test message" })
    );
  });

  it("should use warn log type if log type is warn", () => {
    const logObject: any = {
      type: "warn",
      args: [{ structuredLog: { message: "test message" } }],
    };

    jsonReporter(logObject);

    expect(warnSpy).toHaveBeenCalledWith(
      JSON.stringify({ message: "test message" })
    );
  });
});
