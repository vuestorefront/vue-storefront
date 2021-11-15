import { setBillingAddressAction } from './../../../src/helpers/actions/cart';

describe('[commercetools-api-client] setBillingAddressAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates action for setting billing address', () => {
    const billingDetails = {
      title: '',
      salutation: 'Mr.',
      firstName: 'John',
      lastName: 'Doe',
      streetName: 'Street 1',
      streetNumber: '',
      additionalAddressInfo: null,
      postalCode: '11-111',
      city: 'New York',
      region: null,
      state: 'New York',
      country: 'US',
      company: null,
      department: null,
      building: '2',
      apartment: '1',
      pOBox: null,
      phone: '1234567890',
      mobile: '1234567890',
      email: 'test@example.com',
      fax: null,
      additionalStreetInfo: null
    } as any;

    const actionPayload = setBillingAddressAction(billingDetails);

    expect(actionPayload).toEqual({
      setBillingAddress: {
        address: billingDetails
      }
    });
  });

  it('creates action for setting billing address without contact info', () => {
    const billingDetails = {
      firstName: 'John',
      lastName: 'Doe',
      country: 'US',
      city: 'New York',
      postalCode: '11-111',
      streetName: 'Street 1',
      streetNumber: ''
    } as any;

    const actionPayload = setBillingAddressAction(billingDetails);

    expect(actionPayload).toEqual({
      setBillingAddress: {
        address: {
          firstName: 'John',
          lastName: 'Doe',
          country: 'US',
          city: 'New York',
          postalCode: '11-111',
          streetName: 'Street 1',
          streetNumber: ''
        }
      }
    });
  });
});
