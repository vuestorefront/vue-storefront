import path from 'path';
const shell = require('shelljs');
import log from '../../utils/log';
import { removeFolder } from '../../utils/removeFolder';
interface ICreateProjectProps {
  projectName: string;
  targetPath: string;
  repositoryLink: string;
}

async function createProject({
  projectName,
  targetPath,
  repositoryLink
}: ICreateProjectProps): Promise<void> {
  const templatePath = path.join(targetPath, projectName);
  try {
    await shell.exec(`git clone ${repositoryLink} ${templatePath}`);
    removeFolder(templatePath, '.git');
    log.success('Project template initialized successfully. ');
    log.info('Check out docs.vuestorefront.io/v2');
  } catch (error) {
    log.error('Unable to get integration template from git repository');
  }
}

export default createProject;
