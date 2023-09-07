import fs from "fs";
import path from "path";

const ESLINT_FILES = [".eslintrc.js", ".eslintignore", ".eslintrc.json"];

const COMMITLINT_FILES = ["commitlint.config.js"];

const OTHER_FILES = ["CHANGELOG.md", "/playground/app/exampleApp.md"];

const removeFromPackageJson = async (
  directoryName: string,
  packageName: string
): Promise<void> => {
  const packageJSONPath = path.join(directoryName, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJSONPath, "utf8"));

  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};

  if (packageJson["lint-staged"]) {
    delete packageJson["lint-staged"];
  }

  // Loop through the dependencies section
  Object.keys(dependencies).forEach((dependency) => {
    if (dependency.includes(packageName)) {
      delete dependencies[dependency];
    }
  });

  // Loop through the devDependencies section
  Object.keys(devDependencies).forEach((dependency) => {
    if (dependency.includes(packageName)) {
      delete devDependencies[dependency];
    }
  });

  packageJson.dependencies = dependencies;
  packageJson.devDependencies = devDependencies;

  fs.writeFileSync(packageJSONPath, JSON.stringify(packageJson, null, 2));
};

const removeFiles = async (
  directoryName: string,
  files: string[]
): Promise<void> => {
  files.forEach((file) => {
    const filePath = path.join(directoryName, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  fs.readdirSync(directoryName).forEach((file) => {
    const filePath = path.join(directoryName, file);
    if (fs.statSync(filePath).isDirectory()) {
      removeFiles(filePath, files);
    }
  });
};

export const removeUnwantedFiles = async (
  directoryName: string
): Promise<void> => {
  const rootDir = directoryName;
  const playgroundDir = `${directoryName}/playground/app`;

  await removeFromPackageJson(rootDir, "eslint");
  await removeFromPackageJson(playgroundDir, "eslint");
  await removeFromPackageJson(rootDir, "commitlint");

  await removeFiles(rootDir, ESLINT_FILES);
  await removeFiles(playgroundDir, ESLINT_FILES);
  await removeFiles(rootDir, COMMITLINT_FILES);
  await removeFiles(rootDir, OTHER_FILES);
};
