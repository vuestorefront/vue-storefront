import fs from 'fs';

const removeMagicComments = async (absoluteFilePath: string): Promise<void> => {
  const removeDevMagicComment = (source: string): string => source.replace(/\s+(\/\/ @core-development-only-start)(.*?)(\/\/ @core-development-only-end)/sg, '');
  const fileContent = fs.readFileSync(absoluteFilePath, { encoding: 'utf8' });

  return fs.writeFileSync(
    absoluteFilePath,
    removeDevMagicComment(fileContent)
  );
};

const uncommentProjectOnly = async (absoluteFilePath: string): Promise<void> => {
  const uncommentProjectOnly = (source: string): string => source.replace(
    /\s+(\/\* project-only-start)(.*?)\s+(project-only-end \*\/)/sg,
    (_, commentStart, partToUncomment) => partToUncomment
  );
  const fileContent = fs.readFileSync(absoluteFilePath, { encoding: 'utf8' });

  return fs.writeFileSync(
    absoluteFilePath,
    uncommentProjectOnly(fileContent)
  );
};

export default async (nuxtConfigPath: string) => {
  await removeMagicComments(nuxtConfigPath);
  await uncommentProjectOnly(nuxtConfigPath);
};
