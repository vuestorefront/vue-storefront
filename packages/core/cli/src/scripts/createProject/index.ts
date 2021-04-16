import path from 'path';
const shell = require('shelljs');
import log from '../../utils/log';
import processMagicComments from './processMagicComments';
import * as process from 'process';
import * as fs from 'fs';
const rimraf = require('rimraf');

interface ICreateProjectProps {
  integration: string;
  targetPath: string;
  repositoryLink: string;
}

async function createProject({
  integration,
  targetPath,
  repositoryLink
}: ICreateProjectProps): Promise<void> {
  const templatePath = path.join(targetPath, integration);
  console.log(templatePath);
  if (fs.existsSync(templatePath)) {
    try {
      rimraf.sync(templatePath);
    } catch (e) {
      log.error('Unable to remove old template');
      return;
    }
  }
  try {
    await shell.exec(`git clone ${repositoryLink} ${templatePath}`);
  } catch (error) {
    log.error('Unable to get integration template from git repository');
    return;
  }

  log.info('Updating Nuxt config');
  try {
    const absoluteTargetPath = path.isAbsolute(templatePath)
      ? templatePath
      : path.join(__dirname, templatePath);
    const nuxtConfigPath = path.join(absoluteTargetPath, 'nuxt.config.js');
    await processMagicComments(nuxtConfigPath);
  } catch (error) {
    log.error('No nuxt.config.js has been found in integration template');
    process.exit(1);
  }
}

export default createProject;
