import { t, TFunction } from 'i18next';
import { stdin, MockSTDIN } from 'mock-stdin';
import { wait } from '../../../src/domains/async';
import { identity } from '../../../src/domains/math';
import { getProjectName } from '../../../src/domains/project-name';

jest.mock('i18next');

const ENTER_KEY = '\x0D';
const BACKSPACE_KEY = '\x08';

describe('getProjectName | integration tests', () => {
  let io: MockSTDIN;
  let output = '';

  beforeEach(() => {
    io = stdin();
    output = '';

    (t as jest.MockedFunction<TFunction>).mockImplementation(identity);

    jest.spyOn(process.stdout, 'write').mockImplementation((message) => {
      output += message;
      return true;
    });
  });

  it('gets project name from user', async () => {
    const answer = async () => {
      expect(output).toContain('What is the project name?');

      io.send(' ');
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain('domain.project_name.is_empty');

      io.send('PROJECT  \t NAME.');
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain('domain.project_name.is_not_directory');

      io.send(BACKSPACE_KEY);
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain('project-name');

      io.send(ENTER_KEY);
    };

    wait(100).then(answer);

    const projectName = await getProjectName('What is the project name?');

    expect(projectName).toBe('project-name');
  });
});
