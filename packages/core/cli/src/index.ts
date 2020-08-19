import log from './utils/log';

export const cli = async (args) => {
  const [command] = args.slice(2);
  if (!command) {
    log.error('Provide command');
    return;
  }

  try {
    const commandFn = require(`./commands/${command}.ts`);
    return commandFn.default(args.slice(3));
  } catch (err) {
    log.error('Bad command');
  }
};

cli(process.argv);
