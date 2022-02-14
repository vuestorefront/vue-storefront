import git from 'isomorphic-git';
import { stdin, MockSTDIN } from 'mock-stdin';
import { getGitRepositoryURL, validateGitRepositoryURL } from '../../../src/domains/git-repository-url';

jest.mock('../../../src/domains/git-repository-url/validateGitRepositoryURL');

const ENTER_KEY = '\x0D';

type MockValidate = jest.MockedFunction<typeof validateGitRepositoryURL>;

const wait = (time: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

describe('getGitRepositoryURL', () => {
  let io: MockSTDIN;

  beforeEach(() => {
    io = stdin();
  });

  it('gets git repository URL from user', async () => {
    const answer = async () => {
      io.send('https://github.com/vuestorefront/test-store.git');

      await wait(100);

      io.send(ENTER_KEY);
    };

    wait(100).then(answer);

    (validateGitRepositoryURL as MockValidate).mockResolvedValueOnce([true, null]);

    let output = '';

    jest.spyOn(process.stdout, 'write').mockImplementation((message) => {
      output += message as string;
      return true;
    });

    const gitRepositoryURL = await getGitRepositoryURL('What\'s your git repository URL?');

    expect(output).toContain('What\'s your git repository URL?');
    expect(gitRepositoryURL).toBe('https://github.com/vuestorefront/test-store.git');
  });

  describe('when user answers non supported git repository URL', () => {
    it('allow user to use suggestion as answer', async () => {
      const answer = async () => {
        io.send('git@github.com:vuestorefront/test-store.git');

        await wait(100);

        io.send(ENTER_KEY);

        await wait(100);

        io.send('Y');

        await wait(100);

        io.send(ENTER_KEY);
      };

      wait(100).then(answer);

      (validateGitRepositoryURL as MockValidate)
        .mockResolvedValueOnce([
          false,
          new git.Errors.UnknownTransportError(
            'git@github.com:vuestorefront/test-store.git',
            'ssh',
            'https://github.com/vuestorefront/test-store.git'
          )
        ])
        .mockResolvedValueOnce([true, null]);

      let output = '';

      jest.spyOn(process.stdout, 'write').mockImplementation((message) => {
        output += message as string;
        return true;
      });

      const result = await getGitRepositoryURL('Whats your git repository URL?');

      expect(result).toBe('https://github.com/vuestorefront/test-store.git');
      expect(output).toContain('Use "https://github.com/vuestorefront/test-store.git" instead?');
    });
  });
});
