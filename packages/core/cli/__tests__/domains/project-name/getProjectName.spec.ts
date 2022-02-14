import { getProjectName } from '../../../src/domains/project-name';
import { stdin, MockSTDIN } from 'mock-stdin';

const ENTER_KEY = '\x0D';
const BACKSPACE_KEY = '\x08';

const wait = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

describe('getProjectName | integration tests', () => {
  let io: MockSTDIN;
  let output = '';

  beforeEach(() => {
    io = stdin();
    output = '';

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

      expect(output).toContain('Please type in the project name.');

      io.send('PROJECT  \t NAME.');
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain('The project name can\'t be invalid directory name.');

      io.send(BACKSPACE_KEY);
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain('project-name');

      io.send(ENTER_KEY);
    };

    wait(100).then(answer);

    const projectName = await getProjectName();

    expect(projectName).toBe('project-name');
  });
});
