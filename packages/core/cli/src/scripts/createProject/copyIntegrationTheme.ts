import path from 'path';
import { copyThemeFiles, getThemePath } from '../../utils/helpers';
import fs from 'fs';

export default async (integration: string, targetPath: string, omitFiles: Array<string> = []): Promise<void> => {
  const integrationThemePath = getThemePath(`${integration}-theme`);
  const integrationThemeFiles = fs.readdirSync(integrationThemePath)
    .filter(fileName => !omitFiles.includes(fileName))
    .map(directory => path.join(integrationThemePath, directory));

  await Promise.all(
    integrationThemeFiles.map(
      absoluteDirectoryPath => copyThemeFiles(
        absoluteDirectoryPath,
        path.isAbsolute(targetPath)
          ? targetPath
          : path.join(__dirname, targetPath),
        integrationThemePath
      )
    )
  );
};
