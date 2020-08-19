import { getThemePath, buildFileTargetPath } from '@vue-storefront/cli/src/utils/helpers';
import getAllFilesFromDir from '@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir';
import compileTemplate from '@vue-storefront/nuxt-theme/scripts/compileTemplate';
import * as path from 'path';
import * as fs from 'fs';

export default async (integration: string, targetPath: string): Promise<void> => {
  const agnosticThemePath = getThemePath('nuxt-theme/theme');
  const agnosticThemeFiles = getAllFilesFromDir(agnosticThemePath).filter(file => !file.includes(path.sep + 'static' + path.sep));

  const compileAgnosticTemplate = (filePath: string, targetPath: string, chopPhrase: string): Promise<void> => {
    const finalPath = buildFileTargetPath(filePath, targetPath, chopPhrase);
    if (fs.existsSync(finalPath)) {
      return;
    }

    return compileTemplate(
      path.join(__dirname, filePath),
      finalPath,
      {
        generate: {
          replace: {
            apiClient: `@vue-storefront/${integration}-api`,
            composables: `@vue-storefront/${integration}`
          }
        }
      }
    );
  };

  await Promise.all(agnosticThemeFiles.map(absoluteDirectoryPath => compileAgnosticTemplate(
    absoluteDirectoryPath,
    path.isAbsolute(targetPath)
      ? targetPath
      : path.join(__dirname, targetPath),
    agnosticThemePath)));
};
