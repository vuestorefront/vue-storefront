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
// C. Update version of each package in dependencuies
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
    Subpackage
}
const isSubpackage = (pckg: string) => fs.existsSync(path.resolve(__dirname, `${base}${pckg}/package.json`));
const isWrapper = (pckg: string) => {
  try {
    const directories = getDirectories(path.resolve(__dirname, `${base}${pckg}`));
    return directories.some(directory => isSubpackage(`${pckg}/${directory}`));
  } catch (err) {
    return false;
  }
};
const getPackageType = (pckg: string): PACKAGE_TYPES => {
  if (isSubpackage(pckg)) {
    return PACKAGE_TYPES.Subpackage;
  }
  if (isWrapper(pckg)) {
    return PACKAGE_TYPES.Wrapper;
  }
  return PACKAGE_TYPES.NotPackage;
};

const RELEASE_GRADATIONS = {
  path: 1,
  minor: 2,
  major: 3
};
const isProperGradation = (gradation: string) => Object.keys(RELEASE_GRADATIONS).includes(gradation);

const readArgs = () => {
  const [pckg, , gradation] = process.argv.slice(2);
  if (!pckg || !gradation) {
    console.log('Provide package and gradation. Pattern is: {package} - {gradation}');
    return;
  }
  if (!isProperGradation(gradation)) {
    console.log(`${gradation} is bad gradation. Use 'path', 'minor' or 'major'`);
    return;
  }

  const packageType = getPackageType(pckg);
  console.log(packageType);
};

readArgs();
