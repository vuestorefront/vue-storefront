import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
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
    await git.clone({
      fs,
      http,
      dir: templatePath,
      url: repositoryLink,
      singleBranch: true,
      depth: 1
    });
    removeFolder(templatePath, '.git');
    log.success('Project template initialized successfully. ');
    log.info('Check out https://docs.vuestorefront.io/v2');
  } catch (error) {
    log.error('Unable to get integration template from git repository');
  }
}

export default createProject;
