import { t, TFunction } from 'i18next';
import { identity } from '../src/domains/math';
import { simpleLog } from 'cli/src/domains/magento2/functions/terminalHelpers';

describe('terminalHelpers | Terminal logger tests', () => {
  let output = '';

  beforeEach(() => {
    output = '';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (t as jest.MockedFunction<TFunction>).mockImplementation(identity);

    jest.spyOn(process.stdout, 'write').mockImplementation((message) => {
      output += message;
      return true;
    });
  });

  it('simpleLog is printing', async () => {
    simpleLog('test');

    expect(output).toContain('test');
  });
});
