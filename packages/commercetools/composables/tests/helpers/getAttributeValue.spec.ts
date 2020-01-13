import { getAttributeValue } from './../../src/helpers/attributes'

describe('[commercetools-composables] getAttributeValue', () => {
  it('returns specific value for given attribute type', () => {
    expect(
      getAttributeValue({
        __typename: 'StringAttribute',
        stringValue: 'string value'
      } as any)
    ).toBe('string value')

    expect(
      getAttributeValue({
        __typename: 'EnumAttribute',
        label: 'enum value'
      } as any)
    ).toBe('enum value')

    expect(
      getAttributeValue({
        __typename: 'LocalizedEnumAttribute',
        localizedLabel: 'localized enum value'
      } as any)
    ).toBe('localized enum value')

    expect(
      getAttributeValue({
        __typename: 'LocalizedStringAttribute',
        localizedString: 'localized string value'
      } as any)
    ).toBe('localized string value')

    expect(
      getAttributeValue({
        __typename: 'BooleanAttribute',
        booleanValue: true
      } as any)
    ).toBe(true)

    expect(
      getAttributeValue({
        __typename: 'UndefinedType',
        value: 'other'
      } as any)
    ).toBe(null)
  })
})
