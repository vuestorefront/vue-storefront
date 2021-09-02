import { setBillingAddressAction } from './../../../src/helpers/cart/actions';

describe('[commercetools-api-client] setBillingAddressAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates action for setting billing address', () => {
    const billingDetails = {
      firstName: 'John',
      lastName: 'Doe',
      country: 'US',
      city: 'New York',
      contactInfo: { phone: '123' },
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
          phone: '123',
          postalCode: '11-111',
          streetName: 'Street 1',
          streetNumber: ''
        }
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
