import path from 'path';
import { copyThemeFiles, getDependencyPath } from '../../utils/helpers';
import fs from 'fs';

export default async (integration: string, targetPath: string, omitFiles: Array<string> = []): Promise<void> => {
  const integrationThemePath = getDependencyPath(`${integration}-theme`);
  const integrationThemeFiles = fs.readdirSync(integrationThemePath)
    .filter(fileName => !omitFiles.includes(fileName))
    .map(directory => path.join(integrationThemePath, directory));

  await Promise.all(
    integrationThemeFiles.map(
      integrationThemeFile => copyThemeFiles(
        integrationThemeFile,
        path.isAbsolute(targetPath)
          ? targetPath
          : path.join(__dirname, targetPath),
        integrationThemePath
      )
    )
  );
};
