import fs from 'fs';

export default async (packageJsonPath: string, projectName: string) => {
  const fileContent = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf8' }));
  fileContent.name = projectName;
  for (const key of Object.keys(fileContent)) {
    if (key.startsWith('_')) {
      delete fileContent[key];
    }
  }
  return fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(fileContent, null, '  ')
  );
};
