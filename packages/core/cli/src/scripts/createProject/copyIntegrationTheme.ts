const path = require('path');
const getThemePath = require('@vue-storefront/cli/src/scripts/createProject/getThemePath');
const buildFileTargetPath = require('@vue-storefront/cli/src/scripts/createProject/buildFileTargetPath');
const fs = require('fs');
const { copyFile } = require('@vue-storefront/nuxt-theme/scripts/copyThemeFiles');
const getAllFilesFromDir = require('@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir.js');

module.exports = async (integration: string, targetPath: string, omitFiles: Array<string> = ['.theme', '.nuxt', 'node_modules']): Promise<void> => {
  const copyThemeFiles = (filesDir: string | Array<string>, targetPath: string, chopPhrase: string) => {
    if (fs.statSync(filesDir).isDirectory()) {
      return Promise.all(getAllFilesFromDir(filesDir as Array<string>).map(
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
