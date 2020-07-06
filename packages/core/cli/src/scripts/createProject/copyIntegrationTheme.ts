import * as path from 'path';
import { getThemePath, buildFileTargetPath } from '@vue-storefront/cli/src/utils/helpers';
import * as fs from 'fs';
import { copyFile } from '@vue-storefront/nuxt-theme/scripts/copyThemeFiles';
import getAllFilesFromDir from '@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir.js';

export default async (integration: string, targetPath: string, omitFiles: Array<string> = ['.theme', '.nuxt', 'node_modules']): Promise<void> => {
  const copyThemeFiles = (filesDir: string | Array<string>, targetPath: string, chopPhrase: string) => {
    if (typeof filesDir === 'string' && fs.statSync(filesDir).isDirectory()) {
      return Promise.all(getAllFilesFromDir(filesDir as string).map(
        file => copyFile(file, buildFileTargetPath(file, targetPath, chopPhrase))
      ));
    }
    return copyFile(filesDir, buildFileTargetPath(filesDir as string, targetPath, chopPhrase));
  };

  const integrationThemePath = integration.startsWith('/')
    ? integration
    : getThemePath(`${integration}-theme`);
  const absoluteTargetPath = path.join(__dirname, targetPath);

  const integrationThemeFiles = fs.readdirSync(integrationThemePath)
    .filter(fileName => !omitFiles.includes(fileName))
    .map(directory => path.join(integrationThemePath, directory));

  await Promise.all(
    integrationThemeFiles.map(
      absoluteDirectoryPath => copyThemeFiles(absoluteDirectoryPath, absoluteTargetPath, integrationThemePath)
    )
  );
};
