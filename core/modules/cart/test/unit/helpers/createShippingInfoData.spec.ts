import createShippingInfoData from './../../../helpers/createShippingInfoData';

describe('Cart createShippingInfoData', () => {
  it('returns methods data', async () => {
    const methodsData = {
      country: 'UK',
      carrier_code: 'XX',
      method_code: 'YY'
    };
    const shippingInfoData = createShippingInfoData(methodsData);
    expect(shippingInfoData).toEqual({
      billingAddress: {},
      shippingAddress: {
        countryId: 'UK'
      },
      shippingCarrierCode: 'XX',
      shippingMethodCode: 'YY'
    });
  });

  it('returns methods data with shipping address', async () => {
    const methodsData = {
      country: 'UK',
      carrier_code: 'XX',
      method_code: 'YY',
      shippingAddress: {
        city: 'London',
        firstname: 'John',
        lastname: 'Doe',
        postcode: 'EC123',
        street: ['JohnDoe street']
      }
    };
    const shippingInfoData = createShippingInfoData(methodsData);
    expect(shippingInfoData).toEqual({
      billingAddress: {},
      shippingAddress: {
        city: 'London',
        countryId: 'UK',
        firstname: 'John',
        lastname: 'Doe',
        postcode: 'EC123',
        street: ['JohnDoe street']
      },
      shippingCarrierCode: 'XX',
      shippingMethodCode: 'YY'
    });
  });

  it('returns methods data with billing address', async () => {
    const methodsData = {
      country: 'UK',
      carrier_code: 'XX',
      method_code: 'YY',
      billingAddress: {
        city: 'London',
        countryId: 'UK',
        firstname: 'John',
        lastname: 'Doe',
        postcode: 'EC123',
        street: ['JohnDoe street']
      }
    };
    const shippingInfoData = createShippingInfoData(methodsData);
    expect(shippingInfoData).toEqual({
      shippingAddress: { countryId: 'UK' },
      billingAddress: {
        city: 'London',
        countryId: 'UK',
        firstname: 'John',
        lastname: 'Doe',
        postcode: 'EC123',
        street: ['JohnDoe street']
      },
      shippingCarrierCode: 'XX',
      shippingMethodCode: 'YY'
    });
  });

  it('doesn\t add shippingCarrierCode or shippingMethodCode if missing carrier_code or method_code', async () => {
    const methodsData = {
      country: 'UK'
    };
    const shippingInfoData = createShippingInfoData(methodsData);
    expect(shippingInfoData).toEqual({
      billingAddress: {},
      shippingAddress: {
        countryId: 'UK'
      }
    });
  });
});
