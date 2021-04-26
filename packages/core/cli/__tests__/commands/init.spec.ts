import initCommand, {
  CUSTOM_TEMPLATE
} from '@vue-storefront/cli/src/commands/init';

const chosenIntegration = 'my-super-new-backend-ecommerce-system';
const resolvedPathWithProjectName = '/home/abc/my-project';
const projectName = 'AwesomeShop';
import inquirer from 'inquirer';
import createProject from '@vue-storefront/cli/src/scripts/createProject';
jest.mock('inquirer', () => ({
  prompt: jest.fn(() =>
    Promise.resolve({
      chosenIntegration,
      typedProjectName: projectName
    })
  )
}));
jest.mock('@vue-storefront/cli/src/scripts/createProject', () =>
  jest.fn((data) => data)
);
jest.mock('@vue-storefront/cli/src/utils/getIntegrations', () => ({
  __esModule: true,
  default: {
    'my-super-new-backend-ecommerce-system': '',
    'some-other-integration': '',
    'and-other': ''
  }
}));
jest.mock('shelljs', () => ({
  exec: jest.fn()
}));
jest.mock('path', () => ({
  resolve: () => resolvedPathWithProjectName,
  join: jest.fn(),
  isAbsolute: jest.fn()
}));

describe('Command: init <projectName>', () => {
  it('calls inquirer.prompt for projectName if no <projectName>', async () => {
    await initCommand([null]);
    expect(inquirer.prompt).toHaveBeenCalledWith([
      expect.objectContaining({
        type: 'input',
        name: 'typedProjectName',
        message: 'What\'s your project name?'
      })
    ]);
  });

  it('init with project name && choose integration && run createProject with proper arguments', async () => {
    jest.clearAllMocks();
    const testTargetPath = 'test_path';
    const spy = jest.spyOn(process, 'cwd');
    spy.mockReturnValue(testTargetPath);

    await initCommand([projectName]);
    spy.mockRestore();

    expect(createProject).toHaveBeenCalledWith({
      projectName: projectName,
      targetPath: testTargetPath,
      repositoryLink: ''
    });
  });

  it('init with project name && choose custom integration && run createProject with proper arguments', async () => {
    jest.clearAllMocks();
    const testTargetPath = 'test_path';
    const spy = jest.spyOn(process, 'cwd');
    spy.mockReturnValue(testTargetPath);

    inquirer.prompt.mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          chosenIntegration: CUSTOM_TEMPLATE,
          otherIntegrationGitLink: 'http://test.com',
          typedProjectName: projectName
        })
      )
    );
    await initCommand([projectName]);
    spy.mockRestore();

    expect(createProject).toHaveBeenCalledWith({
      projectName: projectName,
      targetPath: testTargetPath,
      repositoryLink: 'http://test.com'
    });
  });

  it('proper validator', async () => {
    let validatorForEmptyString = null;
    let validatorForNotEmptyString = null;

    inquirer.prompt.mockImplementation(
      jest.fn((arg) => {
        if (arg[0].validate) {
          validatorForEmptyString = arg[0].validate('');
          validatorForNotEmptyString = arg[0].validate('abc');
        }

        return Promise.resolve({
          chosenIntegration,
          typedProjectName: projectName
        });
      })
    );

    await initCommand([null]);

    expect(typeof validatorForEmptyString).toBe('string');
    expect(validatorForNotEmptyString).toBe(true);
  });
});
