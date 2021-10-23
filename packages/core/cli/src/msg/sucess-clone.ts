import { getLanguage } from '../i18n/getLanguage';
import chalk from 'chalk';

const lang = getLanguage();

export const successClone = ({
  dir,
  resultMsgs,
  dryRun = false
}: {
  dir: string,
  resultMsgs: string[],
  dryRun: boolean,
}) => {
  console.clear();

  console.log(
    chalk.bgGreen.whiteBright(
      lang.commands.store.success.title),
    chalk.green(lang.commands.store.success.msg)
  );

  if (resultMsgs.length > 0) {
    resultMsgs.forEach(msg => console.log(msg));
  }

  console.log(`${lang.commands.store.success.dir}: ${dir}`);
};
