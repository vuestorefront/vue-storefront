/**
 * Based on the syslog levels defined in RFC 5424.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc5424
 */
export enum LogLevel {
  Emergency = 0,
  Alert = 1,
  Critical = 2,
  Error = 3,
  Warning = 4,
  Notice = 5,
  Info = 6,
  Debug = 7,
}
