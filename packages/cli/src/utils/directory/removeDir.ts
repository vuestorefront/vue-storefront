import {promisify} from 'util';
import rimraf from 'rimraf';
import path from 'path';

const removeFileOrDirectory = promisify(rimraf);

export const removeDir = (projectDir: string, dirName: string): Promise<void> => {
  return removeFileOrDirectory(path.join(projectDir, dirName));

};
