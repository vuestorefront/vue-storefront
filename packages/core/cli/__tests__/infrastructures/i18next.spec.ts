import i18next, { t } from 'i18next';
import { setupI18Next } from '../../src/infrastructures/i18next';
import getLocale from 'os-locale';

type GetLocaleMock = jest.MockedFunction<typeof getLocale>;

jest.mock('os-locale');

describe('infrastructures/i18next | unit tests', () => {
  it('initializes \'i18next\'', async () => {
    const init = jest.spyOn(i18next, 'init');

    await setupI18Next();

    expect(init).toHaveBeenCalled();
  });

  it('reads developer\'s location to provide the best translation', async () => {
    (getLocale as GetLocaleMock).mockResolvedValueOnce('en-US');

    const init = jest.spyOn(i18next, 'init');

    await setupI18Next();

    expect(init).toHaveBeenCalledWith(
      expect.objectContaining({
        lng: 'en-US'
      })
    );
  });
});

describe('infrastructures/i18next | integration tests', () => {
  it('setups \'i18next\'', async () => {
    (getLocale as GetLocaleMock).mockResolvedValueOnce('pt-BR');

    await setupI18Next();

    const text = t('command.generate_store.description');

    expect(text).toBe('Gera uma loja com Vue Storefront.');
  });
});
