import { defaultConfig, setup, getPublicKey, getCkoWebhookUrl, getFramesStyles, getFramesLocalization, getCkoProxyUrl, getTransactionTokenKey, getSaveInstrumentKey } from '../src/configuration';

describe('[checkout-com] configuration', () => {

  it('uses fallback values', () => {

    const config = {
      publicKey: 'some-public-key'
    };

    setup(config);

    expect(getPublicKey()).toBe(config.publicKey);
    expect(getCkoWebhookUrl()).toBe(defaultConfig.ckoWebHookUrl);
    expect(getFramesStyles()).toEqual(defaultConfig.card.style);
    expect(getFramesLocalization()).toEqual(defaultConfig.card.localization);
    expect(getTransactionTokenKey()).toBe(defaultConfig.tokenizedCardKey);

  });

  it('appends configuration properly', () => {

    const config = {
      publicKey: 'some-public-key',
      ckoWebHookUrl: 'https://pwebhook.com/api/a',
      card: {
        style: {ab: '12'},
        localization: 'en-US'
      },
      tokenizedCardKey: 'temporary-tokenized-value-key',
      saveInstrumentKey: 'some-new-value'
    };

    setup(config);

    expect(getPublicKey()).toBe(config.publicKey);
    expect(getCkoWebhookUrl()).toBe(config.ckoWebHookUrl);
    expect(getFramesStyles()).toEqual(config.card.style);
    expect(getFramesLocalization()).toEqual(config.card.localization);
    expect(getTransactionTokenKey()).toBe(config.tokenizedCardKey);
    expect(getSaveInstrumentKey()).toBe(config.saveInstrumentKey);

  });

  it('properly generates cko proxy url', () => {

    expect(getCkoProxyUrl()).toBe(`${window.location.origin}/cko-api`);

  });

});
