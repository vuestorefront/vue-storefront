export default (file: string, targetPath: string, chopPhrase: string): string => targetPath + (file.replace(chopPhrase, ''));
