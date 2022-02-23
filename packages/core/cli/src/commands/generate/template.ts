import { Command, Flags } from '@oclif/core';
import { t } from 'i18next';
import * as path from 'path';
import { getProjectName } from '../../domains/project-name';
import { inheritTheme } from '../../domains/theme';

console.log(t('command.generate_template.flag.integration'));

export default class GenerateTemplate extends Command {
  static override description = t('command.generate_template.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {
    integration: Flags.string({
      name: 'integration',
      char: 'i',
      description: t('command.generate_template.flag.integration'),
      default: './',
      required: false,
      multiple: false,
      parse: async (value: string): Promise<string> => {
        return path.resolve(process.cwd(), value);
      }
    })
  };

  static override args = [];

  public async run(): Promise<void> {
    const { flags } = await this.parse(GenerateTemplate);

    const projectName = await getProjectName(t('command.generate_template.input.project_name'));

    const projectPath = path.join(process.cwd(), projectName);

    const integrationPath = flags.integration;

    await inheritTheme({
      projectPath,
      integrationPath
    });

    this.log(t('command.generate_template.message.success', { projectName }));
    this.exit(0);
  }
}
