import useCkoCard from '../src/useCkoCard';
import { createContext, createPayment, getCustomerCards, removeSavedCard } from '../src/payment';
import { getCurrentPaymentMethodPayload, CkoPaymentType } from '../src/helpers';
import { getPublicKey, getFramesStyles } from '../src/configuration';
import { ref } from '@vue/composition-api';

const defaultPaymentResponse = {
  status: 200
};
jest.mock('../src/payment', () => ({
  createContext: jest.fn(() => Promise.resolve({
    data: {
      id: '12'
    }
  })),
  createPayment: jest.fn(() => Promise.resolve(defaultPaymentResponse)),
  getCustomerCards: jest.fn(),
  removeSavedCard: jest.fn()
}));
jest.mock('../src/helpers', () => ({
  getCurrentPaymentMethodPayload: jest.fn(),
  CkoPaymentType: jest.requireActual('../src/helpers').CkoPaymentType,
  PaymentInstrument: jest.requireActual('../src/helpers').PaymentInstrument
}));
jest.mock('../src/configuration', () => ({
  getPublicKey: jest.fn(),
  getFramesStyles: jest.fn(),
  getTransactionTokenKey: jest.fn(),
  getFramesLocalization: jest.fn(),
  CardConfiguration: jest.requireActual('../src/configuration').CardConfiguration
}));

const sessionStorageMock = {
  removeItem: jest.fn(),
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 1
};

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

const framesMock = {
  submitCard: jest.fn(),
  init: jest.fn(),
  isCardValid: jest.fn(() => true)
};

Object.defineProperty(window, 'Frames', {
  value: framesMock
});

