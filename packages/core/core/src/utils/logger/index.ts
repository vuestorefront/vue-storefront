import { VSFLogger } from './../../types';
import defaultLogger from './defaultLogger';

let Logger: VSFLogger = defaultLogger;

const registerLogger = (loggerImplementation: VSFLogger, verbosity: string) => {
  switch (verbosity) {
    case 'info':
      Logger = {
        ...defaultLogger,
        ...loggerImplementation,
        debug: () => {}
      };
      break;
    case 'warn':
      Logger = {
        ...defaultLogger,
        ...loggerImplementation,
        info: () => {},
        debug: () => {}
      };
      break;
    case 'error':
      Logger = {
        ...defaultLogger,
        ...loggerImplementation,
        info: () => {},
        warn: () => {},
        debug: () => {}
      };
      break;
    case 'none':
      Logger = {
        debug: () => {},
        info: () => {},
        warn: () => {},
        error: () => {}
      };
      break;
    default:
      Logger = {
        ...defaultLogger,
        ...loggerImplementation
      };
  }
};

registerLogger(defaultLogger, 'error');

export {
  Logger,
  registerLogger
};
