const compileTemplate = require('@vue-storefront/nuxt-theme/scripts/compileTemplate');
const getAllFilesFromDir = require('@vue-storefront/nuxt-theme/scripts/getAllFilesFromDir.js');
const ensureDirectoryExists = require('@vue-storefront/nuxt-theme/scripts/ensureDirectoryExists');
const getAllSubDirs = require('@vue-storefront/nuxt-theme/scripts/getAllSubDirs.js');
const fs = require('fs');
const path = require('path');

async function copyFile(fileDir, outDir) {
  const data = fs.readFileSync(fileDir, 'utf8');

  ensureDirectoryExists(outDir);
  return fs.writeFileSync(outDir, data);
}

function copyThemeFile(file, targetPath, chopPhrase) {
  console.log(file, targetPath + (file.replace(chopPhrase, '')));
  return copyFile(file, targetPath + (file.replace(chopPhrase, '')));
}

function copyThemeFiles(filesDir, targetPath, chopPhrase) {
  return Promise.all(getAllFilesFromDir(filesDir).map(
    file => copyThemeFile(file, targetPath, chopPhrase)
  ));
}

async function createProject(integration: string, targetPath: string): Promise<void> {
  const integrationThemePath = `../../node_modules/@vue-storefront/${integration}-theme`;
  const absoluteTargetPath = path.join(__dirname, targetPath);

  const themeDirectoriesPaths = getAllSubDirs(integrationThemePath, ['.theme', '.nuxt', 'node_modules'])
    .map(directory => path.join(integrationThemePath, directory));

  await Promise.all(themeDirectoriesPaths.map(absoluteDirectoryPath => copyThemeFiles(absoluteDirectoryPath, absoluteTargetPath, integrationThemePath)));
}

module.exports = compileTemplate;
createProject('commercetools', 'testbuild');
