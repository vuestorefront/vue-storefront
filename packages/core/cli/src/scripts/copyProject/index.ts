import path from 'path';
import { copyFile } from '@vue-storefront/nuxt-theme/scripts/copyThemeFiles';
import getAllFilesFromDir from '@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir.js';
import fs from 'fs';
import { buildFileTargetPath } from '../../utils/helpers';
import updatePackageJson from '../createProject/updatePackageJson';

const getProjectDirectoryName = (targetPath: string): string => targetPath.split('/').pop();

const copyThemeFiles = (filesDir: string, targetPath: string, chopPhrase: string) => {
  if (fs.statSync(filesDir).isDirectory()) {
    return Promise.all(getAllFilesFromDir(filesDir).map(
      file => copyFile(file, buildFileTargetPath(file, targetPath, chopPhrase))
    ));
  }

  return copyFile(filesDir, buildFileTargetPath(filesDir, targetPath, chopPhrase));
};

const copyProjectScript = async (integration: string, targetPath: string) => {
  await copyThemeFiles(
    path.resolve(`./templates/${integration}`),
    path.isAbsolute(targetPath)
      ? targetPath
      : path.join(__dirname, targetPath),
    path.resolve(`./templates/${integration}`)
  );

  const absoluteTargetPath = path.isAbsolute(targetPath)
    ? targetPath
    : path.join(__dirname, targetPath);

  const packageJsonPath = path.join(absoluteTargetPath, 'package.json');
  await updatePackageJson(packageJsonPath, getProjectDirectoryName(targetPath));
};

export default copyProjectScript;
