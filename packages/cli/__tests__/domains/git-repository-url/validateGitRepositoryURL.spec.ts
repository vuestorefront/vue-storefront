import { validateGitRepositoryURL } from '../../../src/domains/git-repository-url';
import git from 'isomorphic-git';

describe('validateGitRepositoryURL | unit tests', () => {
  const url = 'https://github.com/vuestorefront/test-template.git';

  describe('when receives a valid git repository URL', () => {
    beforeEach(() => {
      jest.spyOn(git, 'getRemoteInfo2').mockResolvedValueOnce({
        protocolVersion: 2,
        capabilities: {
          agent: 'git/github-gf33fef312227',
          fetch: 'shallow wait-for-done filter',
          'ls-refs': 'unborn',
          'server-option': true,
          'object-format': 'sha1'
        }
      });
    });

    it('uses git remote info to check it', async () => {
      await validateGitRepositoryURL(url);

      expect(git.getRemoteInfo2).toHaveBeenCalledWith(
        expect.objectContaining({
          url
        })
      );
    });

    it('returns \'true\' and no error', async () => {
      expect(await validateGitRepositoryURL(url)).toEqual([true, null]);
    });
  });

  describe('when receives an invalid git repository URL', () => {
    it('returns \'false\' and an error', async () => {
      const error = new git.Errors.UrlParseError(url);

      jest.spyOn(git, 'getRemoteInfo2').mockRejectedValueOnce(error);

      expect(await validateGitRepositoryURL(url)).toEqual([false, error]);
    });
  });
});
