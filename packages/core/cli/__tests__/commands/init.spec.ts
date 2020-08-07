import initCommand from '../../src/commands/init';
import log from '@vue-storefront/cli/src/utils/log';
jest.mock('@vue-storefront/cli/src/utils/log', () => ({
  error: jest.fn()
}));

const chosenIntegration = 'my-super-new-backend-ecommerce-system';
const integrations = [
  chosenIntegration,
  'some-other-integration',
  'and-other'
];
const resolvedPathWithProjectName = '/home/abc/my-project';

import inquirer from 'inquirer';
jest.mock('inquirer', () => ({
  prompt: jest.fn(() => Promise.resolve({
    chosenIntegration
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
  it('prints error and stops if no <projectName>', () => {
    initCommand([null]);
    expect(log.error).toHaveBeenCalled();
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
