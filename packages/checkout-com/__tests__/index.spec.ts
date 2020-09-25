import { setup, getPublicKey, getCkoWebhookUrl, getFramesStyles, useCko, setChannel, CkoPaymentType } from '../src/index';

jest.mock('../src/configuration.ts', () => ({
  setup: jest.fn(),
  getPublicKey: jest.fn(),
  getCkoWebhookUrl: jest.fn(),
  setChannel: jest.fn(),
  getFramesStyles: jest.fn()
}));

jest.mock('../src/useCko.ts', () => jest.fn());

describe('index.ts', () => {

  it('exports proper functions', () => {
    setup({
      channels: {
        en: {
          publicKey: '12'
        }
      },
      defaultChannel: 'en'
    });
    getPublicKey();
    getCkoWebhookUrl();
    getFramesStyles();
    useCko();

    const newChannel = 'it';
    setChannel(newChannel);

    expect(setup).toHaveBeenCalled();
    expect(getPublicKey).toHaveBeenCalled();
    expect(getCkoWebhookUrl).toHaveBeenCalled();
    expect(getFramesStyles).toHaveBeenCalled();
    expect(useCko).toHaveBeenCalled();
    expect(setChannel).toHaveBeenCalledWith(newChannel);
  });

  it('exports proper CkoPaymentType enum', () => {
    expect('NOT_SELECTED' in CkoPaymentType).toBeTruthy();
    expect('CREDIT_CARD' in CkoPaymentType).toBeTruthy();
    expect('SAVED_CARD' in CkoPaymentType).toBeTruthy();
    expect('PAYPAL' in CkoPaymentType).toBeTruthy();
  });

});
