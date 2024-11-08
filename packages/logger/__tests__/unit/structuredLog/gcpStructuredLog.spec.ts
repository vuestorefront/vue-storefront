import { Metadata } from "../../../src/interfaces/LoggerInterface";
import { LogVerbosity } from "../../../src/interfaces/LogVerbosity";
import { GCPStructuredLog } from "../../../src/structuredLog/GCPStructuredLog";

// We do not want to serialize the log payload at this point
process.env.NODE_ENV = "development";

describe("GCPStructuredLog", () => {
  it.each([
    {
      id: "1",
      logData: "test message",
      options: {},
      severity: "alert",
      metadata: {
        alokai: "test",
      },
      expected: {
        message: "test message",
        severity: "ALERT",
        timestamp: expect.any(String),
        alokai: "test",
      },
    },
    {
      id: "2",
      logData: "test message",
      options: { includeStackTrace: true },
      severity: undefined,
      metadata: {
        alokai: "test",
      },
      expected: {
        message: "test message",
        severity: "DEFAULT",
        timestamp: expect.any(String),
        alokai: "test",
      },
    },
    {
      id: "3",
      logData: new Error("test error"),
      options: { includeStackTrace: true },
      severity: undefined,
      expected: {
        message: "test error",
        severity: "DEFAULT",
        timestamp: expect.any(String),
        stackTrace: expect.any(String),
      },
    },
    {
      id: "4",
      logData: "another test message",
      options: { includeStackTrace: false },
      severity: "info",
      metadata: {
        alokai: "test",
      },
      expected: {
        message: "another test message",
        severity: "INFO",
        timestamp: expect.any(String),
        alokai: "test",
      },
    },
    {
      id: "5",
      logData: "test message with options",
      options: { includeStackTrace: false },
      severity: "debug",
      expected: {
        message: "test message with options",
        severity: "DEBUG",
        timestamp: expect.any(String),
      },
    },
    {
      id: "6",
      logData: new Error("another test error"),
      options: { includeStackTrace: true },
      severity: "error",
      metadata: {
        alokai: "test",
      },
      expected: {
        message: "another test error",
        severity: "ERROR",
        timestamp: expect.any(String),
        stackTrace: expect.any(String),
        alokai: "test",
      },
    },
    {
      id: "7",
      logData: new Error("another test error"),
      options: { includeStackTrace: true },
      severity: "error",
      metadata: {
        alokai: "test",
      },
      expected: {
        message: "another test error",
        severity: "ERROR",
        timestamp: expect.any(String),
        stackTrace: expect.any(String),
        alokai: "test",
      },
    },
    {
      id: "8",
      logData: "test message with options",
      options: { includeStackTrace: false },
      severity: "debug",
      expected: {
        message: "test message with options",
        severity: "DEBUG",
        timestamp: expect.any(String),
      },
    },
    {
      id: "9: with metadata",
      logData: "message",
      options: { includeStackTrace: false },
      severity: "info",
      metadata: {
        labels: "other-label",
      },
      expected: {
        message: "message",
        severity: "INFO",
        timestamp: expect.any(String),
        labels: "other-label",
      },
    },
    {
      id: "10:with ansi codes",
      logData:
        "\x1b[90m(/var/www/apps/storefront-unified-nextjs/\x1b[39m.next/server/chunks/689.js:67:9\x1b[90m)\x1b[39m",
      options: { includeStackTrace: false },
      severity: "info",
      metadata: {
        labels: "other-label",
      },
      expected: {
        message:
          "(/var/www/apps/storefront-unified-nextjs/.next/server/chunks/689.js:67:9)",
        severity: "INFO",
        timestamp: expect.any(String),
        labels: "other-label",
      },
    },
  ])(
    "should create a GCP structured log: #ID $id",
    ({ logData, expected, options, severity, metadata }) => {
      const log = new GCPStructuredLog();
      const gcpStructuredLog = log.createLog(
        logData,
        options,
        severity as LogVerbosity,
        metadata as unknown as Metadata
      );
      expect(gcpStructuredLog).toEqual(expected);
    }
  );
});
