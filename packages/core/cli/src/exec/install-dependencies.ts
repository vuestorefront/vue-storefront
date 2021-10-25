import * as inquirer from 'inquirer';
import { getLanguage } from '../i18n/getLanguage';
import { spawn } from 'child_process';
import { fatalError } from '../helpers/consola';

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
      const exec = spawn(dir, [manager.toLowerCase(), 'install']);

      exec.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      exec.stderr.on('data', (data) => {
        fatalError(data);
      });
    }
  }
};
