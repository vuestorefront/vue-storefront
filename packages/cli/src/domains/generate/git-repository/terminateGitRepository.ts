import * as path from 'path';
import { removeFileOrDirectory } from '../directory';

/** Terminates git repository by removing its '.git' folder. */
const terminateGitRepository = (projectDir: string): Promise<void> => {
  return removeFileOrDirectory(path.join(projectDir, '.git'));
};

export default terminateGitRepository;
