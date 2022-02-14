import { Command } from '@oclif/core';
import * as fs from 'fs/promises';
import * as path from 'path';
import execa from 'execa';
import { getProjectName } from '../../domains/project-name';

const VSF_TU_CONFIG_FILENAME = 'theme-utils.config.js';

const removeDevCommentBlocks = (source: string): string => {
  return source.replace(/\s+(\/\/ @core-development-only-start)(.*?)(\/\/ @core-development-only-end)/gs, '');
};

const uncommentProjectOnlyBlocks = (source: string): string => {
  return source.replace(/\s+(\/\* project-only-start)(.*?)\s+(project-only-end \*\/)/gs, (_, __, block) => block);
};

const processMagicComments = async (filePath: string): Promise<void> => {
  const contents = await fs.readFile(filePath, {
    encoding: 'utf-8'
  });

  await fs.writeFile(filePath, removeDevCommentBlocks(uncommentProjectOnlyBlocks(contents)));
};

export default class GenerateIntegration extends Command {
  static override description = 'describe the command here';

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {};

  static override args = [];

  public async run(): Promise<void> {
    // const { args, flags } = await this.parse(GenerateIntegration);

    const projectName = await getProjectName();

    const projectPath = path.join(process.cwd(), projectName);

    await fs.writeFile(
      path.join(process.cwd(), VSF_TU_CONFIG_FILENAME),
      `module.exports = {
  copy: {
    to: '${projectPath}',
    from: [
      {
        path: '${path.join(process.cwd(), '_theme')}',
        watch: false
      },
      {
        path: '${process.cwd()}',
        ignore: ['generate-template.ts', 'theme-utils.config.js'],
        variables: {},
        watch: false
      }
    ]
  }
};
`
    );

    await execa('vsf-tu');

    await fs.rm(path.join(process.cwd(), VSF_TU_CONFIG_FILENAME));

    await processMagicComments(path.join(projectPath, 'nuxt.config.js'));

    await fs.rm(path.join(process.cwd(), '_theme'), {
      force: true,
      recursive: true
    });
  }
}
