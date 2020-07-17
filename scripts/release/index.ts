// 1. Before Process
// A. Read args and throw(?)
// B. Check if we have full package or only subpackage
// - Full packages: core, prismic, checkout-com, about-you, boilerplate, commerctools
// - Subpackages: core/cli, core/core, core/theme-module, core/nuxt-module, core/docs(or not?), commerctools/*, about-you/*, boilerplate/*
// C. Check if directory exists
// D. Check if gradation of release is proper (or try default value if not provided?)

// 2. Process for subpackage
// A. Go to directory
// B. Update version basing on 1.D.
// C. Run npm publish somehow

// 3. Process for full package
// A. Go to each directory
// B. Update version basing on 1.D. & store in variable version of each package
// C. Update version of each package in dependencies:
// D. Run npm publish (order: API, Composables, Theme)

// 4. Behaviour if it failed

const path = require('path');
const fs = require('fs');
const base = '../../packages/';

const getDirectories = (source: string) =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

enum PACKAGE_TYPES {
    NotPackage = 0,
    Wrapper,
    IntegrationWrapper,
    Package
}
enum PACKAGE_SUBTYPE {
    INDEPENDENT = 0,
    API,
    COMPOSABLE,
    THEME,
    CLI
}
const integrationWrapperPackages = [
  'api-client',
  'composables',
  'theme'
];
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

enum RELEASE_GRADATIONS {
  path = 1,
  minor,
  major
}
const isProperGradation = (gradation: string) => Object.keys(RELEASE_GRADATIONS).filter(key => isNaN(Number(key))).includes(gradation);

// At first I will prepare it only for ecommerce integrations

// CLI          depends on THEME
// THEME        depends on COMPOSABLE
// COMPOSABLE   depends on API

const getPackageSubtype = (pckg: string): PACKAGE_SUBTYPE => {
  switch (pckg.split('/').pop()) {
    case 'api-client':
      return PACKAGE_SUBTYPE.API;
    case 'composables':
      return PACKAGE_SUBTYPE.COMPOSABLE;
    case 'theme':
      return PACKAGE_SUBTYPE.THEME;
    case 'cli':
      return PACKAGE_SUBTYPE.CLI;
    default:
      return PACKAGE_SUBTYPE.INDEPENDENT;
  }
};

const getSubtypeName = (subtype: PACKAGE_SUBTYPE): string => {
  switch (subtype) {
    case PACKAGE_SUBTYPE.API:
      return 'api-client';
    case PACKAGE_SUBTYPE.COMPOSABLE:
      return 'composables';
    case PACKAGE_SUBTYPE.THEME:
      return 'theme';
    case PACKAGE_SUBTYPE.CLI:
      return 'cli';
    default:

  }
};

const pckgSubtypeToPath = (pckg: string, subtype: PACKAGE_SUBTYPE): string => {
  if (subtype === PACKAGE_SUBTYPE.CLI) {
    return 'core/cli';
  }
  const base = pckg.split('/');
  base[base.length - 1] = getSubtypeName(subtype);
  return base.join('/');
};

const buildPackageDependencyList = (pckg: string): PACKAGE_SUBTYPE[] => {
  const packageSubtype = getPackageSubtype(pckg);
  const list: PACKAGE_SUBTYPE[] = [];
  if (packageSubtype === PACKAGE_SUBTYPE.INDEPENDENT) {
    return list;
  }

  const enumKeys = Object.keys(PACKAGE_SUBTYPE).filter(key => isNaN(Number(key)));
  for (let i = packageSubtype + 1; i < enumKeys.length; i++) {
    list.push(i);
  }

  return list;
};

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
interface OperationsData {
  pathsToRun: Array<string>;
  freshVersions: Record<string, any>;
  oldFiles: Record<string, any>;
}

const updatePackageVersion = (pckg: string, gradation: RELEASE_GRADATIONS, operationsData: OperationsData = {
  pathsToRun: [],
  freshVersions: {},
  oldFiles: {}
}): OperationsData => {
  const filePath = path.join(__dirname, base, pckg, 'package.json');
  const packageJson = require(filePath);
  if (!packageJson) {
    return operationsData;
  }

  const modifiedFile = {
    ...packageJson,
    version: updateVersion(packageJson.version, gradation)
  };

  for (const [dependency, version] of Object.entries(operationsData.freshVersions)) {
    if (modifiedFile.dependencies[dependency]) {
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

// npm publish --registry http://localhost:4873
const registry = 'http://localhost:4873';
const { execSync } = require('child_process');

const publishPackage = (path: string) => execSync(`cd ${path} && npm publish --registry ${registry}`);

const program = () => {
  // Step 1
  const args = process.argv.slice(2);
  let pckg = args[0];
  // args[1] === '-'
  const gradation = args[2];

  if (!pckg || !gradation) {
    console.log('Provide package and gradation. Pattern is: {package} - {gradation}');
    return;
  }
  if (!isProperGradation(gradation)) {
    console.log(`${gradation} is bad gradation. Use 'path', 'minor' or 'major'`);
    return;
  }

  const packageType = getPackageType(pckg);
  if (!packageType) {
    console.log('Bad package\'s type');
    return;
  }

  let operationList = {
    pathsToRun: [],
    freshVersions: {},
    oldFiles: {}
  };

  if (packageType === PACKAGE_TYPES.Package || packageType === PACKAGE_TYPES.IntegrationWrapper) {
    if (packageType === PACKAGE_TYPES.IntegrationWrapper) {
      pckg = `${pckg}/api-client`;
    }
    const dependencyList: PACKAGE_SUBTYPE[] = buildPackageDependencyList(pckg);
    try {
      operationList = updatePackageVersion(pckg, RELEASE_GRADATIONS[gradation]);
      for (const subtype of dependencyList) {
        operationList = updatePackageVersion(pckgSubtypeToPath(pckg, subtype), RELEASE_GRADATIONS[gradation], operationList);
      }
    } catch (err) {
      console.log(err);
    }

    const sliceAbsolutePathPart = (path: string) => path.replace(/(.*?)packages/, 'packages');
    const finalStatus = [];

    try {
      while (operationList.pathsToRun.length) {
        publishPackage(operationList.pathsToRun[0]);
        finalStatus.push('Succesfully published ' + sliceAbsolutePathPart(operationList.pathsToRun[0]) + ` new ${gradation} version`);
        operationList.pathsToRun.shift();
      }
    } catch (err) {
      for (const pathToRun of operationList.pathsToRun) {
        finalStatus.push('Failed publishing ' + sliceAbsolutePathPart(pathToRun));
        const pathWithFile = `${pathToRun}/package.json`;
        fs.writeFileSync(pathWithFile, JSON.stringify(operationList.oldFiles[pathWithFile], null, 2));
        finalStatus.push('Rolled back to old version');
      }
    }

    console.log('\n');
    for (const log of finalStatus) {
      console.log(log);
    }
  } else if (packageType === PACKAGE_TYPES.Wrapper && pckg === 'core') {
    // It's core
    console.log('Pick specific core\'s package');

  }
};

program();
