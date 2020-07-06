import * as fs from 'fs';

export default async (absoluteFilePath: string): Promise<void> => {
  const removeDevMagicComment = (source: string): string => source.replace(/\s+(\/\/ @core-development-only-start)(.*?)(\/\/ @core-development-only-end)/sg, '');
  const fileContent = fs.readFileSync(absoluteFilePath, { encoding: 'utf8' });

  return fs.writeFileSync(
    absoluteFilePath,
    removeDevMagicComment(fileContent)
  );
};
