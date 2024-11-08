import type { LogObject } from "consola";

export const jsonReporter = (logObject: LogObject) => {
  const defLogType = "log";
  const logType = logObject?.type ?? defLogType;
  const logFn = console[logType] ?? console[defLogType];

  if (process.env.NODE_ENV === "development" || typeof window !== "undefined") {
    logFn(logObject.args[0].structuredLog);
  } else {
    logFn(JSON.stringify(logObject.args[0].structuredLog));
  }
};
