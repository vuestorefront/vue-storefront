
import { registerLogger, Logger } from '../../src/utils/logger';

const testLogger = {
  debug: () => 'debug',
  info: () => 'info',
  warn: () => 'warn',
  error: () => 'error'
};

describe('[CORE - utils] registerLogger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('registers logger with info verbosity', () => {
    registerLogger(testLogger, 'info');

    expect(Logger.info()).toEqual('info');
    expect(Logger.warn()).toEqual('warn');
    expect(Logger.error()).toEqual('error');
    expect(Logger.debug()).toEqual(undefined);
  });

  it('registers logger with debug verbosity', () => {
    registerLogger(testLogger, 'debug');

    expect(Logger.info()).toEqual('info');
    expect(Logger.warn()).toEqual('warn');
    expect(Logger.error()).toEqual('error');
    expect(Logger.debug()).toEqual('debug');
  });

  it('registers logger with warn verbosity', () => {
    registerLogger(testLogger, 'warn');

    expect(Logger.info()).toEqual(undefined);
    expect(Logger.warn()).toEqual('warn');
    expect(Logger.error()).toEqual('error');
    expect(Logger.debug()).toEqual(undefined);
  });

  it('registers logger with error verbosity', () => {
    registerLogger(testLogger, 'error');

    expect(Logger.info()).toEqual(undefined);
    expect(Logger.warn()).toEqual(undefined);
    expect(Logger.error()).toEqual('error');
    expect(Logger.debug()).toEqual(undefined);
  });

  it('registers logger with none verbosity', () => {
    registerLogger(testLogger, 'none');

    expect(Logger.info()).toEqual(undefined);
    expect(Logger.warn()).toEqual(undefined);
    expect(Logger.error()).toEqual(undefined);
    expect(Logger.debug()).toEqual(undefined);
  });
});
