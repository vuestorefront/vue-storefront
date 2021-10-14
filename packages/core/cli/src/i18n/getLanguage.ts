import osLocale from 'os-locale';
import * as fs from 'fs';
import * as path from 'path';

export const getLanguage = () => {
  const userLocale = osLocale.sync() || 'en-US';
  let file: string;
  try {
    const filePath = path.join(__dirname, 'lang', `${userLocale}.json`);
    file = fs.readFileSync(filePath).toString();
  } catch {
    file = fs.readFileSync(path.join(__dirname, 'lang', 'en-US.json')).toString();
  }

  return JSON.parse(file);
};
