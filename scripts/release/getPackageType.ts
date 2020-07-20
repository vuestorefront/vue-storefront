import { PACKAGE_TYPES } from './types';
import path from 'path';
import fs from 'fs';
import { base } from './const';

const integrationWrapperPackages = [
  'api-client',
  'composables',
  'theme'
];

const getDirectories = (source: string) =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const isPackage = (pckg: string) => fs.existsSync(path.resolve(__dirname, `${base}${pckg}/package.json`));

const isIntegrationWrapper = (pckg: string) => {
  try {
    const directories = getDirectories(path.resolve(__dirname, `${base}${pckg}`)).filter(dir => integrationWrapperPackages.includes(dir));
    return integrationWrapperPackages.length === directories.length && directories.every(directory => isPackage(`${pckg}/${directory}`));
  } catch (err) {
    return false;
  }
};

const isWrapper = (pckg: string) => {
  try {
    const directories = getDirectories(path.resolve(__dirname, `${base}${pckg}`));
    return directories.some(directory => isPackage(`${pckg}/${directory}`));
  } catch (err) {
    return false;
  }
};

const getPackageType = (pckg: string): PACKAGE_TYPES => {
  if (isPackage(pckg)) {
    return PACKAGE_TYPES.Package;
  }
  if (isIntegrationWrapper(pckg)) {
    return PACKAGE_TYPES.IntegrationWrapper;
  }
  if (isWrapper(pckg)) {
    return PACKAGE_TYPES.Wrapper;
  }
  return PACKAGE_TYPES.NotPackage;
};

export default getPackageType;
