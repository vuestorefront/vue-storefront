export enum Severity {
  DEFAULT = "DEFAULT",
  DEBUG = "DEBUG",
  INFO = "INFO",
  NOTICE = "NOTICE",
  WARNING = "WARNING",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL",
  ALERT = "ALERT",
  EMERGENCY = "EMERGENCY",
}

export interface StructuredLog {
  severity: Severity;
  message: string;
}

export const createLogger = () => ({
  log: (logObj: unknown, severity = Severity.INFO) => {
    if (logObj instanceof Error) {
      const msg = logObj instanceof Error ? logObj.stack : logObj;
      const payload: StructuredLog = { severity, message: msg };
      console.log(JSON.stringify(payload));
    }
  },
});
