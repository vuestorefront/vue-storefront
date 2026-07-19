import fs from 'fs';
import path from 'path';
import config from 'config';
import { v4 as uuidv4 } from 'uuid';

fs.writeFileSync(
  path.resolve(__dirname, '../build/config.json'),
  JSON.stringify(config)
)

fs.writeFileSync(
  path.resolve(__dirname, '../build/cache-version.json'),
  JSON.stringify(uuidv4())
)

const csvDirectories = [
  path.resolve(__dirname, '../../node_modules/@vue-storefront/i18n/resource/i18n/')
]

const moduleRoot = path.resolve(__dirname, '../../src/modules')
fs.readdirSync(moduleRoot).forEach(directory => {
  const dirName = moduleRoot + '/' + directory + '/resource/i18n'

  if (fs.existsSync(dirName)) {
    csvDirectories.push(dirName);
  }
});

const themeRoot = require('../build/theme-path');
const themeResources = themeRoot + '/resource'
csvDirectories.push(path.resolve(__dirname, themeResources + '/i18n/'));

const translationPreprocessor = require('@vue-storefront/i18n/scripts/translation.preprocessor.js')
translationPreprocessor(csvDirectories, config)

const tsconfig = require('../../tsconfig-build-dev.json');
tsconfig.compilerOptions.paths['theme/*'] = [
  `${themeRoot}/*`
];

require('fs').writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2));
