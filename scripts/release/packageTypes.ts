import fs from 'fs';
import { BASE, PACKAGE_TYPES } from './constants';

const integrationWrapperPackages = [
  'api-client',
  'composables',
  'theme'
];

const getDirectories = (source: string) =>
  fs.readdirSync(`${BASE}/${source}`, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const isPackage = (pckg: string) => fs.existsSync(`${BASE}/${pckg}/package.json`);

const isIntegrationWrapper = (pckg: string) => {
  try {
    const directories = getDirectories(pckg);
    return integrationWrapperPackages.length <= directories.length && integrationWrapperPackages.every(directory => isPackage(`${pckg}/${directory}`));
  } catch (err) {
    return false;
  }
};

const isWrapper = (pckg: string) => {
  try {
    return getDirectories(pckg).some(directory => isPackage(`${pckg}/${directory}`));
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

const getCustomPackagesInIntegrationWrapper = (integration: string): string[] => {
  const directories = getDirectories(integration);
  return directories.filter(directory => !integrationWrapperPackages.includes(directory));
};

export { getPackageType, getCustomPackagesInIntegrationWrapper };
