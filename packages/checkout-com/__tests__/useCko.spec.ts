import useCko from '../src/useCko';
import { createContext } from '../src/payment';
import { CkoPaymentType } from '../src/helpers';

const contextPaymentMethods = [
  {
    name: 'paypal'
  }
];

const allPaymentMethods = [
  ...contextPaymentMethods,
  {
    name: 'card'
  }
];

const customerId = 12;
const contextData = {
  apms: contextPaymentMethods,
  id: customerId
};

const finalizeTransactionResponse = 'abc';
const saveInstrumentKey = 'save-instrument-super-key';

const useCkoPaypalMock = {
  makePayment: jest.fn(() => finalizeTransactionResponse),
  error: {
    value: {
      message: 'some-paypal-weird-error'
    }
  }
};
const useCkoCardMock = {
  initCardForm: jest.fn(),
  makePayment: jest.fn(() => finalizeTransactionResponse),
  error: jest.fn(),
  submitForm: jest.fn(),
  setPaymentInstrument: jest.fn(),
  removePaymentInstrument: jest.fn(),
  loadStoredPaymentInstruments: jest.fn(),
  storedPaymentInstruments: jest.fn(),
  submitDisabled: jest.fn()
};
jest.mock('../src/useCkoPaypal', () => () => useCkoPaypalMock);
jest.mock('../src/useCkoCard', () => () => useCkoCardMock);
jest.mock('../src/helpers', () => ({
  getCurrentPaymentMethodPayload: jest.fn(),
  CkoPaymentType: jest.requireActual('../src/helpers').CkoPaymentType
}));
jest.mock('../src/configuration', () => ({
  getSaveInstrumentKey: jest.fn(() => saveInstrumentKey),
  Configuration: jest.requireActual('../src/configuration').Configuration
}));
jest.mock('../src/payment', () => ({
  createContext: jest.fn(() => Promise.resolve({
    data: contextData
  }))
}));

