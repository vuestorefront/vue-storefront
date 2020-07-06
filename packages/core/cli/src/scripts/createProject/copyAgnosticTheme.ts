const getThemePath = require('@vue-storefront/cli/src/scripts/createProject/getThemePath');
const buildFileTargetPath = require('@vue-storefront/cli/src/scripts/createProject/buildFileTargetPath');
const getAllFilesFromDir = require('@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir.js');
const compileTemplate = require('@vue-storefront/nuxt-theme/scripts/compileTemplate');
const path = require('path');
const fs = require('fs');

module.exports = async (integration: string, targetPath: string): Promise<void> => {
  const agnosticThemePath = getThemePath('nuxt-theme/theme');
  const agnosticThemeFiles = getAllFilesFromDir(agnosticThemePath).filter(file => !file.includes(path.sep + 'static' + path.sep));
  const absoluteTargetPath = path.join(__dirname, targetPath);

  const compileAgnosticTemplate = (filePath: string, targetPath: string, chopPhrase: string): Promise<void> => {
    const finalPath = buildFileTargetPath(filePath, targetPath, chopPhrase);
    if (fs.existsSync(finalPath)) {
      return;
    }
    return compileTemplate(
      path.join(__dirname, filePath),
      finalPath,
      {
        apiClient: `@vue-storefront/${integration}-api`,
        composables: `@vue-storefront/${integration}`
      });
  };

  await Promise.all(agnosticThemeFiles.map(absoluteDirectoryPath => compileAgnosticTemplate(absoluteDirectoryPath, absoluteTargetPath, agnosticThemePath)));
};
