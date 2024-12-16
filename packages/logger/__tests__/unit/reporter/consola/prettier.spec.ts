import { jsonReporterPrettier } from "../../../../src/reporters/consola/prettier";

describe("jsonReporterPrettier", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    delete (global as any).window;
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.resetModules();
  });

  it("should format middleware logs correctly in SSR mode", () => {
    const mockLogFn = jest.fn();
    const logObject = {
      timestamp: "2024-03-14T12:00:00Z",
      severity: "INFO",
      message: "Test message",
      alokai: {
        context: "middleware",
      },
      metadata: { key: "value" },
      troubleshooting: {
        message: "Troubleshooting message",
        steps: ["Step 1", "Step 2"],
      },
    };

    jsonReporterPrettier(logObject, mockLogFn, "server");

    expect(mockLogFn).toHaveBeenCalledTimes(5);
    expect(mockLogFn.mock.calls[0][0]).toContain(
      ":: Alokai Log: Middleware ::"
    );
    expect(mockLogFn.mock.calls[0][0]).toContain("Test message");
    expect(mockLogFn.mock.calls[1][0]).toContain("Troubleshooting message");
    expect(mockLogFn.mock.calls[2][0]).toContain("Alokai Context: middleware");
  });

  it("should format storefront logs correctly in SSR mode", () => {
    const logObject = {
      timestamp: "2024-03-14T12:00:00Z",
      severity: "ERROR",
      message: "Test storefront message",
      alokai: {
        context: "storefront",
      },
      metadata: { key: "value" },
      troubleshooting: {
        message: "Troubleshooting message",
        steps: ["Step 1", "Step 2"],
      },
    };

    jsonReporterPrettier(logObject, console.log, "server");

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(":: Alokai Log: Storefront ::")
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Test storefront message")
    );
  });

  it("should output raw JSON when context is neither middleware nor storefront", () => {
    const logObject = {
      timestamp: "2024-03-14T12:00:00Z",
      severity: "WARNING",
      message: "Test message",
      alokai: {
        context: "other",
      },
    };

    jsonReporterPrettier(logObject, console.log, "server");

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Alokai Log ($raw):")
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(JSON.stringify(logObject))
    );
  });

  it("should handle different severity levels with correct colors", () => {
    const mockLogFn = jest.fn();
    const severities = [
      "INFO",
      "ERROR",
      "WARNING",
      "DEBUG",
      "NOTICE",
      "EMERGENCY",
      "ALERT",
      "CRITICAL",
    ];

    severities.forEach((severity) => {
      const logObject = {
        timestamp: "2024-03-14T12:00:00Z",
        severity,
        message: "Test message",
        alokai: {
          context: "middleware",
        },
      };

      jsonReporterPrettier(logObject, mockLogFn, "server");
      expect(mockLogFn).toHaveBeenCalledWith(expect.stringContaining(severity));
    });
  });

  it("should not format logs when mode is not server", () => {
    const mockLogFn = jest.fn();
    const logObject = {
      timestamp: "2024-03-14T12:00:00Z",
      severity: "INFO",
      message: "Test message",
    };

    jsonReporterPrettier(logObject, mockLogFn, "client");

    expect(mockLogFn).toHaveBeenCalled();
    const calls = mockLogFn.mock.calls.flat().join("\n");
    expect(calls).toContain("Alokai Log unavailable in client mode");
  });

  it("should handle missing optional fields gracefully", () => {
    const mockLogFn = jest.fn();
    const logObject = {
      timestamp: "2024-03-14T12:00:00Z",
      severity: "INFO",
      message: "Test message",
      alokai: {
        context: "middleware",
      },
      // No metadata or troubleshooting
    };

    jsonReporterPrettier(logObject, mockLogFn, "server");

    expect(mockLogFn).toHaveBeenCalled();
    const calls = mockLogFn.mock.calls.flat().join("\n");
    expect(calls).not.toContain("Troubleshooting:");
    expect(calls).not.toContain("Metadata:");
  });

  it("should include emojis in the log output for middleware context", () => {
    const mockLogFn = jest.fn();
    const logObject = {
      timestamp: "2024-03-14T12:00:00Z",
      severity: "INFO",
      message: "Test message",
      alokai: {
        context: "middleware",
      },
    };

    jsonReporterPrettier(logObject, mockLogFn, "server");

    expect(mockLogFn).toHaveBeenCalled();
    const calls = mockLogFn.mock.calls.flat().join("\n");
    expect(calls).toContain("🔥 Severity");
  });
});
