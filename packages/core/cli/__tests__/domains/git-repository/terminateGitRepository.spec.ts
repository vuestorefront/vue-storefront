import { removeFileOrDirectory } from '../../../src/domains/directory';
import { terminateGitRepository } from '../../../src/domains/git-repository';

jest.mock('../../../src/domains/directory');

type Mock = jest.MockedFunction<typeof removeFileOrDirectory>;

describe('terminateGitRepository | unit tests', () => {
  it('removes \'.git\' folder', async () => {
    (removeFileOrDirectory as Mock).mockResolvedValueOnce();

    await terminateGitRepository('~/Projects/test-store');

    expect(removeFileOrDirectory).toHaveBeenCalledWith('~/Projects/test-store/.git');
  });
});
