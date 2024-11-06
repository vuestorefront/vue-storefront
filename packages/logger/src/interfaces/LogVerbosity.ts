/**
 * Based on the syslog levels defined in RFC 5424.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc5424
 */
export type LogVerbosity =
  | "emergency"
  | "alert"
  | "critical"
  | "error"
  | "warning"
  | "notice"
  | "info"
  | "debug";
