/**
 * Formats the severity level of a log message with ANSI escape codes for color.
 *
 * @param {String} severity - The severity level of the log message.
 * @returns {String} - The formatted severity level with ANSI escape codes for color.
 */
const getSeverityLog = (severity: string): string => {
  switch (severity) {
    case "INFO":
    case "info":
      return "\x1b[30;104mINFO\x1b[0m"; // Blue background
    case "ERROR":
    case "error":
      return "\x1b[41mERROR\x1b[0m"; // Red background
    case "EMERGENCY":
    case "emergency":
      return "\x1b[45mEMERGENCY\x1b[0m"; // Magenta background
    case "ALERT":
    case "alert":
      return "\x1b[45mALERT\x1b[0m"; // Magenta background
    case "CRITICAL":
    case "critical":
      return "\x1b[45mCRITICAL\x1b[0m"; // Magenta background
    case "WARNING":
    case "warning":
      return "\x1b[48;5;208mWARNING\x1b[0m"; // Yellow background
    case "NOTICE":
    case "notice":
      return "\x1b[30;104mNOTICE\x1b[0m"; // Blue background
    case "DEBUG":
    case "debug":
      return "\x1b[40mDEBUG\x1b[0m"; // Black background
    default:
      return severity; // Return the severity as is if it doesn't match any case
  }
};

// Prettier and linter were disabled due to the way the code is formatted / printed within the console.
// eslint-disable-file no-console
// prettier-ignore
/**
 * Formats and logs the logObject in a prettier way based on the mode.
 *
 * @param {Object} logObject - The log object to be formatted and logged.
 * @param {Function} logFn - The logging function to use.
 * @param {String} mode - The mode in which the log is being generated. Defaults to "server".
 */
export const jsonReporterPrettier = (logObject: Record<any, any>, logFn: Function, mode: string = "server") => {
  if (!logObject || mode !== "server") {
    logFn(`Alokai Log unavailable in ${mode} mode`);
    return;
  }

  const { timestamp, severity, message, alokai, metadata, troubleshooting } = logObject;
  const severityLog = getSeverityLog(severity);
  const isSSR = typeof globalThis.window === "undefined";

  if (isSSR && alokai?.context === "middleware") {
    logFn(`\x1b[90m:: Alokai Log: Middleware ::\x1b[0m

🔥 Severity: ${severityLog}
🕓 Timestamp: \x1b[93m${new Date(timestamp).toLocaleString()}\x1b[0m (${timestamp})
💬 Message: ${message}
`);
    if (troubleshooting) {
      logFn(`🛠️ Troubleshooting: ${troubleshooting.message}
🚶 Steps to follow:
${troubleshooting.steps.map((step) => `➡️ ${step}`).join("\n")}
`);
    }
    if (alokai.context) {
      logFn(`🛍️ Alokai Context: ${alokai.context}`);
    }
    if (metadata) {
      logFn(`📁 Metadata: ${JSON.stringify(metadata)}`);
    }
    logFn(``);
  } else if (isSSR && alokai?.context === "storefront") {
    console.log(`\x1b[90m:: Alokai Log: Storefront ::\x1b[0m

🔥 Severity: ${severityLog}
🕓 Timestamp: \x1b[93m${new Date(timestamp).toLocaleString()}\x1b[0m (${timestamp})
💬 Message: ${message}

${troubleshooting ? `🛠️ Troubleshooting: ${troubleshooting.message}\n🚶 Steps to follow:\n${troubleshooting.steps.map((step) => `➡️ ${step}`).join("\n")}` : ""}

${alokai?.context ? `🛍️ Alokai Context: ${alokai.context}` : ""}
${metadata ? `📁 Metadata: ${JSON.stringify(metadata)}` : ""}
`);
  } else {
    console.log(`Alokai Log ($raw): ${JSON.stringify(logObject)}`);
  }
};
