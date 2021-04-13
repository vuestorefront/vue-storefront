import path from 'path';
const shell = require('shelljs');
import log from '../../utils/log';
import processMagicComments from './processMagicComments';
import getIntegrations from '../../utils/getIntegrations';

async function createProject(
  integration: string,
  targetPath: string
): Promise<void> {
  const templatePath = `${targetPath}/${integration}`;
  shell.rm('-rf', templatePath);
  shell.mkdir('-p', targetPath);
  shell.cd(targetPath);
  await shell.exec(
    `git clone ${getIntegrations()[integration]} ${integration}`
  );

  log.info('Updating Nuxt config');
  const absoluteTargetPath = path.isAbsolute(templatePath)
    ? templatePath
    : path.join(__dirname, templatePath);
  const nuxtConfigPath = path.join(absoluteTargetPath, 'nuxt.config.js');
  await processMagicComments(nuxtConfigPath);
}

export default createProject;
