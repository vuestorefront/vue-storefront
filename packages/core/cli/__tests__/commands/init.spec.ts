import initCommand from '../../src/commands/init';

const chosenIntegration = 'my-super-new-backend-ecommerce-system';
const integrations = [
  chosenIntegration,
  'some-other-integration',
  'and-other'
];
const resolvedPathWithProjectName = '/home/abc/my-project';
const typedProjectName = 'new-pro';

import inquirer from 'inquirer';
jest.mock('inquirer', () => ({
  prompt: jest.fn(() => Promise.resolve({
    chosenIntegration,
    typedProjectName
  }))
}));

jest.mock('@vue-storefront/cli/src/utils/getIntegrationsFromPackage', () => () => integrations);

import createProject from '@vue-storefront/cli/src/scripts/createProject';
jest.mock('@vue-storefront/cli/src/scripts/createProject', () => jest.fn());
jest.mock('path', () => ({
  resolve: () => resolvedPathWithProjectName
}));

const projectName = 'AwesomeShop';

describe('Command: init <projectName>', () => {
  it('calls inquirer.prompt for projectName if no <projectName> and goes further', async () => {
    await initCommand([null]);
    expect(inquirer.prompt).toHaveBeenCalledWith(
      [
        {
          type: 'input',
          name: 'typedProjectName',
          message: 'What\'s your project name?',
          validate (value) {
            if (value.trim().length > 0) {
              return true;
            }
            return 'Please provide longer name';
          }
        }
      ]
    );

    expect(createProject).toHaveBeenCalledWith(chosenIntegration, resolvedPathWithProjectName);
  });
  it('calls inquirer.prompt & createProject with proper arguments', async () => {
    await initCommand([projectName]);

    expect(inquirer.prompt).toHaveBeenCalledWith(
      [
        {
          type: 'list',
          name: 'chosenIntegration',
          message: 'Choose integration',
          choices: integrations
        }
      ]
    );

    expect(createProject).toHaveBeenCalledWith(chosenIntegration, resolvedPathWithProjectName);
  });
});
