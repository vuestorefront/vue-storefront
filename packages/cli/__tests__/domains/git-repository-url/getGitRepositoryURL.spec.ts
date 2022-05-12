import git from 'isomorphic-git';
import { t, TFunction } from 'i18next';
import { stdin, MockSTDIN } from 'mock-stdin';
import { getGitRepositoryURL, validateGitRepositoryURL } from '../../../src/domains/git-repository-url';
import { wait } from '../../../src/domains/async';
import { identity } from '../../../src/domains/math';

jest.mock('i18next');
jest.mock('../../../src/domains/git-repository-url/validateGitRepositoryURL');

const ENTER_KEY = '\x0D';
const BACKSPACE_KEY = '\x08';

type MockValidate = jest.MockedFunction<typeof validateGitRepositoryURL>;

describe('getGitRepositoryURL', () => {
  let io: MockSTDIN;
  let output = '';

  (t as jest.MockedFunction<TFunction>).mockImplementation(identity);

  beforeEach(() => {
    io = stdin();
    output = '';

    jest.spyOn(process.stdout, 'write').mockImplementation((message) => {
      output += message as string;
      return true;
    });
  });

  it('gets git repository URL from user', async () => {
    const answer = async () => {
      expect(output).toContain('What\'s your git repository URL?');

      io.send(' ');
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain('domain.git_repository_url.is_invalid');

      io.send(BACKSPACE_KEY);
      io.send('https://github.com/x/x.git');
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain('domain.git_repository_url.was_not_found');

      io.send(BACKSPACE_KEY.repeat(5));
      io.send('y.git');
      io.send(ENTER_KEY);
    };

    wait(100).then(answer);

    (validateGitRepositoryURL as MockValidate)
      .mockResolvedValueOnce([
        false,
        new git.Errors.UrlParseError(' ')
      ])
      .mockResolvedValueOnce([
        false,
        new git.Errors.NotFoundError('https://github.com/x/x.git')
      ])
      .mockResolvedValueOnce([true, null]);

    const gitRepositoryURL = await getGitRepositoryURL('What\'s your git repository URL?');

    expect(gitRepositoryURL).toBe('https://github.com/x/y.git');
  });

  describe('when user input unsupported git repository URL', () => {
    it('allow user to select suggestion as answer', async () => {
      const answer = async () => {
        expect(output).toContain('What\'s your git repository URL?');

        io.send('git@github.com:x/x.git');
        io.send(ENTER_KEY);

        await wait(100);

        expect(output).toContain('domain.git_repository_url.suggestion');

        // Cleanup the output.
        output = '';

        io.send('N');
        io.send(ENTER_KEY);

        await wait(100);

        expect(output).toContain('What\'s your git repository URL?');

        io.send('git@github.com:x/y.git');
        io.send(ENTER_KEY);

        await wait(100);

        expect(output).toContain('domain.git_repository_url.suggestion');

        io.send('Y');
        io.send(ENTER_KEY);
      };

      wait(100).then(answer);

      (validateGitRepositoryURL as MockValidate)
        .mockResolvedValueOnce([
          false,
          new git.Errors.UnknownTransportError(
            'git@github.com:x/x.git',
            'ssh',
            'https://github.com/x/x.git'
          )
        ])
        .mockResolvedValueOnce([true, null])
        .mockResolvedValueOnce([
          false,
          new git.Errors.UnknownTransportError(
            'git@github.com:x/y.git',
            'ssh',
            'https://github.com/x/y.git'
          )
        ])
        .mockResolvedValueOnce([true, null]);

      const result = await getGitRepositoryURL('What\'s your git repository URL?');

      expect(result).toBe('https://github.com/x/y.git');
    });
  });
});
