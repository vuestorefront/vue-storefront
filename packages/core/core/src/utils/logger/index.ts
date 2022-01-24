import {
  Consola,
  ConsolaOptions,
  LogLevel
} from 'consola';
import { VSFLogger } from './../../types';

const defaultModes = {
  // Test
  test: LogLevel.Error,

  // Production
  prod: LogLevel.Error,
  production: LogLevel.Error,

  // Development
  dev: LogLevel.Warn,
  development: LogLevel.Warn,

  // Fallback
  default: LogLevel.Warn
};

let Logger = registerLogger();

type LoggerImplementation = VSFLogger | ((options) => VSFLogger);

function registerLogger(
  options?: ConsolaOptions,
  customLogger?: LoggerImplementation
) {
  if (typeof customLogger === 'function') {
    return customLogger(options);
  }

  options ??= {
    level: defaultModes[process.env.NODE_ENV] || defaultModes.default
  };

  return Logger = new Consola(options);
}

export {
  Logger,
  registerLogger
};
