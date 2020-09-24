import { AgnosticLogger } from './../../types';

const defaultImplementation = {
  debug: (message: any, ...args) => console.debug('[VSF][debug]', message, ...args),
  info: (message: any, ...args) => console.info('[VSF][info]', message, ...args),
  warn: (message: any, ...args) => console.warn('[VSF][warn]', message, ...args),
  error: (message: any, ...args) => console.error('[VSF][error]', message, ...args),
  verbosity: 'error'
};

let Logger: AgnosticLogger = defaultImplementation;

const registerLogger = (loggerImplementation: AgnosticLogger) => {
  switch (loggerImplementation.verbosity) {
    case 'info':
      Logger = {
        ...defaultImplementation,
        ...loggerImplementation,
        debug: () => {}
      };
      break;
    case 'warn':
      Logger = {
        ...defaultImplementation,
        ...loggerImplementation,
        info: () => {},
        debug: () => {}
      };
      break;
    case 'error':
      Logger = {
        ...defaultImplementation,
        ...loggerImplementation,
        info: () => {},
        warn: () => {},
        debug: () => {}
      };
      break;
    default:
      Logger = {
        ...defaultImplementation,
        ...loggerImplementation
      };
  }
};

registerLogger(defaultImplementation);

export {
  Logger,
  registerLogger
};
