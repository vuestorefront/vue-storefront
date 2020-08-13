import { setup, getPublicKey, getCkoWebhookUrl, getFramesStyles, getFramesLocalization, getTransactionTokenKey } from '../src/configuration';

describe('[checkout-com] configuration', () => {

  it('appends configuration properly', () => {

    const config = {
      publicKey: 'some-public-key',
      ckoWebHookUrl: 'https://pwebhook.com/api/a',
      card: {
        styles: {ab: '12'},
        localization: 'en-US'
      },
      tokenizedCardKey: 'temporary-tokenized-value-key'
    };

    setup(config);

    expect(getPublicKey()).toBe(config.publicKey);
    expect(getCkoWebhookUrl()).toBe(config.ckoWebHookUrl);
    expect(getFramesStyles()).toEqual(config.card.styles);
    expect(getFramesLocalization()).toEqual(config.card.localization);
    expect(getTransactionTokenKey()).toBe(config.tokenizedCardKey);

  });

});
