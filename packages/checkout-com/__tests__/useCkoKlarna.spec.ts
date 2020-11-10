import useCkoKlarna from '../src/useCkoKlarna';
import { createPayment } from '../src/payment';
import { getCurrentPaymentMethodPayload, getTransactionToken, setTransactionToken, CkoPaymentType } from '../src/helpers';
import { getKlarnaOnMounted } from '../src/configuration';

const defaultPaymentResponse = {
  status: 200
};
const klarnaContainerSelector = '#abc';
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
  setTransactionToken: jest.fn(),
  removeTransactionToken: jest.fn(),
  getTransactionToken: jest.fn(),
  CkoPaymentType: jest.requireActual('../src/helpers').CkoPaymentType,
  PaymentInstrument: jest.requireActual('../src/helpers').PaymentInstrument
}));
jest.mock('../src/configuration', () => ({
  getPublicKey: jest.fn(),
  getFramesStyles: jest.fn(),
  getTransactionTokenKey: jest.fn(),
  getFramesLocalization: jest.fn(),
  getKlarnaContainerSelector: jest.fn(() => klarnaContainerSelector),
  getKlarnaOnMounted: jest.fn(() => {}),
  CardConfiguration: jest.requireActual('../src/configuration').CardConfiguration
}));

const klarnaMock = {
  Payments: {
    authorize: jest.fn(),
    init: jest.fn(),
    load: jest.fn()
  }
};

Object.defineProperty(window, 'Klarna', {
  value: klarnaMock
});

describe('[checkout-com] useCkoKlarna', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Klarna', () => {

    const {
      makePayment,
      error
    } = useCkoKlarna();

    it('throws when there is no payment token', async () => {
      await makePayment({
        secure3d: true,
        contextDataId: 'asda',
        savePaymentInstrument: false
      });

      expect(error.value.message).toBe('There is no payment token');
    });

    it('calls createPayment & returns proper success response', async () => {

      (getTransactionToken as jest.Mock).mockImplementation(() => 'abc');
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
      (getTransactionToken as jest.Mock).mockImplementation(() => token);

      /*eslint-disable */
      const payload = {
        cartId: 15,
        contextDataId: 'abc',
        email: 'ab@gmail.com',
        secure3d: true,
        savePaymentInstrument: false
      };
  
      const exptectedObject = {
        token,
        secure3d: payload.secure3d,
        context_id: payload.contextDataId,
        save_payment_instrument: false,
        success_url: `${window.location.origin}/cko/payment-success`,
        failure_url: `${window.location.origin}/cko/payment-error`,
        reference: null
      }
      /* eslint-enable */

      const response = await makePayment(payload);
      expect(getCurrentPaymentMethodPayload).toHaveBeenCalledWith(CkoPaymentType.KLARNA, exptectedObject);
      expect(response).toEqual(defaultPaymentResponse);

    });

    it('allows to set success and failure url and save_payment_instrument and reference', async () => {

      const token = '123';
      (getTransactionToken as jest.Mock).mockImplementation(() => token);
      /*eslint-disable */
      const payload = {
        cartId: 15,
        contextDataId: 'abc',
        email: 'ab@gmail.com',
        secure3d: true,
        savePaymentInstrument: true,
        success_url: 'aa',
        failure_url: 'bb',
        reference: 'zyxxzxz',
        token
      };
  
      const expectedObject = {
        secure3d: payload.secure3d,
        context_id: payload.contextDataId,
        save_payment_instrument: payload.savePaymentInstrument,
        success_url: payload.success_url,
        failure_url: payload.failure_url,
        reference: 'zyxxzxz',
        token
      }
      /* eslint-enable */

      await makePayment(payload);

      expect(getCurrentPaymentMethodPayload).toHaveBeenCalledWith(CkoPaymentType.KLARNA, expectedObject);

    });

    it('throws an error if receives diff. code than 200 and 202 from createPayment request', async () => {

      (getTransactionToken as jest.Mock).mockImplementation(() => 'abc');
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

  describe('Klarna', () => {
    const {
      submitForm,
      initKlarnaForm
    } = useCkoKlarna();

    const contextId = '1234aa';
    /*eslint-disable */
    const apm = {
      metadata: {
        details: {
          client_token: 'abc',
          payment_method_category: [
            {
              identifier: 'pay_later'
            }
          ]
        },
        session: 'xcxafsfafkdj'
      }
    }
    /* eslint-enable */

    it('submitForm runs Klarna.Payments.authorize', async () => {
      /*eslint-disable */
      const response = {
        authorization_token: '123'
      }

      submitForm(contextId).then(r => {
        expect(r).toMatchObject(response)
      })

      expect(klarnaMock.Payments.authorize).toHaveBeenCalled();
      expect(klarnaMock.Payments.authorize).toHaveBeenCalledWith(
        expect.objectContaining({
          instance_id: contextId
        }),
        expect.any(Object),
        expect.any(Function)
      );

      klarnaMock.Payments.authorize.mock.calls[0][2](response)
      expect(setTransactionToken).toHaveBeenCalledWith(response.authorization_token)
      /* eslint-enable */
    });

    it('submitForm rejects with error', async () => {
      const err = 'some err';
      klarnaMock.Payments.authorize.mockImplementation(() => {
        throw new Error(err);
      });

      try {
        await submitForm(contextId);
      } catch (e) {
        expect(e.message).toBe(err);
      }
    });

    it('initCardForm runs Klarna.Payments.init & Klarna.Payments.load', () => {
      const funcMock = 'xczxczxczxcadasdasdas';
      (getKlarnaOnMounted as jest.Mock).mockImplementation(() => funcMock);
      initKlarnaForm(null, apm, contextId);

      /*eslint-disable */
      expect(klarnaMock.Payments.init.mock.calls[0][0]).toMatchObject({
        client_token: apm.metadata.details.client_token
      });

      expect(klarnaMock.Payments.load.mock.calls[0][0]).toMatchObject({
        container: klarnaContainerSelector,
        payment_method_categories: apm.metadata.details.payment_method_category.map(cat => cat.identifier),
        instance_id: contextId
      });
      /* eslint-enable */

      expect(klarnaMock.Payments.load.mock.calls[0][1]).toBe(apm.metadata.session);
      expect(klarnaMock.Payments.load.mock.calls[0][2]).toBe(funcMock);
    });

    it('initCardForm runs Klarna.Payments.init & Klarna.Payments.load with provided values', () => {
      const klarnaParams = {
        containerSelector: '#porto',
        mounted () {
          console.log('hello!');
        }
      };
      initKlarnaForm(klarnaParams, apm, contextId);

      /*eslint-disable */
      expect(klarnaMock.Payments.init.mock.calls[0][0]).toMatchObject({
        client_token: apm.metadata.details.client_token
      });

      expect(klarnaMock.Payments.load.mock.calls[0][0]).toMatchObject({
        container: klarnaParams.containerSelector,
        payment_method_categories: apm.metadata.details.payment_method_category.map(cat => cat.identifier),
        instance_id: contextId
      });
      /* eslint-enable */

      expect(klarnaMock.Payments.load.mock.calls[0][1]).toBe(apm.metadata.session);
      expect(klarnaMock.Payments.load.mock.calls[0][2]).toBe(klarnaParams.mounted);
    });

  });

});
