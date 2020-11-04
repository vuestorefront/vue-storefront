import { cli } from '@vue-storefront/cli/src/index';
import log from '@vue-storefront/cli/src/utils/log';
import init from '../src/commands/init';

jest.mock('@vue-storefront/cli/src/utils/log', () => ({
  error: jest.fn()
}));
jest.mock('../src/commands/init.ts', () => ({
  default: jest.fn()
}));

describe('CLI', () => {
  it('stops if not command provided', () => {
    cli(['', '', null]);
    expect(log.error).toHaveBeenCalledWith('Provide command');
  });

  it('stops if not existing command provided', () => {
    cli(['', '', 'asdasdasd']);
    expect(log.error).toHaveBeenCalledWith('Bad command');
  });

  it('loads proper script and calls default function', () => {
    const commandName = 'init';
    const commandArgs = [1, 51];

    cli(['', '', commandName, ...commandArgs]);
    expect((init as any).default).toHaveBeenCalledWith(commandArgs);
  });
});