const localStorageMock = {
  removeItem: jest.fn(),
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 1
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

const {
  availableMethods,
  storedContextId,
  error,
  selectedPaymentMethod,
  loadAvailableMethods,
  initForm,
  makePayment,
  setSavePaymentInstrument,
  loadSavePaymentInstrument
} = useCko();

describe('[checkout-com] useCkoPaypal', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads available methods for guest', async () => {

    const payload = {
      reference: '1'
    };

    const response = await loadAvailableMethods(payload.reference);

    expect(availableMethods.value).toEqual(allPaymentMethods);
    expect(storedContextId.value).toBe(customerId);
    expect(response).toEqual(contextData);

  });

  it('loads available methods for customer', async () => {

    const payload = {
      reference: '1',
      email: 'abc@gmail.com'
    };

    await loadAvailableMethods(payload.reference, payload.email);

    expect(availableMethods.value).toEqual(allPaymentMethods);
    expect(storedContextId.value).toBe(customerId);

  });

  it('sets error if available methods fails', async () => {

    const errorMessage = 'abc';
    const payload = {
      reference: '1'
    };
    (createContext as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await loadAvailableMethods(payload.reference);

    expect(error.value.message).toEqual(errorMessage);

  });

  it('stops initForm if initMethods is an empty object', () => {
    initForm({}, {});
    expect(useCkoCardMock.initCardForm).not.toHaveBeenCalled();
  });

  it('inits card form in initForm if available', async () => {
    await loadAvailableMethods('1');
    initForm(null, {});

    expect(useCkoCardMock.initCardForm).toHaveBeenCalled();
  });

  it('inits card form in initForm if available and requested', async () => {
    await loadAvailableMethods('1');
    initForm({
      card: true
    }, {});

    expect(useCkoCardMock.initCardForm).toHaveBeenCalled();
  });

  it('inits card form in initForm if available without params', async () => {
    await loadAvailableMethods('1');
    initForm();

    expect(useCkoCardMock.initCardForm).toHaveBeenCalled();
  });

  it('inits card form in initForm if available with custom config', async () => {
    const customConfig = {
      card: {
        style: 1,
        localization: 'sads'
      }
    };
    await loadAvailableMethods('1');
    initForm(null, customConfig);

    expect(useCkoCardMock.initCardForm).toHaveBeenCalledWith(customConfig.card);
  });

  it('does not make payment if payment method not selected', async () => {
    await makePayment({});

    expect(error.value.message).toBe('Payment method not selected');
  });

  it('does not make payment if payment method not selected without params', async () => {
    await makePayment();

    expect(error.value.message).toBe('Payment method not selected');
  });

  it('makes payment for credit card', async () => {
    selectedPaymentMethod.value = CkoPaymentType.CREDIT_CARD;

    /*eslint-disable */
    const payload = {
      cartId: '1',
      email: 'a@gmail.com',
      contextDataId: '12',
      secure3d: true,
      success_url: null,
      failure_url: null
    }

    localStorageMock.getItem.mockImplementation(() => 'true')

    const expectedPayload = {
      cartId: '1',
      email: 'a@gmail.com',
      contextDataId: '12',
      cvv: null,
      secure3d: true,
      success_url: null,
      failure_url: null,
      savePaymentInstrument: true
    }
    /* eslint-enable */

    const response = await makePayment(payload);

    expect(useCkoCardMock.makePayment).toHaveBeenCalledWith(expectedPayload);
    expect(response).toBe(finalizeTransactionResponse);
  });

  it('makes payment for saved card', async () => {
    selectedPaymentMethod.value = CkoPaymentType.SAVED_CARD;
    /*eslint-disable */
    const payload = {
      cartId: '1',
      email: 'a@gmail.com',
      contextDataId: '12',
      secure3d: true,
      success_url: null,
      failure_url: null
    }

    localStorageMock.getItem.mockImplementation(() => 'true')

    const expectedPayload = {
      cartId: '1',
      email: 'a@gmail.com',
      contextDataId: '12',
      cvv: null,
      secure3d: true,
      success_url: null,
      failure_url: null,
      savePaymentInstrument: true
    }
    /* eslint-enable */

    const response = await makePayment(payload);

    expect(useCkoCardMock.makePayment).toHaveBeenCalledWith(expectedPayload);
    expect(response).toBe(finalizeTransactionResponse);
  });

  it('makes payment for PayPal', async () => {
    selectedPaymentMethod.value = CkoPaymentType.PAYPAL;
    /*eslint-disable */
    const payload = {
      cartId: '1',
      email: 'a@gmail.com',
      contextDataId: '12',
      secure3d: true,
      success_url: null,
      failure_url: null
    }

    localStorageMock.getItem.mockImplementation(() => 'true')

    const expectedPayload = {
      cartId: '1',
      email: 'a@gmail.com',
      contextDataId: '12',
      cvv: null,
      secure3d: true,
      success_url: null,
      failure_url: null,
      savePaymentInstrument: true
    }
    /* eslint-enable */

    const response = await makePayment(payload);

    expect(useCkoPaypalMock.makePayment).toHaveBeenCalledWith(expectedPayload);
    expect(response).toBe(finalizeTransactionResponse);
  });

  it('sets error for not supported payment method', async () => {
    selectedPaymentMethod.value = 312321;

    await makePayment({});

    expect(useCkoPaypalMock.makePayment).not.toHaveBeenCalled();
    expect(error.value.message).toBe('Not supported payment method');
  });

  it('inherits error from payment methods makePayment', async () => {
    selectedPaymentMethod.value = CkoPaymentType.PAYPAL;

    await makePayment({});
    expect(error.value.message).toBe(useCkoPaypalMock.error.value.message);
  });

  it('sets savePaymentInstrument', () => {
    const someValue = true;

    setSavePaymentInstrument(someValue);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(saveInstrumentKey, JSON.stringify(someValue));
  });

  it('loadSavePaymentInstrument works', () => {
    localStorageMock.getItem.mockImplementation(() => undefined);
    const defaultValue = loadSavePaymentInstrument();
    localStorageMock.getItem.mockImplementation(() => 'true');
    const storedValue = loadSavePaymentInstrument();

    expect(defaultValue).toBeFalsy();
    expect(storedValue).toBeTruthy();
  });

});
