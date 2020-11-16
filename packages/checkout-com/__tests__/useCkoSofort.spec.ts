import useCkoSofort from '../src/useCkoSofort';
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
} = useCkoSofort();

describe('[checkout-com] useCkoSofort', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not create context if provided', async () => {

    /*eslint-disable */
    const reference = {
      cartId: 15,
      email: 'ab@gmail.com',
      contextDataId: 'provided-id',
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
      success_url: null,
      failure_url: null
    };
    /* eslint-enable */

    const response = await makePayment(payload);

    expect(createPayment).toHaveBeenCalled();
    expect(response).toEqual(defaultPaymentResponse);

  });

  it('uses default values for success and failure url and reference', async () => {

    /*eslint-disable */
    const payload = {
      cartId: 15,
      contextDataId: 'abc',
      email: 'ab@gmail.com',
      reference: 'zyxxzxz'
    };

    const exptectedObject = {
      context_id: payload.contextDataId,
      success_url: `${window.location.origin}/cko/payment-success`,
      failure_url: `${window.location.origin}/cko/payment-error`,
      reference: 'zyxxzxz'
    }
    /* eslint-enable */

    const response = await makePayment(payload);

    expect(getCurrentPaymentMethodPayload).toHaveBeenCalledWith(CkoPaymentType.SOFORT, exptectedObject);
    expect(response).toEqual(defaultPaymentResponse);

  });

  it('allows to set success and failure url', async () => {

    /*eslint-disable */
    const payload = {
      cartId: 15,
      contextDataId: 'abc',
      email: 'ab@gmail.com',
      success_url: 'aa',
      failure_url: 'bb'
    };

    const expectedObject = {
      context_id: payload.contextDataId,
      success_url: payload.success_url,
      failure_url: payload.failure_url,
      reference: null
    }
    /* eslint-enable */

    const response = await makePayment(payload);

    expect(getCurrentPaymentMethodPayload).toHaveBeenCalledWith(CkoPaymentType.SOFORT, expectedObject);
    expect(response).toEqual(defaultPaymentResponse);

  });

  it('throws an error if receives diff. code than 200 and 202 from createPayment request', async () => {

    /*eslint-disable */
    const payload = {
      cartId: 15,
      contextDataId: 'abc',
      email: 'ab@gmail.com',
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
