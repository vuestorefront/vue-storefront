import initCommand from '@vue-storefront/cli/src/commands/init';

const chosenIntegration = 'my-super-new-backend-ecommerce-system';
const integrations = {
  chosenIntegration: '',
  'some-other-integration': '',
  'and-other': ''
};
const resolvedPathWithProjectName = '/home/abc/my-project';
const typedProjectName = 'new-pro';

import inquirer from 'inquirer';
jest.mock('inquirer', () => ({
  prompt: jest.fn(() => Promise.resolve({
    chosenIntegration,
    typedProjectName
  }))
}));
jest.mock('@vue-storefront/cli/src/utils/getIntegrations', () => () => integrations);
jest.mock('shelljs', () => ({
  exec: jest.fn()
}));
import copyProject from '@vue-storefront/cli/src/scripts/copyProject';
jest.mock('@vue-storefront/cli/src/scripts/copyProject', () => jest.fn());
jest.mock('path', () => ({
  resolve: () => resolvedPathWithProjectName,
  join: jest.fn(),
  isAbsolute: jest.fn()
}));
jest.mock('../../src/scripts/createProject/processMagicComments', () => jest.fn());
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  rmdirSync: jest.fn()
}));
const projectName = 'AwesomeShop';
const CUSTOM_TEMPLATE = 'custom integration template';

describe('Command: init <projectName>', () => {

  it('calls inquirer.prompt for projectName if no <projectName> and goes further', async () => {
    await initCommand([null]);
    expect(inquirer.prompt).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          type: 'input',
          name: 'typedProjectName',
          message: 'What\'s your project name?'
        })
      ]
    );

    expect(copyProject).toHaveBeenCalledWith(chosenIntegration, resolvedPathWithProjectName, typedProjectName);
  });

  it('calls inquirer.prompt & copyProject with proper arguments', async () => {
    jest.clearAllMocks();
    await initCommand([projectName]);

    expect(inquirer.prompt).toHaveBeenCalledWith(
      [
        {
          type: 'list',
          name: 'chosenIntegration',
          message: 'Choose integration',
          choices: [...Object.keys(integrations), CUSTOM_TEMPLATE]
        }
      ]
    );

    expect(copyProject).toHaveBeenCalledWith(chosenIntegration, resolvedPathWithProjectName, projectName);
  });

  it('proper validator', async () => {
    let validatorForEmptyString = null;
    let validatorForNotEmptyString = null;

    inquirer.prompt.mockImplementation(jest.fn((arg) => {
      if (arg[0].validate) {
        validatorForEmptyString = arg[0].validate('');
        validatorForNotEmptyString = arg[0].validate('abc');
      }

      return Promise.resolve({
        chosenIntegration,
        typedProjectName
      });
    }));

    await initCommand([null]);

    expect(typeof validatorForEmptyString).toBe('string');
    expect(validatorForNotEmptyString).toBe(true);
  });

});
