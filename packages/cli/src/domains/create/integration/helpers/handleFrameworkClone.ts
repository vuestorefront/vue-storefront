import { spinner } from '@clack/prompts';
import { cloneGitRepository } from '../../../../utils';

export const handleFrameworkClone = async (directoryName: string, framework: string): Promise<void> => {
  const sp = spinner();

  sp.start('Cloning SDK boilerplate...');

  if (framework === 'nuxt') {
    await cloneGitRepository({
      projectDir: directoryName + '/playground/app',
      gitRepositoryURL: 'https://github.com/rohrig/sdk-nuxt'
    });

  }

  if (framework === 'next') {
    await cloneGitRepository({
      projectDir: directoryName + '/playground/app',
      gitRepositoryURL: 'https://github.com/skirianov/sdk-next'
    });
  }

  sp.stop('SDK boilerplate has been cloned successfully!');
};
