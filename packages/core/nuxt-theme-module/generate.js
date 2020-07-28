const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const chalk = require('chalk');
const compileTemplate = require('./scripts/compileTemplate');
const { copyThemeFile, copyThemeFiles } = require('./scripts/copyThemeFiles');
const getAllFilesFromDir = require('./scripts/getAllFilesFromDir');
const getAllSubDirs = require('./scripts/getAllSubDirs');

export default async function ({
  log,
  moduleOptions,
  projectLocalThemeDir,
  targetDirectory
}) {

  const agnosticThemeDir = path.join(__dirname, 'theme');
  const compileAgnosticTemplate = (filePath) => {
    return compileTemplate(
      path.join(__dirname, filePath),
      this.options.buildDir.split('.nuxt').pop() + targetDirectory + path.sep + filePath.split('theme' + path.sep).pop(),
      {
        generate: {
          replace: {
            apiClient: moduleOptions.generate.replace.apiClient,
            composables: moduleOptions.generate.replace.composables
          }
        }
      });
  };

  const agnosticThemeFiles = getAllFilesFromDir(agnosticThemeDir).filter(file => !file.includes(path.sep + 'static' + path.sep));

  log.info('Adding theme files...');

  const themeDirectoriesPaths = getAllSubDirs(this.options.rootDir, [targetDirectory, '.nuxt', 'node_modules', 'test'])
    .map(directory => path.join(this.options.rootDir, directory));

  await Promise.all(agnosticThemeFiles.map(path => compileAgnosticTemplate(path)));
  await Promise.all(themeDirectoriesPaths.map(absolutePath => copyThemeFiles(absolutePath)));

  log.success(`Added ${agnosticThemeFiles.length} theme file(s) to ${chalk.bold(targetDirectory)} folder`);

  this.options.dir = {
    ...this.options.dir,
    ...{
      layouts: `${targetDirectory}/layouts`,
      assets: `${targetDirectory}/assets`,
      pages: `${targetDirectory}/pages`
    }
  };

  this.extendBuild(config => {
    delete config.resolve.alias['~'];
    config.resolve.alias['~/components'] = path.join(projectLocalThemeDir, '/components');
    config.resolve.alias['~/assets'] = path.join(projectLocalThemeDir, '/assets');
    config.resolve.alias['~'] = path.join(projectLocalThemeDir);
  });

  chokidar.watch(agnosticThemeDir, { ignoreInitial: true }).on('all', (event, baseFilePath) => {
    const overwriteFilePath = baseFilePath.replace(agnosticThemeDir, this.options.rootDir);

    if (event === 'add' || event === 'change') {
      if (!fs.existsSync(overwriteFilePath)) {
        compileAgnosticTemplate(baseFilePath.replace(__dirname, ''));
      }
    } else if (event === 'unlink') {
      if (!fs.existsSync(overwriteFilePath)) {
        fs.unlinkSync(baseFilePath.replace(agnosticThemeDir, projectLocalThemeDir));
      }
    }
  });

  chokidar.watch(themeDirectoriesPaths, { ignoreInitial: true })
    .on('all', (event, filePath) => {
      if (event === 'unlink') {
        const baseFilePath = filePath.replace(this.options.rootDir, agnosticThemeDir);
        if (fs.existsSync(baseFilePath)) {
          compileAgnosticTemplate(baseFilePath.replace(__dirname, ''));
        } else {
          fs.unlinkSync(filePath.replace(this.options.rootDir, projectLocalThemeDir));
        }
      } else if (event === 'add' || event === 'change') {
        copyThemeFile(filePath);
      }
    });
}
