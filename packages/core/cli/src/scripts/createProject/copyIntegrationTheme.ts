import * as path from 'path';
import { getThemePath, buildFileTargetPath } from '@vue-storefront/cli/src/utils/helpers';
import * as fs from 'fs';
import { copyFile } from '@vue-storefront/nuxt-theme/scripts/copyThemeFiles';
import getAllFilesFromDir from '@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir.js';

export default async (integration: string, targetPath: string, omitFiles: Array<string> = []): Promise<void> => {
  const copyThemeFiles = (filesDir: string, targetPath: string, chopPhrase: string) => {
    if (fs.statSync(filesDir).isDirectory()) {
      return Promise.all(getAllFilesFromDir(filesDir).map(
        file => copyFile(file, buildFileTargetPath(file, targetPath, chopPhrase))
      ));
    }
    return copyFile(filesDir, buildFileTargetPath(filesDir, targetPath, chopPhrase));
  };

  const integrationThemePath = getThemePath(`${integration}-theme`);
  const integrationThemeFiles = fs.readdirSync(integrationThemePath)
    .filter(fileName => !omitFiles.includes(fileName))
    .map(directory => path.join(integrationThemePath, directory));

  await Promise.all(
    integrationThemeFiles.map(
      absoluteDirectoryPath => copyThemeFiles(absoluteDirectoryPath, path.join(__dirname, targetPath), integrationThemePath)
    )
  );
};
