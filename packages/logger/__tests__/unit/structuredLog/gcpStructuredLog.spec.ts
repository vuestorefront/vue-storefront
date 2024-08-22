import { LogLevel } from "../../../src/interfaces/LogLevel";
import { GCPStructuredLog } from "../../../src/structuredLog/GCPStructuredLog";

describe("GCPStructuredLog", () => {
  it.each([
    {
      logData: "test message",
      options: {},
      severity: LogLevel.Alert,
      expected: {
        message: "test message",
        severity: "ALERT",
        timestamp: expect.any(String),
        trace: undefined,
      },
    },
    {
      logData: { message: "test message" },
      options: { includeStackTrace: true },
      severity: undefined,
      expected: {
        message: '{"message":"test message"}',
        severity: "DEFAULT",
        timestamp: expect.any(String),
        trace: undefined,
      },
    },
    {
      logData: new Error("test error"),
      options: { includeStackTrace: true },
      severity: undefined,
      expected: {
        message: "test error",
        severity: "DEFAULT",
        timestamp: expect.any(String),
        trace: expect.any(String),
      },
    },
    {
      logData: "another test message",
      options: { includeStackTrace: false },
      severity: LogLevel.Info,
      expected: {
        message: "another test message",
        severity: "INFO",
        timestamp: expect.any(String),
        trace: undefined,
      },
    },
    {
      logData: { message: "test message with options" },
      options: { includeStackTrace: false },
      severity: LogLevel.Debug,
      expected: {
        message: '{"message":"test message with options"}',
        severity: "DEBUG",
        timestamp: expect.any(String),
        trace: undefined,
      },
    },
    {
      logData: new Error("another test error"),
      options: { includeStackTrace: true },
      severity: LogLevel.Error,
      expected: {
        message: "another test error",
        severity: "ERROR",
        timestamp: expect.any(String),
        trace: expect.any(String),
      },
    },
  ])(
    "should create a GCP structured log",
    ({ logData, expected, options, severity }) => {
      const log = new GCPStructuredLog();
      const gcpStructuredLog = log.createLog(logData, options, severity as any);
      expect(gcpStructuredLog).toEqual(expected);
    }
  );
});
