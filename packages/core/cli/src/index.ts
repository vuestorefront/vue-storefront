#!/usr/bin/env node
import log from './utils/log';

export const cli = async (args) => {
  const [command] = args.slice(2);
  if (!command) {
    log.error('Provide command');
    return;
  }

  try {
    const commandFn = require(`./commands/${command}.js`);
    return commandFn.default(args.slice(3));
  } catch (err) {
    log.error('Bad command');
  }
};

cli(process.argv);
