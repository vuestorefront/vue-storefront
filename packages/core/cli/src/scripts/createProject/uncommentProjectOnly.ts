import * as fs from 'fs';

export default async (absoluteFilePath: string): Promise<void> => {
  const uncommentProjectOnly = (source: string): string => source.replace(
    /\s+(\/\* project-only-start)(.*?)(project-only-end \*\/)/sg,
    (_, commentStart, partToUncomment) => partToUncomment
  );
  const fileContent = fs.readFileSync(absoluteFilePath, { encoding: 'utf8' });

  return fs.writeFileSync(
    absoluteFilePath,
    uncommentProjectOnly(fileContent)
  );
};
