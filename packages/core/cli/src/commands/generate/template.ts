import { Command, Flags } from '@oclif/core';
import * as path from 'path';
import { getProjectName } from '../../domains/project-name';
import { inheritTheme } from '../../domains/theme';

export default class GenerateTemplate extends Command {
  static override description = 'Generates a template of your integration\'s for VSF';

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {
    integration: Flags.string({
      name: 'integration',
      char: 'i',
      description: 'Relative path to the integration directory',
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

    const projectName = await getProjectName();

    const integrationPath = flags.integration;

    await inheritTheme({
      projectName,
      integrationPath,
      projectPath: path.join(process.cwd(), projectName)
    });
  }
}
