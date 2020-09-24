import { VSFLogger } from './../../types';
import defaultLogger from './defaultLogger';

let Logger: VSFLogger = defaultLogger;

type LoggerImplementation = VSFLogger | ((verbosity: string) => VSFLogger);

const registerLogger = (loggerImplementation: LoggerImplementation, verbosity: string) => {
  if (typeof loggerImplementation === 'function') {
    Logger = loggerImplementation(verbosity);
    return;
  }

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
