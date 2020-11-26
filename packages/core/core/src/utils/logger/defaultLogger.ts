/* istanbul ignore file */

const defaultLogger = {
  debug: (message: any, ...args) => console.log('[VSF][debug]', message, ...args),
  info: (message: any, ...args) => console.log('[VSF][info]', message, ...args),
  warn: (message: any, ...args) => console.log('[VSF][warn]', message, ...args),
  error: (message: any, ...args) => console.log('[VSF][error]', message, ...args)
};

export default defaultLogger;
