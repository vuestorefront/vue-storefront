import { setup, getPublicKey, getCkoWebhookUrl, getStyles, getCardTokenKey } from '../src/configuration';

describe('[checkout-com] configuration', () => {

  it('appends configuration properly', () => {

    const config = {
      publicKey: 'some-public-key',
      ckoWebHookUrl: 'https://pwebhook.com/api/a',
      styles: {ab: '12'},
      tokenizedCardKey: 'temporary-tokenized-value-key'
    };

    setup(config);

    expect(getPublicKey()).toBe(config.publicKey);
    expect(getCkoWebhookUrl()).toBe(config.ckoWebHookUrl);
    expect(getStyles()).toEqual(config.styles);
    expect(getCardTokenKey()).toBe(config.tokenizedCardKey);

  });

});
