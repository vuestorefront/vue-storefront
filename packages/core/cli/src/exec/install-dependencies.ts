import * as inquirer from 'inquirer';
import { getLanguage } from '../i18n/getLanguage';
import { execSync } from 'child_process';

const lang = getLanguage();

export const installDependencies = async ({
  dir,
  dryRun = false
}: {
  dir: string,
  dryRun: boolean,
}) => {
  const { ok } = await inquirer.prompt([{
    type: 'confirm',
    message: lang.commands.dependencies.prompt.install,
    name: 'ok'
  }]);

  if (ok) {
    const { manager } = await inquirer.prompt({
      type: 'list',
      name: 'manager',
      choices: ['NPM', 'yarn']
    });
    if (!dryRun) {
      execSync(`${manager.toLowerCase()} install`, {
        cwd: dir,
        stdio: 'inherit'
      });
    }
  }
};
