import useCkoPaypal from '../src/useCkoPaypal';
import { createContext, createPayment } from '../src/payment';
import { getCurrentPaymentMethodPayload, CkoPaymentType } from '../src/helpers';

const defaultPaymentResponse = {
  status: 200
};
jest.mock('../src/payment', () => ({
  createContext: jest.fn(() => Promise.resolve({
    data: {
      id: '12'
    }
  })),
  createPayment: jest.fn(() => Promise.resolve(defaultPaymentResponse))
}));
jest.mock('../src/helpers', () => ({
  getCurrentPaymentMethodPayload: jest.fn(),
  CkoPaymentType: jest.requireActual('../src/helpers').CkoPaymentType
}));

const {
  makePayment,
  error
} = useCkoPaypal();

describe('[checkout-com] useCkoPaypal', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not create context if provided', async () => {

    /*eslint-disable */
    const reference = {
      cartId: 15,
      email: 'ab@gmail.com',
      secure3d: true,
      contextDataId: 'provided-id',
      savePaymentInstrument: true,
      success_url: null,
      failure_url: null
    };
    /* eslint-enable */

    await makePayment(reference);

    expect(createContext).not.toHaveBeenCalled();

  });

  it('creates context if not provided', async () => {

    /*eslint-disable */
    const payload = {
      cartId: 15,
      email: 'ab@gmail.com',
      secure3d: true,
      savePaymentInstrument: true,
      success_url: null,
      failure_url: null
    };
    /* eslint-enable */

    const expectedPayload = {
      reference: payload.cartId,
      email: payload.email
    };

    await makePayment(payload);

    expect(createContext).toHaveBeenCalledWith(expectedPayload);

  });

  it('calls createPayment & returns proper success response', async () => {

    /*eslint-disable */
    const payload = {
      cartId: 15,
      contextDataId: 'abc',
      email: 'ab@gmail.com',
      secure3d: true,
      savePaymentInstrument: true,
      success_url: null,
      failure_url: null
    };
    /* eslint-enable */

    const response = await makePayment(payload);

    expect(createPayment).toHaveBeenCalled();
    expect(response).toEqual(defaultPaymentResponse);

  });

  it('uses default values for success and failure url and save_payment_instrument and reference', async () => {

    /*eslint-disable */
    const payload = {
      cartId: 15,
      contextDataId: 'abc',
      email: 'ab@gmail.com',
      secure3d: true,
      reference: 'zyxxzxz'
    };

    const exptectedObject = {
      secure3d: payload.secure3d,
      context_id: payload.contextDataId,
      save_payment_instrument: false,
      success_url: `${window.location.origin}/cko/payment-success`,
      failure_url: `${window.location.origin}/cko/payment-error`,
      reference: 'zyxxzxz'
    }
    /* eslint-enable */

    const response = await makePayment(payload);

    expect(getCurrentPaymentMethodPayload).toHaveBeenCalledWith(CkoPaymentType.PAYPAL, exptectedObject);
    expect(response).toEqual(defaultPaymentResponse);

  });

  it('allows to set success and failure url and save_payment_instrument', async () => {

    /*eslint-disable */
    const payload = {
      cartId: 15,
      contextDataId: 'abc',
      email: 'ab@gmail.com',
      secure3d: true,
      savePaymentInstrument: true,
      success_url: 'aa',
      failure_url: 'bb'
    };

    const expectedObject = {
      secure3d: payload.secure3d,
      context_id: payload.contextDataId,
      save_payment_instrument: payload.savePaymentInstrument,
      success_url: payload.success_url,
      failure_url: payload.failure_url,
      reference: null
    }
    /* eslint-enable */

    const response = await makePayment(payload);

    expect(getCurrentPaymentMethodPayload).toHaveBeenCalledWith(CkoPaymentType.PAYPAL, expectedObject);
    expect(response).toEqual(defaultPaymentResponse);

  });

  it('throws an error if receives diff. code than 200 and 202 from createPayment request', async () => {

    /*eslint-disable */
    const payload = {
      cartId: 15,
      contextDataId: 'abc',
      email: 'ab@gmail.com',
      secure3d: true,
      savePaymentInstrument: true,
      success_url: null,
      failure_url: null
    };

    const errorValue = 'Some error';

    (createPayment as jest.Mock).mockImplementation(() => Promise.resolve({
      status: 400,
      data: {
        error_type: errorValue
      }
    }))
    /* eslint-enable */

    const response = await makePayment(payload);

    expect(createPayment).toHaveBeenCalled();
    expect(error.value.message).toBe(errorValue);
    expect(response).toBe(null);

  });

});