describe('[checkout-com] useCkoCard', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Card', () => {

    const paymentMethod = ref(CkoPaymentType.CREDIT_CARD);
    const {
      makePayment,
      error
    } = useCkoCard(paymentMethod);

    it('throws when there is no payment token', async () => {
      await makePayment({
        cartId: '1',
        email: 'johny@gmail.com',
        secure3d: true
      });

      expect(error.value.message).toBe('There is no payment token');
    });

    it('does not create context if provided', async () => {

      sessionStorageMock.getItem.mockImplementation(() => 'abc');
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

      sessionStorageMock.getItem.mockImplementation(() => 'abc');
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

    it('throws error if CVV not provided and required in context response', async () => {

      const paymentMethod = ref(CkoPaymentType.SAVED_CARD);
      const {
        makePayment,
        error
      } = useCkoCard(paymentMethod);

      sessionStorageMock.getItem.mockImplementation(() => 'abc');

      (createContext as jest.Mock).mockImplementation(() => Promise.resolve({
        data: {
          id: '12',
          // eslint-disable-next-line
          payment_settings: {
            // eslint-disable-next-line
            cvv_required: true
          }
        }
      }));

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

      await makePayment(payload);
      expect(error.value.message).toBe('CVV is required');

    });

    it('calls createPayment & returns proper success response', async () => {

      sessionStorageMock.getItem.mockImplementation(() => 'abc');
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

    it('uses default values for success and failure url and save_payment_instrument', async () => {
      const token = 'abc';
      sessionStorageMock.getItem.mockImplementation(() => token);

      /*eslint-disable */
      const payload = {
        token,
        cartId: 15,
        cvv: 999,
        contextDataId: 'abc',
        email: 'ab@gmail.com',
        secure3d: true
      };
  
      const exptectedObject = {
        token,
        cvv: 999,
        secure3d: payload.secure3d,
        context_id: payload.contextDataId,
        save_payment_instrument: false,
        success_url: `${window.location.origin}/cko/payment-success`,
        failure_url: `${window.location.origin}/cko/payment-error`
      }
      /* eslint-enable */

      const response = await makePayment(payload);
      expect(getCurrentPaymentMethodPayload).toHaveBeenCalledWith(CkoPaymentType.CREDIT_CARD, exptectedObject);
      expect(response).toEqual(defaultPaymentResponse);

    });

    it('allows to set success and failure url and save_payment_instrument', async () => {

      const token = '123';
      sessionStorageMock.getItem.mockImplementation(() => token);
      /*eslint-disable */
      const payload = {
        cartId: 15,
        contextDataId: 'abc',
        email: 'ab@gmail.com',
        secure3d: true,
        savePaymentInstrument: true,
        success_url: 'aa',
        failure_url: 'bb',
        token
      };
  
      const expectedObject = {
        cvv: null,
        secure3d: payload.secure3d,
        context_id: payload.contextDataId,
        save_payment_instrument: payload.savePaymentInstrument,
        success_url: payload.success_url,
        failure_url: payload.failure_url,
        token
      }
      /* eslint-enable */

      await makePayment(payload);

      expect(getCurrentPaymentMethodPayload).toHaveBeenCalledWith(CkoPaymentType.CREDIT_CARD, expectedObject);

    });

    it('throws an error if receives diff. code than 200 and 202 from createPayment request', async () => {

      sessionStorageMock.getItem.mockImplementation(() => 'abc');
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

  describe('Frames', () => {

    const paymentMethod = ref(CkoPaymentType.CREDIT_CARD);
    const {
      submitForm,
      initCardForm,
      submitDisabled,
      error
    } = useCkoCard(paymentMethod);

    it('submitForm runs Frames.submitCard', () => {
      submitForm();

      expect(framesMock.submitCard).toHaveBeenCalled();
    });

    it('initCardForm runs Frames.init with default values', () => {
      initCardForm();

      expect(framesMock.init.mock.calls[0][0]).toMatchObject({
        publicKey: getPublicKey(),
        style: getFramesStyles()
      });
    });

    it('initCardForm runs Frames.init with overwriten values', () => {
      const overwritenValues = {
        style: {
          ab: 12
        },
        localization: 'en-gb'
      };
      initCardForm(overwritenValues);

      expect(framesMock.init.mock.calls[0][0]).toMatchObject({
        publicKey: getPublicKey(),
        style: overwritenValues.style,
        localization: overwritenValues.localization
      });
    });

    it('events handlers from Frames.init work properly', () => {
      initCardForm();
      const token = 123;
      const errorMessage = new Error('msg');

      framesMock.init.mock.calls[0][0].cardValidationChanged();
      expect(framesMock.isCardValid).toHaveBeenCalled();
      expect(submitDisabled.value).toBeFalsy();

      framesMock.init.mock.calls[0][0].cardTokenized({ token });
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith(undefined, token);

      framesMock.init.mock.calls[0][0].cardTokenizationFailed(errorMessage);
      expect(submitDisabled.value).toBeTruthy();
      expect(error.value.message).toBe(errorMessage.message);
    });

  });

  describe('Payment instruments', () => {

    const paymentMethod = ref(CkoPaymentType.CREDIT_CARD);
    const {
      loadStoredPaymentInstruments,
      removePaymentInstrument,
      setPaymentInstrument,
      selectedCardPaymentMethod,
      storedPaymentInstruments,
      error
    } = useCkoCard(paymentMethod);

    /*eslint-disable */
    const payment_instruments = [
      {
        payment_instrument_id: 'a',
        id: 1
      },
      {
        payment_instrument_id: 'b',
        id: 2
      },
      {
        payment_instrument_id: 'c',
        id: 3
      }
    ];
    /* eslint-enable */

    it('loads stored payment instruments', async () => {
      const customerId = '1';

      (getCustomerCards as jest.Mock).mockImplementation(() => Promise.resolve({
        data: {
          /*eslint-disable */
          payment_instruments
          /* eslint-enable */
        }
      }));

      await loadStoredPaymentInstruments(customerId);

      expect(getCustomerCards).toHaveBeenCalledWith({
        /*eslint-disable */
        customer_id: customerId
        /*eslint-emable */
      })
      expect(storedPaymentInstruments.value).toEqual(payment_instruments)
    })

    it('sets error if load stored payment instruments fails', async () => {
      const customerId = '1'
      const errorMessage = 'msg';

      (getCustomerCards as jest.Mock).mockImplementation(() => {
        throw new Error(errorMessage);
      })

      await loadStoredPaymentInstruments(customerId)

      expect(getCustomerCards).toHaveBeenCalledWith({
        customer_id: customerId
      })
      expect(error.value.message).toBe(errorMessage)
    })

    it('removes stored payment instrument', async () => {
      const customerId = '1';
      (getCustomerCards as jest.Mock).mockImplementation(() => Promise.resolve({
        data: {
          /*eslint-disable */
          payment_instruments
        }
      }));
      await loadStoredPaymentInstruments(customerId)
      const instrument = payment_instruments[1];
      sessionStorageMock.getItem.mockImplementation(() => 'targetly-bad-value')
      const paymentInstrumentsWithoutRemoved = payment_instruments.filter(ins => ins.payment_instrument_id != instrument.payment_instrument_id);
      /* eslint-enable */

      (removeSavedCard as jest.Mock).mockImplementation(() => Promise.resolve());

      await removePaymentInstrument(customerId, instrument.payment_instrument_id);

      expect(removeSavedCard).toHaveBeenCalledWith({
        /*eslint-disable */
        customer_id: customerId,
        payment_instrument_id: instrument.payment_instrument_id
        /* eslint-enable */
      });
      expect(storedPaymentInstruments.value).toEqual(paymentInstrumentsWithoutRemoved);
    });

    it('removes stored payment instrument and updates current pick and removes transaction token', async () => {
      (getCustomerCards as jest.Mock).mockImplementation(() => Promise.resolve({
        data: {
          /*eslint-disable */
          payment_instruments
          /* eslint-enable */
        }
      }));

      await loadStoredPaymentInstruments('1');

      const customerId = '1';
      (removeSavedCard as jest.Mock).mockImplementation(() => Promise.resolve());
      /*eslint-disable */
      const instrument = payment_instruments[1];
      sessionStorageMock.getItem.mockImplementation(() => instrument.id)
      const paymentInstrumentsWithoutRemoved = payment_instruments.filter(ins => ins.payment_instrument_id !== instrument.payment_instrument_id);
  
      await removePaymentInstrument(customerId, instrument.payment_instrument_id)
  
      expect(removeSavedCard).toHaveBeenCalledWith({
        customer_id: customerId,
        payment_instrument_id: instrument.payment_instrument_id
      })
      /* eslint-enable */
      expect(storedPaymentInstruments.value).toEqual(paymentInstrumentsWithoutRemoved);
      expect(selectedCardPaymentMethod.value).toBe(CkoPaymentType.CREDIT_CARD);
      expect(sessionStorageMock.removeItem).toHaveBeenCalled();
    });

    it('sets error if remove stored payment instruments fails', async () => {
      const customerId = '1';
      const errorMessage = 'msg';
      const instrument = '123';

      (removeSavedCard as jest.Mock).mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await removePaymentInstrument(customerId, instrument);
      expect(error.value.message).toBe(errorMessage);
    });

    it('sets payment instrument', async () => {
      const token = '12345';
      setPaymentInstrument(token);

      expect(sessionStorageMock.setItem).toHaveBeenCalledWith(undefined, token);
      expect(selectedCardPaymentMethod.value).toBe(CkoPaymentType.SAVED_CARD);
    });

  });

});
