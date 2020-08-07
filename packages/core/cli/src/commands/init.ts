import log from '../utils/log';

const program = () => {
  const [projectName] = process.argv.slice(2);
  if (!projectName) {
    log.error('Provide projectName: yarn cli:init <projectName>');
  }
};

program();
