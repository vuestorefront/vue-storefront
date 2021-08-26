import createOrderData from '@vue-storefront/core/modules/cart/helpers/createOrderData';

jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn(),
  localizedRoute: jest.fn()
}));

const shippingDetails = {
  country: 'UK',
  firstName: 'John',
  lastName: 'Doe',
  city: 'London',
  zipCode: 'EC123',
  streetAddress: 'JohnDoe street',
  region_id: 1,
  apartmentNumber: '12',
  state: 'xxxx',
  phoneNumber: '123123123',
  shippingMethod: 'method'
};

const paymentDetails = {
  country: 'UK',
  firstName: 'John',
  lastName: 'Doe',
  city: 'London',
  zipCode: 'EC123',
  streetAddress: 'JohnDoe street',
  region_id: 1,
  apartmentNumber: '12',
  state: 'xxxx',
  phoneNumber: '123123123',
  company: '',
  taxId: '',
  paymentMethod: '',
  paymentMethodAdditional: []
};

describe('Cart createOrderData', () => {
  it('returns data with default shipping and default payment', async () => {
    const shippingMethods = [
      {
        default: false,
        offline: false,
        method_code: 'CODE1',
        carrier_code: 'CODE2'
      },
      {
        default: true,
        offline: false,
        method_code: 'CODE3',
        carrier_code: 'CODE4'
      }
    ];

    const paymentMethods = [
      {
        default: false,
        code: 'CODE3'
      },
      {
        default: true,
        code: 'CODE4'
      }
    ];

    const methodsData = createOrderData({ shippingDetails, shippingMethods, paymentMethods, paymentDetails, taxCountry: 'DE' })

    expect(methodsData).toEqual({
      carrier_code: 'CODE4',
      country: 'UK',
      method_code: 'CODE3',
      payment_method: 'CODE4',
      shippingAddress: {
        city: 'London',
        firstname: 'John',
        lastname: 'Doe',
        postcode: 'EC123',
        street: ['JohnDoe street']
      },
      billingAddress: {
        city: 'London',
        countryId: 'UK',
        firstname: 'John',
        lastname: 'Doe',
        postcode: 'EC123',
        street: ['JohnDoe street']
      }
    });
  });

  it('returns data with first online shipping and first payment', async () => {
    const shippingMethods = [
      {
        default: false,
        offline: false,
        method_code: 'CODE1-first',
        carrier_code: 'CODE2-first'
      },
      {
        default: false,
        offline: false,
        method_code: 'CODE3',
        carrier_code: 'CODE4'
      }
    ];

    const paymentMethods = [
      {
        default: false,
        code: 'CODE3'
      },
      {
        default: false,
        code: 'CODE4'
      }
    ];

    const methodsData = createOrderData({ shippingDetails, shippingMethods, paymentMethods, paymentDetails, taxCountry: 'DE' })

    expect(methodsData).toEqual({
      carrier_code: 'CODE2-first',
      country: 'UK',
      method_code: 'CODE1-first',
      payment_method: 'CODE3',
      shippingAddress: {
        city: 'London',
        firstname: 'John',
        lastname: 'Doe',
        postcode: 'EC123',
        street: ['JohnDoe street']
      },
      billingAddress: {
        city: 'London',
        countryId: 'UK',
        firstname: 'John',
        lastname: 'Doe',
        postcode: 'EC123',
        street: ['JohnDoe street']
      }
    });
  });

  it('returns data without payment, carrier and method', async () => {
    const shippingMethods = [];
    const paymentMethods = [];
    const methodsData = createOrderData({ shippingDetails, shippingMethods, paymentMethods, paymentDetails, taxCountry: 'DE' });

    expect(methodsData).toEqual({
      carrier_code: null,
      country: 'UK',
      method_code: null,
      payment_method: null,
      shippingAddress: {
        city: 'London',
        firstname: 'John',
        lastname: 'Doe',
        postcode: 'EC123',
        street: ['JohnDoe street']
      },
      billingAddress: {
        city: 'London',
        countryId: 'UK',
        firstname: 'John',
        lastname: 'Doe',
        postcode: 'EC123',
        street: ['JohnDoe street']
      }
    });
  });
});
