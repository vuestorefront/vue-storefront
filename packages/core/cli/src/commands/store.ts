import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import consola from 'consola';
import chalk from 'chalk';
import { getLanguage } from '../i18n/getLanguage';
import { fetchIntegrations } from '../helpers/fetch-integrations';
import { cloneProject } from '../exec/clone-project';
import { validateGitString } from '../helpers/validations/git';

const clearName = (name: string) => name.split(' ').join('-');

const lang = getLanguage();

export default class Store extends Command {
  static description = lang.commands.store.description;

  static flags = {
    help: flags.help({ char: 'h' }),
    name: flags.string({
      char: 'n',
      description: lang.commands.store.flags.name
    }),
    integration: flags.string({
      char: 'i',
      description: lang.commands.store.flags.integration
    }),
    dryRun: flags.boolean({
      char: 'D',
      description: lang.commands.store.flags.dryRun
    })
  };

  static args = [
    {
      name: 'name',
      required: false,
      description: lang.commands.store.args.name,
      hidden: false
    },
    {
      name: 'integration',
      required: false,
      description: lang.commands.store.args.integration,
      hidden: false
    }
  ];

  async run() {
    const {
      args,
      flags
    } = this.parse(Store);

    console.clear();

    const configs = {
      name: clearName((args?.name || flags?.name || '')),
      git: (validateGitString(flags.integration || '') && flags?.integration) || ''
    };

    const docsResultMsgs: string[] = [];

    if (args?.integration && !validateGitString(args.integration)) {
      consola.error(new Error(lang.commands.store.error.git_link));
      process.exit(1);
    }

    if (!configs?.name) {
      const { typedProjectName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'typedProjectName',
          message: lang.commands.store.inputs.project_name,
          default: 'new-vue-storefront-store',
          validate: (value: string) => {
            if (value.trim().length > 0) {
              return true;
            }

            return lang.commands.store.error.longer_name;
          }
        }
      ]);

      configs.name = clearName(typedProjectName);
    }

    if (configs.name && !configs.git) {
      const availableIntegrations = await fetchIntegrations();

      const { chosenIntegration } = await inquirer.prompt([
        {
          type: 'list',
          name: 'chosenIntegration',
          message: lang.commands.store.inputs.choose_integration,
          choices: [...Object.keys(availableIntegrations), lang.commands.store.custom_template]
        }
      ]);

      const selectedIntegration = availableIntegrations[chosenIntegration];

      configs.git = selectedIntegration.git;

      if (chosenIntegration === lang.commands.store.custom_template) {
        const { otherIntegrationGitLink } = await inquirer.prompt([
          {
            type: 'input',
            name: 'otherIntegrationGitLink',
            message: lang.commands.store.inputs.choose_integration,
            validate: (v) => validateGitString(v) ? true : lang.commands.store.error.git_link
          }
        ]);

        configs.git = otherIntegrationGitLink;
      } else {
        docsResultMsgs.push(
          lang.commands.store.success.docsMsg,
          `${lang.commands.store.success.docs}: ${selectedIntegration.docs}`
        );
      }
    }

    if (configs.name && configs.git) {
      const clonedDir = await cloneProject({
        name: configs.name,
        gitLink: configs.git,
        dryRun: flags.dryRun || false
      });

      console.clear();

      console.log(chalk.bgGreen.whiteBright(lang.commands.store.success.title), chalk.green(lang.commands.store.success.msg));

      if (docsResultMsgs.length > 0) {
        docsResultMsgs.forEach(msg => console.log(msg));
      }

      console.log(`${lang.commands.store.success.dir}: ${clonedDir}`);

      if (flags.dryRun) {
        process.exit(0);
      }
    }
  }
}
