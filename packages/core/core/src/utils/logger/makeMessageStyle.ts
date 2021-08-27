import { LogLevelStyle, LogName } from './types';
import { mountLog } from './utils';

export function makeMessageStyle(logEnum: LogName) {
  switch (logEnum) {
    case LogName.Error:
      return mountLog(
        '[VSF][error]',
        LogLevelStyle.Error
      );
    case LogName.Info:
      return mountLog(
        '[VSF][info]',
        LogLevelStyle.Info
      );
    case LogName.Warn:
      return mountLog(
        '[VSF][warn]',
        LogLevelStyle.Warn
      );
    case LogName.Debug:
      return mountLog(
        '[VSF][debug]',
        LogLevelStyle.Log
      );
    case LogName.None:
    default:
      return mountLog(
        '[VSF]',
        LogLevelStyle.Log
      );
  }
}
