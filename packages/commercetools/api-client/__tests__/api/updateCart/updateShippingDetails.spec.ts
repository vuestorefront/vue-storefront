import updateShippingDetails from './../../../src/api/updateShippingDetails';

const cart = {
  id: 1,
  version: 1
} as any;

describe('[commercetools-api-client] updateShippingDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates cart shipping details', async () => {
    const shippingDetails = {
      firstName: 'John',
      lastName: 'Doe',
      country: 'US',
      city: 'New York',
      contactInfo: { phone: '123' },
      postalCode: '11-111',
      streetName: 'Street 1',
      streetNumber: ''
    } as any;

    const response = await updateShippingDetails(cart, shippingDetails);

    expect(response).toEqual({
      id: 1,
      version: 1,
      actions: [
        {
          setShippingAddress: {
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
        }
      ]
    });
  });
});
