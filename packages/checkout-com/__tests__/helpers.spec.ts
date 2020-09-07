import { getCurrentPaymentMethodPayload, CkoPaymentType } from '../src/helpers';

describe('[checkout-com] helpers', () => {

  it('builds payment payload for credit card', () => {

    /*eslint-disable */
    const rawPayload = {
      context_id: '123',
      save_payment_instrument: false,
      secure3d: true,
      success_url: 'aa',
      failure_url: 'bb',
      token: 'super-token'
    };

    const expectedPayload = {
      context_id: '123',
      '3ds': true,
      success_url: 'aa',
      failure_url: 'bb',
      token: 'super-token',
      type: 'token'
    };
    /* eslint-enable */

    const builtPayload = getCurrentPaymentMethodPayload(CkoPaymentType.CREDIT_CARD, rawPayload);

    expect(builtPayload).toEqual(expectedPayload);

  });

  it('builds payment payload for saved card', () => {

    /*eslint-disable */
    const rawPayload = {
      context_id: '123',
      save_payment_instrument: true,
      secure3d: true,
      success_url: 'aa',
      failure_url: 'bb',
      token: 'super-token'
    };

    const expectedPayload = {
      context_id: '123',
      save_payment_instrument: true,
      '3ds': true,
      success_url: 'aa',
      failure_url: 'bb',
      token: 'super-token',
      type: 'id'
    };
    /* eslint-enable */

    const builtPayload = getCurrentPaymentMethodPayload(CkoPaymentType.SAVED_CARD, rawPayload);

    expect(builtPayload).toEqual(expectedPayload);

  });

  it('builds payment payload for klarna', () => {

    /*eslint-disable */
    const rawPayload = {
      context_id: '123',
      save_payment_instrument: false,
      secure3d: true,
      success_url: 'aa',
      failure_url: 'bb',
      token: 'super-token'
    };

    const expectedPayload = {
      context_id: '123',
      '3ds': true,
      success_url: 'aa',
      failure_url: 'bb',
      token: 'super-token',
      type: 'klarna'
    };
    /* eslint-enable */

    const builtPayload = getCurrentPaymentMethodPayload(CkoPaymentType.KLARNA, rawPayload);

    expect(builtPayload).toEqual(expectedPayload);

  });

  it('builds payment payload for paypal', () => {

    /*eslint-disable */
    const rawPayload = {
      context_id: '123',
      save_payment_instrument: false,
      secure3d: true,
      success_url: 'aa',
      failure_url: 'bb'
    };

    const expectedPayload = {
      context_id: '123',
      '3ds': true,
      success_url: 'aa',
      failure_url: 'bb',
      type: 'paypal'
    };
    /* eslint-enable */

    const builtPayload = getCurrentPaymentMethodPayload(CkoPaymentType.PAYPAL, rawPayload);

    expect(builtPayload).toEqual(expectedPayload);

  });

  it('does not add falsy by default attributes', () => {

    /*eslint-disable */
    const rawPayload = {
      context_id: '123',
      save_payment_instrument: false,
      secure3d: false,
      success_url: '',
      failure_url: ''
    };

    const expectedPayload = {
      context_id: '123',
      type: 'paypal'
    };
    /* eslint-enable */

    const builtPayload = getCurrentPaymentMethodPayload(CkoPaymentType.PAYPAL, rawPayload);

    expect(builtPayload).toEqual(expectedPayload);

  });

});
