/* istanbul ignore file */

import { makeMethod } from './makeMethod';
import { LogName } from './types';

const defaultLogger = {
  debug: makeMethod(LogName.Debug, console.debug)(),
  info: makeMethod(LogName.Info, console.info)(),
  warn: makeMethod(LogName.Warn, console.warn)(),
  error: makeMethod(LogName.Error, console.error)()
};

export default defaultLogger;
