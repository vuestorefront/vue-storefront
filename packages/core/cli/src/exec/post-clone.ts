import * as path from 'path';
import { fileFolderExists } from '../helpers/file-folder-exists';

export const postClone = async ({
  dir,
  dryRun = false
}: {
  dir: string;
  dryRun: boolean;
}) => {
  const hasPostClone = !dryRun ? fileFolderExists(path.join(dir, 'postClone.js')) : dryRun;
};
