/* istanbul ignore file */

const defaultLogger = {
  debug: (message: any, ...args) => console.debug('[VSF][debug]', message, ...args),
  info: (message: any, ...args) => console.info('[VSF][info]', message, ...args),
  warn: (message: any, ...args) => console.warn('[VSF][warn]', message, ...args),
  error: (message: any, ...args) => console.error('[VSF][error]', message, ...args)
};

export default defaultLogger;
