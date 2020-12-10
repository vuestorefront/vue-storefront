import fs from 'fs';
import { OperationsData, RELEASE_GRADATIONS, BASE } from './constants';

const updateVersion = (version: string, gradation: RELEASE_GRADATIONS): string => {
  return version.replace(/([\^~]?)(\d+)\.(\d+)\.(\d+)$/, (_, special, major, minor, path) => {
    switch (gradation) {
      case RELEASE_GRADATIONS.path:
        path++;
        break;
      case RELEASE_GRADATIONS.minor:
        minor++;
        break;
      case RELEASE_GRADATIONS.major:
        major++;
        break;
    }
    return `${special}${major}.${minor}.${path}`;
  });
};

const updatePackageVersion = (pckg: string, gradation: RELEASE_GRADATIONS, operationsData: OperationsData = {
  pathsToRun: [],
  freshVersions: {},
  oldFiles: {}
}): OperationsData => {
  const filePath = `${BASE}/${pckg}/package.json`;
  // eslint-disable-next-line global-require
  const packageJson = require(filePath);
  if (!packageJson) {
    return operationsData;
  }

  const modifiedFile = {
    ...packageJson,
    version: updateVersion(packageJson.version, gradation)
  };

  for (const [dependency, version] of Object.entries(operationsData.freshVersions)) {
    if (modifiedFile.dependencies && modifiedFile.dependencies[dependency]) {
      modifiedFile.dependencies[dependency] = modifiedFile.dependencies[dependency].replace(/([\^~]?)(.*)/, (_, specialChar) => {
        return `${specialChar}${version}`;
      });
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(modifiedFile, null, 2));

  return {
    freshVersions: {
      ...operationsData.freshVersions,
      [packageJson.name]: modifiedFile.version
    },
    pathsToRun: [
      ...operationsData.pathsToRun,
      filePath.replace('/package.json', '')
    ],
    oldFiles: {
      ...operationsData.oldFiles,
      [filePath]: packageJson
    }
  };
};

export default updatePackageVersion;
