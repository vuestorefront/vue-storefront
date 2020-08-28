import path from 'path';
import { copyFile } from '@vue-storefront/nuxt-theme/scripts/copyThemeFiles';
import getAllFilesFromDir from '@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir.js';
import fs from 'fs';

export const buildFileTargetPath = (file: string, targetPath: string, chopPhrase: string): string => targetPath + (file.replace(chopPhrase, ''));
export const getThemePath = (themeName: string): string => path.resolve(__dirname, `../../node_modules/@vue-storefront/${themeName}`);
export const getProjectDirectoryName = (targetPath: string): string => targetPath.split('/').pop();
export const copyThemeFiles = (filesDir: string, targetPath: string, chopPhrase: string) => {
  if (fs.statSync(filesDir).isDirectory()) {
    return Promise.all(getAllFilesFromDir(filesDir).map(
      file => copyFile(file, buildFileTargetPath(file, targetPath, chopPhrase))
    ));
  }

  return copyFile(filesDir, buildFileTargetPath(filesDir, targetPath, chopPhrase));
};
