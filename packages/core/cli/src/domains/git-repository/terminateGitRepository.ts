
import * as fs from 'fs/promises';
import * as path from 'path';

/** Terminates git repository by removing its '.git' folder. */
const terminateGitRepository = async (projectDir: string): Promise<void> => {
  await fs.rm(path.join(projectDir, '.git'), {
    force: true,
    recursive: true
  });
};

export default terminateGitRepository;
