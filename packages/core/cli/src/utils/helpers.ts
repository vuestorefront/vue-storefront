import path from 'path';

export const buildFileTargetPath = (file: string, targetPath: string, chopPhrase: string): string => targetPath + (file.replace(chopPhrase, ''));
export const getThemePath = (themeName: string): string => path.resolve(__dirname, `../../node_modules/@vue-storefront/${themeName}`);
