import * as path from 'path';
import { Command, Flags } from '@oclif/core';
import { t } from 'i18next';
import { getDirectory } from '../../domains/directory';
import { getProjectName } from '../../domains/project-name';
import { inheritTheme } from '../../domains/theme';

export default class GenerateTemplate extends Command {
  static override description = t('command.generate_template.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {
    output: Flags.string({
      name: 'output',
      description: t('command.generate_template.flag.output'),
      required: false,
      multiple: false,
      parse: async (directory: string): Promise<string> => {
        return path.resolve(directory);
      }
    }),
    integration: Flags.string({
      name: 'integration',
      description: t('command.generate_template.flag.integration'),
      required: false,
      multiple: false,
      helpValue: '<path>',
      parse: async (directory: string): Promise<string> => {
        return path.resolve(directory);
      }
    })
  };

  static override args = [];

  public async run(): Promise<void> {
    const { flags } = await this.parse(GenerateTemplate);

    const projectName = await getProjectName(t('command.generate_template.input.project_name'));

    const outputPath = flags.output ?? (await getDirectory(t('command.generate_template.input.output_path')));

    const projectPath = path.join(outputPath, projectName);

    const integrationPath = flags.integration ?? (await getDirectory(t('command.generate_template.input.integration_path')));

    await inheritTheme({
      projectPath,
      integrationPath
    });

    this.log(t('command.generate_template.message.success', { projectName: projectPath }));
    this.exit(0);
  }
}
