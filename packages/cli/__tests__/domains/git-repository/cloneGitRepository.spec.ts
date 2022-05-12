import git from 'isomorphic-git';
import { wait } from '../../../src/domains/async';
import { cloneGitRepository } from '../../../src/domains/git-repository';

jest.mock('isomorphic-git');

describe('cloneGitRepository | unit tests', () => {
  let output = '';

  beforeEach(() => {
    output = '';

    jest.spyOn(process.stderr, 'write').mockImplementation((message) => {
      output += message as string;
      return true;
    });
  });

  it('clones git repository to the project directory', async () => {
    const projectDir = '~/Projects/test-store';

    const gitRepositoryURL = 'https://github.com/vuestorefront/test-template.git';

    jest.spyOn(git, 'clone').mockResolvedValueOnce();

    await cloneGitRepository({
      projectDir,
      gitRepositoryURL
    });

    expect(git.clone).toHaveBeenCalledWith(
      expect.objectContaining({
        dir: projectDir,
        url: gitRepositoryURL
      })
    );
  });

  it('displays progress bar that reflects cloned files', async () => {
    jest.spyOn(git, 'clone').mockImplementationOnce(async (options) => {
      await wait(100);

      options.onProgress?.({
        phase: 'Counting objects',
        total: 2,
        loaded: 1
      });

      await wait(100);

      options.onProgress?.({
        phase: 'Counting objects',
        total: 2,
        loaded: 2
      });
    });

    await cloneGitRepository({
      projectDir: '~/Projects/test-store',
      gitRepositoryURL: 'https://github.com/vuestorefront/test-template.git'
    });

    expect(output).toContain('░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ || 0%');
    expect(output).toContain('████████████████████████████████████████ || 100%');
  });
});
