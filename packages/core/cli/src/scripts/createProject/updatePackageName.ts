import fs from 'fs';

export default async (packageJsonPath: string, projectName: string) => {
  const fileContent = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf8' }));
  fileContent.name = projectName;
  return fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(fileContent, null, '  ')
  );
};
