import {Command, flags} from '@oclif/command'
import inquirer from 'inquirer'
import {getLanguage} from '../lang'
import {fetchIntegrations} from '../helpers/fetch-integrations'
import {createProject} from '../exec/create-project'
import {validateGitString} from '../helpers/validations/git'

const lang = getLanguage()

export default class Init extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: lang.flags.name}),
    integration: flags.string({char: 'i', description: lang.flags.integration}),
  }

  static args = [
    {
      name: 'name',
      required: false,
      description: lang.args.name,
      hidden: false,
    },
    {
      name: 'integration',
      required: false,
      description: lang.args.integration,
      hidden: false,
    },
  ]

  async run() {
    const {
      args,
      flags,
    } = this.parse(Init)

    const configs = {
      name: args?.name || flags?.name || '',
      git: args?.integration || flags?.integration || '',
    }

    if (!args?.name) {
      const {typedProjectName} = await inquirer.prompt([
        {
          type: 'input',
          name: 'typedProjectName',
          message: lang.inputs.project_name,
          validate: (value: string) => {
            if (value.trim().length > 0) {
              return true
            }

            return lang.error.longer_name
          },
        },
      ])

      configs.name = typedProjectName.split(' ').join('-') || typedProjectName
    }

    if (configs.name && !configs.git) {
      const availableIntegrations = await fetchIntegrations()

      const {chosenIntegration} = await inquirer.prompt([
        {
          type: 'list',
          name: 'chosenIntegration',
          message: lang.inputs.choose_integration,
          choices: [...Object.keys(availableIntegrations), lang.custom_template],
        },
      ])

      configs.git = availableIntegrations[chosenIntegration]

      if (chosenIntegration === lang.custom_template) {
        const {otherIntegrationGitLink} = await inquirer.prompt([
          {
            type: 'input',
            name: 'otherIntegrationGitLink',
            message: lang.inputs.choose_integration,
            validate: validateGitString,
          },
        ])

        configs.git = otherIntegrationGitLink
      }
    }

    if (configs.name && configs.git) {
      await createProject(configs.name, configs.git)
    }
  }
}
