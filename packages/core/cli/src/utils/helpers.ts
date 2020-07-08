export const buildFileTargetPath = (file: string, targetPath: string, chopPhrase: string): string => targetPath + (file.replace(chopPhrase, ''));
export const getThemePath = (themeName: string): string => `../../../node_modules/@vue-storefront/${themeName}`;
