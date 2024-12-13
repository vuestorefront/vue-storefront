import type { LogObject } from "consola";
import { jsonReporterPrettier } from "./prettier";

export const jsonReporter = (logObject: LogObject) => {
  const defLogType = "log";
  const logType = logObject?.type ?? defLogType;
  const logFn = console[logType] ?? console[defLogType];

  if (process.env.NODE_ENV === "development") {
    jsonReporterPrettier(logObject.args[0].structuredLog, logFn);
  } else {
    // logFn(JSON.stringify(logObject.args[0].structuredLog));
  }
};
