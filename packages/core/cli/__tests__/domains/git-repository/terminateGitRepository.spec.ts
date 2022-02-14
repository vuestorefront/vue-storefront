import { terminateGitRepository } from '../../../src/domains/git-repository';
import * as fs from 'fs/promises';

jest.mock('fs/promises');

describe('terminateGitRepository | unit tests', () => {
  it('removes \'.git\' folder', async () => {
    (fs.rm as jest.MockedFunction<typeof fs.rm>).mockResolvedValueOnce();

    await terminateGitRepository('~/Projects/test-store');

    expect(fs.rm).toHaveBeenCalledWith('~/Projects/test-store/.git', {
      force: true,
      recursive: true
    });
  });
});
