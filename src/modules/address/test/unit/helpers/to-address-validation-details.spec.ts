import { toAddressValidationDetails } from '../../../helpers/to-address-validation-details';

describe('toAddressValidationDetails', () => {
  it('normalizes a partial address to the validation view shape', () => {
    expect(toAddressValidationDetails({
      streetAddress: '123 Main Street',
      city: 'Miami',
      region_id: 12
    })).toEqual({
      streetAddress: '123 Main Street',
      apartmentNumber: undefined,
      city: 'Miami',
      state: undefined,
      region_id: 12,
      zipCode: undefined,
      country: undefined
    });
  });
});
