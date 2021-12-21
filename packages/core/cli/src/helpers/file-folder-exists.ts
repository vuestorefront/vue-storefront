import fs from 'fs';

export const fileFolderExists = (target: string): boolean => fs.existsSync(target);
