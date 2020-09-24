const logger = (verbosity) => {

  return {
    debug: (message, ...args) => console.debug('[CUSTOM][debug]', message, ...args, { verbosity }),
    info: (message, ...args) => console.info('[CUSTOM][info]', message, ...args, { verbosity }),
    warn: (message, ...args) => console.warn('[CUSTOM][warn]', message, ...args, { verbosity }),
    error: (message, ...args) => console.error('[CUSTOM][error]', message, ...args, { verbosity })
  };
};

const debug = (m) => console.log('DEBUGGG', m);

export { logger, debug };
