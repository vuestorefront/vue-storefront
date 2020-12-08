import updateShippingDetails from '../../src/api/updateShippingDetails';

const cart = {
  id: 1,
  version: 1
} as any;

describe('[commercetools-api-client] updateShippingDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates cart shipping details', async () => {
    const context = {
      config: {
        locale: 'en',
        acceptLanguage: ['en', 'de'],
        currency: 'USD',
        country: 'UK'
      },
      client: {
        mutate: () => ({
          actions: [
            {
              setShippingAddress: {
                address: {
                  firstName: 'John',
                  lastName: 'Doe',
                  phone: '123',
                  country: 'US',
                  city: 'New York',
                  postalCode: '11-111',
                  streetName: 'Street 1',
                  streetNumber: ''
                }
              }
            }
          ],
          id: 1,
          version: 1
        })
      }
    };

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

    const response = await updateShippingDetails(context, cart, shippingDetails);

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

  it('updates cart shipping details without contact info', async () => {
    const context = {
      config: {
        locale: 'en',
        acceptLanguage: ['en', 'de'],
        currency: 'USD',
        country: 'UK'
      },
      client: {
        mutate: () => ({
          actions: [
            {
              setShippingAddress: {
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
            }
          ],
          id: 1,
          version: 1
        })
      }
    };

    const shippingDetails = {
      firstName: 'John',
      lastName: 'Doe',
      country: 'US',
      city: 'New York',
      postalCode: '11-111',
      streetName: 'Street 1',
      streetNumber: ''
    } as any;

    const response = await updateShippingDetails(context, cart, shippingDetails);

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
